---
title: "What Does It Mean to Be a Good Engineer?"
date: "2018-02-08"
draft: false
---

This is a loaded question; it hounds me in times of self-doubt. It's often followed by the question, "am I a good engineer?". Honestly, I already grapple with the concept and definition of the word "good". To deconstruct what it could mean to be a "good engineer" is beyond me. I like to sit and think I'm a good engineer, that I do good by my title and by the things I achieve. As usual, words have meaning. The distillation of this meaning might get me somewhere. Google's definition of "engineer" is both a verb and a noun with a lengthy amount of synonyms. The definition is as follows:

> noun  
> 1. a person who designs, builds, or maintains engines, machines, or public works.  
> synonyms:	originator, deviser, designer, architect, inventor, developer, creator; mastermind    
> "the prime engineer of the approach"

> verb  
> 1. design and build (a machine or structure).  
> "the men who engineered the tunnel"  

The definitions are centered around the ideas of design, construction, and maintenance. I do these things on the daily in the sphere of software development. Sitting down and pounding out code is the smallest part of what I do in a day. Most of my day is spent in front of a screen where I pore over an already extant design or piece of code, read documentation, or sigh in frustration at a failed test (come to find out the test failed because I forgot a curly brace). But I still haven't gotten to the meat of what it means to be a good engineer. Context is the framework for meaning, therefore, the definition of a good engineer changes with context.

## In the Context of Business

Business was the last thing on my mind when I decided to become a software engineer. I wanted to a) build cool and exciting things and b) get paid for it. Business used to be a four letter word. Turns out that business is the word used to describe people engaging in markets and commerce. I inherently participate in business by selling my services. The company that purchases my services hopes and expects to extract some sort of value from them. I recently read a [fantastic blog post][kalzumeus] that addresses this too-often disconnect between business and engineer. The concepts that stood out can be crystallized into the following:

- Create value; don't be a cost center.
- Solve problems; don't be married to a tech stack.
- Communicate effectively; don't sell yourself short, don't overwhelm others.
- Create a network; don't be an island.
- Embrace happiness; don't focus too much on your career.

The list above reflects the basic definition of an 'engineer' if taken in the abstract. It doesn't have everything that it takes to be a good engineer. 

It's a solid start. 

## In the Context of Development

Software development is a process that involves several steps and processes. It can be (ridiculously) distilled down to:

**Generate problem solving idea in mushy brain space -> Implement idea in the ephemeral realm of 1's and 0's**

The basic gist is that software developers are tasked with the sacred duty of solving problems; they are the interface between human intent and computers. As such, it's important to ask the question of how to achive this problem solving, or what does this problem solving look like? A quick and dirty breakdown of my preferred process would look like the following:

- Identify the problem
- Validate and verify the problem definition
- Gather just enough requirements
- Validate and verify the basic requirements
- Create a low fidelity prototype
- Validate and verify the prototype
- Create a walking skeleton
- Validate and verify the skeleton
- Iterate on that skeleton until the solution is fully formed
- Validate and verify the iterations 

There's, uh, a definite pattern here. 

Maybe I over-emphasized verification and validation, but I don't see enough of it in day-to-day software development processes. And maybe failing fast is a cliche at this point, but developer cycles aren't wasted and business resources aren't spent with this failure. Failing quickly is a good thing. Validation and verification enable it.

![mytemple][whiteboard]
*If only I could be so grossly evanescent*

Another point emphasized in the process above (perhaps a little more subtly) is the act of prototyping. A low-fidelity protoype is nothing more than a mockup, a tiny and relatively insignificant first pass at idea crystallization. It doesn't focus on implementation, it doesn't focus on design - no details, only big picture. For me, this happens best at the whiteboard. A whiteboard is the perfect medium and model of impermanence. Nothing is sacred. Ideas can be removed as easily as added. Whiteboards are the altar of the ephemeral, and as such, lend themselves to concept generation, concept synthesis, and concept failure.

Once the low-fidelity protoype has been verified and validated I think it's safe to create a walking skeleton. [This blog post][codeclimate] gives a better explanation than I could. But the gist of it, according to [Alistair Cockburn][cockburn] (best name) is as follows:

> A Walking Skeleton is a tiny implementation of the system that performs a small end-to-end function. It need not use the final architecture, but it should link together the main architectural components. The architecture and the functionality can then evolve in parallel.

Build a skeleton. Wire the bones together. Prove the concept. Focus on details later.

![walkingskeleton][skellyman]*I stole this from codeclimate*

Finally, I wanted to hammer the point home on iteration. Most development happens and is bolstered iteratively. Foundations are laid and layered upon. Don't develop a perfect codebase or project; it isn't possible. But do build a project that is easy to build upon. Mind you, I can't speak to the virtues of incremental development because I have no experience with it. Within the ken of software development, probably 95% of projects don't need the careful touch that incrementation lends.  

## Sorry About the Tangent

The section above is a bit of a tangent. It's mostly a breakdown of how I solve problems and create code and architecture. It's worked for me (and several others) but don't use me as a bible or prophet. To get back to the original point, being a good software engineer in the context of development means the following:

- Figure out the real problem
- Build foundational solutions to that problem
- Use the best tool for solving the problem
- Validate and verify constantly
- Foster curiousity and creativity
- Fail fast; fail often
- Design with human boundaries in mind
- Learn to find information and read doumentation
- Ask questions and ask them effectively
- And so many other points that it gets hard to narrow the list

## In the Context of Being a Colleague

This post has gotten too long already, but this section is important enough to make the post longer. No engineer is an island. Successful software projects are more often the product of an effective team than not. I could dedicate an entire post to this topic. But right now I won't. Big pictue ideas are as follows:

- Be a mentor; share, teach, and welcome those with less experience
- Be a student; learn, absorb, and lend an ear to those with more experience
- There are no rock star developers, only effective teams
- Edify with criticism; don't tear someone down
- Help others and accept help from others
- Foster an environment of honest, open, and constructive conversation
- Reward creativity and experimentation
- More stuff I'm sure I'm forgetting

## These Contexts Aren't Comprehensive

Engineering is a nuanced and multi-faceted field. These contexts are the one's that my mind automatically goes to when defining a good engineer. That doesn't mean there aren't other contexts. And I'm not an expert at navigating these contexts either. These are what I have discovered thus far to be foundational areas of engineering development. It's important to build upon these foundations and discover other contexts as well as refine and distill these contexts. Am I a good engineer? I don't know, but I can become _better_.

[kalzumeus]: http://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/
[whiteboard]: /images/whiteboard.jpg
[codeclimate]: https://codeclimate.com/blog/kickstart-your-next-project-with-a-walking-skeleton/
[cockburn]: http://alistair.cockburn.us/
[skellyman]: /images/skellyman.gif
