---
title: "Hacktoberfest Part 1"
date: 2017-10-05T09:01:14-06:00
slug: "hacktoberfest-part-1"
type: post
---

## Fall is here

The weather is getting cooler; leaves are changing color, the wind is picking up, and people are cracking jokes about pumpkin spice lattes left and right. October is here, and with it, 

## Hacktoberfest

![picture][hacktoberfestpic]

If you don't know what that is, here is a short snippet from the [official Hacktoberfest website][hacktoberfestUrl]

> Hacktoberfest is a month-long celebration of open source software

Simple enough explanation. I decided to participate for a couple of reasons:

- I've been using open source software since the beginning of my career; its nice to give back.
- Open source software is driven by community engagement; projects live or die because of engagement.
- Reading code is just as beneficial (if not more) as writing code; exposure to other code is a good learning experience. 
- Having my code reviewed and scrutinized leads to better quality code; constructive critiques make me a better dev. 

All good and noble reasons but also if I open 4 pull requests I can get a free T-shirt... if I can't do that, I still get stickers.

> Support open source and earn a limited edition T-shirt.

With all of this in mind I started to search around for projects I could  contribute to. This was a little difficult. I'm a little shy and some projects feel like they are outside of the scope of my abilities. Not only that, but several of the `hacktoberfest` tagged projects were things I didn't use myself, and would take me a bit of time to ramp up; there were also several people already scrambling to grab those low hanging fruit. All of these obstacles conspired against me. I could've pored through some docs and edited them for particular tools or frameworks, but since this was my first Hacktoberfest, I wanted to `*~*~make a difference~*~*`(TM). Its at times like these that having friends or a community is nice. People within my circle probably/definitely had needs and I could help address them. 

## Enter Rosa

Rosa is the brainchild/pet project of a [friend of mine][tophat]. He wanted to learn Ruby _and_ use it in a real world setting. `Rosa` at its core is a homebrewed ticket/queue management system; I saw the old system, and Rosa is a million times better than the C++, C, and PHP franken-monster that they were using. Rosa works so well that his team unanimously ditched the old tool (aptly named Igor) and immediately started to use Rosa. To be honest, I'm pretty proud. My buddy is a Linux systems wizard and genius by trade, and was able to code and push out a working tool into a production environment at his work, something traditionally outside of his wheelhouse.

Rosa is great but code always has room for improvement. I do a lot of node/js at the current company I work at and thought I could improve on some of the javascript in Rosa. First thing I tried my hand at was improving `collapsible.js`; a little js utility to collapse and expand elements. My changes don't really alter functionality, but rather refactor the code from an imperative style to a more declarative style. 

## Rosa code

```
// Function to allow for collapsible content
function collapsible(idHash) {
    $.each(idHash, function(key, value) {
        var elements = $(document.getElementById(key)).next().children();
        for (var i = 0; i < elements.length; i++) {
            var child = elements[i];
            if(value){
                child.style.display = '';
            } else {
                child.style.display = 'none';
            }
        }
        if (!value){
            $(document.getElementById(key)).append($('<sup class="supersup">collapsed</sup>'));
        } else {
            $(document.getElementById(key)).find('sup').replaceWith('');
        }
    });
}

// Jquery to impliment collapse on proper click and with cookie
document.addEventListener("page:change", function() {
    if($('#collapsible').length){
        idHash = {};
        ids = [];
        $(".collapsible").each(function() {
            id = $(this).attr('id');
            ids.push(id);
        });
        for (var i = 0; i < ids.length; i++) {
            var collapsibleIdCookie = readCookie("collapsibleId" + ids[i]);
            var expansionCookie = readCookie("expansion" + ids[i]);
            // convert cookie text back to boolean
            if (expansionCookie == "false"){
                expansion = false;
            } else {
                expansion = true;
            }
            if (collapsibleIdCookie){
                idHash[collapsibleIdCookie] = expansion;
            }
        }
        // make sure cookie exists then run through function with cookies
        if (idHash){
            collapsible(idHash);
        }

        $(".collapsible").click( function(){
            idHash = {};
            ids = [];
            id = $(this).attr('id');
            ids.push(id);
            // setting cookies and toggling expansion
            document.cookie = "collapsibleId" + id + "=" + id + ";";
            var expansionCookie = readCookie("expansion" + id);
            if (expansionCookie == "false"){
                expansion = false;
            } else {
                expansion = true;
            }
                expansion = !expansion;
                document.cookie = "expansion" + id + "=" + expansion + ";";
                idHash[id] = expansion;
                collapsible(idHash);
        });
    }
});
```

### Right away there were a few things I honed in on:

1. Lots of flow of control statements (for loops, if-else, etc)
2. String concatenation in a few places
3. Attempts at parsing a string value and converting it to its boolean equivalent

### Why I wanted to change those things above:

1. I don't really like for-loops; they're bug prone, there is a lot of boiler-plate code, and they're pretty imperative. Instead of telling the computer **how** to do something, we should be communicating to it **what** we want. Higher-order functions like maps are nice. `map()` iterates over each item in an array; in this case we can use it to side-effect stuff instead of for-loops. Also, [conditionals/ternaries][ternary] are nice when you need to assign a value as a result of an if-else. Less boiler-plate. 

