
# TODO

1. Read up on BDD. Martin Fowler makes an interesting distinction between state
   and behavior verification, with behavior verification being something
   popularized by BDD. Maybe understanding BDD better would help me understand
   the proper roll of Mocks.

# Testing with Mocks

## Bad idea?


* http://blog.metaobject.com/2014/05/why-i-don-mock.html
* http://martinfowler.com/articles/mocksArentStubs.html#ClassicalAndMockistTesting
    * Types of test verification
        * state verification
        * behavior verification
        * (third type?) result verification (pure functional style)

## Problems with mocking


* couples test to the implementation
* so it is hard to refactor either the code or the tests
* doesn't encourage breaking dependencies
* possible to have a mock test that doesn't test anything really


## Alternatives


* Isolate core logic, no dependencies, into separate class and test that
    * Use functional/integration testing for the classes with dependencies and what not, but keep these glue classes thin

## When is mocking good?


* third party api, no control over
* simulating exceptions?
* state/result verification is hard/impossible and verifying behavior is about the only option
* dealing with external dependencies like filesystem or databases

## Advantages to using Mocks?

* better test isolation.  If there is a bug in a class, only the test for that class fails, but with classic style several tests may fail.

## Good practices when using Mocks

* When using Mocks in a test class, mock expectations should be factored out
  into their own method so that the mock dependency is called once in the test
  class. This makes it easier to refactor code later on since you would
  theoretically only have to update the dependency mock call once.

## Links
* https://www.reddit.com/r/programming/comments/6abbb7/stop_overusing_interfaces/dhdizfl/
