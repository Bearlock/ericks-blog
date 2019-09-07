---
title: "Floating Point Mistakes"
date: "2018-11-09"
draft: false
---

## Integers Are Nice

It’s been a while since I’ve had to worry about types and their nuances. JavaScript has been at the core of my stack for the past couple years now. Between Node and Vue (and wanting to dabble in ReasonML on the side), I’m immersed in the JS landscape. I never imagined that a dynamic, weakly-typed language would become a daily tool. And yet, here I am with my imaginations subverted and naivety still in place.

I cut my teeth on C++, but JS is where I've spent most of my work life. I haven't had to worry about strong typed anything in a while. There is no concept of an integer type in JS. All values are of type `Number` which is a floating point representation. Which is orthogonal to the several value types there are in C++ (short, int, float, double, long, etc). Lately I've been dabbling in Elixir which has different value types (including an integer type). It's weird to say, but there's a part of me that misses strong types.

## Those Halcyon Typed Days

College gave me a complex. C++ types were both loved and loathed by everyone. They were great while cowboy coding and using the compiler as a quasi-REPL. The compiler would have a heart attack, point out each glaring mistake, and prompt for a hacky fix. Nothing super painful involved.

Types were insufferable to deal with when they were long and complex. Imagine a complex type, something like `std::initializer_list<int>`. Now imagine a function that takes that type and complicates it. Maybe to something like, `std::vector<std::initializer_list<int>>` (or worse). Not an easy abstraction to thought-juggle. 

C++ types are comforting when simple but overwhelming when complex. And they can become complex in a few lines of code.

The [auto][auto] keyword was a saving grace.

While those edges were sharp, they were exactly that; edges. The sting of esoteric or weird types was unusual. I lived within the comfortable confines of strings, ints, and doubles. Except doubles (and floating point numbers as a whole) aren't so nice.

## Rookie Mistakes

Being a developer means constant and consistent learning.  Playing with other languages and paradigms is what makes dev life exciting. I've been tinkering with [Elixir](elixir) and solving some exercises on [Hackerrank](h4x0r). It's all been peaches and gravy, but I made a rookie, CS 101 level mistake when messing with it. I'll get to that, but first, some Elixir explanation and background.

