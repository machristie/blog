
<!--
Scala: Object equality and canEqual
-->

This week I'm in chapter 30 of [Programming in Scala, 2nd ed.](http://www.artima.com/shop/programming_in_scala_2ed), the chapter titled *Object Equality*.

#### Getting Object Equality Right

This chapter is about how hard it is to properly implement a class' `equals`
method. There is good advice here on the pitfalls to avoid and recipes to write
good `equals` and `hashCode` methods. Most of this chapter is present in the
article [How to Write an Equality Method in Java](http://www.artima.com/lejava/articles/equality.html) except that the examples in the article use Java instead of Scala.

#### What is the `canEqual` method?

One of the strategies in this chapter is to introduce a `canEqual` method for
non-final classes.  This allows subclasses to override `canEqual` if they want
to not allow being equal to the parent class or sibling classes.

The example in the chapter is this. You start with a `Point` class, which has
`x` and `y` coordinate members.  Then you have a `ColoredPoint` class that
subclasses `Point` and overrides `equals` to make it so that `ColoredPoint`s
aren't equal to `Point`s.

Here's the definition of `Point`:

    :::scala
    class Point(val x: Int, val y: Int) {
        override def equals(other: Any) = other match {
            case that: Point => this.x == that.x && this.y == that.y
            case _ => false
        }
    }

And the naive implementation of `ColoredPoint`:

    :::scala
    class ColoredPoint(x: Int, y: Int, val color: Color.Value) 
        extends Point(x, y) {

        override def equals(other: Any) = other match {
            case that: ColoredPoint => 
                this.color == that.color && super.equals(that)
            case _ => false
        }
    }

where `Color` is:

    :::scala
    object Color extends Enumeration {
        val Red, Orange, Yellow, Green, Blue, Indigo, Violet = Value
    }


The problem with this is that `equals` is not symmetric. It is possible for a
`Point` to be equal to a `ColoredPoint`, but the `ColoredPoint` wouldn't be equal to
the `Point`.

This is a little better, but still not transitive:

    :::scala
    class ColoredPoint(x: Int, y: Int, val color: Color.Value) 
        extends Point(x, y) {

        override def equals(other: Any) = other match {
            case that: ColoredPoint =>
                (this.color == that.color) && super.equals(that)
            case that: Point => that equals this
            case _ => false
        }
    }

To see how this doesn't work, consider a red ColoredPoint with x and y
coordinates of 1,2 and a blue ColoredPoint with the same coordinates.  The
red ColoredPoint is equal to a `Point(1, 2)` and the `Point(1, 2)` is equal to
the blue ColoredPoint, but the red and blue ColoredPoint are not equal to each
other.

The solution proposed in the chapter is to introduce a new method, `canEqual`:

    :::scala
    def canEqual(other: Any): Boolean

`Point` would then be defined as such (including `hashCode`):

    :::scala
    class Point(val x: Int, val y: Int) {

        override def hashCode = 41 * (41 + x) + y
        override def equals(other: Any) = other match {
            case that: Point =>
                (that canEqual this) && 
                (this.x == that.x) && (this.y == that.y)
            case _ => false
        }

        def canEqual(other: Any): Boolean = other.isInstanceOf[Point]
    }

And `ColoredPoint` is defined like so

    :::scala
    class ColoredPoint(x: Int, y: Int, val color: Color.Value) extends Point(x, y) {

        override def hashCode = 41 * super.hashCode + color.hashCode
        override def equals(other: Any) = other match {
            case that: ColoredPoint =>
                (that canEqual this) && super.equals(that) && this.color == that.color
            case _ => false
        }

        override def canEqual(other: Any): Boolean = other.isInstanceOf[ColoredPoint]
    }

Now `Point` instances cannot be equal to `ColoredPoint` instances since the
first check that `Point.equals` will make is to call
`ColoredPoint.canEqual(Point)` which will return false.  **It's vitally
important that the `canEqual` method be call on `that` with `this` as the
argument**.  `canEqual` is a way for classes to define what they can be equal
to.  In `Point` and `ColoredPoint` the match expression has been used to make
sure that `that` is the right type, so now we can call `canEqual` on `that` to
make sure that equality is possible in the reverse direction: that `that
canEqual this`.


#### Does `canEqual` violate the Liskov Substitution Principle?

One criticism of the `canEqual` approach is that it violates the [Liskov
Substitution Principle](http://en.wikipedia.org/wiki/Liskov_substitution_principle) which, according to Wikipedia, states:

> if S is a subtype of T, then objects of type T may be replaced with objects of
> type S (i.e., objects of type S may substitute objects of type T) without
> altering any of the desirable properties of that program (correctness, task
> performed, etc.)

The authors of the book make the argument that Liskov Substitution Principle is
not violated because, although the behavior of subclasses is different than the
parent class, the contract itself, that `equals` return a boolean value, is not
changed.

My intuition though is that this is a violation.  From the perspective of the
`Point` class, any two `Point` instances at the same x and y coordinates are
equal. A subclass changing that definition has violated the contract in a way
that makes a subclass not substitutable with a parent class.  Let's look at an
example of where substitution is violated.

Consider a `distance` method in `Point` that calculates the distance between two
`Point`s.

    :::scala
    def distance(point:Point):Double =
        if (this == point)
            0
        else
            Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2))

This method is taking a shortcut: if the two points are equal, then just return 0.
This shortcut won't work if applied to a `ColoredPoint` even though it could be
if `ColoredPoint` hadn't overridden the `equals` method. To me this is an
example of a case where substitutability is violated because this method is
expecting that it *can* take this shortcut for any `Point` instance.

#### `canEqual` is a code smell

In general I think that `canEqual` is a code smell.  When you look at just the
problem of defining `equals` it might seem reasonable to introduce `canEqual`.
But think about the impact on other methods. For example, consider if we had
extended `Point` with a new `3DPoint` class.  Then we would have to completely
change the `distance` method. So not only can `3DPoint` instances not equal
`Point` instances, but we can't calculate the distance between `3DPoint`s and
`Point`s. This is clearly a *Liskov Substitution Principle* violation.

So if you are thinking of using `canEqual` because you want subclasses to not be
equal to parent classes, it seems likely to me that if your subclasses can't
equal the parent class then that probably affects other methods too.

As an alternative, consider using composition instead of inheritance. For
example, we could define the ColoredPoint like so:

    :::scala
    class ColoredPoint2(x: Int, y: Int, val color: Color.Value) {

        val point = new Point(x, y)

        override def hashCode = 41 * point.hashCode + color.hashCode
        override def equals(other: Any) = other match {
            case that: ColoredPoint2 =>
                point.equals(that.point) && this.color == that.color
            case _ => false
        }
    }


**Additional Resources**

* [How to Write an Equality Method in Java](http://www.artima.com/lejava/articles/equality.html)
* [Code examples from chapter 30](http://booksites.artima.com/programming_in_scala_2ed/examples/html/ch30.html)
