---
title: "End of Year Retrospective"
date: "2016-12-27"
draft: false
---

## It's been quite a year

Turns out when school is in session, I'm not the _best_ at keeping this thing updated; my apologies. I feel like that's okay though. I may not be great at keeping on top of this, but I still have a vested interest in maintaining this blog -- at least, when I have some free time (**whoo winter break!**). As usual, and according to the dictates of the universe, I'm busy with school, work, side-projects, friends, video-games; the list goes on. I actually like being sorta busy. I could do without how frantic school makes me feel, but I feel like I can handle everything else and take it in stride. I want more time for this blog, but at the moment I'll invest whatever energy and time I have into it that isn't being sucked up by anything else. It isn't much but it'll do.

As one year ends and another looms just within reach, I think that most of us get a little apprehensive and reflective. Personally I start asking myself some questions like, **"What did I accomplish this year?", "What makes this year different from other years?", "Did I actually do anything important, or did I just kinda coast by?", and "Did I make a difference?"**. It's important to be honest, and I think it's even more important to be honest to one's self; there's too much deception and misinformation in the world already, becoming self-deluding helps no one. So, in that vein, I think its appropriate for me to go over the [resolutions][oldresolutions] I made at the beginning of this year (really, the whole foundation for this blog) and see how well I kept them or if I kept them at all.

## Resolutions

### 1. Go Analog

I feel like I kept to this one pretty well. I spent more time away from purely technical pursuits this year and engaged a bit in cooking and weightlifting. It was... nice. **I think that the field of technology is a fantastic one; it requires and encourages life-long learning, self-reliance, collaboration, abstract thinking in regards to problem-solving, and personal and professional excellence, among a many other things.** However, the technology field is full of churn and change and it can be easy to fall into the trap of adopting and becoming beholden to the newest hotness; the newest Javascript framework/transpiler/library, the newest programming paradigm that's going to dethrone object-oriented programming once and for all, the newest unicorn startup that _will_ change and revolutionize one market or another -- I'm not saying it isn't necessary to keep an eye on these things. It is and you'd be dumb if you don't. However, very few things fundamentally shake up or disrupt our understanding of computer science, software, or technology in general. Most changes are incremental. Thus, it is more important to have solid foundational knowledge first. If one studies Java and knows the ins and outs of Java, one just knows Java and picking up other tools or concepts can be more difficult, but if one has a good foundational knowledge (both in theory and practice) in computer science and technology in general, everything comes together more easily.

In that spirit, going analog helped me find and maintain a good center. Because I took time to engage in other pursuits, I was able to discern what was important to learn and what might not have been as important. It helped me retain a solid core while not falling into the tech churn and it helped me become more particular with what I spend my time doing. Cooking and weightlifting helped me realize how important one's body is in regard to holistic health and learning, and how trying new things is imperative to leading a full life. I make a mean banana's foster now, and I have semi-decent deadlifting form. But, more than helping me become a better a slightly more swole cook, going analog has made me realize that I'm really not all that great at doing things with my hands! There is a definite disconnect between the knowledge in my head and the skill requisite to _make_ a thing. I realized how I need to get out there and try new and uncomfortable things. For example, I wanna be able to make a table someday, but I suck at woodworking. I think that's okay. I'm gonna work at woodworking until I can build a table. This is now my attitude towards doing. I've always been fascinated with the renaissance and renaissance men (or polymaths); I wanna be good -- _at everything_.

### 2. Staying Healthy

I think that this year I've done better than other years, but I am really good at falling off the wagon. I just can't seem to juggle everything else and throw consistent workout sessions on top of it all. I want to and need to, and I think I will (I just need school to be over, ugh). Regardless, I've taken a few baby steps towards the right direction, and I think that's all anyone can ask for. I'm eating a lot more vegetables and fruit and engaging in a more balanced diet overall (shoutout to my fantastic wife), I don't really drink all that often (a beer once or twice a week with dinner, and heavier drinking maybe once every three months), I've _mostly_ abstained from soda (curse you holiday season), and I have a healthier self-image. I really like me; I don't really have any self-loathing and hold myself in high regard, I have just realized that I need to get and stay healthy if I wanna be in my own company for a long while.

