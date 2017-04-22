Notes on [Linear Algebra](http://joshua.smcvt.edu/linearalgebra/)

# Chapter 4: Determinants

## Definition

The determinant of a 2x2 matrix is

    ad - bc

For a 3x3 matrix where the first row is `a b c`, the second row is `d e f` and
the third row is `g h i` is

    aei + bfg + cdh - hfa - idb - gec

## Properties of Determinants

Definition: a nxn *determinant* is a function det: M_nxn -> R such that

1. det is the same before and after row combinations
2. det is negative of what it is after a row swap
3. det is k times what is is after scaling a row by k
4. det(I) = 1

`|T|` is another notation for `det(T)`.

The determinant of an echelon form matrix is the product of its diagonal
components. We can use this fact to figure out the determinant.
1. First use Gauss' method to reduct to echelon form, keeping track of the row
swaps (for sign changes), and row scaling (for scalar products)
2. Second apply those sign changes and scalar multiplicands to the product of
the diagonal.

## The Permutation Expansion

Problem is to show that the computation of determinant is well-defined (unique) result.

A map, f:V<sup>n</sup> -> R, is *multilinear* if 
    1. f(p_1, ..., v + w, ..., p_n) = f(p_1, ..., v, ..., p_n) + f(p_1, ..., w, ..., p_n)
    2. f(p_1, ..., kv, ..., p_n) = k*f(p_1, ..., v, ..., p_n)

Determinants are multilinear. Multilinearity allows us to break determinants into a sum of determinants.

    | 2  1 | = | 2  0 | + | 0  1 |
    | 4  3 | = | 4  3 |   | 4  3 |

A *n-permutation* is a function on the first n positive integers that is one-to-one and onto.
* 2-permutations:
    * &phi;<sub>1</sub> = `<1, 2>`
    * &phi;<sub>2</sub> = `<2, 1>`
* 3-permutations:
    * &phi;<sub>1</sub> = `<1, 2, 3>`
    * &phi;<sub>2</sub> = `<1, 3, 2>`
    * &phi;<sub>3</sub> = `<2, 1, 3>`
    * &phi;<sub>4</sub> = `<2, 3, 1>`
    * &phi;<sub>5</sub> = `<3, 1, 2>`
    * &phi;<sub>6</sub> = `<3, 2, 1>`

*Permutation matrices*:
* P<sub>&phi;<sub>1</sub></sub> =
      ( 1 0 )
      ( 0 1 )
* P<sub>&phi;<sub>2</sub></sub> =
      ( 0 1 )
      ( 1 0 )

The permutation expansion for determinants of a nxn matrix with entries of the form t<sub>i, j</sub> is
* t<sub>1,&phi;<sub>1</sub>(1)</sub>  t<sub>2,&phi;<sub>1</sub>(2)</sub> ... t<sub>n,&phi;<sub>1</sub>(n)</sub> | P<sub>&phi;<sub>1</sub></sub> |
* \+ t<sub>1,&phi;<sub>2</sub>(1)</sub>  t<sub>2,&phi;<sub>2</sub>(2)</sub> ... t<sub>n,&phi;<sub>2</sub>(n)</sub> | P<sub>&phi;<sub>2</sub></sub> |
* ...
* \+ t<sub>1,&phi;<sub>k</sub>(1)</sub>  t<sub>2,&phi;<sub>k</sub>(2)</sub> ... t<sub>n,&phi;<sub>k</sub>(n)</sub> | P<sub>&phi;<sub>k</sub></sub> |
    
where &phi;<sub>1</sub>, ..., &phi;<sub>k</sub> are all of the n-permutations.

The determinant of a matrix equals the determinant of its transpose. What holds for determinants wrt rows also holds wrt columns, i.e., column swaps change the sign of a determinant.


# Geometry of Determinants

## Determinants as Size Functions

The volume or area of the "box" formed by 2 or more vectors is equal to the
absolute value of the determinant of the matrix of those column vectors.

The determinant of the product of two matrices is the product of the
determinants of the matrices.

    | TS | = | T | * | S |

The orientation of a box is related to the sign of the determinant of the matrix
of column vectors defining the box. For transformations, if the sign of the
determinant of the transformation is negative then it changes the box's
orientation.

# Laplace's Formula

## Laplace's Expansion

For a nxn matrix T, the i,j *minor* of T is the (n-1)x(n-1) matrix formed by
removing the ith row and jth column of T. The i,j *cofactor* of T, called
T<sub>i,j</sub>, is (-1)<sup>i+j</sup> times the determinant of the i,j minor of
T.

        ( 1 2 3 )
    T = ( 4 5 6 )
        ( 7 8 9 )
    
    T_2,3 = (-1)^2+3 * | 1 2 |  =  -1 * (8 - 14) = 6
                       | 7 8 |

*Laplace's expansion of determinants*: the determinant of T can be found by 
expanding cofactors of any row or column.

* |T| = t<sub>i,1</sub>T<sub>i,1</sub> + t<sub>i,2</sub>T<sub>i,2</sub> + ... + t<sub>i,n</sub>T<sub>i,n</sub>
* |T| = t<sub>j,1</sub>T<sub>j,1</sub> + t<sub>j,2</sub>T<sub>j,2</sub> + ... + t<sub>n,j</sub>T<sub>n,j</sub>

The adjoint matrix of T is a matrix where the i,j entry is the 
T<sub>j,i</sub> cofactor. The adjoint of T is notated as `adj(T)`.

    T*adj(T) = |T|*I

So a formula for T<sup>-1</sup> is <sup>1</sup>&frasl;<sub>|T|</sub>*adj(T)

