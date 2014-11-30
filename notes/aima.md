Notes on [Artificial Intelligence: A Modern Approach, 2nd ed.](http://aima.cs.berkeley.edu/2nd-ed/)

# Chapter 1: Introduction

## Four approaches to AI

1. Acting humanly: Turing Test approach
    * Turning test not a real current goal (analogy: Wright
      brothers making progress when giving up trying to imitate birds)
2. Thinking humanly: cognitive modeling/science
    * General Problem Solver (GPS) - emulate human reasoning
3. Thinking rationally - laws of thought
    * logic, syllogisms
    * formal logic vs uncertainty
4. Acting rationally - rational agent approach
    * acting rationally doesn't require correct inference
    * more general and well-defined than human based approaches

## Foundations of Artificial Intelligence

This section covers important moments in the history of philosophy, mathematics,
computer science, etc., that have contributed to making the study of artificial
intelligence possible.

## The History of Artificial Intelligence

This section covers important moments in the history of artificial intelligence
itself. There are a lot of details here that the book does a better job of
summarizing.

* Dose of reality (1966 - 1973): Why so much early optimism?
    * early successes relied on algorithmic manipulations - lacked subject
      matter knowledge to make additional improvements
    * intractability of problems AI is being applied to
    * limitations in the structures - perceptrons

## Reading: Computing Machinery and Intelligence, Alan Turing, 1950

There is some controversy around what the Turing test actually is. There are two
formulations of the Turing test in the paper. The initial one is very different
from the popular notion of the Turing test. In the initial formulation, Turing
first discusses the "imitation game" that is played at parties where a man and a
woman are hidden from an interrogator and can only communicate via written or
typed notes. The interrogator tries to figure out which is the man and which is
the woman. The man is dishonest and tries to trip up the interrogator ("I'm the
woman, the other one is lying") and the woman is honest ("No, I'm the woman").
In the initial formulation, a computer would fill in the role of the man and
**would effectively pretend to be a man pretending to be a woman**.

The goal of this "imitation game" Turing test isn't for the interrogator to see
if he can determine if one of the participants is a computer or not. It remains
the same, the interrogator tries to determine who is the man and who is the
woman.  The results of a computer playing the game are compared to the results
of a man playing the game.  If a man is successful at tripping up the
interrogator 70% of the time, then success for a computer would be to match or
even exceed that percentage.

Personally this seems like a superior type of test, a kind of blind test where
the interrogator isn't primed to look for "computer-like" behavior (for example,
asking difficult or tricky math problems that only a computer can solve). I also
think the aspect of double deception on the part of the computer, that is,
pretending to be a man pretending to be a woman, is intriguing, although perhaps
Turing only intended that the computer would pretend to be a woman.

A key point made in the paper is that a digital computer can mimic any discrete
state machine.

Turing covers several arguments against the notion that "computers can think". I
found it interesting that the one that he found most strong was the *argument
from ESP*.  He believed, and apparently wasn't alone at the time, that there was
significant statistical evidence for telepathy. A quote from the paper:

> thinking is just the kind of phenomenon where ESP may be especially relevant