### 3. Embrace the Uncomfortable

Ay. Well. Ahem. As uh, as you folks can all see, I haven't done much in the way of writing, at least, writing for this blog. I have engaged in other writing forms outside writing posts for this blog, and those have gone pretty well, but they haven't been very public. That's okay. I can do better. I'm still embracing the uncomfortable by writing this post. And in the vein of being uncomfortable here are two things I have written:

This first writing is just a short mantra/code/creed/something that I wrote with a buddy of mine; it relates to the first item on this list and becoming a polymath.

>_We seek to refine ourselves; to subject ourselves to the fires of the forge of knowledge and the pressures of the crucible of transformation, to temper will with wisdom and to weld ability to understanding. We seek to dispel the impurities of sophistry and to hammer out the spectres of dogma, to willingly bear the weight of the sun. We seek these things to the end of achieving an actualized self, forging bonds of brotherhood, and becoming both a light and waystone for the community._

This second piece is a dumb little poem I wrote, again, sorta relating to the first.

```plaintext
May I remake myself for I am both the marble and the patient maker,
May I quench myself for I am both the fire and the steel thus forged;

May there be shadows at my feet and questions on my brow,

Slake my thirst, but make me thirsty
Sate my hunger, but make me hungry

May I sing songs for I am both the meter and the bittersweet song,
May I perceive light for I am both the blind and the thrice-patient guide;

May I want and be left not wanting,

Grant me power without tyranny,
Embrace me; Wisdom and Epiphany

There is but one within the many and the many are but one,
and thus the course is never-ending; forever may it run
Fulfill the pain of knowing, and taste it free of doubt,
Grasp the fickle tendrils for one can't do without

Plant slow the Red Flower and stoke the flames of yearning skill,
Still know the leaden tower and transmute with burning golden will,

And may your sight never be nocturnal; to always stare and flare at the setting sun,
For this is your song and prayer eternal; to chase and embrace the never-dun
```

Mmm. Palpable discomfort. Yay.

Moving on!

### 4. Learn a New Programming Language

I didn't have the time to really get to learn Haskell this year, but I've actually had to learn to work with a few different programming languages this year.

First and foremost, I got to learn ML, specifically `SML`. This was my first real foray into learning a functional language, and I had to do it in a scholastic setting, but I learned so much.

ML is poetry in motion. Between the pattern-matching function parameters, the functionally pure recursion, the possibility for endless streams (theoretically) ML is one of the most different and interesting languages I've ever had the pleasure of working with. Let's look at this following snippet:

```ml
fun quicksort (nil, _) = nil
|   quicksort (head::rest, f) =
  let
    fun split(nil) = (nil,nil)
    |   split(x::xs) =
          let
            val (lesser, greater) = split(xs)
          in
            if f(x, head) then (x::lesser, greater)
            else (lesser, x::greater)
          end;
    val (lesser, greater) = split(rest)
  in
    quicksort (lesser, f) @ [head] @ quicksort (greater, f)
  end;
```

This is an implementation for a quicksort algorithm I wrote that takes a list and a comparator functon `f`; right away on the first two lines you can see something interesting. If you pass this quicksort function an empty list, it doesn't care what function you pass it after that; it'll return an empty list because it can't quicksort an empty list. However, if you pass it an actual list and a function, it will execute the meat of the function. Not only that, but it expects to be passed a function that takes two list elements and returns a boolean value; it is able to infer this from line 9, `if f(x, head)...`.

