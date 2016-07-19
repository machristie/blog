Notes on [Linear Algebra](http://joshua.smcvt.edu/linearalgebra/)

# Chapter 1: Linear Systems

## Solving Linear Systems

### Gauss's Method

A *linear system* is a system of *linear equations*. Linear equations are of the
form

    a_1 * x_1 + a_2 * x_2 + ... + a_n * x_n = d

where `x_1`, etc. are the variables to solve for, the `a`s are coefficients and
`d` is the constant. A set of these equations forms a linear system.  A
solution, in the form of a set of values that `x_1`, etc. have, must satisfy all
of the equations.

Gauss's method involves three basic operations

1. row swap
2. row scale - that is, multiple the whole equation by a constant
3. row substitution - substitute a row with the sum of a scaled row and itself

Using these three operations, try to get the system of equations into *echelon
form* where the leading variable in each row is to the right of the leading
variable in the row above it.

A linear system can have one solution, no solutions or many solutions. If in the
process of reducing to *echelon form* an equation reduces to a contradiction
(e.g., `0 = 2`), then there is no solution.  If in echelon form each variable is
a leading variable in its row, then there is a unique solution.  If we reach
echelon form but some variables aren't leading variables, then there are many
solutions.

Example

    2x + 3y = 13 (row_1)
    x  -  y = -1 (row_2)

Apply row substitution

    -(1/2) row_1 + row_2 =>  2x + 3y = 13 (row_1)
                             -(5/2)y = -15/2 (row_2)

Solving for y and using back substitution yields a unique solution of

    x = 2
    y = 3


### Describing the solution set

In echelon form, non-leading variables are *free variables*. We can describe
solution sets with many solutions in terms of the free variables.

We can use *matrices* to simplify some of the bookkeeping when applying Gauss's
method.

    [ 1  0  1  |  4 ]
    [ 1 -1  2  |  5 ]
    [ 4 -1  5  |  17 ]

This is a 3 by 4 matrix since it has 3 rows and 4 columns.  This is a matrix
representation of the following linear system

    x_1 + x_3 = 4
    x_1 - x_2 + 2*x_3 = 5
    4*x_1 - x_2 + 5*x_3 = 17

We can describe solution sets with vectors, which are single column matrices.
The vector represents values for the x's in the equation.  The solution set may
be a linear combination of vectors, and some of the entries in the vectors may
be parameterized by the free variables.

Example

    [ 1  0  1  |  4 ]
    [ 1 -1  2  |  5 ]
    [ 4 -1  5  |  17 ]

Apply two row substitutions

    -1*row_1 + row_2 =>     [ 1  0  1  |  4 ]
    -4*row_1 + row_3        [ 0 -1  1  |  1 ]
                            [ 0 -1  1  |  1 ]

Notice that we have a redundant equation in row 3, so we'll eliminate that one

    -1*row_2 + row_3 =>     [ 1  0  1  |  4 ]
                            [ 0 -1  1  |  1 ]
                            [ 0  0  0  |  0 ]

So `x_3` is free. We'll describe the solution set now.

    (  4 )      ( -1 )          |
    ( -1 )  +   (  1 ) * x_3    |   x_3 element of all real numbers
    (  0 )      (  1 )          |

### General = Particular + Homogeneous

**3.1 Theorem** a linear system's solution set has the form

    { p_vec + c_1 * b_1 + ... + c_k * b_k | c_1, ..., c_k elements of all real numbers }

where `p_vec` is any particular solution and k is the number of free variables.
The proof of this requires a couple of lemmas.

A linear equation is homogeneous if it has a contact of 0. For example

    3x + 4y = 0

A Homogeneous system of linear equations must be consistent since it always has
at least one solution vector, the zero vector.

**3.6 Lemma** For any homogeneous linear system there exists `b_1`, ..., `b_k`
with solution set

    { c_1 * b_1 + ... + c_k * b_k | c_1, ..., c_k elements of all real numbers }

where k is the number of free variables for the system in echelon form.  That
is, if you reduce a Homogeneous system to echelon form with k free variables,
you can express the solution set as a linear combination of k vectors.

**3.7 Lemma** For a linear system and _any_ particular solution `p_vec`, the
solution set equals

    { p_vec + h_vec | h_vec satisfies the associated homogeneous system }

**3.10 Corollary** Solution sets of linear systems have 0, 1, or infinite
elements.

We can look at the number of solutions a linear system has in terms of how many
solutions there are for the homogeneous system and whether there is a particular
solution.

<table border="1">
    <tr>
        <td rowspan="2" colspan="2"></td>
        <td colspan="2">Solutions of homogeneous system</td>
    </tr>
    <tr>
        <td>1</td>
        <td>infinite</td>
    </tr>
    <tr>
        <td rowspan="2">Particular solution</td>
        <td>Yes</td>
        <td>unique solution</td>
        <td>infinitely many</td>
    </tr>
    <tr>
        <td>No</td>
        <td>No solution</td>
        <td>No solution</td>
    </tr>
</table>

A square matrix is *nonsingular* (non-weird) if it has a unique solution and
*singular* if it has infinitely many.

If a matrix is nonsingular, the system has a unique solution for any right hand
side constants.


Example: find the particular and homogeneous solution of the following.

    x_1 + x_3 = 4
    x_1 - x_2 + 2x_3 = 5
    4x_1 - x_2 + 5x_3 = 17

The homogeneous system is

    ( 1  0  1 )
    ( 1 -1  2 )
    ( 4 -1  5 )

    -1*row_1 + row_2    =>  ( 1  0  1 )
    -4*row_1 + row_3        ( 0 -1  1 )
                            ( 0 -1  1 )

    -1*row_2 + row_3    =>  ( 1  0  1 )
                            ( 0 -1  1 )
                            ( 0  0  0 )

So `x_3` is a free variable and the homogeneous solution is

    {   (  -1 )     |                                   }
    {   (   1 ) x_3 |   x_3 element of all real numbers }
    {   (   1 )     |                                   }

To find a particular solution, use algebra to solve for `x_1` and `x_2`. This yields

    x_1 = 4 - x_3
    x_2 = -1 + x_3

So one particular solution, when `x_3 = 0`, is

    (   4   )
    (  -1   )
    (   0   )

This yields a final solution of

    {   (   4   )       (  -1 )     |                                   }
    {   (  -1   )   +   (   1 ) x_3 |   x_3 element of all real numbers }
    {   (   0   )       (   1 )     |                                   }


## Linear Geometry

### Vectors in space

A *vector* has a magnitude and direction. Two vectors that have the same
magnitude and direction are equal.

The calculus description of a plane

    P = { (x y z) | 2x + y + z = 4 }

As vectors, solve for x, x = 2 - y/2 - z/2

            ( 2 )   ( -1/2 )     ( -1/2 )
    P = {   ( 0 ) + (   1  ) y + (  0   ) z | y,z e R }
            ( 0 )   (   0  )     (  1   )

A set of the form

    { p_vec + t_1*v_vec_1 + t_2*v_vec_2 + ... + t_k*v_vec_k | t_1, ..., t_k e R }

where `v_vec_1`, ..., `v_vec_k e R^n` and `k <= n`, is a k-dimensional linear
surface (or k-flat).

When the dimension of the linear surface is one less than the dimension of the
space then it is called a hyperplane.

A solution set of a linear system with n unknowns is a k-dimensional linear
surface in `R^n`, where k is the number of free variables of the system in
echelon form.

The solution set of a homogeneous linear system is a linear surface passing
through the origin.

The general solution set of a linear system is the solution set of the
associated homogeneous linear system offset from the origin by a particular
solution vector.

**Example (Exercise 1.6)**

Intersect these two planes:

      ( 1 )     ( 0 )
    { ( 1 ) t + ( 1 ) s | t, s e R }
      ( 1 )     ( 3 )

and

      ( 1 )   ( 0 )     ( 2 )
    { ( 1 ) + ( 3 ) k + ( 0 ) m | k, m e R }
      ( 0 )   ( 0 )     ( 4 )

We can find all of the points where these planes have the same values by
creating a linear system of where they are equal.

    t           =   1       + 2m
    t   + s     =   1   + 3k
    t   + 3s    =             4m

We can use Gauss's method to solve.  This gives that

    k = 1/9*(-1 + 8m)

Substituting back into the second plane yields

      ( 1   )   ( 2   )
    { ( 2/3 ) + ( 8/3 ) m | m e R }
      ( 0   )   ( 4   )


### Length and Angle Measures

Length of a vector `v_vec e R^n`

    |v_vec| = sqrt( v_1^2 + ... + v_n^2 )

Angle between two vectors.  Using the law of cosines, where A, B, and C are
sides of a triangle

    A^2 + B^2 - 2ABcos(theta) = C^2

Gives us for two vectors `u_vec` and `v_vec`

    |u_vec - v_vec|^2 = |u_vec|^2 + |v_vec|^2 - 2|u_vec||v_vec|cos(theta)


    theta = arccos( u_v . v_vec / |u_vec||v_vec| )

where `.` means the dot product.

Triangle inequality

    | u_vec + v_vec | <= |u_vec| + |v_vec|

The Triangle Inequality essentially says that the shortest distance between two
points is a straight line. The result of this is that this proves that in higher
dimensions lines are still straight and planes are flat.

The Cauchy-Schwarz Inequality

    | u_vec . v_vec | <= |u_vec||v_vec|

That is, the absolute value of the dot product of two vectors is less than the
product of their lengths.

Cauchy-Schwarz guarantees that in the equation for the angle between vectors

    theta = arccos( u_v . v_vec / |u_vec||v_vec| )

the fraction has absolute value <= 1.

Vectors are orthogonal if their dot product is 0.


## Reduced Echelon Form

### Gauss-Jordan Reduction

A matrix or linear system is in *reduced echelon form* if it is in echelon form
and every leading entry is a 1 and is the only non-zero entry in its column. The
approach is to reduce first to echelon form and then use the leading entries to
remove entries in the rows above it.

Between matrices, **reduces to** is an equivalence relation. An equivalence
relation is reflexive, symmetric and transitive.

Two matrices that are inter-reducible are part of a row equivalence class.


**Example (Exercise 1.12a)**

Find each solution set by using Gauss-Jordan reduction and then reading off the parametrization.

    2x + y - z = 1
    4x - y     = 3

Convert to a matrix representation

    (   2   1  -1   |   1   )
    (   4  -1   0   |   3   )

    -2*row_1 + row_2    => (   2   1  -1   |   1   )
                           (   0  -3   2   |   1   )

     1/2*row_1          => (   1 1/2 -1/2   | 1/2   )
    -1/3*row_2             (   0   1 -2/3   |-1/3   )

     -1/2*row_2 + row_1 => (   1   0 -1/6   | 2/3   )
                           (   0   1 -2/3   |-1/3   )

Reading off the parameterization, with `z` as the free variable, gives

    x = 2/3 + (1/6)z
    y = -1/3 + (2/3)z

As a solution set

        (  2/3 )    ( 1/6 )
    {   ( -1/3 ) +  ( 2/3 ) z | z element of all real numbers }
        (    0 )    (   1 )

**Example (Exercise 1.14a)**

List the reduced echelon forms possible for 2 x 2 matrices.

    ( 1 0 )  ( 1 a )  ( 0 1 )  ( 0 0 )
    ( 0 1 ), ( 0 1 ), ( 0 0 ), ( 0 0 )

Where `a` is any real number.

### Linear Combination Lemma

A linear combination of linear combinations is a linear combination.

Each row of an original matrix is a linear combination of x's. Each row in the
new matrix (after row operations) is a linear combination of the original
matrix's rows, which are also linear combinations of x.

**2.5 Lemma** In an echelon form matrix, no non-zero row is a linear combination
of the other non-zero rows.

**2.6 Theorem** Each matrix is row equivalent to a unique reduced echelon form
matrix.

Reduced echelon form matrices are representatives of the row equivalent class.

> uniqueness of reduced echelon form lets us answer questions about row
> equivalence classes by translating them into questions about their
> representatives

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

# Chapter 3: Maps Between Spaces

## Isomorphisms

### Definition and Examples

A *function* is a mapping from a domain to a codomain. The codomain might be
larger than the "range" or set of all output values of a function. If the
codomain is equal to the range then the function is *onto*.

If `f(x_1) = f(x_2)` implies `x_1 = x_2` then f is *one-to-one*. That is, f is
one-to-one if it maps values in the domain to unique values in the codomain.

A function that is one-to-one and onto has a two sided inverse and is called a
*correspondence*.

An *isomorphism* between two spaces V and W is a map `f:V -> W` that
1. is a correspondence - one-to-one and onto, and
2. *preserves structure* - i.e., addition and scalar multiplication are preserved.

An *automorphism* is an isomorphism of a space with itself. For example,
scaling, rotating, reflecting.

One way to show that a map preserves structure is to show that it preserves
linear combinations of 2 vectors.

    f(c_1*v_1 + c_2*v_2) = c_1*f(v_1) + c_2*f(v_2)

**Showing that a map is an isomorphism**
* Show that map is a correspondence
  * Show one-to-one: show that `f(x) = f(y)` implies that `x = y`
  * Show onto: show that for any member, y, of the codomain there is a member of
    the domain, x, such that `f(x) = y`
* Show that map preserves structure by showing it preserves linear combinations.
  In other words, show that `f(c_1*v_1 + c_2*v_2) = c_1*f(v_1) + c_2*f(v_2)`

**Example (Exercise 1.17b)**

Show that `f:M_2x2 -> R^4` given by

    ( a   b )  |--> ( a + b + c + d )
    ( c   d )       ( a + b + c     )
                    ( a + b         )
                    ( a             )
is an isomorphism.

To show that f is an isomorphism, first show correspondence.
* one-to-one: Show that `f(A) = f(B)` implies `A = B`

      f( (a_1   b_1) )  =   f( (a_2   b_2) )
       ( (c_1   d_1) )       ( (c_2   d_2) )

      ( a_1 + b_1 + c_1 + d_1 )  =  ( a_2 + b_2 + c_2 + d_2 )
      ( a_1 + b_1 + c_1       )     ( a_2 + b_2 + c_2       )
      ( a_1 + b_1             )     ( a_2 + b_2             )
      ( a_1                   )     ( a_2                   )

  Solving for each component gives `a_1 = a_2`, `b_1 = b_2`, etc., so `A = B` and the map is one-to-one.
* onto: show that any v in R^4 is the image of a matrix in `M_2x2`

      ( x )   ( a + b + c + d )
      ( y ) = ( a + b + c     )
      ( z )   ( a + b         )
      ( w )   ( a             )

  Solving for a, b, c, and d gives

      a = w
      b = z - w
      c = y - z
      d = x - y

  So our vector in R^4 is the image of the matrix

      ( w       z - w )
      ( y - z   x - y )

Now we'll show that structure is preserved by showing that linear combinations
are preserved.

    f( r_1*(a_1   a_2)  +   r_2*(b_1 + b_2) )
     (     (a_3   a_4)          (b_3 + b_4) )

Expands to

    f( r_1*a_1 + r_2*b_1      ... )
     ( ...                    ... )

    = (r_1*a_1 + r_2*b_1 + ... + r_1*a_4 + r_2*b_4 )
      (r_1*a_1 + r_2*b_1 + ... + r_1*a_3 + r_2*b_3 )
      (r_1*a_1 + r_2*b_1 + r_1*a_2 + r_2*b_2)
      (r_1*a_1 + r_2*b_1)

    = r_1 * (a_1 + a_2 + a_3 + a_4 ) + r_2 * (b_1 + b_2 + b_3 + b_4)
            (a_1 + a_2 + a_3)                (b_1 + b_2 + b_3)
            (a_1 + a_2)                      (b_1 + b_2)
            (a_1)                            (b_1)

    = r_1 * f(A) + r_2 * f(B)

Where A is the `a_i` matrix and B is the `b_i` matrix.

This shows that f is an isomorphism.

### Dimension Characterizes Isomorpism

Theorem: Isomorpism is an equivalence relation between vector spaces. *is
isomorphic to* means there exists a mapping that is an isomorphism between the
two spaces.

Theorem: vector spaces are isomorphic if and only if they have the same
dimension. Consequently, a finite-dimensional vector space is isomorphic to one
and only one of the R^n.

For two spaces with the same dimension, you can pick a basis for each then
derive a function that maps between representations in each space. See the
following example.

**Example (Exercise 2.10)**

A space, V, in P_1 (polynomials up to degree 1) has a basis of

    <1, 1 + x>

and a space, W, in R^2 has the standard basis (<e_1, e_2>). Find a mapping between
representations in each space.

    a + bx = (a - b) * 1 + b * (1 - x) = (a - b) * e_1 + b * e_2

    f(a + bx) = ( a - b )
                (   b   )

    a) f(3 - 2x) = ( 5 )
                   (-2 )

    b) f(2 + 2x) = ( 0 )
                   ( 2 )

