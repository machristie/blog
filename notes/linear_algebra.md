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
