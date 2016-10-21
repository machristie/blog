
# Serializable

Always add a serialVersionUID.

As long as changes to the class are compatible, you don't really need to do
anything else. Adding fields is a compatible change and usually deleting fields
is a compatible change unless you need to work about older versions of the class
reading the serialized version. For more details, [see the serialization
spec](http://docs.oracle.com/javase/6/docs/platform/serialization/spec/version.html).