## Homomorphisms

### Definition

A function that preserves structure (or linear combinations) is a *homomorphism*
or *linear map*. A homomorphism sends the zero vector to the zero vector in the
codomain.

A homomorphism is determined by its action on a basis. That is, it is fully
determined by the image produced by each basis vector (`h(B_i) = w_i`). This
homomorphism is unique. If there exists another homomorphism that maps the basis
vectors to the same vectors in the codomain, then this other homomorphism must
be the same.

    h_hat(v) = h_hat(c_1*B_1 + ... + c_n*B_n) = c_1*h_hat(B_1) + ...
             = c_1*w_1 + ... = h(v)

Say we have vector spaces V and W. `B = <B_1, ..., B_n>` is the basis of V. We also have a function, f, that maps `B_i` to `w_i in W`. Then we can *linearly extend* f to `f_hat: V -> W` for all `v in V` where

    v = c_1*B_1 + ... c_n*B_n

the action of the map being

    f_hat(v) = c_1*f(B_1) + ... + c_n*f(B_n)

A linear map from a space to itself, `t: V -> V`, is a *linear transformation*.

The set of linear function from `V -> W` is a vector space, a subspace of the space of all functions from `V -> W`. This subspace is denoted with the script L of V and W.

    ℒ(V,W)

**Showing that a map is a homomorphism**