2. String concatenation is fine, but I've gotten used to using [template literals][template] lately. They're more legible to me and you can do some cool stuff through [tagging][tag] them. Also, its easy for the concat (+) operator to become an addition operator if a quotation mark is forgotten somewhere, e.g `"5" + "3"` will return `"53"` but `5 + 3` will return `8`. Best to avoid the possibility all together. 

3. The main snippet of code I'm addressing:

```
if (expansionCookie == "false"){
    expansion = false;
} else {
    expansion = true;
}
```

It feels... a little hacked together or incomplete; maybe unnecessary? If you don't know, Javascript has two main comparison operators `==` and `===`. `===` is a stricter comparison operator and usually the one recommended. `==` can do weird things if you're not expecting it or used to it, namely, coverting the operands on either sides to the same type. This is why `1 == "1"` returns true (type coversion) but `1 === "1"` returns false (strict comparison). 

### How I want to change these things

First, as I indicated above, I replaced all the for-loops with maps and some of the if-else assignment blocks into conditionals. We go from this:

```
for (var i = 0; i < elements.length; i++) {
    var child = elements[i];
    if(value){
        child.style.display = '';
    } else {
        child.style.display = 'none';
    }
 }
```

to this:

```
// Use 'map' to iterate over elements instead of for-loop and use ternaries to assign conditional values
elements.map((element) => {
    value ? element.style.display = '' : element.style.display = 'none'
});
```

A little shorter and hopefully a little more legible. 

Secondly, All the template literals. We go from this:

```
document.cookie = "collapsibleId" + id + "=" + id + ";";
```

to this:

```
document.cookie = `collapsibleId${id}=${id};`;
``` 

This change is a little more compact, but still a little rough to read in my opinion; probably because of the sequential semi-colons at the end. 

Lastly, I decided to break this out into its own function. The code above is merely doing that coversion, assigning it to a variable, and using that variable somewhere else. A function can encapsulate that behavior and just return the right boolean value. 

We go from this:

```
if (expansionCookie == "false"){
    expansion = false;
} else {
    expansion = true;
}
```

to this:

```
function parseBool(stringVal) {
    return !(stringVal === false || stringVal === "false")
}
```

Hooray reusability. Essentially if the passed in value is `false` or `"false"` this will return `false`! Anything else and it'll return true so its best to program contractually and ensure the value being passed in is indeed a boolean or "true"/"false". 

There's a few other things I changed, here is the body of my pull request:

    # What this changes
    This pull request is mostly a refactor; doesn't change the business logic or end result, but it does change how we get there. Some notable changes are:

    - The introduction of [arrow functions](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/) syntax 
    - Eliminating for-loops in favor of `map()` [Click here for a good explanation why](https://jamison.dance/11-06-2015/dont-write-for-loops)
    - Writing a `parseBool()` function that will evaluate `false` or `"false"` and return... false if true.
    - Using jQuery when dealing when manipulating DOM or listening to events (Note: could probably change `document.addEventListener` to `$(document).on("page:change", function() {})`)
    - [Conditionals/Ternaries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to assign conditional values
    - [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation

    and a smattering of others. 

And here is the rest of my code:

```
// Function to allow for collapsible content
function collapsible(idHash) {
    $.each(idHash, (key, value) => {
        let elements = $(`#${key}`).next().children();

        // Use 'map' to iterate over elements instead of for-loop and use ternaries to assign conditional values
        elements.map((element) => {
            value ? element.style.display = '' : element.style.display = 'none'
        });

        value ? $(`#${key}`).find('sup').replaceWith('') : $(`#${key}`).append($('<sup class="supersup">collapses</sup>'));
    });
}

// Parses some value; if its "false" (string) or false (boolean) returns false
function parseBool(stringVal) {
    return !(stringVal === false || stringVal === "false")
}

// Jquery to implement collapse on proper click and with cookie
document.addEventListener("page:change", function() {
    if($('#collapsible').length){
        let idHash = {};
        let ids = [];
        let id;

        $(".collapsible").each(function() {
            id = $(this).attr('id');
            ids.push(id);
        });

        ids.map((singleId) => {
            let collapsibleIdCookie;
            let expansion = parseBool(readCookie(`expansion${singleId}`));
            if (collapsibleIdCookie = readCookie(`collapsibleId${singleId}`))  idHash[collapsibleIdCookie] = expansion; 
        });
        
        if (idHash) collapsible(idHash);

        $(".collapsible").click( function(){
            idHash = {};
            ids = [];
            id = $(this).attr('id');
            ids.push(id);

            // setting cookies and toggling expansion
            document.cookie = `collapsibleId${id}=${id};`;
            expansion != parseBool(readCookie(`expansion${id}`));

            document.cookie = `expansion${id}=${expansion};`;
            idHash[id] = expansion;
            collapsible(idHash);
        });
    }
});
```

I think this was a success. I learned much about my friend's code, I feel like I made meaningful changes, and it has convinced me that I should work on other parts of Rosa.

[hacktoberfestUrl]: https://hacktoberfest.digitalocean.com/
[hacktoberfestpic]: /../images/hacktoberfest.png
[tophat]: https://twitter.com/tophat__
[ternary]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
[tag]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings#Tagged_template_strings
[template]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
