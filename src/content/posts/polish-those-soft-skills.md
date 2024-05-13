---
title: Polish Those Soft Skills
description: Musings on the importance of soft skills
date: 2024-05-13
draft: false
tags: ["no code", "soapbox" ]
---

Being candid, I possess a decent level of technical acumen and a handful of technical skills. Both the acumen and the skills are part and parcel to being a software engineer. They compose the foundation to "thought work" — in many ways, they are the barrier to entry.

Emphasis on **entry**.

There is no compelling argument to ignoring a solid technical foundation — it's laughable to even consider. However, I don't often see the same level of consideration for _soft skills_, AKA, people skills, communication skills, interpersonal skills, etc.

I owe my career to my soft skills.

Again, technical skills are _foundational_ — they lay at the bottom of the metaphorical tower — and to neglect the foundation or to not have a wide, strong, and stable foundation, invites disaster and makes it impossible to build the tower up. But the tower will remain short and stunted unless considerations are made for soft skills.

![tower][tower] *Pierce the heavens*

While I may work in a technical capacity or produce technical output, I operate in and navigate a people-centric world. I interface in meat-space with other flesh 'n' blood humans every single day. The inability to communicate properly, to write effectively, to work in a team, to manage my time, or to lead when necessary, would seriously hamper my career, let alone allow it to flourish. These skills act as multipliers or as scalar (or maybe exponential) modifiers to the established technical foundation. Soft skills complement, embellish, adorn, and most importantly, scaffold, the more base skills.

## Writing

Effective writing is the single most important soft skill an engineer can possess. I would go as far as to say that writing trumps most technical skills. Being able to write well, means being able to communicate, think, and  on some level, plan well. According to the book [On Writing Well][writingwell], 

> Clear thinking becomes clear writing; one can't exist without the other

Unless you're forever a one-person-team, effective communication is vital. And even then, you have to communicate to clients, vendors, consultants, OSS contributors, what have you. There is no avoiding the fact that you gotta talk to somebody, sometime. Text and the written word are, more often than not, the medium for these interactions. Long-form writing encompasses design documents, proposals, how-tos and FAQs, architecture decision records, budget requests, cover letters, resumes, and so on.

Poor writing equates to poor thought. Poor thought results in shoddy design, refused proposals, confused end users, and generally, unhappy, ineffective people — yourself included.

You can't make your technical chops shine through without being able to distill all those technical neurons in your head into a format that other folks can consume. 

We can't yet communicate solely on vibes — you gotta write well.

Lucky for us, there are plenty of ways to improve our writing:

- Read a book on [Writing Well][writingwell]
- Read more in general (good readers _tend_ to be good writers)
- Practice; maybe through a blog?
- [Take a writing course][writingcourse]

## Communicating