* Show that the map preserves structure by showing it preserves linear
  combinations, just like with isomorphisms. For an example, see the section on
  Isomorphisms.

### Range Space and Null Space

The image of a subspace of the domain is a subspace (of the codomain). The
*range space* is the space of the image of the domain. The dimension of the
range space is the map's rank.

A homomorphism is *onto* the range, but not necessarily the codomain. Since a
homomorphism is not one-to-one, several vectors in the domain may map to the
same vector in the codomain. The inverse map gives the set of vectors in the
domain that map to a vector in the codomain.

    ( x )   f   ( x )
    ( y ) |---> ( y )
    ( z )

    ( 1 )   f^-1    ( 1 )
    ( 1 ) |-----> { ( 1 ) | z in R }
                    ( z )

Isomorphisms are "the same" but homomorphisms are "alike".  With the projection
map `𝜋:R^3 -> R^2`, the analogy of how homomorphic spaces are "alike" is that
`𝜋(v)` is the "shadow" of `v`. The shadow of the sum of vectors in R^3 equals
the sum of their shadows.

For a homomorphism, the image of a subspace of the range is a subspace of the
domain. Special case: `h^-1(0)` is a subspace called the *null space* or
*kernel* and the dimension is the map's nullity.

An example of an inverse map:

    ( x ) |--> x + y, the inverse is   c |---> { ( x ) | x + y = c, c in R }
    ( y )                                        ( y )

