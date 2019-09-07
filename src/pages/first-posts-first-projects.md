---
title: "First Posts; First Projects"
date: "2015-12-29"
draft: false
---

First posts deserve a look at my first projects, at least, that's the line of thinking and reasoning that has been bouncing around my head for a bit. I shall declare this my **First Case Study**. The first class that had me cobble together an interactive, non-console, and non-trivial project was my web programming class. The class reinforced some concepts I already "knew" (basic HTML and DOM manipulation) and introduced me to stuff that was kinda magical (HTTP `GET` and `POST` requests, server vs client side storage, cookies, etc). The class was structured in such a way that every week we had a small project, but that project would prepare us and give us the tools/concepts necessary to tackle the semester long final project. The final project itself was supposed to contain a few elements. The primary focus of it was to construct and emulate a board game in-browser along with some basic exploratory and explanatory HTML pages. Up to this point I had built stupid simple websites, but nothing as interactive and involved as using and processing user input in a _game_.

As anyone that has created any type of game (big or small) can tell you, nailing down game logic can be daunting. A game is essentially a system of functions that take user input, process that input, respond to it, and output it again. There have to be a set of clearly defined rules, incentives, and an almost continuous feedback loop of interaction. Even without considering the complexities of taking and processing user input, a game still has to have a way of presenting game data to a user in a specific view in such a way that even the dumbest user can more or less glean what's going on and what's expected of them. A oft used tool is the heads-up-display in many modern games. _The Legend of Zelda: Ocarina of Time_ is a great example of its use; it displayed health via hearts, it kept track of magic through a green magic meter, it kept track of where you were with a map, it displayed how much money you had, and it showed a handy reminder of what buttons mapped to what item/action. Zelda games weren't the first and they won't be the last to implement a HUD. It is a tried and true way to display vital and necessary information to a player.

![Zelda HUD][HUD image]

Credit goes to [IGN][IGN] on this image

