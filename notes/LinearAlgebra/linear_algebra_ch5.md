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