A linear map's rank + nullity = dimension of the domain.

Under a linear map, the image of a linearly dependent set is linearly dependent.

If V is n-dimensional, these are all equivalent statements about `h:V -> W`

1. h is one-to-one
2. h^-1 is linear
3. null space is the trivial space; nullity = 0
4. rank(h) = n
5. `<h(B_1), ..., h(B_n)>` is a basis of the range of n.

**Example (Exercise 2.23c, 2.24c)**

For the map

    h:M_2x2 -> R given by

    ( a b ) |---> a + b + c + dx^2
    ( c d )

find the range space and rank.

The range space is equal to

    { s + tx^2 | s, t in R }, rank = 2

where `s = a + b + c` and `t = d`.

Now find the null space and nullity of this map.

The null space is found by setting

    a + b + c = 0
    d = 0

And substituting into the left side of the map, giving:

    { (   a     b ) | a, b in R }
      ( -(a+b)  0 )

And the nullity is 2.

## Computing Linear Maps

### Representing Linear Maps with Matrices

We can represent linear maps with matrices.  These matrices multiplied by a
vector in the domain yield its map.

Definition: V, W are spaces with dimensions n and m respectively, with bases
B and D and `h: V -> W`. If

    Rep_D(h(B_1)) = ( h_1,1 )
                    ( h_2,1 )
                    ...
                    ( h_m,1 )
    ...
    Rep_D(h(B_n)) = ( h_1,n )
                    ( h_2,n )
                    ...
                    ( h_m,n )

