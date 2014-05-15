
<!--

# Scala: Extractors

-->

I'm currently working through the book [Programming in Scala, 2nd
ed.](http://www.artima.com/shop/programming_in_scala_2ed).  I'm in chapter 26
which is on *Extractors*.

#### What are Extractors?

Earlier in the book case classes were introduced.  One of the things you can do
with case classes is use them in pattern matching expressions. For example, you
might have an `Email` case class to describe an email address:

    :::scala
    case class Email(username:String, domain:String)

    def isEmail(e: Any):Boolean = e match {
        case Email(_,_) => true
        case _ => false
    }

But what if you are dealing with values that aren't case classes?  Extractors
allow you to basically define arbitrary match expressions without needing to set
up case classes.

To understand extractors I find it helpful to understand their inverse,
*injections*, first.  Injections take inputs and produce an output of some type,
not unlike a case class constructor.  Injections have an `apply` method.  So
instead of our `Email` case class above, we could define a somewhat similar
injection like so:

    :::scala
    object Email {
        def apply(username: String, domain: String) = user + "@" + domain
    }

(This is basically the example given in the book.)

An *extractor* on the other hand works in the reverse direction.  In this case
it defines an `unapply` method that would take a candidate string and, if it is
an email address, will return the parts which would correspond to the arguments
to the `apply` method:

    :::scala
    object Email {
        def apply(username: String, domain: String) = user + "@" + domain
        def unapply(s: String): Option[(String, String)] = {
            val parts = s aplit "@"
            if (parts.length == 2) Some(parts(0), parts(1)) else None
        }
    }

An *extractor* requires the `unapply` method, the `apply` method is optional.
Also note that the `unapply` method returns an `Option` and will return `None`
if the string is not an email address.

For more details see [Extractor Objects](http://docs.scala-lang.org/tutorials/tour/extractor-objects.html). For example, you can have an unapply method that returns a `Boolean`, and there is the `unapplySeq` method for handling variable number of arguments to an extractor.

#### When to use extractors vs case classes?

So extractors let you define match expression patterns in much the same way as
can be achieved with case classes. When do you use extractors instead of case
classes?

The advantage that extractors have over case classes is that case classes expose
the implementation type of an API's data model.  Using an extractor allows you
to hide the implementation type(s) of the API's data model and change it without
requiring client code to change as well.

For example, we can use our `Email` extractor with a non-case class email class
like so:


    :::scala
    class EmailImpl(val username:String, val domain:String) {

        override def toString: String = username + "@" + domain
    }

    object Email {

        def unapply(s: String): Option[(String, String)] = {
            val parts = s split "@"
            if (parts.length == 2) Some(parts(0), parts(1)) else None
        }
    }

Case classes do have advantages though. They are simpler, can be optimized
better by the Scala compiler and with `sealed` case class hierarchies the
compiler can also catch missed cases.

You can always start with case classes and then switch to extractors once there
is a need to change the data model's concrete representation type.

#### An example: Date

Extractors seem like a great way of working with unstructured data and APIs
where you don't have control over the source code. As an example consider the
following extractor for getting the individual time values out of a
`java.util.Date` instance:

    :::scala
    import java.util.{Calendar => JCal, Date => JDate}

    object Date {

        def unapply(d: JDate):Option[(Int,Int,Int,Int,Int,Int,Int)] = {
            val cal = JCal.getInstance
            cal.setTime(d)

            Some(cal get JCal.YEAR,
                cal get JCal.MONTH,
                cal get JCal.DAY_OF_MONTH,
                cal get JCal.HOUR_OF_DAY,
                cal get JCal.MINUTE,
                cal get JCal.SECOND,
                cal get JCal.MILLISECOND)
        }
    }

This allows you write match expression against `java.util.Date` instances, like
so:

    :::scala
    def isFebruary(d: JDate): Boolean = d match {
        case Date(_, 1, _, _, _, _, _) => true
        case _ => false
    }

You can also just use them to unpack values:

    :::scala
    val Date(year, month, day, hour, minutes, seconds, milliseconds) = new JDate

Now you have a much simpler way to work with Java date instances.


#### Final thoughts

Extractors are kind of hard to think about because you have to think in terms of
turning output backwards into inputs. Also, it's not always obvious what would
be useful for `unapply` to return.  When working through the examples and making
up some of my own I found it useful to think of how I would implement the
*injection* (i.e., the `apply` method) first.
