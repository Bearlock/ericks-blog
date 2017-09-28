---
title: Messing with Lakka and a Chromebox
date: 2016-02-22
slug: messing-with-lakka-and-chromebox
author: Erick Diaz
type: post
---

## What to do

One of the biggest issues I face when I get a new project-computer or toy is the dilemma of picking what to do with it. The computer itself is a blank slate; truly a paragon of hope, and possibility. It gets to the point where I get overwhelmed with all the choices I have. There are quite literally [hundreds][piprojects] of [projects][lmgtfy] that I drown in the fractals of choice.

Recently I became the happy owner of both a Raspberry Pi model B and an Asus Chromebox (my wife is pretty great). Paralyzed by choice, these computers sat in their boxes for some time (really just a few weeks, but still). I did do the whole 'I-got-a-new-toy-so-now-I-have-to-show-it-off' thing and post pictures of them on twitter.

Asus Chromebox
![Asus][chromebox]

Raspberry Pi
![Raspberry][pi]

<sub><sup>Aren't they beautiful?</sup></sub>

Luckily I had an inkling of what I wanted to achieve with the Chromebox. To my lament however, I still have no idea what I wanna do with the pi. For now, its a fantastic learning tool which I'm sure I will force upon my brother, wife, and anyone else that I think can benefit from tinkering. I honestly think the best way to learn something new (in regards to tech and programming anyway) is to do a little research, but mostly dive right in. Make something work, break things, learn how to fix it and why it broke. Breaking something and fixing it has been one of the best teachers I could ask for.

## Emulation station

I've always been a big fan of video games.

Most of my early childhood was spent playing and trying to figure out video games. My mother worked at a Deseret Industries (the Utah equivalent of a Goodwill) and as such, she usually got first dibs on stuff people donated. She would often purchase these second hand donated treasures and surprise me with them. My very first console was an NES. I remember playing classic games such as Super Mario Bros. 1, 2, and 3, Ninja Gaiden, Ghosts 'n' Goblins, but also games that felt more like fever dreams (Joust anyone?)

My video game journey started there, and over the years I've owned quite the collection of consoles; I'm a fan and I'm smitten. Good video games have the same effect that good books have on me; I want to continue, I want to know what's gonna happen, I hunger for lore and progression. But there is also a technical side to it that I'm such a fan of. Street Fighter is really just a big game of pressing the right button combinations at the right time, but its one of my favorite games. The best video games in my mind marry good narrative and story to good gameplay and controller feel.

All of this of course, lead to the logical conclusion that the current best use for the Chromebox was to turn it into an emulation station; this is great, I made a decision. But unfortunately decisions tend to lead to more decisions. If you're not aware, there are quite a variety of different emulation-specific operating systems out there each with their own pros and cons. I didn't want to get bogged down in making this decision - so I did a minimal amount of homework for what I wanted to achieve. My requirements are as follows:

1. Works with most USB enabled controllers; I happen to have a nifty afterglow controller for the Xbox One that I wanna use.
2. Stupid easy setup. I've read the horror stories about setting up RetroPi; I don't wanna deal with that.
3. With 4 gigs of RAM, it should be able to play most pre-millenium games with ease. No lag, no loss of fidelity. ([specs][chromespecs] in case anyone wants to see 'em)

With that being said, I decided to try out [Lakka][lakkaos].

## Brass tacks

Finally a decision has been made and its time to get down to brass tacks.

I had originally considered this project for my Pi, but according to [Lakka's hardware support page][hardware] there were some downsides to this. Plus, if you look under generic PC, it looks like you (intuitively) get the most bang for you buck. A point goes to Chromebox. At this point it was time to investigate how to actually get Lakka onto the Chromebox. It came shipped with ChromeOS which I didn't need. I need to be able to boot directly into Lakka. After some googling I came upon the [Kodi][kodios] wiki that had a nifty section on [Chromebox][kodichrome]. Kodi was another project I was considering; check it out, its cool!. Turns out that the Chromebox had a write-protection screw that I needed to remove. I wish I had taken a picture of the guts, but Kodi provided that for me as well. Looks like this:

![inside chromebox][chromeguts]

Along with the above results, my google-fu took me to a useful Hacker News [comment][hackernews]. I decided to do as the commenter suggested and follow along with most of the Kodi setup. First we needed to get into the developer console which involved a paperclip and good timing.

![devconsole][chromeosdevconsole]

<sub><sup>I apologize for this set of poor quality images. Peep my assistants.</sup></sub>

After that, we had to curl a tool called EZ Setup Script originally developed for getting Chromebox to work with Kodi. Turns out it totally works for getting any custom OS onto the Chromebox (Sidenote: I had to make sure that Wifi was set up on the Chromebox, but not go further in the install)


![scriptcurl][EZscriptcurl]

<sub><sup>Gotta love curl</sup></sub>

After getting the script on there were a few things that had to be done:

1. Update boot options to prefer USB boot; makes updating easier.
2. Update the BIOS
3. Flash a new custom firmware onto the Chromebox. (Scary, could potentially brick.)
4. Install Lakka

Here is what the corresponding script looks like:

![betterscript][kodiscript]

Updating the boot options, updating the bios, and flashing the new firmware was made incredibly easy by this script. I was worried that this was going to be a much more complicated process, but everything was sailing by smoothly at this point. I already had a live CD-ish version of Lakka on a flashdrive, so at this point it was a matter of plugging in the drive, rebooting, and crossing my fingers.

![osinstall][lakkainstall]

Hey would you look at that; looks like everything is on track. The fruits of my labor appear to be well on their way. (Fruit is appropriate. Apparently _lakka_ means _cloudberry_ in Finnish. Who knew?)

## The (Semi) Finished Product

Check this out:

![gui][lakkagui]

Its installed! Everything worked out in my favor this time. I didn't have to spend hours debugging things or fixing what I inevitably broke. I'm calling this a straight up victory. So far I've accomplished what I've set out to do. Except I haven't. There aren't any sort of games on this thing yet. That'll be another thing I'll have to do, as well as read into controller mappings as well as try to find out what exactly each menu item does (there are a surprising amount). But, I'm happy. This is great, and will probably be the first of many projects. Thanks for reading!

[piprojects]: https://hackaday.io/projects/tag/raspberry%20pi
[lmgtfy]: http://lmgtfy.com/?q=raspberry+pi+projects
[chromebox]: https://pbs.twimg.com/media/Cau1we8VAAA7VdA.jpg:large
[pi]: https://pbs.twimg.com/media/CafmriCUkAA-xkI.jpg:large
[chromespecs]: http://www.amazon.com/gp/product/B00K048H7E?psc=1&redirect=true&ref_=oh_aui_detailpage_o02_s00
[lakkaos]: http://www.lakka.tv/
[hardware]: http://www.lakka.tv/doc/Hardware-support/
[kodios]: https://kodi.tv/
[kodichrome]: http://kodi.wiki/view/Chromebox
[chromeguts]: http://kodi.wiki/images/thumb/a/a5/Inside-chrome1.jpg/590px-Inside-chrome1.jpg
[hackernews]: https://news.ycombinator.com/item?id=10834214
[chromeosdevconsole]: https://erickrdiaz.com/images/chromeosdevconsole.jpg
[EZscriptcurl]: https://erickrdiaz.com/images/EZscriptcurl.jpg
[kodiscript]: https://dl.dropboxusercontent.com/u/98309225/cbox-menu.png
[lakkainstall]: https://erickrdiaz.com/images/lakkainstall.jpg
[lakkagui]: https://erickrdiaz.com/images/lakkagui.jpg
