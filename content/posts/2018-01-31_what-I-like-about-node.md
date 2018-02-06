---
title: "What I Like About Node"
date: 2018-01-31T18:25:58-07:00
slug: "what-I-like-about-node"
type: post
---

## I Dig Node

I remember when I was a fledgling programmer and Node was something I had just learned about; I remember thinking "Server-side Javascript? That sounds like the worst thing ever". After tinkering with it and working with it professionally for about a year, I had a change of heart. Node fulfills a specific niche on the web, and it does the job well. Critics will often point to Node's error-handling capabilites, single-threadedness, type-safety (and other JS specific issues) as deal-breakers. The criticism is entirely valid, some points moreso than others considering how some criticisms are specific to taste. This isn't to say that Node is the best framework/language ever. A personal mantra that I can harp on excessively is `use the right tool for the right job`. If a project required fast processing or high levels of concurrency, I'd probably use something like Go or Rust (both great languages in their own right). Again, Node does certain things well and those things are useful for my line of work.

## Things it Does Well

**Easy to Learn**

Javascript dominates frontend development. Any developer that has had to build something for a web frontend has most likely had to interact with Javascript in one way or another. This initial familiarity lends itself well to quickly picking up Node. Even if one is a fresh-faced newcomer to the world of web development, Node seems to be the easiest/quickest backend tool to learn. Part of that is because a great community!

**Community**

Node has a massive (and massively active) online community. Part of this, again, is because of the de facto nature of Javascript, but I think this also speaks to how easy Node is to learn. Not to mention how simple/fun it is to hack on making cool things and solving problems. The vibrancy of the community lends itself to one becoming part of that community. There are Slack channels, forums, IRL meetups, etc. that are all focused on Node (or other JS technologies); this community involvement creates a positive feedback loop that entices more people to join the community. More on the specifics of the Node community [here.][community]

**Tooling and Packages**

Depending on who you are, this can either be a good or bad thing. Node has a package for virtually every problem one would wanna solve. I've used QR code generators, I've used AWS interfaces, I've used really lightweight http servers, and I recently started playing with [a decentralized status page][dstatus] that takes advantage of the [IPFS protocol][ipfs] (the internet is a cool place!). The good thing about all these packages and tooling is that it's easy to get up and go. Solving a problem and completing a project can be done really quickly because everything doesn't have to be hand-coded.

There are cons however. It can lead to [dependency hell][hell], it can make developers solely depend on third party tools _that they don't understand_, and too many misunderstood, unknown, third party packages can violate and undermine the integrity and correctness of a software project.

**Reduced context switching**

This is particularly specific to web developers. I don't like the term "full stack developer" because I think the connotations imply that someone is an expert at each level of the development stack which seems disingenious to me. I dunno, maybe this rockstart unicorn dev exists, but I haven't met anyone like that. However, Node lends itself a little bit to the "full stack" concept in the way of reduced context switching. 

Switching between programming languages carries with it a cognitive load; there are ideas, rules, and concepts that a developer has to switch between when alternating between programming languages. Personally (and anectdotally) I worked in a dev environment where the frontend consisted of Ember.js and the backend was combination of legacy PHP and .NET/C#. It was... painful, to say the least. More than once I made the mistake of using a PHP or C# specific function in our frontend, or vice-versa. Constant context switching can impact performance, affect developer well-being, and introduce all sorts of issues into a code base. 

Node bypasses the cognitive load; if the frontend is in Javascript, and the backend is in Javascript, than coding between the two environments is usually seamless. Proponents of this paradigm also advocate for a JS based database (usually MongoDB) and other JS based developer solutions. I have my own issues with Mongo, but in terms of context switching reduction, I think the argument is a good one.

## Things it Doesn't Do Well

**Immature Language**

Node is relatively young in regards to programming languages. Because of this, the tooling is immature and not as well-established or battle-tested that it could be. By now, most of the ugly parts of Java or C++ have reared their gross heads; issues have been mitigated, workarounds have been put forth, and best practices have been established, revised, and established again. Node doesn't really too much of that. These best practices and concepts are artifacts of decades old programming languages. Node can be a bit of a wild-west. This is both exciting and a little frustrating.

**Best Practices and Development Time**

Because Node is a young programming language, best practices haven't been cemented in the collective unconscious of the Node community. There is not really a definitive best way to do X. Again, this can be exciting because solving for X leads to greater understanding, but it can really slow down development time. This cost of dev time vs. exciting discovery can be detrimental to projects that are trying to hit the ground running.

**High Performance and Heavy Computing**

Anyone that has installed an electron application can bear witness that Node's isn't exactly the most performant runtime in the world. Anything that requires long-running calculations, minimal memory usage, or heavy computations aren't suited for Node. Especially because of it's single-threaded nature. I have come to appreciate the event-loop and the async/await paradigm, but neither of those things really lend themselves to faster and more performant computation.

## I Still Dig Node

I like Node, even with all it's shortcomings. I can say that it's lead me to becoming a better developer, and it's enabled me to write fun and interesting code. I like most programming languages actually. Each is unique and offers a different perspective on the science of technology and computing (which is fascinating). After having written what's essentially an essay on Node, I think Bjarne Stroustrup can best sum up how I feel about node:

> There are only two kinds of languages: the ones people complain about and the ones nobody uses.
 
[community]: https://blog.risingstack.com/awesome-node-js-tutorials-from-2017-collection/
[dstatus]: https://www.dstatuspage.net/
[ipfs]: https://ipfs.io/
[hell]: https://en.wikipedia.org/wiki/Dependency_hell