then

    Rep_B,D(h) = ( h_1,1 h_1,2 ...  h_1,n )
                 ( h_2,1 h_2,2 ...  h_2,n )
                 ( ...   ...   ...  ...   )
                 ( h_m,1 h_m,2 ...  h_m,n )

is the *matrix representation of h with respect to B, D*.

To compute the matrix representation of h for a given B, D, where you know the
action on the basis vectors:
* for each basis vector compute `h(B_i)`
* find the representation in D of each `h(B_i)`: `Rep_D(h(B_i))`
* these column vectors make up the columns of the matrix

**Example (Exercise 1.17)**

Represent the homomorphism h:R^3 -> R^2 given by this formula and with respect
to these bases.

    ( x )
    ( y ) -> ( x + y )
    ( z )    ( x + z )

          ( 1 )  ( 1 )  ( 1 )
    B = < ( 1 ), ( 1 ), ( 0 ) >   D = < ( 1 ), ( 0 ) >
          ( 1 )  ( 0 )  ( 0 )           ( 0 ), ( 2 )

First, compute h of the basis vectors.

    h(B) = < ( 2 ), ( 2 ), ( 1 ) >
             ( 2 )  ( 1 )  ( 1 )

Second, find the representation in D of each mapped basis vector.

    Rep_D(h(B)) = < ( 2 ), ( 2   ), ( 1   ) >
                    ( 1 )  ( 1/2 )  ( 1/2 )

