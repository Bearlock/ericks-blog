---
title: Self-hosting Stuff
description: A look at running some services locally on your home network
date: 2024-05-06
draft: false
tags: ["code", "infra", "linux"]
---

There comes a moment in every tech-inclined person's life where they look at some service on the internet and think **_"Man, I could host that"_**.

My time is now.

![A very messy server closet][messyserver] *Why can't I hold all of these ~limes~ CAT 6 cables?*

## Pi-hole

`Pi-hole` — the place where ads go to die™

Or as they put it, and maybe with a little less violence, "`Pi-hole` — Network-wide ad-blocking." 

I love my [Pi-hole][pihole]. It has freed me from the grimey clutches of most ads. It can't block YouTube ads, or Hulu ads, but that's because those providers/advertisers are sneaky and serve actual content from the same servers that provide ads. If you block 'em, you also lock yourself out of using their services — Buh-bye cat videos.

I won't get into the minutiae of how I set my stuff up — there are _way_ better guides out there — but I will provide a quick run down.

First, I had a couple of old Raspberry Pis lying around collecting dust and I figured it was time to make one of 'em pay rent. After a bit of googling, I opted to use the [DietPi][dietpi] OS — it's a minimal, optimized Debian image. It provides optimizations for a ton of commonly installed software on Raspberry Pis, and it's dead easy to use/maintain/upgrade without a lot of mucking about. This is perfect for someone who is short on time, harassed by two wonderful, beautiful children under the age of five, and in danger of falling asleep any time there's a lull in the day.

`DietPi` provided a nice 'n' simple UI to install the `Pi-hole` software. I plugged that sucker into my network, updated my router's upstream DNS provider to be the just-hooked-in Raspberry Pi, and I was off to the races.

I'm now living in almost-ad-free nirvana. No but seriously, did you know the average person sees between 4-10k ads a day?

Fuck _that_.

## Jellyfin

The new up-and-comer competitor to Plex/Kodi — [Jellyfin][jellyfin] is a nice 'n' easy to manage/install/maintain "Free Software Media System". It supports movies, shows, music, books, live TV, etc, etc.

My `Jellyfin` setup is pretty vanilla and outta the box.

I use the official Docker image and have it shoved in a `compose.yaml` file alongside the other services I'm hosting. I haven't flown the Jolly Roger in a long time, so my current content-gathering method is buying movies and rippin' 'em to my machine with [MakeMKV][makemkv].

What I'm reeeeaallly liking so far is the plethora of plugins. There's a bunch for every media type; there are some that scrape movie info for you, some that can add posters/fanart as movie thumbnails, others that add a sort of b-roll header to your movie, and still others that will play theme songs and stuff in the background as you browser your movies.

The subtitle plugin is a gamechanger.

## Mealie

[Mealie][mealie] — the recipe manager you never knew you wanted. This thing slices, it dices, it makes _souffle_!

Okay, it doesn't do that but what it does provide is pretty cool:

- It will scrape recipes for you from your favorite website and save it in _its_ database
- It can create and manage meal plans
- It can create shopping lists, both manually and generated from recipes/meal plans.
- It can help manually input your gramma's famous tres leches cake recipe
- It has a freaking API
- It has webhooks! You can hit slack with a payload at a given time, e.g "Hey Dinner today is Pot roast! Don't forget to pull the meat".
- It has both user and group management
- And a ton of other features

This is also deployed in my `docker compose` stack alongside `Jellyfin`.

## Calibre Web

I've got a pretty extensive e-book library and it's a bit of a hassle to share that library amongst folks in my household. _And_ different people in my household have books that I don't, that I can read to broaden my horizons. We've been sending each other `.epubs` back and forth, but that can be hard to track and annoying to do over and over.

Enter [Calibre Web][calibreweb].

It's a clean and pretty UI built over and around a [Calibre Library][calibre] DB (with some added features). It has an admin interface, shelf creation, book upload, user management, etc. It's a crazy convenient way to have a shared home book library with a lot of quality of life features that levels up my enjoyment of both books and self-hosted services.

## Caddy

[Caddy][caddy] is a dead simple http server. And it's kinda my missing networking piece. I'll be honest, I've been an idiot for a _long_ time. I've been telling folks in my household to access all these cool self-hosted services by uh, by their IP address + port combination. 

"Oh, you wanna watch movies? Just go to 192.168.1.22:8096!"

Needless to say, this is borderline user-hostile.

I remembered that I can use my `Pi-hole` to set custom DNS resolution (duh, it's my DNS server). I can make `jellyfin.local` resolve to the IP address of the machine that hosts all my services, i.e, `jellyfin.local => 192.168.1.77`. This is awesome, however, I couldn't resolve traffic to specific ports. This is where Caddy shines.

In my very naive self-hosting stack, Caddy acts as the ~gatekeeper~ reverse proxy. Here, peep this `Caddyfile` for a full example:

```
http://books.local {
  reverse_proxy calibre-web:8083
}

http://jellyfin.local {
  reverse_proxy jellyfin:8096
}

http://mealie.local {
  reverse_proxy mealie:9000
}
```

Note: `jellyfin`, `mealie`, and `calibre-web` are all the names of services I'm propping up alongside `Caddy` in the same `compose.yaml`. If you don't know anything about Docker networking, know that it provides some niceties like being able to refer to other services in the same `compose.yaml` by their service name instead of an IP address. If that _weren't_ the case, `mealie:9000` in the `Caddyfile` above would instead look something like `172.30.1.3:9000` (or however Docker does its internal subnetting).

So if we connect both concepts together (`Pi-hole` custom DNS resolution + `Caddy` reverse proxyin'), I have my own set of custom and user-friendly domains to provide to folks. Instead of an `<ip addr>:<port>` combo, I can tell folks to go to `books.local`; The `Pi-hole` will direct traffic to the right machine, and then `Caddy` will direct traffic to the right service/container.

## Docker

All my containerized services are brought up together using `docker compose` — it acts as my pseudo-orchestration layer. It's been a simple way to create this amalgam network of useful local services. There is a little bit of know-how needed up front to take full advantage of it (personally, I got the know-how from using it at work). 

Anybody who's a neophyte in this space should take a few minutes to read Docker's docs on best practices, how networking works in the `compose` space, etc.

## What's next?

And that's it for now. I'm going to ~hoard~ onboard any other services that prove to be useful. The next steps here are:
- How do I provide safe _external to my network_ access to these services? (Dynamic DNS with port-forwards? Tailscale VPN tunneling?)
- The setup is all very thrown together; how can I automate it?
- How can I back this up?
- How can I optimize my compute?
- How can I scale this if the need arises?
- How long can I depend on `docker compose`/when do I need to `K8s'ify` this stuff?

And a bunch of other things experts in the space have figured out long ago.

[messyserver]: ../../assets/messy-server-room.jpg
[pihole]: https://pi-hole.net
[dietpi]: https://dietpi.com/
[jellyfin]: https://jellyfin.org
[calibre]: https://calibre-ebook.com/
[calibreweb]: https://github.com/janeczku/calibre-web
[makemkv]: https://www.makemkv.com/
[mealie]: https://mealie.io/
[caddy]: https://caddyserver.com/
