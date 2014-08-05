
My notes for the [Intro to Artificial
Intelligence](https://www.udacity.com/course/cs271) class at Udacity.

# Welcome to AI

* Key applications of AI
    * finance
    * robotics
* intelligent agents
    * sensors, actuators and a control policy
    * perception action cycle
* 4 key attributes
    * partial or fully observable
        * *partially observable* - the key things that makes a problem partially
          observable is if you need to remember previous states to solve the
          problem. If you can always just look at the current state without
          memory, then you are *fully observable*. (memory == partially
          observable)
    * stochastic or deterministic
    * continuous or discrete
    * benign or adversarial
* sources of uncertainty
    * sensor limit
    * stochastic
    * lazy
    * ignorance

# Problem Solving

* definition of a problem
    * initial state (S)
    * actions(S) -> { a\_1, a\_2, ...}
        * a\_1, etc are the actions that can be taken from a given state
    * result(S, a) -> S'
        * applying an action to a state yields a new state
    * goal test(S) -> T or F
    * path cost(S\_1 -> S\_2 -> ... ) -> n
* Uniform cost search (cheapest first)
    * you have an explored path set and a frontier path set
    * not finished until you pop off an explored path that reaches the goal
* Depth first
    * Advantage: less space needed for paths in frontier set
* Greedy best-first search
* A\* algorithm
    * f = g + h
    * g(path) = path cost
    * h(path) = h(S) = estimated distance
        * S is the final state
        * h is a heuristic
    * guaranteed to find lowest cost if h(S) < true cost
        * so h needs to be optimistic, aka, underestimate
        * also called being *admissible*
* Automatically finding a heuristic
    * start with a definition of the problem
    * relax some of the constraints in the problem to come up with a heuristic
    * called *generating a relaxed problem*
* Problem solving works when
    * fully observable
    * domain must be known
    * discrete
    * deterministic
    * static

# Bayes Networks

* Nodes are random variables
* Binary events
* P(A) = p => P(not A) = 1 - p
* Total probability
    * P(Y) = Sum over i P(Y | X = i) P(X = i)
* Bayes Rule: P(A|B) = P(B|A)P(A)/P(B)
* (C) -> (+)
    * C is not observable
    * + is observable
* P(A|B) + P(not A|B) = 1
* P'(A|B) = P(B|A)P(A), the numerator
* Cancer test
    * (T1) <- (C) -> (T2)
    * P'(C|+-) = P(+|C)P(-|C)P(C)
    * P'(not C|+-) = P(+|not C)P(-|not C)P(not C)
    * P(C|+-) = P'(C|+-)/(P'(C|+-) + P'(not C|+-))
    * T1 and T2 are conditionally independent given C
* Chain rule: P(A,B) = P(A|B)P(A)
* Number of variables to describe a bayes network
    * if a node has k incoming arrows, then it requires 2^k variables
* Any two variables are independent if they're not linked by just unknown
  variables
* A -> B -> C
    * C is dependent on A
    * However, if we know B, then C and A are independent
* D-separation = reachability
* Active triplets (A and C are dependent)
    * A -> B -> C
    * A <- B -> C
    * A -> (B) <- C
        * B is known
    * A -> ... (N) <- C
        * N is a common descendant of A and C and is known
* Inactive triplets (A and C are independent)
    * A -> (B) -> C
    * A <- (B) -> C
    * A -> B <- C

# Probabilistic Inference
* Evidence and query variables.  All other nodes are hidden.
* P(Q1, Q2, ...| E1=e1, E2=e2, ...)
* Enumeration
* B -> A <- E
* J <- A -> M
* P(+b|+j,+m) = P(+b,+j,+m)/P(+j,+m)
* P(+b,+j,+m) = Sum over e, Sum over a P(+b,+j,+m,e,a)
    * e and a are hidden variables
* = Sum over e, Sum over a P(+b)P(e)P(a|+b,e)P(+j|a)P(+m|a)
* Maximize independence
* Causal direction
    * causes -> effects = more efficient
* Variables elimination
    1. Joining factors
        * R -> T -> L = (RT) -> L
    2. Elimination
* Approximate inference - sampling
* Rejection sampling
    * computing conditional probability
    * (Burglar) -> (Alarm)
    * P(B|+a)
    * Burglary is rare so reject most samples
* Likelihood weighting
    * P(R|+s, +w)
    * Force s and w to be + but also weight those samples by their probability
* Gibbs sampling
    * MCMC - Markov Chain Monte Carlo
* Monte Hall problem
