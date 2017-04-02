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
