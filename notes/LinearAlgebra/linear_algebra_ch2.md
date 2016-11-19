Notes on [Linear Algebra](http://joshua.smcvt.edu/linearalgebra/)

# Chapter 2: Vector Spaces

## Definition of Vector Spaces

### Definition and Examples

A vector space consists of a set V of vectors with two operations, + and . and
satisfies 10 conditions.

*closure condition* - when we say that set V is closed under vector addition we
mean it is defined for all pairs of vectors and the result is also in V.
Likewise for scalar multiplication.

The subset of R^3 that is a plane through the origin is also a vector space
because it is closed over the + and . operations

    P = { ( x y z ) | x + y + z = 0 }

P inherits the + and . operations from R^3.

A subset of a vector space that isn't a vector space is the set of all two tall
columns with integer entries, because it isn't closed under scalar
multiplication.

The singleton zero vector set is a vector space, the *trivial* space.

Vector spaces need not only be columns or row vectors.  For example, the set of
degree 3 or less polynomials.

    P_3 = { a_0 + a_1*x + a_2*x^2 + a_3*x^3 | a_0, .., a_3 in R }

We can think of this as *the same as* R^4.

Another example, M_2x2 set of 2x2 matrices is a vector space.

The set of solutions of a homogeneous linear system in n variables is a vector
space under the operations inherited from R^n.

When it comes to checking if a set of vectors and operations forms a vector
space, technically you need to check all 10 conditions. However, in practice,
you typically only need to check the two closure conditions. One simple check is
to make sure that the set contains the zero vector which it must to be closed
under scalar multiplication (multiply by zero).

### Subspaces and Spanning Sets

A *subspace* is a subset of a vector space that is itself a vector space.

Any vector space has a trivial subspace, `{0}`. Any vector space has itself as a
subspace. These two are the improper subspaces, all others are proper.

Subspaces must themselves be closed. R^+ is not a subspace of R^1.

A subset of a vector space is a subspace if and only if it is closed under
linear combination. Here, a subspace only needs to demonstrate closure, and
linear combination combines scalar multiplication and addition.

We can show that a subset of a vector space is a subspace by showing that it is
closed under linear combinations of pairs of vectors. Linear combinations of
linear combinations and are closed.

The *span* (or *linear closure*) of a non-empty subset S of a vector space is
the set of all linear combinations of vectors from S.

    [S] = { c_1*s_1 + ... + c_n*s_n | c_i in R, s_i in S }

In a vector space, the span of any subset is a subspace. Also, a subset of a
vector space is a subspace if and only if it is a span.

**Example (Exercise 2.26a)**

Parameterize and express the following subspace as a span.

    { (a b c) | a - c = 0 }

Parameterized representation:

    { c(1 0 1) + b(0 1 0) | b, c in R }

So this subspace is spanned by `(1 0 1)` and `(0 1 0)`

## Linear Independence

### Definitions and Examples

A multiset subset of a vector space is *linearly independent* if none of its
elements is a linear combination of the others. Otherwise it is *linearly
dependent*.

**1.5 Lemma** A subset S of a vector space is linearly independent if and only
if among its elements the only linear relationship satisfying

    c_1*s_1 + ... + c_n*s_n = 0 (with s_i != s_j for all i != j)

is the trivial one:

    c_1 = 0, ..., c_n = 0

Any subset of V containing the 0 vector is linearly dependent.

A spanning set is minimal if and only if it is linearly independent.

**Example (Exercise 1.20a)**

Decide whether this subset of R^3 is linearly dependent or linearly independent.

    { (1 -3 5), (2 2 4), (4 -4 14) } (column vectors in the original)

So we want to see if there is a solution to the following other than the trivial
one:

    c_1*(1 -3 5) + c_2*(2 2 4) + c_3(4 -4 14) = (0 0 0)

We can rewrite this as a homogeneous set of linear equations and check if any of
the rows is a linear combination of the other rows.

    ( 1   2   4 )   3*row_1 + row_2   ( 1   2   4 )
    (-3   2  -4 )         ->          ( 0   8   8 )
    ( 5   4  14 )   -5*row_1 + row_3  ( 0  -6  -6 )

But clearly the third row is a scalar multiple of the second, so this subset of
R^3 is **linearly dependent**.

## Basis and dimension

### Basis

A *basis* for a vector space is a *sequence* of vectors that is linearly
independent and spans the space.

For any R^n

    E_n = < (1 0 ... 0), (0 1 ... 0), ..., (0 0 ... 1) >

is the *standard* basis or *natural* basis. These vectors are e_1, ..., e_n.

Can use parameterization to find the basis.

The *representation* of a vector v with respect to a basis B is a column vector
of the coefficients used to express v as a linear combination of basis vectors.
*Note*: this is why a basis is a sequence, so the representation has an order
and isn't arbitrary.

To show that a sequence of vectors is a basis for a vector space you need to show
1. they are linearly independent, and
2. they span the space

Another way to say this is that the sequence of vectors is a basis if and only
if each vector in the space can be expressed as a linear combination of the
candidate basis vectors in one and only one way.

**Example (Exercise 1.19c)**

Decide if this is a basis for R^3

    < (0 2 -1), (1 1 1), (2 5 0) >

Solve for

    c_1*(0 2 -1) + c_2*(1 1 1) + c_3*(2 5 0) = (x y z)

and see if the values for c_i are unique for each vector in R^3. Solving in this
way yields

    c_1 = -5x + 2y + 3z
    c_2 = -5x + 2y + 4z
    c_3 =  3x -  y - 2z

So for each `(x y z)` in R^3 there is an unique linear combination of these
vectors so they do form a basis for R^3.


### Dimension

A vector space is finite-dimensional if its basis has only finitely many
vectors.

Any two bases for a space have the same number of elements.

**Exchange Lemma** `B = < Beta_1, ..., Beta_n >` is a basis for a space and
`v = c_1*Beta_1 + ... + c_n*Beta_n` where c_i != 0. Then exchanging exchanging
Beta_i for v yields a new basis for the same space.

The *dimension* of a vector space is the number of vectors in any of its bases.

No linearly independent set can have a size greater than the dimension of the
enclosing space.

Any spanning set can be shrunk to a basis.

In an n-dimensional space, a set of n vectors is linearly independent if and
only if it spans the space.

**Example (Exercise 2.21)**

Find the dimension of this subspace of R^2.

    S = { (a+b  a+c) | a, b, c in R }

      = { a (1 1) + b (1 0) + c (0 1) | a, b, c in R }

To know if (1 1), (1 0), and (0 1) form a basis we need to check if they are
linearly independent or not.

    c_1 (1 1) + c_2 (1 0) + c_3 (0 1) = (0 0)

    c_1 + c_2 = 0
    c_1 + c_3 = 0

    c_1 = -c_2 = -c_3

Since there are values of c_i that satisfy the equations other than c_i = 0,
these vectors aren't linearly independent.

We can shrink a spanning set to form a basis. Let's drop the first vector
leaving us with (1 0) and (0 1). Now we can check if these vectors are linearly
independent like we did above for all three. This is a trivial check and also we
can recognize these as the standard basis of R^2, so these are linearly
independent.  So the basis of this subspace is

    < (1 0), (0 1) >

And the dimension is 2.

### Vector Spaces and Linear Systems

*row space* - span of the set of a matrix's rows

*row rank* - the dimesion of this row space

Row equivalent matrices have the same row space and row rank.

The non-zero rows of an echelon form matrix make up a linearly independent set.

Gauss's method reduces the number of rows in a matrix without changing its row
space, thus producing a basis (linearly independent) for the row space.

*Column space* and *column rank* are defined similarly. Example: right hand side
of a system of linear equations is equal to a linear combination of left hand
side column vectors if there is a solution.

Row operations do not change the column rank.

For any matrix, the row rank and the column rank are equal. The rank is equal to
the number of leading entries in reduced echelon form.  The row basis is the
non-zero rows in reduced echelon form. The column basis is the columns of the
leading entries, which are some of the standard basis vectors of the enclosing
space.

For a linear system with n unknowns and coefficient matrix A, the statements

1. the rank of A is `r`, and
2. vector space of solutions of associated homogeneous system has dimension `n - r`

are equivalent.

**Example (Exercise 3.23c)**

Find a basis for the span of this set.

    {1+x, 1-x2, 3+2x-x2} subset of P_3

P_3 is the set of all polynomials including powers of x up to x^3.

What we'll do is convert this into a matrix representation and then reduce it to
echelon form.

    ( 1   1   0   0 )   -row_1 + row_2    ( 1   1   0   0 )
    ( 1   0  -1   0 )         ->          ( 0  -1  -1   0 )
    ( 3   2  -1   0 )   -3*row_1 + row_3  ( 0  -1  -1   0 )

We can eliminate the third row by subtracting the second row from it. This
leaves the following linearly independent set which is our basis.

    B = <1 + x, -x - x^2>