Back to the project. Another one of the many requirements for this class and the final project was that I had to display static elements in plain HTML, but all the DOM manipulation and dynamic render of elements and objects had to be done in **g-g-GASP** _JavaScript_.. the most nefarious of languages. I mean, maybe, to some people. I'm not actually in that camp. JavaScript is just another tool to me. I understand the reservations people may have on certain technologies, why [JavaScript (super-duper-uber-no-really-stop) sucks][JavaScript sucks], and why they wouldn't use it. I also acknowledge that the current web development landscape is littered with the decaying corpses of JavaScript framework after JavaScript framework (lookin' at you GWT); As a side note, some good points are made about framework viability and longevity by Bitovi [here][Bitovi JavaScript]. I understand how all of this contributes to someone not wanting to touch the potential Frankenstein's monster that is JavaScript and that's cool. I totally respect that; however, situations like that make a quote come to mind. Thus saith Bjarne Stroustrup, lauded computer scientist and father of C++:
>There are only two kinds of languages: the ones people complain about and the ones nobody uses.

Truly a visionary for a powerhouse (or [sucky][C++ sucks]) language. Not that we shouldn't strive for perfection and the best language/product/technology possible, just that its really really hard.

After having considered all that was required of me, I had a few thoughts:

1. This was scary and intimidating; I straight up never had a **Semester Final Project** upon which my grade hinged.
2. I hadn't ever made anything like this; it looks involved, it looks hard, and I don't know if I can do it.
3. Seriously though, I don't know if I can do this.

After taking a few deep breaths, focusing my chi, and whispering words of encouragement to myself, I dove into seriously developing this simple game. The game I ended up choosing was Sudoku. My reasoning was that its grid based (hello HTML tables!), I didn't have to program an AI, and player input was relatively simple and limited to the keyboard (no drag and drop elements, no crazy mouse clicks). In retrospect it turned out to be more difficult than I anticipated at the time. I could probably make a prettier sudoku game now, as well as one that randomly generates the board. Actually, I should probably do that and write about my results later. For now, let me break down the game's various pieces.

## The Clock

The clock was an integral piece to the game. Its the closest thing I had to a "score". The clock was merely a timer that kept track of how long one had been playing on a particular board. It looks like this:

```javascript
var f = 0;

// Timer function
function startClock() {
	f++;
  var sec  = f % 10;
  var tSec = Math.floor(f/10) % 6;
  var min  = Math.floor(f / 60) % 10;
  var tMin = Math.floor((f / 60) / 10) % 6;
  var hour = Math.floor(f / 3600) % 24;
  document.getElementById("timer").innerHTML = hour + ":" + tMin + "" + min + ":" + tSec + "" + sec;
}
```

You'll probably see a trend of not pretty code. Past me did his best, but he didn't know much so don't hurt his feelings too much. The code above takes a variable `f`, increments its value, and then proceeds to divide and modulus `f` by various values to roughly gauge time. `f` is a measure of the total seconds elapsed in a game. So, by that logic the line `var sec = f % 10` is really just keeping track of the seconds in the ones place. Each of those variables being declared and set above are really just figuring the amount of seconds that have elapsed and setting the proper place value; e.g 60 seconds is one minute, 3600 seconds is one hour. As you can see, it goes up from seconds until you get to hours. The `startClock()` function starts the clock anytime someone clicks on one of the three difficulty buttons and sticks its values separated by colons within an element in the DOM that I have assigned the id of 'timer'. The code above by itself doesn't actually function as a clock accurately. In order to do so its called upon externally by a `setInterval()` function as follows:


```javascript
time = setInterval(function(){startClock()},1000);
```


_Super_ impressive. The line of code above kinda translates as follows: "Oi Jim, I 'ave a favor to ask you. Could you assign the variable 'time' to a `setInterval()` function? Have that `setInterval()` function call upon an anonymous function and 'ave _that_ anonymous function call upon `startClock()`. Oh, and don't forget to have this 'appen every 1000 milliseconds or so. Let's meet for a pint at Rooney's later. Send the wife and kids my love. Thanks. Yup. G'bye. "

I don't know what that accent above is, but it just feels right. Now, if I recall correctly, the `setInterval()` function can be a bit janky, or at least an average coder's perception of it can be janky. Both `setInteval()` and `setTimeout()` will wait at least 1000ms to fire. There is a subtle difference but important difference between executing **every** 1000ms and waiting **at least** 1000ms before firing. I didn't account for it in my code because its usually nigh imperceptible, but also because lives don't depend on this game. Having this slight discrepancy fits my use case and is within tolerances of error for my Sudoku game. I refuse to engage in premature optimization; to quote another genius:
>Premature optimization is the root of all evil.

I realize that Donald Knuth was referring to speed with his famous quote, but I feel that it can also relate to feasibility.

Oh, another important function to the clock is the ability to actually clear it. It happens whenever a one of the difficulty buttons is clicked and it looks like the following:

```javascript
// Clears clock and interval whenever a new puzzle is picked
function clearClock() {
	clearInterval(time);
	f = 0;
	document.getElementById("timer").innerHTML = 0 + ":" + 0 + "" + 0 + ":" + 0 + "" + 0;
}
```

## Handling Input

Handling input in Sudoku is a challenge.

1. Player needs to be able to input numbers in empty squares
2. Player needs to be able to delete those same numbers
3. Player needs to not be able to delete pre-rendered numbers
4. Player needs immediate feedback as to whether or not your input is legal
5. Player needs immediate feedback on all player input affected by an illegal input

Meeting condition 1:

```javascript

// The events and state changes for the grid
function inputEvent() {

	var cells  = document.getElementsByTagName("td")
	var number = this.value;
	var col    = this.parentNode.cellIndex;
	var row    = this.parentNode.parentNode.rowIndex;
	var cell   = sudokugrid.rows[row].cells[col];
	var bool   = findConflicts(number, row, col);

	if(!bool) {
		cell.firstChild.className = "userinput";
	}
	else {
		cell.firstChild.className = "userinput conflict";
	}

	checkForFixedConflicts(row, col);

	if(filled()){
		if(noConflicts()) {
			gameWon();
		}
	}
}
```

The above code lets you input any number in an empty square. It checks if there are conflicts via `findConflicts()` and changes the class of the square if there are. This change will cause some custom css for the custom 'conflict' class to kick in. It looks like:

```css
.conflict {
	color: transparent;
	text-shadow: 0px 0px 0px #b94242;
}
```

This turns the input text into a sinister red if there is a conflict, otherwise it leaves it a nice and soothing blue. It also has to do a check to see if you fixed any conflicts and if any conflicts exist. If the board is filled and not conflicts exists, the game is won!

Meeting condition 2:

```javascript
// Allows user to erase input
function removeInput() {
	this.value="";
}
```

Short. Simple. Love it. Moving on.

Meeting condition 3:

I'll go over this more when I dig into rendering the game board(s).

Meeting conditions 4 & 5:

```javascript
// Finds conflicts for row, column, and sub-square
function findConflicts(number, row, col) {

	var conflict = false;

	for (var i=0; i < 9; i++) {
		if(i != col) {
			if(sudokugrid.rows[row].cells[i].innerHTML == number) {
				conflict = true;
			}
			else if(sudokugrid.rows[row].cells[i].firstChild.value === number) {
				conflict = true;
			}
		}
	}
	for (var i = 0; i < 9; i++) {
		if(i!=row) {
			if(sudokugrid.rows[i].cells[col].innerHTML == number) {
				conflict = true;
			}

			else if(sudokugrid.rows[i].cells[col].firstChild.value === number) {
				conflict = true;
			}
		}
	}

	// The block for finding conflicts in the sub-square
	var rowSec 		   = Math.floor(row / 3) + 1;
	var columnSec 	   = Math.floor(col / 3) + 1;
	var rowSecStart    = rowSec * 3 - 3;
	var columnSecStart = columnSec * 3 - 3;

	for (var i = rowSecStart; i < rowSecStart + 3; i++){
		for (var j = columnSecStart; j < columnSecStart + 3; j++){
			if(i != row || j != col){
				if(sudokugrid.rows[i].cells[j].innerHTML == number) {
					conflict = true;
				}
				else if(sudokugrid.rows[i].cells[j].firstChild.value === number) {
					conflict = true;
				}
			}
		}
	}

	if(number < 1 || number > 9) {
		conflict = true;
	}

	if(isNaN(number)) {
		conflict = true;
	}

	return conflict;
}
```

The code above is a bit verbose and long, but its concept is rather simple. It checks every value in a column against every value in the same column, and it checks every value in a row against every value in the same row. If the numbers are equal to each other, if numbers less than 1 or greater than 9 were used, or if non-numerical input was shoved into the cell, it'll return true. I had the hardest time figuring out how to find conflicts with the sub 3x3 squares. To this day I think I hit something similar to the [Ballmer Peak][XKCD] except with sleep deprivation.

```javascript
function checkForFixedConflicts(row, col) {

	var conflicts = document.getElementsByClassName('userinput');
	for(var i = 0;i < conflicts.length; i++) {

		var col    = conflicts[i].parentNode.cellIndex;
		var row    = conflicts[i].parentNode.parentNode.rowIndex;
		var number = conflicts[i].value;
		var bool   = findConflicts(number, row, col)

		if(bool) {
			conflicts[i].className = "userinput conflict";
		}

		else {
			conflicts[i].className = "userinput";
		}
	}
}
```


The above code checks for any conflict fixes and changes the game board accordingly.


## Board Render

My static HTML was really tiny. Less than 30 lines:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Sudoku</title>
    <script src="sudoku.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body onload="showGrid()" id = "body">
    <h1 id = "gameName">Sudoku</h1>
    <div id = "commandHub">
      <div id = "difficulties">
        <button type = "button" id = "easy">Easy</button>
        <button type = "button" id = "medium">Medium</button>
        <button type = "button" id = "hard">Hard</button>
        <button type = "button" id = "reset">Reset</button>
      </div>
    </div>
        <div id = "timerBox">
            <div id = "timer">0:00:00</div>
        </div>
    <div id = "table">
    </div>
    <div id = "message">
    </div>
  </body>
</html>
```

This worked as the skeleton for the game. Its got the most important bits and can almost be considered the heads-up-display part of my game. It displays the name of the game, the difficulties available, a timer, and your best score (if one exists). This is in contrast to:

```javascript
// Big function, creates grid, sets best time, sets event listeners
// on difficulty and reset buttons, makes grid cells clickable, etc
// Puzzles are randomly selected after a difficult is set
// There are three puzzles for each difficulty and each are separate
// JSON files. These are loaded up by XMLHttpRequests.
function createGrid(rows, columns, table) {
	if (localStorage.getItem('bestTime'))
	{   retrieved = localStorage.getItem('bestTime');
		console.log(retrieved);
		document.getElementById('message').innerHTML = "Best Time: " + retrieved;
	}
	var t = document.createElement("table");
	t.id = "sudokugrid";
		for(var i = 0; i < rows; i++) {
			var r = t.insertRow(i);
			if ((i + 1) % 3 == 0 && (i + 1) != rows) {
				r.className += " sudokurow bottom";
			}
			else {
				r.className += " sudokurow"
			}

			for(var j = 0; j < columns; j++) {
				c = r.insertCell(j);
				if ((j + 1) % 3 == 0 && (j + 1) != columns)
					c.className +=" right sudokucell";
				else
					c.className +=" sudokucell";
			}
		}

	document.getElementById("table").appendChild(t);
	var cells = document.getElementsByTagName("td");
	var title = document.getElementById("gameName");

	document.getElementById("reset").onclick = function() {
		clearPuzzle();
	}


	document.getElementById("easy").onclick = function() {

		clearClock();

		var localRequest = new XMLHttpRequest();
		var eVal 		 = Math.floor((Math.random() * 3) + 1);
		var ePuzzle 	 = "easy" + eVal + ".json";

		console.log(ePuzzle);

		localRequest.open("GET", ePuzzle, false);
		localRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		localRequest.send();

		var response = JSON.parse(localRequest.responseText);

		for (var i = 0; i < 81; i++)
		{
			cells[i].innerHTML = response[i];
			if(cells[i].innerHTML == " ")
			{
				cells[i].innerHTML = '<input class="userinput" type="text">'
			}
		}

		time = setInterval(function(){startClock()},1000);

		var input = document.getElementsByClassName("userinput");

		for(var i = 0; i < input.length; i++){
			input[i].addEventListener('keyup', inputEvent, false);
			input[i].addEventListener('keydown', removeInput, false);
		}

	}
}
```


The code above renders a 9x9 grid with defined edges every 3 squares except for the last 3 both vertically and horizontally. When a player clicks on a difficulty button 1 of 3 boards is rendered for that difficulty (for a total of 9 boards; 3 for each difficulty). This was my way of getting around needing to program an AI. The player clicks the button, this shoots off an ajax-y `GET` request to the server for a particular board. The boards are saved as JSON files on the server itself and are nothing more than JSON arrays. For reals, one of my hard boards looks like this:

```javascript
["4", " ", " ", "1", " ", " ", " ", " ", "7",
 " ", " ", "8", " ", "9", " ", "5", " ", " ",
 " ", "2", " ", " ", " ", "3", " ", "8", " ",
 " ", " ", " ", "2", " ", " ", " ", " ", "1",
 " ", "8", " ", " ", " ", " ", " ", "9", " ",
 "5", " ", " ", " ", " ", "4", " ", " ", " ",
 " ", "1", " ", "5", " ", " ", " ", "2", " ",
 " ", " ", "3", " ", "6", " ", "4", " ", " ",
 "9", " ", " ", " ", " ", "7", " ", " ", "6"]
```


 They say the best kind of programmer is the lazy programmer, and boy, that functionality above is _lazy_.

## Winning Conditions

In order to win Sudoku there are 2 conditions that need to be met; all squares need to be filled in, and a conflict cannot exist in any square. You got that, you got it in the bag.

```javascript
function filled() {

	var filled = true;
	var cells = document.getElementsByClassName("userinput");

	for(var i = 0; i < cells.length; i++) {
		if(cells[i].value == " ") {
			filled = false;
		}
	}
	return filled;
}

function noConflicts() {

	var conflicts = document.getElementsByClassName('conflict');

	if (conflicts.length == 0) {
		return true;
	}

	else {
		return false;
	}
}
```


After that, the game is won!

```javascript
// Stops timer, gets time, stores it in local storage
function gameWon() {
	var bestTime = document.getElementById("timer").innerHTML;
	localStorage.setItem('bestTime', bestTime);
	var retrieved = localStorage.getItem('bestTime');
	document.getElementById('message').innerHTML = "New Best Time: " + retrieved + "!";
	console.log('Retrieved: ' + retrieved);
	clearInterval(time);
	document.getElementById("timer").innerHTML = bestTime;
}
```


The best time is stored in the client browser's local storage, the timer is stopped, and a little 'best time' message shows up. Not too exciting, but at least it saves your time.

## Conclusion

In retrospect, I shouldn't have been so worried, but sometimes worry is good. It made me work hard at this project and learn as much as I could. Sure, maybe I didn't get enough sleep sometimes, and I thought about crying more than once, but that's all behind me. Tragedy + time = comedy, right? I have been through a metaphorical crucible (Hey! A name for the next big JavaScript framework) and came out refined and better for it on the other side. This really is a project I think I would like to revisit, and maybe write a new case study on. If you've stuck with me this far, thanks!

Try the game [here][Sudoku]  
Check out the code [here][Git Sudoku]

[JavaScript sucks]: https://wiki.theory.org/YourLanguageSucks#JavaScript_sucks_because
[C++ sucks]: https://wiki.theory.org/YourLanguageSucks#C.2B.2B_sucks_because
[Bitovi JavaScript]: http://blog.bitovi.com/longevity-or-lack-thereof-in-javascript-frameworks/
[HUD image]: http://dsmedia.ign.com/ds/image/article/115/1158088/the-legend-of-zelda-ocarina-of-time-3ds-20110328051533345.jpg
[IGN]: ign.com
[XKCD]: http://xkcd.com/323/
[Sudoku]: /sudoku/Sudoku.html
[Git Sudoku]: https://github.com/Bearlock/Sudoku