Essentially, the function takes the parameters I mentioned above, internally defines a function called `split` that takes a list and will separate that list into two lists called `lesser` and `greater`; then the quicksort function is called recursively on the `lesser` and `greater` lists while appending/merging the results. Those lists act as the partitions and the elements therein become partitioned again and again until the sort is done. Elegantly simple. Call it with a function like `fun lessThan (x, y) = if x < y then true else false;` and boom. Super quick quicksort implementation.

I've had to program with `D` which is like C++'s cooler younger brother. There isn't a lot of community around it unfortunately (I think most folks went with Rust or Go) but the language itself is very similar to C++ with better features.  In the interest of brevity I won't post the code here, but I have 2 programs I think are interesting. The first is a program where I define a 'semimap', essentially a key-value array with nullable values. The second is a program that builds off of the concept of infinite streams like I mentioned with ML above. You can find them [here][git1] and [here][git2].

I've also had to dabble with `Go` which some people think can aptly be named _C: the good parts_. In my opinion, Go is a fantastic language and it works for web and API design as well as a more systems type of programmaing. I had to do a code test once upon a time that would go to a particular shortened URL, download all the zip files present on that URL, extract the zip files, read the resulting XML contents of the extraction, and save what was read to a Redis store so that there are no duplicates. It took me a few sleepless days to pull this off since it was a crash course. Check it out [here][git3].

### 5. Automate

Kinda failed at this. I don't know that I really automated anything in my day to day life. On the brightside of things, I now have 2 Raspberry Pi's as well as a nifty Chromebox. I just had the idea today to make one of those Pi's a [Pi-hole][pihole] so it isn't to late to kinda sorta automate something. Year's not over.

### 6. Learn More Math

I passed my Stats, Database Theory, and Calculus classes this year. I have done my share of math.

### 7. Focus on Security

Sadly security hasn't really been a focus for me. I have taken some pretty good steps, but nothing major. I have a Let's-encrypt SSL cert running on this server and I've started to use 2-factor authentication for some of my more important logins (finally). There is a lot more that can be done however.

### 8. Back Up Data

1. I don't have any daily rotating backup crons running on this server.
2. I don't actively back things up to the cloud anywhere except on occasion.
3. My 2 terabyte external hard drive got reformatted by someone close to me (you know who you are, even if you don't know what you've done) and I lost alllll the data that was on it. So. Yeah. Backing up data has been a total failure on my part. Lesson learned after the reformatted hard drive though.

### 9. Learn More Theory

This last year has achieved this resolution more than any other semester I've had. Between Analysis of Programming Languages, Principles and Patterns of Software Design, Database Theory, etc, my head is reeling with the possibilities of software. I know so much and yet feel like I don't know anything.

### 10. Engage the Arts and Humanities

Well, I completely stopped sketching after a week. It doesn't interest me and I just can't hold to it. I've been playing guitar off and on, but I can't seem to be dutiful with it and fit it into my schedule. I've done more reading and writing lately then in recent memory, so I'll still consider this one a win.

### 11. Learn New Software

No LaTex learning here ;(

### 12. Complete a personal project

I've completed school projects and I've also _kinda_ stuck with this. Not consistently, but my effort counts.

## Conclusions

For the most part its been another whirlwind of a year. I can feel myself getting older and priorities shifting. There is so much I want to do and accomplish and sometimes I don't know if I'll have the time to do it. I think attempting to achieve these resolutions as well as reflecting what I did and didn't do lets me come to terms with my victories and failures and it lets me answer those all important questions I mentioned before. I'm not sure yet what my resolutions will be for next year, but I have a feeling they'll be pretty similar. I'm looking forward and ready to take the next year on; I'm sure it'll be a good and exciting one.

[oldresolutions]: /new-year-new-resolutions/
[git1]: https://github.com/Bearlock/analysis-of-programming-languages/blob/master/module9.d
[git2]: https://github.com/Bearlock/analysis-of-programming-languages/blob/master/partb.d
[git3]: https://github.com/Bearlock/golang/blob/master/nuvi.go
[pihole]: https://pi-hole.net/
