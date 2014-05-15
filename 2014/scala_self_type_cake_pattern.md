
<!--

# Scala: Understanding the self type annotation and how it relates to the Cake Pattern

-->

I'm currently working through the book [Programming in Scala, 2nd
ed.](http://www.artima.com/shop/programming_in_scala_2ed).  I'm in chapter 29
which is on *Modular Programming Using Objects*. What is covered in the chapter
has also been referred to as the Cake Pattern.  The chapter takes the approach
of building up to the Cake Pattern through an example that helps illustrate the
kind of problems that the Cake Pattern solves. To understand the Cake Pattern
you have to understand how the *self type* annotation works. So I'm going to
take a slightly different approach and start with how the *self type* annotation
works since it is so crucial.

#### What is the *self type* annotation?

In brief, the *self type* annotation allows you to split a trait in two but still refer to
things on the second trait as though they are defined in the first trait,
basically assuming (well, requiring) that they are mixed in together.  For
example, the following trait simply prints a greeting at a prompt:

    :::scala
    trait Prompter1 {

        val prompt = "> "
        val greeting = "Hello world"

        def printGreeting() {
            println(prompt + greeting)
        }
    }

    val prompter1 = new Object with Prompter1
    prompter1.printGreeting

Now suppose you want to split out the `greeting` part, maybe so that you can
provide greetings for different languages. You could do this:

    :::scala
    trait Prompter2 {
        // the self type annotation
        this: GreetingProvider =>

        val prompt = "> "

        def printGreeting() {
            println(prompt + greeting)
            // Next line would work too. 'this' can refer to things within this trait or
            // the declared self type trait
            //println(this.prompt + this.greeting)
        }
    }

    trait GreetingProvider {

        val greeting = "Hello world"
    }

    val prompter2 = new Prompter2 with GreetingProvider
    prompter2.printGreeting

The code in Prompter2 is exactly the same as in Prompter1 except that there is
now a *self type* annotation which says that `this` can also refer to
`GreetingProvider`. Also the `greeting` has moved to a separate trait,
`GreetingProvider`.

Do you need the *self type* annotation if you take care to always mix in the
two traits together?  No, because `Prompter2` won't even compile and you get
this error:

    <console>:37: error: not found: value greeting
                    println(prompt + greeting)

What happens if you tried to create a new Object and only mixed in Prompter2?

    scala> new Object with Prompter2
    new Object with Prompter2
    <console>:19: error: illegal inheritance;
    self-type Prompter2 does not conform to Prompter2's selftype Prompter2 with GreetingProvider
                new Object with Prompter2
                                ^

Does order matter?  It doesn't appear to. The following works just fine:

    :::scala
    val prompter2backwards = new GreetingProvider with Prompter2
    prompter2backwards.printGreeting


If you have a *self type* annotation, does `this` **only** refer to that type?
Apparently not.  We could just as well have defined `Prompter2.printGreeting`
like so:

    :::scala
    def printGreeting() {
        // 'this' can refer to things within this trait or the declared self type trait
        println(this.prompt + this.greeting)
    }

So the *self type* annotation appears to extend what `this` can refer to.

You can also have multiple traits mixed in for your *self type* annotation:

    :::scala
    this: Foo with Bar with Baz =>

So what does this have to do with the *Cake Pattern*? We'll get there but for
now hopefully you can see that the *self type* annotation allows you to express
a dependency within a trait, a dependency that when satisfied allows one trait
to make use of code defined in a separate trait.  The *Cake Pattern* is a
*Dependency Injection* technique that uses *self type* annotations to express
and ultimately fulfill the dependencies between traits.


#### Applying the *Cake Pattern* to the examples in chapter 29

Chapter 29 doesn't mention the *Cake Pattern* and doesn't really apply it. It
goes as far as introducing the *self type* annotation and showing how you can
use to refactor a large trait and split it up into several smaller traits.

The chapter presents a `Database` class that abstracts getting `Food` and
`Recipe` instances from some sort of backing store.  The `Database` is then
split up into three traits: one for `FoodCategory` methods, one for `Food`
methods and one for `Recipe` methods.  It's not all spelled out in the chapter
but you would end up with something that looks like the following:

    :::scala
    abstract class Food(val name: String) {
        override def toString = name
    }

    object Apple extends Food("Apple")
    object Orange extends Food("Orange")
    object Cream extends Food("Cream")
    object Sugar extends Food("Sugar")

    class Recipe(
        val name: String,
        val ingredients: List[Food],
        val instructions: String
    ) {
        override def toString = name
    }

    trait FoodCategories {
        case class FoodCategory(name: String, foods: List[Food])
        def allCategories: List[FoodCategory]
    }

    trait Foods {
        def allFoods: List[Food]
        def foodNamed(name: String) =
            allFoods.find(f => f.name == name)
    }

    trait Recipes {
        def allRecipes: List[Recipe]
    }

    abstract class Database extends FoodCategories with Foods with Recipes {
    }

The book then proceeds to implement `Foods` and `Recipes` like so:

    :::scala
    trait SimpleFoods extends Foods {
        object Pear extends Food("Pear")
        def allFoods = List(Apple, Pear)
        def allCategories = Nil
    }


    trait SimpleRecipes extends Recipes { // Does not compile
        object FruitSalad extends Recipe(
            "fruit salad",
            List(Apple, Pear),  // Uh oh
            "Mix it all together."
            )
        def allRecipes = List(FruitSalad)
    }

The problem is that `SimpleRecipes` has a dependency on `SimpleFoods`. As such
`Pear` is no longer in scope. *Self type* annotation to the rescue!

    :::scala
    trait SimpleRecipes extends Recipes {
        this: SimpleFoods =>

        object FruitSalad extends Recipe(
            "fruit salad",
            List(Apple, Pear),
            "Mix it all together."
            )
        def allRecipes = List(FruitSalad)
    }

This all works well enough for such a short example, but in the real world, when
you have a database abstraction that has hundreds (or thousands?) of methods for
retrieving objects from the database, would this suffice?  Because the problem
becomes that you will end up mixing all of those methods into the local
namespace of your `Database` class.  For example, instead of having a
`Foods.getAll` method even this simple example compels us to having the method
called `Foods.allFoods`.

This is where the *Cake Pattern* comes in.  With the *Cake Pattern* you wrap
your trait in a "component" trait. For example, the `FoodCategories` trait gets
wrapped like so:

    :::scala
    trait FoodCategoriesComponent {
        val foodCategories: FoodCategories
        trait FoodCategories {
            case class FoodCategory(name: String, foods: List[Food])
            def allCategories: List[FoodCategory]
        }
    }

Likewise for `Foods` and `Recipes`:

    :::scala
    trait FoodsComponent {
        val foods: Foods
        trait Foods {
            def allFoods: List[Food]
            def foodNamed(name: String) =
            allFoods.find(f => f.name == name)
        }
    }

    trait RecipesComponent {
        val recipes: Recipes
        trait Recipes {
            def allRecipes: List[Recipe]
        }
    }

Now I'll create a `SimpleFoodsComponent` that implements `Foods` and
`FoodCategories` (the book implements them together too):

    :::scala
    // Implement Foods and FoodCategories at once
    trait SimpleFoodsComponent extends FoodsComponent with FoodCategoriesComponent {

        val foods = new Object with SimpleFoods
        val foodCategories = foods
        trait SimpleFoods extends Foods with FoodCategories {
            object Pear extends Food("Pear")
            def allFoods = List(Apple, Pear)
            def allCategories = Nil
        }
    }

And now time for the `SimpleRecipesComponent`.  This one will depend on
`SimpleFoodsComponent`:

    :::scala
    trait SimpleRecipesComponent extends RecipesComponent {
        this: SimpleFoodsComponent =>

        val recipes = new Object with SimpleRecipes
        trait SimpleRecipes extends Recipes {
            object FruitSalad extends Recipe(
                "fruit salad",
                List(Apple, foods.Pear),
                "Mix it all together."
            )
            def allRecipes = List(FruitSalad)
        }
    }

But this time the *self type* annotation brings `foods` into scope. So instead
of bringing the `Foods` methods into scope we're just bringing the `foods`
reference (which implements `Foods`) into scope.  I like this since it keeps
type members in separate namespaces.


Does it make sense to have a `Database` abstraction any longer?  I'm not sure,
but, for completeness, here's how I implemented it.

    :::scala
    trait DatabaseComponent extends FoodCategoriesComponent
            with FoodsComponent with RecipesComponent {
        val database: Database

        trait Database extends FoodCategories with Foods with Recipes
    }

    trait SimpleDatabaseComponent extends DatabaseComponent
            with SimpleFoodsComponent with SimpleRecipesComponent {

        val database = new Database with SimpleFoods with SimpleRecipes
    }

I haven't yet talked about the other main piece of the chapter's example, the
`Browser`.  As a component it would be defined like so:

    :::scala
    trait BrowserComponent {
        this: DatabaseComponent =>

        val browser: Browser

        trait Browser {
            def recipesUsing(food: Food)
            def displayCategory(category: database.FoodCategory)
        }
    }

And then it could be implemented with a dependency on the
`SimpleDatabaseComponent`:

    :::scala
    trait SimpleBrowserComponent extends BrowserComponent {
        this: SimpleDatabaseComponent =>

        val browser = new Object with SimpleBrowser
        trait SimpleBrowser extends Browser {

            def recipesUsing(food: Food) =
                database.allRecipes.filter(recipe =>
                    recipe.ingredients.contains(food))

            def displayCategory(category: database.FoodCategory) {
                println(category)
            }
        }
    }

If the `Browser` is the top level component then you could define it more
simply, kind of like how the book does it.


For more information:

* <http://jonasboner.com/2008/10/06/real-world-scala-dependency-injection-di/>
    * Explains the cake pattern along with alternative approaches, very nice.
* <http://www.cakesolutions.net/teamblogs/2011/12/19/cake-pattern-in-depth/>
    * A more real world example of the cake pattern