The point was hammered above a bit in [Writing](#writing), but communication is transactional. Not only does what you're sending _out_ matter, but how you parse and interpret incoming comms is vital as well.

First and foremost, you have to consider _who_ is sending a message your way. "This is broken" can mean something entirely different for a product manager vs. what it could mean for a QA engineer.

And then you gotta find clarity in what `this` and what `broken` could mean for that particular person. Don't be afraid to ask questions or direct the conversation towards exacts. Ultimately, being a little probing will ensure that both you and the person communicating with you are aligned and on the same page.

There was a fun little exercise a professor put my class through in college. It was something like "Okay, you're all full-fledged software developers. A client comes up to you with a stack of paper and tells you that they need to have 5000 1x1 inch pieces of paper in hand in five minutes. Your job is to make that happen". 

He handed us a stack of paper, some rulers, some pens, etc. None of us wasted any time going directly into problem-solving mode. Some folks were trying to come up with clever solutions on how to bulk-generate the pieces of paper; other teams started to frantically cut up a bunch of paper, hoping they could blaze through to the requirement.

By the time five minutes had passed, regardless of how many 1x1 inch pieces of paper folks had generated, our professor let us know we had all failed the task. Even if we had completed the client's request to spec we would have failed the task; the point he was trying to help us see was that nobody pushed back on the customer and asked **"why?"**

Why do you need 5000 pieces of paper exactly the same size?

Turns out, the client just wanted some confetti. The 5000 piece 1x1 inch requirement was just something "technical" they decided to throw in for us "technical" folks.

As engineers we need to take the time to understand a request — what's the underlying problem we actually need to solve? What're the requirements, considerations, and constraints, and why do they exist? Are we on the same page and am I picking up what you're putting down? Again, being able to effectively grok and navigate the communication that comes _in_ is just as important as being effective at sending clear, concise, and understandable communication _out_.

The remedy here is mindfulness, active listening, and directly engaging with the person and message. It takes a little time and a little practice, but it gets easier to do the more you do it.

## Teamworking

Don't go chasing ~waterfalls~ rockstar-unicorn developers.

At least, not if they don't _also_ turn their teammates into rockstar-unicorns. A "talented" developer is less than worthless if they're unable to play nice on a team. In fact, they can become an active detriment and a black-hole-of-suck if they're any sort of toxic.

A team of moderately talented software engineers who can pull together and work well as a unit _always, always, always_ beat out a rockstar.

The rockstar is an island unto themselves, but a solid team is a force to be reckoned with. There's support, there's accounting for each other's gaps, there's camraderie, and there's blessed space and capacity inherent to a good team. They will outperform and outpace any single individual, especially in today's multi-cloud, multi-service, multi-discipline world. There's no possible way an individual can be an expert at _everything_, but a group of solid folks are more likely to get close to that ideal.

And being good at "teamworking" isn't exactly onerous. It requires a modicum of empathy and self-reflection. It requires a little bit of ego-suppression and team-building.

A couple of good guidelines below:

_**Hear folks out, genuinely**_  
If you take the time to listen to somebody — _really_ listen to them — and internalize their message prior to reacting to it, they will almost always be on your side and happy to execute on a vision, even if it goes contrary to their idea. People want to be heard, and they want to know their contributions are valuable. The least we can do is lend an ear.

_**Embrace blameless**_  
Shit happens. And this applies all the more to software. Someone, somewhere is gonna ship a bug; someone, somewhere is gonna break production; heck, someone, somewhere might delete a prod database. Unless the action was malicious and willful, it was a mistake, and it could've happened _to anyone_. 

It is more important to take a systematic approach to reducing those errors and mistakes as opposed to witch-hunting individuals. What tests are we missing in the CI/CD pipeline to prevent production from breaking? What controls and processes were (or weren't) in place to stop somebody from dropping that dang database? Treating the error as a _system_ issue means that when you address the problem _systematically_, it is way less likely to happen. Treating it as somebody's _fault_ means it will likely happen again.

In a blameless culture, folks are forthcoming and sound the alarm early and often — having a healthy application is the goal, not dodging blame.

_**Be kind, not nice**_  
Niceness is not kindness. We should strive to be kind in all our dealings with folks. Kindness does not shy away from hard conversations or problems. Kindness is telling somebody they have a mustard stain on their shirt — niceness is telling them everything is copacetic and "you look so great!". 

You might have to give somebody some direct and clear feedback someday; some hard criticism even. You can deliver this feedback in such a way that enables growth, and brings you and the recipient of the feedback together. 

Or, you can neglect to give the feedback at all, lie to them about how they're performing, and stifle opportunities for a fellow engineer.

## Build your tower

Be technical; always keep learning and practicing and improving your craft. But never forget the fact that technologies (and we) don't exist in isolation. Software — in some shape or form — is for the people. Polish those soft skills so that you can easily navigate and interact in that space.

Keep the people in mind.

[tower]: ../../assets/tower.jpeg
[writingwell]: https://www.amazon.com/Writing-Well-Classic-Guide-Nonfiction/dp/0060891548
[writingcourse]: https://developers.google.com/tech-writing/overview
