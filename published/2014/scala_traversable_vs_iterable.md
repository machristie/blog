
<!--

# Scala: What's the difference between Traversable and Iterable?

-->

I'm currently working through the book [Programming in Scala, 2nd
ed.](http://www.artima.com/shop/programming_in_scala_2ed).  I'm in chapter 24
and reading about the `Traversable` and `Iterable` traits and the difference
between them.

`Traversable` is a trait with one abstract method, `foreach`.  It's signature is

    :::scala
    def foreach[U](f: Elem => U)

Defining this one method for a `Traversable` allows your collection class to
gain several useful methods like

* `map`
* `flatMap`
* `take`
* `drop`
* `filter`
* `foldLeft`, `foldRight`
* [etc.](http://www.scala-lang.org/api/current/index.html#scala.collection.Traversable)

`Iterable` is a trait that extends `Traversable` and also has one abstract
method, `iterator`. It's signature is

    :::scala
    def iterator: Iterator[A]

`Iterable` defines `foreach` in terms of this `iterator` method:

    :::scala
    def foreach[U](f: Elem => U): Unit = {
        val it = iterator
        while (it.hasNext) f(it.next())
    }

If we can implement `foreach` in terms of `iterator`, why have `Traversable` as
a separate trait?

The book provides one reason: **that for some collections, implementing
`iterator` may not be easy or may not be efficient**. To illustrate this the
book uses a `Tree` data structure as an example.

The `Tree` data structure is defined as a case class hierarchy:

    :::scala
    sealed abstract class Tree
    case class Branch(left: Tree, right: Tree) extends Tree
    case class Node(elem: Int) extends Tree

I'm a Scala newbie so I couldn't get [their `Traversable` `Tree` code
example](http://booksites.artima.com/programming_in_scala_2ed/examples/html/ch24.html#sec3)
to work. Instead I came up with this:

    :::scala
    sealed abstract class Tree extends Traversable[Int]
    case class Branch(left: Tree, right: Tree) extends Tree {
      def foreach[U](f: Int => U) = left foreach f; right foreach f
    }
    case class Node(elem: Int) extends Tree {
      def foreach[U](f: Int => U) = f(elem)
    }

For the `Iterable` version I came up with this:

    :::scala
    sealed abstract class Tree extends Iterable[Int]
    case class Branch(left: Tree, right: Tree) extends Tree {
      def iterator: Iterator[Int] = left.iterator ++ right.iterator
    }
    case class Node(elem: Int) extends Tree {
      def iterator: Iterator[Int] = Iterator.single(elem)
    }

Both fairly straightforward. The problem with the `Iterable` version is
with the efficiency of visiting nodes in the tree. In particular, the
implementation of `++` is such that it has to do an extra indirection at every
call to `next` to determine whether to pull from the left or the right iterator.

I think it helps to see what a naive implementation of `++` would look like:

    :::scala
    def ++[A](left:Iterator[A], right:Iterator[A]):Iterator[A] =
        return new Iterator[A] {

            def hasNext: Boolean = left.hasNext || right.hasNext

            def next: A =
                if (left.hasNext)
                    left.next
                else
                    right.next
        }

Every call to `next` has to first check `left.hasNext` before returning a value.
In a balanced binary tree with N leaf nodes, the depth of the tree is
approximately log(N). So to reach a leaf via this added iterator would require
an extra log(N) calls to `left.hasNext`.  Therefore, visiting all of the leaf
nodes using the iterator would take O(N\*log(N)).

*But*, that's with the naive implementation of `++`. The [actual
implementation](https://github.com/scala/scala/blob/v2.10.3/src/library/scala/collection/Iterator.scala#L341),
shown below, optimizes by keeping a reference, `cur`, to the current `Iterator`.
This allows it to avoid needing to check `hasNext` on the first `Iterator` on
each call to `next`.

    :::scala
    def ++[B >: A](that: => GenTraversableOnce[B]): Iterator[B] = new AbstractIterator[B] {
        // optimize a little bit to prevent n log n behavior.
        private var cur : Iterator[B] = self
        private var selfExhausted : Boolean = false
        // since that is by-name, make sure it's only referenced once -
        // if "val it = that" is inside the block, then hasNext on an empty
        // iterator will continually reevaluate it. (ticket #3269)
        lazy val it = that.toIterator
        // the eq check is to avoid an infinite loop on "x ++ x"
        def hasNext = cur.hasNext || (!selfExhausted && {
            it.hasNext && {
                cur = it
                selfExhausted = true
                true
            }
        })
        def next() = { hasNext; cur.next() }
    }

So, to a certain degree, this example with the `Tree` is a little artificial.
It's just as easy to implement `Tree` as an `Iterable` as it is to implement it
as a `Traversable` and there is no fundamental reason why the performance of
visiting all of the leaf nodes needs to be worse than a `Traversable`
implementation.

I think it is reasonable to assume that there might be data structures where
implementing an `Iterator` over their elements could be challenging (either
fundamentally so or with regards to efficiency). I just wish I could think of a
more compelling example.

Further resources:

* <http://stackoverflow.com/questions/2602379/in-scala-2-8-collections-why-was-the-traversable-type-added-above-iterable>
* <http://blog.schauderhaft.de/2010/12/19/the-scala-collection-api-sucks-or-is-it-a-work-of-beauty/>
