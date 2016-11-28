Notes on [Linear Algebra](http://joshua.smcvt.edu/linearalgebra/)

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

### Mechanics of Matrix Multiplication

A matrix with all 0's except a 1 in the *i,j* entry is called a *matrix unit*
(or *unit matrix*). Multiplied from the left, it copies the jth row into the ith
row. Multiplied from the right, it copies the ith column into the jth column.

The observation is that the multiplication of a matrix A with another matrix B
can be rewritten such that A is a linear combination of unit matrices, each
applied to B.

There is a identity matrix which is a diagonal matrix with only 1's on the
diagonal. A diagonal matrix multiplied from the left rescales the rows. A
permutation matrix is square and all 0's except for a single 1 in each row and
column.

These techniques can be combined to create matrices that perform Gauss-Jordan
reductions. A single Guassian operation is performed with an *elementary reduction matrix*:
  1. `kp_i`: `I -> M_i(k)`, k != 0, ith row has k on diagonal
  2. `p_i <=> p_j`: `I -> P_i,j`, for i != j, ith and jth rows switched
  3. `kp_i + p_j`: `I -> C_i,j(k)`, for i != j, C is I with k in row j, column i.

### Inverses

The *left inverse* of f is g if ` g o f` is the identity function.

The *right inverse* of f is g if `f o g` is the identity function.

Example:

    ( x ) pi ( x )      ( x )  i  ( x )
    ( y ) -> ( y )      ( y )  -> ( y )
    ( z )                         ( z )

    pi o i = id on R^2

which applies `i` and then `pi` to get the same thing, hence the composition is
the identity function.

A *two-sided inverse* can be applied to the left or right.  A function has a two sided inverse if and only if it is one-to-one and onto. If `f` is one-to-one and onto, the inverse is unique and called `f^-1`.

For matrices it is similar. The left inverse matrix G of H is applied at `GH`.
Right inverse would be `HG`. A matrix with a two sided inverse is an invertible
matrix. A matrix is invertible only if it is nonsingular. (A map is nonsingular
IFF it is one-to-one and onto.) The product of invertible matrices is invertible, `(GH)^-1 = H^-1G^-1`.

We can use inverses to solve `h(x) = d`. h is represented by H (`Hx=d`). So `x =
H^-1 d`. Why use inverses instead of Gauss-Jordan?
* easy to solve other systems with same coefficients but different constants
* explore a system's sensitivity.

Can compute inverse of matrix by applying Gauss-Jordan reduction steps in the same order to an identity matrix.

    R_r * R_r-1 ... R_1 * H = I
                       H^-1 = R_r * R_r-1 ... R_1

Corollary for 2x2 matrices.

    ( a   b )^-1  = 1/(ad - bc) (  d  -b )
    ( c   d )                   ( -c   a )

**Example (Exercise 4.15a)**

Find the inverse of

    ( 3 1 )
    ( 0 2 )

Using Gauss-Jordan reduction of an identity matrix.

    ( 3   1 | 1   0 )
    ( 0   2 | 0   1 )

Apply the following reductions
* `1/3 row_1`, `1/2 row_2`
* `-1/3 row_2 + row_1`

## Change of Basis

### Changing Representations of Vectors

*Change of basis matrix* for bases B, D in V is the representation of the identity map `id:V -> V` with respect to those bases

```
              ( ...             ...        )
Rep_B,D(id) = ( Rep_D(B_1) ...  Rep_D(B_n) )
              ( ...             ...        )
```

Lemma. A matrix is a change of basis matrix iff it is nonsingular.

**Example (Exercise 1.7)**

In R^2 where D = <(2 1), (-2 4)> and E_2=<(1 0), (0 1)>, find the change of basis matrices D to E_2 and from E_2 to D.  Multiply the two.

```
                   2           -2       ( 2 -2 )
R_D,E_2 = ( R_E_2( 1 ), R_E_2(  4 ) ) = ( 1  4 )

                 1         0       (  4/10   2/10 )
R_E_2,D = ( R_D( 0 ), R_D( 1 ) ) = ( -1/10   2/10 )
```

Multiplying the two matrices yields the 2x2 identity matrix.

Also R_E_2,D = (R_D,E_2)^-1