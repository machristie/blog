
<!--

# Scala: Encoded Polyline, an Example in Implementing a Custom Collection Type

-->

This week I'm in chapter 25 of [Programming in Scala, 2nd ed.](http://www.artima.com/shop/programming_in_scala_2ed), the chapter titled *The Architecture of Scala Collections*.

As an exercise, I decided I'd implement a custom collection for encoded
latitude/longitude points using Google's encoding method [described
here](https://developers.google.com/maps/documentation/utilities/polylinealgorithm?csw=1)
if you're interested. I've written some encoding/decoding code for this format
for the [FuelMyRoute Android
app](https://play.google.com/store/apps/details?id=com.fuelmyroute.android.app)
I've been working on, so I'm fairly familiar with it.  The example the authors
implement in the book is a RNA collection where the bases are stored as bits in
an `Array` of `Ints`. In trying to come up with a different data structure to
implement I likewise thought of one where the data is stored in a different and
more compact format.

So I started by creating a case class to represent a latitude/longitude point,
`LatLng`:

    :::scala
    case class LatLng(lat:Double, lng:Double)

Then I created a `Polyline` class that extends `LinearSeq`:

    :::scala
    class Polyline private (val encoding: String, val initLatLng:LatLng)
      extends LinearSeq[LatLng] {
      ...
    }

Why a `LinearSeq`?  Well, the polyline encoding format works like this. You
encode the value of the first latitude and longitude point as a character
string. For the second point, you encode the *difference* from the first point.
For the third point, you encode the difference from the second point, and so on.
So there is no efficient random access possible.  Getting the first point
(`head`) is fine, but in general getting a point at some index will take time
proportional to the length of polyline.  This all strongly suggests LinearSeq as
the right abstraction for an encoded polyline.  Scala's `List` has the same
performance characteristics, for example, and is also a `LinearSeq`.

There are two abstract methods that must be implemented by subclasses of
`LinearSeq`: `apply` and `length`. Unfortunately, again, these will take time
proportional to the length of the polyline. I'm implementing them here based on
the iterator:

    :::scala
    def apply(idx: Int): LatLng = {
        val it = iterator
        var i = 0
        while (it.hasNext && i <= idx) {

            val latlng = it.next
            if (idx == i)
                return latlng
            else
                i += 1
        }
        throw new IndexOutOfBoundsException("No LatLng at index " + idx)
    }

    def length: Int = {
        val it = iterator
        var i = 0
        while (it.hasNext) {

            it.next
            i += 1
        }
        i
    }

But for a `LinearSeq`, what you want to do is provide efficient implementations
of `isEmpty`, `head` and `tail`. The private constructor for `Polyline` is given
the `encoding` as a `String`, as well as the initial values for latitude and
longitude, which are 0 for starting from an encoded polyline string.  So for
`isEmpty` we can simply check the length of the `encoding` string:

    :::scala
    override def isEmpty: Boolean = encoding.length == 0

`head` will lazily convert the first latitude/longitude point and return it.

    :::scala
    override def head(): LatLng = {

        if (isEmpty) {
            throw new NoSuchElementException("Collection is empty.")
        }

        computeFirstLatLng()
        firstLatLng.get
    }

`computeFirstLatLng` sets `firstLatLng`, which is of type `Option[LatLng]`.

The way `tail` will work is this: it will get the first latitude/longitude point
and the remainder of the encoded string and then create a new `Polyline`
instance from those values. Recall that when a `Polyline` is created it is given
an initial value for the first latitude/longitude point. We can pass the first
LatLng as the initial value to use for the `Polyline` that includes the
substring of the encoded polyline from the second point on.

    :::scala
    override def tail(): Polyline = {

        if (isEmpty) {
            throw new UnsupportedOperationException("Collection is empty.")
        }

        computeFirstLatLng()
        new Polyline(encoding.substring(index), firstLatLng.get)
    }

Where did `index` come from? That's a private `var` in class `Polyline` that
keeps track of the position within the `Polyline`. It really only ever points to
first point (index=0) or the second point, since traversing this Polyline will
consist of calling `head` then `tail` then `head` and so on until the returned
`tail` `isEmpty`. Here's how `index` is used and how `computeFirstLatLng` is
implemented:

    :::scala
    private def computeFirstLatLng() {

        if (firstLatLng.isEmpty && encoding.length > 0) {

            val lat = initLatLng.lat + getNextNumber
            val lng = initLatLng.lng + getNextNumber

            firstLatLng = Some(LatLng(lat, lng))
        }
    }

    private def getNextNumber():Double = {
        var b = 0
        var shift = 0
        var result = 0

        do {
            b = encoding.charAt(index) - 63
            index += 1
            result |= (b & 0x1f) << shift
            shift += 5
        } while (b >= 0x20)
        return (if ((result & 1) != 0) ~(result >> 1) else (result >> 1)) / 1e5
    }

Now to create a companion object that can construct a `Polyline` instance:

    :::scala
    object Polyline {

        def empty: Polyline = new Polyline("", LatLng(0,0))
        def fromEncoding(encoding:String) = new Polyline(encoding, LatLng(0,0))
        def fromSeq(latlngs:Seq[LatLng]):Polyline = {
            // TODO: implement encoding LatLngs into a polyline string
        }
    }

Now we can create and iterate over a `Polyline` instance:

    :::scala
    scala> val pl = Polyline.fromEncoding("_p~iF~ps|U_ulLnnqC_mqNvxq`@")
    pl: Polyline = (LatLng(38.5,-120.2), LatLng(40.7,-120.95), LatLng(43.252,-126.453))


#### Builders

This all works well enough, but what happens if you apply methods like `take` or
`filter`?

    :::scala
    scala> pl.take(2)
    res0: scala.collection.LinearSeq[LatLng] = List(LatLng(38.5,-120.2), LatLng(40.7,-120.95))

The type of the result is `List`, not `Polyline` as we would like. To have your
custom Collection type return results in the same type you need to provide a
`Builder` that can construct instances of your custom collection type.

What's a `Builder`?  A `Builder` can add elements to a particular kind of
collection type.  Also useful is that a `Builder` provides a `mapResult` method
that allows you to map from the output of one `Builder` to a different
collection type.  Here's a simplified interface:

    :::scala
    trait Builder[-Elem, +To] {

        def +=(elem: Elem): this.type
        def result(): To
        def clear()
        def mapResult(f: To => NewTo): Builder[Elem, NewTo]
    }

The power of `mapResult` is we can use an existing `Builder` to create a
collection of one type and then map it to the `Polyline` collection type.  In
our case we'll use `ArrayBuffer`.

So what do you need to do to supply a custom `Builder`?

1. Extend the "`Like`" trait and supply the result type of your custom collection
   as the second type parameter of the trait. Every Seq type has a corresponding
   "`Like`" type that contains all of the implementation. For example,
   `LinearSeq`'s Like type is `LinearSeqLike`.
2. Override `newBuilder` to return a `Builder` that can construct instances of
   your custom collection type.

For `Polyline` it would work like this:

    :::scala
    class Polyline private (val encoding: String, val initLatLng:LatLng)
        extends LinearSeq[LatLng] with LinearSeqLike[LatLng, Polyline] {

        override def newBuilder: Builder[LatLng, Polyline] =
            new ArrayBuffer[LatLng] mapResult Polyline.fromSeq
        ...
    }

Note: I'd need to actually implement `Polyline.fromSeq` for this to work. I ran
out of time, but hopefully you can see how the Builder would work and actually
implementing `fromSeq` is just a detail at this point.

#### CanBuildFrom

Overriding `newBuilder` isn't quite enough for our custom collection type to
always return the same collection type (at least when it is possible to return
the same collection type).  For example, the collection concatenation operator,
`++`, needs to be able to return a sequence where the element type of the
sequence is the most specific superclass of the right hand side and left hand
side collections.  It does this via an implicit parameter of type
`CanBuildFrom`.  The signature of `++` is:

    :::scala
    def  ++[B >: A, That](that: GenTraversableOnce[B])
        (implicit bf: CanBuildFrom[LinearSeq[A], B, That]): That

`CanBuildFrom` is a trait defined as such:

    :::scala
    trait CanBuildFrom[-From, -Elem, +To] {

        def apply(from: From): Builder[Elem, To]
        def apply(): Builder[Elem, To]
    }

So basically the Scala compiler will try to bind the most specific implicit
`CanBuildFrom` that it can match the types of the arguments.  `LinearSeq`
defines a very general `CanBuildFrom` that can be used for any types.  To have
`++` concatenate two `Polyline`s and return a `Polyline` instance we have to
define a specific `CanBuildFrom`, which can be done in the companion object:

    :::scala
    object Polyline {

        //...

        // We'll move the newBuilder method to the companion object and the
        // Polyline class will reference this one
        def newBuilder: Builder[LatLng, Polyline] =
            new ArrayBuffer[LatLng] mapResult Polyline.fromSeq

        def implicit def canBuildFrom[Polyline, LatLng, Polyline] =
            new CanBuildFrom[Polyline, LatLng, Polyline] {

                def apply(): Builder[LatLng, Polyline] = newBuilder
                def apply(from: Polyline): Builder[LatLng, Polyline] = newBuilder
            }
    }

Resources

* The polyline decoding code was largely inspired by <http://jeffreysambells.com/2010/05/27/decoding-polylines-from-google-maps-direction-api-with-java>
* Looks like most of chapter 25 of *Programming in Scala* is online: <http://docs.scala-lang.org/overviews/core/architecture-of-scala-collections.html>
