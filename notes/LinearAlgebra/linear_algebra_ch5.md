Notes on [Linear Algebra](http://joshua.smcvt.edu/linearalgebra/)

# Chapter 5: Similarity

## Complex Vector Spaces

This chapter has a review of complex numbers.

## Similarity

### Definitions and Examples

Matrices T and T_hat are *similar* if there is a nonsingular P such that
T_hat = PTP<sup>-1</sup>.

The arrow diagram is such that the domain and the codomain are the same spaces. Also the codomain's basis equals the domain's basis. In matrix terms, the transformation, with respect to bases B and D, is

Rep<sub>D,D</sub>(t) = Rep<sub>B,D</sub>(id)Rep<sub>B,B</sub>(t)(Rep<sub>B,D</sub>(id))<sup>-1</sup>

**Example: Ex 1.7**

t( x y z ) = ( x-z  z  2y )
B = <( 1 2 3 ), ( 0 1 0 ), ( 0 0 1 )>
D = <( 1 0 0 ), ( 1 1 0 ), ( 1 0 1 )>

b) Compute T=Rep<sub>B,B</sub>(t)

To do this, apply t to the basis vectors of B. Then represent each one in B.  These make up the columns of T.

c) Compute T_hat=Rep<sub>D,D</sub>(t)

This is computed just like b, but applied to D.

d) Compute matrices for the base-to-base transformations (the sides of the arrow square).

For Rep<sub>B,D</sub>(id), represent in D each basis vector of B. This gives you the columns.

For Rep<sub>D,B</sub>(id), represent in B each basis vector of D. This gives you the columns. Alternatively, you can take the inverse of Rep<sub>B,D</sub>(id).

### Diagonalizability

For matrix equivalence classes there is a canonical form, the block partial
identity matrix. We want a canonical form for similarity classes too.

T is diagonalizable if there is a nonsingular P such that PTP<sup>-1</sup> is
diagonal. A transformation or matrix is diagonalizable if there exists a diagonal representation of the transformation wrt some domain and codomain having the same basis.

For example,
```
T = ( a  b )
    ( c  d )
```

T is diagonalizable if there is a nonsingular P such that PTP<sup>-1</sup> = 
```
( x  0 )
( 0  y )
```

However, we can't always find a diagonal matrix for each similarity class, for example
```
( 0  0 )
( 1  0 )
```

A transformation t is diagonalizable iff there is a basis B =
&lt;b<sub>1</sub>,...b<sub>n</sub>> and scalars l<sub>1</sub>,...,l<sub>n</sub>
such that t(b<sub>i</sub>) = l<sub>i</sub>b<sub>i</sub>.

To diagonalize 2x2 matrix find basis B = &lt;b<sub>1</sub>, b<sub>2</sub>> such that Rep<sub>B,B</sub>(t) = 
```
( l_1  0 )
( 0  l_2 )
```

So we seek a solution of the form
```
( a  b ) b_1 = l_1 b_1
( c  d )

( a  b ) b_2 = l_1 b_2
( c  d )

( a  b ) ( y_1 ) = x ( y_1 )
( c  d ) ( y_2 )     ( y_2 )
```
where y<sub>1</sub>, y<sub>2</sub> are the components of the basis vectors in B.

### Eigenvalues and Eigenvectors

A transformation t has eigenvalue l and eigenvector e if `t(e) = l*e`. Likewise
for matrices.

Similar matrices need not have the same eigenvectors.  This is because similar matrices are transformations wrt different bases. The eigenvectors are the same, but represented differently in different bases.

To find eigenvalues and eigenvectors of T 
1. solve `|T - xI| = 0` to find possible values of x, which are the eigenvalues.
2. For each eigenvalue, plug it in to `(T - xI)v = 0` to find v, which are the
eigenvectors for that eigenvalue.

Why `|T - xI| = 0`? If the `T - xI` is nonsingular then the only solution is the
0 vector, so the only eigenvector would be the 0 vector, which isn't allowed.
So `T - xI` must be singular to have eigenvectors, which means the determinant
must be 0.

Definitions:
* *characteristic polynomial* of square matrix T is `|T - xI|`. *Characteristic equation* is `|T - xI| = 0`.
* *eigenspace* of a transformation t with eigenvalue l is `{v | t(v) = lv}`

An eigenspace is a subspace.  If a matrix has a set of distinct eigenvalues, if
you take one eigenvector for each eigenvalue, you get a linearly independent set
of vectors. 

An nxn matrix is diagonalizable iff there are n distinct eigenvalues. 

