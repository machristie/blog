
<!--
Title: Disjunctive Normal Form: Figuring out what part of a WHERE claused matched
-->


At work we have a way for *filters* to be defined by users and for these filters
to trigger other actions (at a very high level, the details aren't so important
for the purpose of this blog post).  These *filters* translate to SQL WHERE
clauses.  I'm currently working on a project to figure out, when a *filter*
matches, what was it in the filter that actually matched.

The problem is this. You can have a filter with arbitrary boolean logic in it.
To take a very simple example, consider the following filter as WHERE clause:

    :::sql
    WHERE
        COLUMN1 = 1
        AND (COLUMN2 = 3 OR COLUMN3 = "foo")

When you have a match, you might wonder: *Was it COLUMN1 and COLUMN2 that caused
the match, or was it COLUMN1 and COLUMN3?* (or maybe all three matched the
conditions).

So we can break this down into two problems.

1. What are all the possible sets of conditions that could satisfy the filter?
2. Which of these sets of conditions are matched?

For the first problem, we can transform the filter expression into [Disjunctive
Normal Form](http://en.wikipedia.org/wiki/Disjunctive_normal_form) (DNF).
Disjunctive Normal Form is an OR-ing of ANDs, where negation is pushed down to
the "leaves" of the boolean expression tree (in other words, negation applies
only to literals).

Our example above rewritten in DNF becomes:

    :::sql
    WHERE
        (COLUMN1 = 1 AND COLUMN2 = 3)
        OR
        (COLUMN1 = 1 AND COLUMN3 = "foo")

For the second part of the problem, I can split apart this filter and apply each
part separately. If `(COLUMN1 = 1 AND COLUMN2 = 3)` matches, then I know that
those conditions are true for that match. Likewise for `(COLUMN1 = 1 and COLUMN3
= "foo")`. Now I know what conditions were actually matched for a given match.

# How to get to Disjunctive Normal Form?

Based on what I've been reading, there are two main ways to convert a boolean
expression to DNF.

1. Algebraic - Use the laws of Boolean Algebra, like De Morgan's law, to rewrite
   the boolean expression into DNF.
2. Algorithmic - Generate a truth table, or use an algorithm like
   [Quine-McCluskey](http://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm).

## Algebraic approach

The approach is pretty simple and is a two step process:

1. Convert first to [Negation Normal Form](http://en.wikipedia.org/wiki/Negation_normal_form). This uses double negation elimination and [De Morgan's Laws](http://en.wikipedia.org/wiki/De_Morgan%27s_laws) to push negation down to the leaves of the boolean expression tree.
2. Pull the ORs to the top of the expression tree using the [Distributive Law](http://en.wikipedia.org/wiki/Distributive_property).

(Credit for this approach goes to [this StackExchange answer](http://math.stackexchange.com/a/105638).)

## Algorithmic approach

I'll give an example of this approach using a truth table.  Let's stick with the
current example:

| COLUMN1 = 1 | COLUMN2 = 3 | COLUMN3 = "foo" | COLUMN1 = 1 AND (COLUMN2 = 3 OR COLUMN3 = "foo") |
|-------------|-------------|-----------------|--------------------------------------------------|
| T | T | T | T |
| T | T | F | T |
| T | F | T | T |
| T | F | F | F |
| F | T | T | F |
| F | T | F | F |
| F | F | T | F |
| F | F | F | F |

You can see that the first three rows of this table evalute to true, so we can
convert each row to a clause in our DNF:

    :::sql
    WHERE
        (COLUMN1 = 1 AND COLUMN2 = 3 AND COLUMN3 = "foo")
        OR
        (COLUMN1 = 1 AND COLUMN2 = 3 AND COLUMN3 != "foo")
        OR
        (COLUMN1 = 1 AND COLUMN2 != 3 AND COLUMN3 = "foo")

As you can see, this naive approach results in a rather large DNF, and this is a
very simple example.  To reduce this DNF to a simpler equivalent expression, you
can use something like the Quine-McCluskey algorithm.

# Which approach to take?

I think in general the algebraic approach is preferred if you have a boolean
expession tree already for your boolean function.  You can fairly simply rewrite
this tree into DNF. This is the case with these SQL filters I'm working with.

If however the inputs to your boolean function are well defined (whether they
are true or false) but you don't know the implementation details of your boolean
function, then an algorithmic approach is going to be more appropriate.

For me, I'm going with the algebraic approach. I have the boolean expression
tree for these filters I'm working with, but the "inputs" to the filter aren't
so easy to get at without a lot of work. By that I mean that our system
generally doesn't know that a row in a table has COLUMN1 = 1, etc., and rather
the filter is just evaluated directly against a table.  It would take a fair bit
of work to translate criteria like `COLUMN1 = 1` into boolean inputs, and to
represent the criteria as boolean literals in the filter expression.