Elixir has the concept of a `range`. It is, in essence, a type/in-fix function that implements the `Enumerable` protocol (Elixir's version of an interface). It's common in other languages, and in Elixir it looks pretty simple, `1..5`. This represents a range of numbers from 1 to 5, inclusive. And since Elixir ranges implement the Enumerable protocol, functions in the `Enum` module can act upon them. 

Ranges are great but they only work on integers -- come to find out, that's for a good reason. But I, of course, didn't know that. I _needed_ a range of floats. I'm a programmer, and I'm not a stranger to hubris; time to write my own floaty pseudo-range.

Here's what it looked like:

```elixir 
defmodule Random do
  def subintervals(lower, upper), do: subintervals(lower, upper, [upper])
  def subintervals(lower, _, [lower | rest]), do: [lower | rest]
  def subintervals(lower, upper, [upper]), do: subintervals(lower, upper, [upper - 0.1 | upper])
  def subintervals(lower, upper, [head | rest]), do: subintervals(lower, upper, [head - 0.1 | [head | rest]])
end

Random.subintervals(1.0, 2.0)
```

This might seem alien to some, but [pattern matching][pattern] is one of Elixir's best features. `subintervals()` is a recursive function. Different versions of it will get executed depending on what pattern gets matched. It's similar to [compile time polymorphism/function overloading][polymorph]. The line `Random.subintervals(1.0, 2.0)` matches the first `subintervals()` definition. The `subintervals()` call in the first definition executes `subintervals()` with three arguments. The third argument is a single item list, that matches the third definition, and it'll recurse from there.

The code above is taking a lower bound (1.0) and an upper bound (2.0). On the first match it pushes the upper bound onto a list, `[2.0]`. On the next match (third definition) it prepends `upper - 0.1` onto the list, `[1.9, 2.0]`. As an aside, Elixir implements lists as linked lists under the hood. Thus, prepending an element to a list is faster than concatenating another list. A little more info [here][lists]. Anyway, so far there exists the list `[1.9, 2.0]`. The next match would be the last definition of `subintervals()`. This definition will match a few times resulting in `[1.0, 1.1, 1.2. 1.3. 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0]`. This last iteration will match the second definition of the function and return the list of numbers, in theory. 

Except it doesn't. This didn't work and I kept getting out of memory errors.

Turns out I messed up.

On a surface level the code looks fine. But there's a substantial anti-pattern lurking in the innocent looking code. My mistake came in two parts. First, I did some progressive math on a float type. Then I tried to do an _absolute match against the computed value_. Floating point numbers aren't absolute. They're approximations. Computers can handle discrete values (like integers) without issue. But they'll have trouble handling the infinite range of values between rational numbers.

[The elixir docs][docs] do a great job of summarizing some of the issues. I'll quote it below (emphasis mine):

> There are some very well known problems with floating-point numbers and arithmetics due to the fact most decimal fractions cannot be represented by a floating-point binary and most operations are not exact, but operate on approximations. Those issues are not specific to Elixir, they are a property of floating point representation itself.

> For example, the numbers 0.1 and 0.01 are approximations, which means the result of squaring 0.1 does not give 0.01 nor the closest representable. Here is what happens in this case:

> - The closest representable number to 0.1 is 0.1000000014
> - The closest representable number to 0.01 is 0.0099999997
> - Doing 0.1 * 0.1 should return 0.01, but because 0.1 is actually 0.1000000014, the result is 0.010000000000000002, and because this is not the closest representable number to 0.01, **you’ll get the wrong result for this operation**

It's spelled out clear as day; "you'll get the wrong result for this operation". The code is trying to match exactly on `1.0`, but it's computed from floating point math. The absolute match isn't guaranteed. And since it's never matched exactly, the function definition that exits the recursive loop is never called. It gets stuck in an infinite loop, the BEAM VM runs out of memory, and my dream of a range for floats dies. At least for a few minutes anyway.

## Scale Things Up

A quick and dumb-elegant way to handle floating point arithmetic is to not do it. The best pattern is to do integer arithmetic instead. Floats should really only be used in presenting data and when approximations are acceptable. 

Floats are down-scaled, "rational" as in "ratio'd", integers. That's a weird sentence to write, but bear with me. The remedy to the anti-pattern in the code above is moving the decimal point a few places over. Scaling up is the solution.

```elixir
defmodule Random do
  def subintervals(lower, upper), do: subintervals(lower, upper, [upper])
  def subintervals(lower, _, [lower | rest]), do: [lower | rest]
  def subintervals(lower, upper, [upper]), do: subintervals(lower, upper, [upper - 1 | upper])
  def subintervals(lower, upper, [head | rest]), do: subintervals(lower, upper, [head - 1 | [head | rest]])
end

Random.subintervals(10, 20)
```

The smallest rational scale the old code dealt with was 0.1, or a tenth. In the new code, all the numeric values get scaled up by a factor of 10. This avoids any problems in accuracy from floating point arithmetic. And when it comes time to present (or use) the integer range as a range of floats, the list can be converted accordingly.

```elixir
# . . .
Random.subintervals(10, 20)
  |> Enum.map(&(&1 / 10)) # Or more explicitly written as Enum.map(fn x -> x / 10)
  |> IO.inspect()
```


## Reinventing The Wheel

Like I said before, I'm no stranger to hubris. I'll continue to trip over things like this constantly. Hopefully with diminishing frequency, but also with increased understanding and learning. Some of you that are quicker than me have uh, probably caught on to the embarrassing fact that I have re-implemented Elixir's `range` function; with what I can only assume are performance negatives. But there is something valuable in committing a newbie mistake and unpacking it here. 

Maybe it'll make me a better engineer.

P.S checkout [this great article][float] for a more in-depth dive into floating point numbers.

[auto]: https://en.cppreference.com/w/cpp/language/auto
[elixir]: https://elixir-lang.org
[h4x0r]: https://www.hackerrank.com
[pattern]: https://elixir-lang.org/getting-started/pattern-matching.html
[polymorph]: https://www.geeksforgeeks.org/polymorphism-in-c/
[lists]: https://hexdocs.pm/elixir/List.html
[docs]: http://localhost:1313/posts/floating-point-mistakes/
[float]: https://modernweb.com/what-every-javascript-developer-should-know-about-floating-points/