Third, the column vectors make up the columns of the matrix:


    Rep_B,D(h) = (  2   2   1  )
                 (  1  1/2 1/2 )

### Any Matrix Represents a Linear Map

Any matrix represents represents a homomorphism between vector spaces of
appropriate dimensions, WRT any pair of bases. Two different maps could be
represented by the same matrix but by different pairs of bases.

The rank of a matrix equals the rank of any map it represents.

The matrix

    ( 1   2   2 )
    ( 1   2   1 )
    ( 0   0   3 )
    ( 0   0   2 )

can represent a map with a 3 dimensional domain and 4 dimensional codomain.
Since the rank of the matrix is 2, the range space of any map represented by
this matrix must also be 2 dimensional.

Let h be a linear map represented by matrix H. Then h is onto iff the rank of H
is equal to the number of its rows (the dimension of the codomain), and h is
one-to-one iff the rank of H equals the number of columns (the dimension of the
domain).

A linear map that is one-to-one and onto is *nonsingular*, otherwise it is
*singuler*. That is, a linear map is nonsingular iff it is an isomorphism.
* Lemma. A nonsingular linear map is represented by a square matrix. A square
  matrix represents nonsingular maps iff it is nonsingular matrix. Thus a matrix
  represents isomorphisms iff it is square and nonsingular.

**Example (Exercise 2.18c)**

Find the range space and rank of the map, as well as the null space and nullity
of the map.

Map `h:R^2 -> R^3` with standard bases, defined by the matrix

    ( 1   1 | a )
    ( 2   1 | b )
    ( 3   1 | c )

Using Gauss-Jordan reduction:

    -2*row_1 + row_2
    -3*row_1 + row_3
    -2*row_2 + row_3
    row_2 + row_1
    -1*row_2

    ( 1   0 | -a + b    )
    ( 0   1 | 2a - b    )
    ( 0   0 | a - 2b + c)

Range space is then

                 ( a )
    Range(h) = { ( b ) | a = 2b - c }
                 ( c )

or

                 ( 2 )     ( -1 )
    Range(h) = { ( 1 ) b + (  0 ) c | b, c in R }
                 ( 0 )     (  1 )

Thus the rank is 2. Since the codomain has dimension of 3, this map isn't onto.

