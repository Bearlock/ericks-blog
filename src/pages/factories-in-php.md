---
title: "Factories in PHP"
date: "2019-09-22"
draft: false
---

![factory][smokestacks] *A factory in perspective*

There are two modern perspectives on factories. 

On one hand, there's a view that the factory is a paragon of efficiency, process management, and virtue. It's a black box and transmutation circle — you throw raw materials in one end and get a polished, finished product out the other. A factory is the height of human ingenuity, using scientific and calculated methods to reduce waste, increase output, and widen profit margins by continuously shaving away the extraneous and skating the razor thin bleeding edge. It employs hundreds of people focusing all their labor, energy, and human capital on keeping the squeaky wheels of the global economy liberally greased.

On the other, there's a perspective that the factory is a noxious peddler of useless widgets — the ultimate reflection of humanity's voracious appetites and the perfect manifestation of a capitalist market; grungy, boot-stamping, and soul-sucking. A factory is a pit of a darkness and pollution. Somewhere that the human spirit goes to die — so that the new iPhone can live. It exists only to enrich and entertain bourgeous overlords, rob the proletariat of her labor, and keep a boot firmly pressed upon humanity's cheek.

Whoa. It got all ideological up in here. But these strawmen deserve names; how about `Milton` and `Upton`?

## Factory Method Pattern

As it turns out, physical factories are more complex than a reductive strawman. The same can be said of software development patterns. An oft used and abused pattern is the (in)famous [Gang of Four][GoF] _factory method pattern_. To be clear, an OO factory has very little in common with a physical factory except for in the abstract; both produce **things** and both can either lean toward paragon or noxious peddler. 

As always, Wikipedia has a take on the subject: 

> In class-based programming, the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. This is done by creating objects by calling a factory method — either specified in an interface and implemented by child classes, or implemented in a base class and optionally overridden by derived classes—rather than by calling a constructor.

TL;DR, OO factories are about generating dynamic/runtime types and decoupling object creation from object retrieval. You don't know what you need until you need it, and you don't know where you'll need it.

## A Classic example

Everybody loves pizza. So then, logically, it follows that everyone loves pizza factories.

First, an interface:

```php
<?php

namespace Some/Pizza/Example

interface Pizza {
  public function bake();
}
```
  
`Pizza` is the interface the for the objects the factory is going to produce. Pretty straight-forward. Pretty empty. In PHP, as with other programming languages, interfaces are really just "contractual" obligations. In normal terms, this just means that if a class implements an interface, it has to also have _some_ definition for the functions defined in the interface. Interfaces are more flexible (and therefore preferable) to class based function inheritance. 

Now onto some concrete classes:

```php
<?php

namespace Some/Pizza/Example

class CheesePizza implements Pizza {
  public function bake() : string {
    return 'A rich and stringy cheese pizza!';
  }
}

class PepperoniPizza implements Pizza {
  public function bake() : string {
    return 'A deliciously zesty pepperoni pizza!';
  }
}

class AnchovyPizza implements Pizza {
  public function bake() : string {
    return 'A gross anchovy pizza. . .';
  }
}
```

This is a contrived, albeit simple, example. The classes do their contractual thing by implementing `Pizza`, and adhere to it by definining a `bake()` function. Peaches and gravy. Even though they define the function required in the interface, the concrete classes are pretty much able to return what they want. They don't _have_ to return a string, but in this case the pizza joint is feeling generous.

Here's what a pizza factory and a pizza place might look like:

```php
<?php

namespace Some/Pizza/Example

class PizzaFactory {
  // This is an associative array where concrete instances 
  // of a pizza are mapped to their string representation
  private $pizzaTypes = [
    'cheese' => new CheesePizza(),
    'pepperoni' => new PepperoniPizza(),
    'anchovy' => new AnchovyPizza()
  }

  /** 
   * Here, the passed in $type is searched for in the
   * map above. If it exists, return the instance. If
   * not, return null.
   */
  public function makePizza(string $type) {
    return array_key_exists($type, $this->pizzaTypes) 
      ? $pizzaTypes[$type] 
      : null;
  }
}

class PizzaPlace {
  private $factory = new PizzaFactory();

  /**
  * This is where everything comes together. The
  * function attempts to make a pizza. Remember,
  * that if the pizza request is valid, PizzaFactory
  * will return the instance. Otherwise it returns null.
  * If it doesn't get null, it bakes the pizza 
  */
  public function getPizza(string $type) : string {
    return !empty($this->factory->makePizza($type)) 
      ? $this->factory->makePizza($type)->bake()
      : "Sir, this is a Little Kaiser's";
  }
}

$littleKaisers = new PizzaPlace();

echo $littleKaisers->getPizza('cheese'); // Will output "A deliciously zesty pepperoni pizza"
echo $littleKaisers->getPizza("anchovy"); // Will output "A gross anchovy pizza. . ."
echo $littleKaisers->getPizza('skittles'); // Will output "Sir, this is a Little Kaiser's"
```

The biggest wins provided by the factory pattern are dynamic type creation and separation of concerns. The code would look a lot more messy and wouldn't scale well if object creation, object behavior, and object retrieval weren't separated. It's easy to add another pizza class and append that pizza to the `$pizzaTypes` array in `PizzaFactory`. But if it were all in one big god class, it wouldn't be easy to manage ten, let alone fifty pizza types.

`makePizza()` is the factory method used to, well, make a pizza. Nothing is `new`'ed (from the perspective of the calling method) because of this factory method. Implementation details aren't necessary. The calling method just knows that it can provide the function a single argument and potentially get a tasty pizza back.

## Factory Misuse

The most Frankenmonster misuse of the factory pattern is in applying the pattern... to the pattern. One could feasibly write a `PizzaFactory`_Factory_ (This is real and it has a name. Meet the [Abstract Factory Pattern][afp]). It starts off innocently enough. Requirements have changed; now Little Kaiser's needs to offer thin crust, Brooklyn style, and Chicago deep dish pizzas, in all the old toppings mind. So more type specific factories are coded up. `ThinCrustPizzaFactory`, `DeepDishPizzaFactory`, and `BrooklynPizzaFactory`. Now that these new types exist, what better way to organize things than to reach for handy-dandy ol' factory method pattern. `PizzaFactoryFactory` is born. But wait, Little Kaiser's business is booming and they're leveraging their social success by releasing a pizza-sim-as-a-service VR game. Code reuse and DRY are more much lauded software principles and patterns, further complicating things. The new PSaaS platform needs to provide all the same Little Kaiser's pizza goodness, but virtually. So — more types and another factory — `VirtualPizzaFactoryFactory`, `PhysicalPizzaFactoryFactory`, and `MetaphysicalPizzaFactoryFactoryFactory`. And this sounds like a exaggeration, but [_it's happened_][factoryfactoryfactory].

It's turtles all the way down. 


[smokestacks]: /images/factory.jpg
[GoF]: https://www.amazon.com/Design-Patterns-Object-Oriented-Addison-Wesley-Professional-ebook/dp/B000SEIBB8
[afp]: https://www.geeksforgeeks.org/abstract-factory-pattern/
[factoryfactoryfactory]: https://hackernoon.com/a-factoryfactoryfactory-in-production-822478b5afbd
