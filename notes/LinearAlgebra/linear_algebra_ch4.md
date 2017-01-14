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