To figure out the null space, set a = b = c = 0. This yields x = y = 0, so the
trivial space is the null space and nullity(h) = 0. Another way to look at it is
that the dimension of the domain is equal to the rank plus the nullity, so the
nullity had to be 0. Since the nullity is 0 the map is one-to-one.

## Matrix operations

### Sums and Scalar Products

Multiplying a matrix by a scalar is defined as multiplying each matrix entry by
that scalar. The sum of two matrices is made up of the item-wise sum of the
entries in each matrix.

Matrix scalar multiplication and addition are defined this way so as to
correspond with the scalar multiplication and addition of the linear maps that
they represent.

**Example (Exercise 1.8d)**

    4*( 1   2 ) + 5*( -1    4 ) = ( -1   28 )
      ( 3  -1 )     ( -2    1 )   (  2    1 )

### Matrix Multiplication

The i,j-th entry in the matrix multiplication product of two matrices is defined
as being equal to the dot product of the ith row of the first matrix and the jth
column of the second matrix. Matrix multiplication is defined as such so as to
represent the composition of linear maps that the matrices represent.

Matrix multiplication is not commutative. This is because the number of columns
of the first matrix must equal the number of rows of the second matrix.

**Example (Exercise 2.19)**

Given two linear functions h:R^3 -> P_2 and g:P_2 -> M_2x2 defined as such

    ( a )
    ( b ) --> (a + b)x^2 + (2a + 2b)x + c
    ( c )
and
    px^2 + qx + r --> ( p   p - 2q )
                      ( q     0    )

Using these bases for the spaces.

          ( 1 )  ( 0 )  ( 0 )
    B = < ( 1 ), ( 1 ), ( 0 ) >
          ( 1 )  ( 1 )  ( 1 )

    C = < 1 + x, 1 - x, x^2 >

    D = < (1 0), (0 2), (0 0), (0 0) >
          (0 0)  (0 0)  (3 0)  (0 4)

a) Give the formula for the composition map `g o h` derived directly from the
above definition

    ( a )     (   a + b     -3a - 3b )
    ( b ) --> (  2a + 2b        0    )
    ( c )

b) Represent h and g with respect to the appropriate bases

To do this, we'll apply h and g to their basis vectors to get the columns of the
matrix representing h and g.

                ( 1 )     (  5/2 )
    h(B_1) = h( ( 1 ) ) = ( -3/2 )
                ( 1 )     (  2   ) C

And so on so that h is represented by

                 (  5/2   3/2   1/2 )
    Rep_B,C(h) = ( -3/2  -1/2   1/2 )
                 (  2     1     0   )

For g it is similar.

    g(C_1) = g(1 + x) = g(0*x^2 + 1*x + 1) = ( 0  -2 )
                                             ( 1   0 )
           = (  0   )
             ( -1   )
             (  1/2 )
             (  0   ) D
And so on so that g is represented by

    Rep_C,D(g) = (  0     0     1   )
                 ( -1     1     1/2 )
                 (  1/3  -1/3   0   )
                 (  0     0     0   )

c) Represent the map `g o h` computed in the first part with respect to the
appropriate bases

This is similar to b). Calculate `g o h` of the B basis vectors.

                         ( 1 )
    g o h (B_1) = g o h( ( 1 ) ) = g( 2x^2 + 4x + 1 ) = (  2 )
                         ( 1 )                          ( -6 )
                                                        (  4 )
                                                        (  0 ) D
And so on so that `g o h` is represented by

    Rep_B,D(g o h) = ( -2   1   0 )
                     (  3  -3/2 0 )
                     (  4/3 2/3 0 )
                     (  0   0   0 )

d) Check that the product of the two matrices from the second part is the matrix
from the third part.

    Rep_C,D(g) * Rep_B,C(h) = (  0    0   1   ) * (  5/2   3/2  1/2 )
                              ( -1    1   1/2 )   ( -3/2  -1/2  1/2 )
                              (  1/3 -1/3 0   )   (  2     1    0   )
                              (  0    0   0   )
    = (  2    1   0 )
      ( -3   -3/2 0 )
      (  4/3  2/3 0 )
      (  0    0   0 )

And this matches what we got in part c).
