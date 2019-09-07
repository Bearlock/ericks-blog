---
title: "Dabbling in C++ Again"
date: "2017-10-16"
draft: false
---

## C++ is weird

Some people love it and others would rather remove their fingernails with pliers than program in it. I find myself falling in both camps; sometimes at the same time. I have an inkling that my software engineering journey has a lot to do with my feelings towards it. C++ is my... educational progenitor language maybe? Essentially I was forced to use it all throughout my university experience. It was (and continues to be) the language de jour in the CS program at UVU. 

This means that C++ was the vehicle for both my greatest frustrations and my most gratifying triumphs. I was taking my dev baby steps with C++ and it isn't exactly the most nurturing of mothers. 

Sources of frustration included:

- Pointers (of course)
- Pass by reference vs Pass by value
- All the crazy types and function signatures
- Templating (still weirds me out)
- Standard library stuff
- And many more

But, these frustrations also pushed me to learn more and left me with some changes and preferences, especially in retrospect. Some of those include:

- An appreciation for sane data structures
- An appreciation and deeper understanding of operating systems
- A preference for static typing when I can get it
- A hope and prayer that I will never have to define and use my own memory pools outside of an assignment that one time
- An aversion to side-effect heavy functions (especially coupled with parameters passed by reference. If you're changing your data, return a value;  old conventions be damned.)
- A basic understanding and healthy fear and respect of pointers

At this point in time I'm attending my last class and my last semester before I graduate. My last few classes have been rather language agnostic, or the focus hasn't been on C++. Things are different this semester in my Software Testing and Quality Assurance class. We're required to use C++ in any code related assignment. I have to admit, I was filled with a little dread; the last project I wrote in C++ was more than a year ago. Any proficiency or familiarity with the language felt gone. Luckily for me, it turns out that skill in programming depends less on memorizing a language and more on experience, tenacity, strong google-fu, and the ability to RTFM. 

Yesterday I completed step 1 of my most recent assignment in this class. The basic program spec is as follows:

> The main program reads input from a file, and passes three (signed) integers to a function that computes the type of triangle. Besides writing the whole program, your task is to test the function using white box testing techniques.

Seems simple enough. The rest of the assignment is a little more hefty though.

> For the function that computes the triangle type, do the following:
> - Draw a flow graph.
> - Calculate the cyclomatic complexity, and show how you did it.
> - Generate a set of test cases from the flow graph. 
> - Turn in the test cases in a file in the above format. The test case file can be used as input to such a program (both yours and mine!) Expected results shall be documented with a comment line before each test case.
> - Turn in the source code, an executable file, the flow graph and cyclomatic complexity, a short description of how to generate the test cases from the flow graph, and the test case file.

This seems like a great topic for discussion _next time_. For now I'll focus on the C
++ program. 

## Calculating a triangle type

So I know what I have to do now, but what does it all mean? Well, I have to calculate a triangle's type based on three signed integer numbers. Given that information, its a safe bet to assume those numbers represent the three sidelengths of a triangle. There are three different types of triangles that can be calculated given the sidelengths.

1. Equilateral triangle: All the sides are of equal length
2. Isosceles triangle: Two of the sides are of equal length
3. Scalene triangle: None of the sides are of equal length.  

Good definitions to start with. Now it'll be simple to type and classify a triangle, but what exactly determines or defines a **triangle**? Turns out that given some sidelengths, one can determine whether or not they form a valid triangle. Straight from [wikipedia:][trianglewiki]

> **Triangle inequality theorem:**

> In mathematics, the triangle inequality states that for any triangle, the sum of the lengths of any two sides must be greater than or equal to the length of the remaining side. If x, y, and z are the lengths of the sides of the triangle, with no side being greater than z, then the triangle inequality states that z <= (x + y) with equality only in the degenerate case of a triangle with zero area.

The pertinent portion of the theorem (I'm not gonna worry about a degenerate zero area triangle) is `the sum of two sides have to be greater than the hypotenuse` (longest side). From this (and common sense) it's apparent that the minimum length for a triangle sidelength is anything >= 1. Interestingly enough, 1 as a side length would only work for isosceles triangles.

## The program

To recap, I now know what the types of triangles are, the criteria for those types, and what determines whether or not something is a valid triangle. This should be enough information and criteria to get me started programming. A high level overview of the program would look something like this:

```cpp
Triangle identifier program

- Prompt user for file name
- Get file name
- Open a file stream for reading
- Read file line by line
    - While reading the file determine if the line is a comment or triangle
        - If it is a comment, print out that comment
        - Otherwise assume it is a triangle
            - Sort the triangle sides in ascending order
            - Check if the triangle meets three criteria; sidelengths >= 1, three sides, and that those sides fulfill the triangle inequality theorem (the theorem has some overlap with the other criteria).
            - Return the triangle type (equilateral, isosceles, scalene, 'not a triangle')
- Close file resource
- Exit program
``` 

My program follows this basic structure. Going through the list above, the following snippets fulfill the first three items above:

```cpp
int main(int argc, char* argv[]) {
  ifstream triangleFile;
  string fileName;

  cout << "Welcome to triangle identifier. Please input file name: ";
  fileName = getFileName();
  triangleFile.open(fileName);
```

`getFileName()` looks like this:

```cpp
// Gets input until a valid filename is provided
// Returns filename
string getFileName() {
  string fileName;
  do {
    cin.clear();
    cin >> fileName;

    if (cin.fail()) {
      cout << "Please enter a valid file name" << endl;
      cin.ignore(500, '\n');
    }
  } while(cin.fail());

  return fileName;
}
```

It's a nice simple loop that that tries to get a filename. If it doesn't get a string the fail bit is set. It prints out a helpful message, ignores stuff until a new line, and clears the input buffer to start the process over again.

The next block in main is a small helpful loop if the filename passed in isn't valid for some reason. Starts the file asking process all over. 

```cpp
  while(!triangleFile.is_open()) {
    cout << "That doesn't seem to be a valid file name; try again: ";
    fileName = getFileName();
    triangleFile.open(fileName);
  }
```

After some of the initialization above the program gets into the meat of its purpose through `processTriangle()`:

```cpp
// Processes the passed in file line by line; determines if a line is a comment or triangle
// If comment, prints it out. Otherwise it will sort/push values into a vector and calculate
// The corresponding triangle type; prints out the string.
void processTriangle(ifstream& triangleFile) {
  string fileText;

  while(getline(triangleFile, fileText)) {
    vector<int> triangle;

    if(isComment(fileText)) {
      cout << fileText << endl;
    }
    else {
      triangle = createSortedTriangle(fileText);
      cout << calculateTriangleType(triangle) << '\n' << endl;
    }
  }
}
```

The program checks if the current line being read in is a comment. `isComment()` looks like this:

```cpp
// Returns true if a string starts with '#'
bool isComment(string line) {
  return (line[0] == COMMENT_CHAR);
}
```

If it isn't a comment, the program creates a sorted vector from the current line. `createSortedTriangle()` does the following:

```cpp
// Sorts a vector representation of triangle side lengths in ascending order
// Returns the sorted triangle vector
vector<int> createSortedTriangle(string fileText) {
  int side;
  vector<int> sides;
  istringstream fileTextStream(fileText);

  while(fileTextStream >> side) {
    sides.push_back(side);
  }

  sort(sides.begin(), sides.end());
  return sides;
}
```

As a sidenote `istringstream` is a handy dandy. It transforms a string into an input stream and enables one to read values from it and push those values into variables (just like you would with `cin`!) 

Finally the program gets to the point where it calculates a triangle with `calculateTriangleType()`:

```cpp
// Wrapper function for some of the boolean functions above; determines triangle type
// Returns a string with triangle type
string calculateTriangleType(vector<int> triangle) {
  if(isTriangle(triangle)) {
    if(isEquilateral(triangle)) return printTriangle(triangleString(triangle), "equilateral!");
    if(isIsosceles(triangle)) return printTriangle(triangleString(triangle), "isosceles!");
    return printTriangle(triangleString(triangle), "scalene!");
  }

  return printTriangle(triangleString(triangle), "not a triangle");
}
```

Lots of if statements here checking lots of boolean functions. 

```cpp
// Checks each side to verify minimum length >= 1
bool isValidLength(vector<int> sides) {
  return (sides[SIDEA] >= MIN_LENGTH || sides[SIDEB] >= MIN_LENGTH || sides[HYPOTENUSE] >= MIN_LENGTH);
}

// Checks if the passed in triangle has 3 sides
bool hasValidSides(vector<int> sides) {
  return sides.size() == REQ_SIDES;
}

// Returns true if the 2 sides are longer than longest sides
bool fufillsTriangleInequality(vector<int> sides) {
  return (sides[SIDEA] + sides[SIDEB]) > sides[HYPOTENUSE];
}

// Returns true if all conditions above are fulfilled
bool isTriangle(vector<int> sides) {
  return isValidLength(sides) && hasValidSides(sides) && fufillsTriangleInequality(sides);
}

// Returns true if 2 sides are the same
// Expects integer vector with three sides
bool isIsosceles(vector<int> sides) {
  return(sides[SIDEA] == sides[SIDEB] || sides[SIDEA] == sides[HYPOTENUSE] || sides[SIDEB] == sides[HYPOTENUSE]);
}

// Returns true if all sides are the same
// Expects integer vector with three sides
bool isEquilateral(vector<int> sides) {
  return (sides[SIDEA] == sides[SIDEB] && sides[SIDEA] == sides[HYPOTENUSE]);
}
```

The comments (and the functions themselves) do a pretty good job of explaining what happens. I could probably do all of these checks inline, but I think its cleaner to break these things out into functions. It reduces `if-else` nesting, it makes the code more legible, and it kinda follows the Unix philosophy of delegating responsibility and having small functions do one thing (and do them well) 

After everything is checked, a few helper functions help construct a string that `processTriangle()` prints out:

```cpp
// Little helper function to convert vector values to string
string triangleString(vector<int> triangle) {
  string tString = to_string(triangle[SIDEA]) + " " + to_string(triangle[SIDEB]) + " " + to_string(triangle[HYPOTENUSE]);
  return tString;
}

// Another helper function to combine triangleString (above) and the calculated type
string printTriangle(string triangleString, string type) {
  return "Triangle " + triangleString + " is " + type;
}
```

The program itself is pretty simple. There isn't any flash, but I think the same could be said for C++. People revile it for its weirdness (there are valid criticisms here) but I think it's mostly a case of people using the wrong tool for the wrong task. C++ is an 'everything and the kitchen sink' type of language. Being unopinionated is both good and and bad; while it doesn't restrict users, this philosophy enables users to write kludges, spaghetti, and plain bad code (the same sort of behavior PHP is famous for). 

If you're looking for a solid, fast, and widely supported systems language, C++ is definitely the tool I would reach for. If you need good UI support or need a simple language to do statistical analyses, use a different language. Use the right tool for the right job.

If you wanna check out the code and the sample input file, check [my github][trianglegit] or peep the source below.

## Triangle Identifier Source Code

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
#include <string>
#include <fstream>
#include <sstream>

using namespace std;

// After the vector is sorted, these are the corresponding indexes
const int SIDEA = 0;
const int SIDEB = 1;
const int HYPOTENUSE = 2;

// Triangles have to have side lengths >= 1 and 3 sides.
const int MIN_LENGTH = 1;
const int REQ_SIDES = 3;

// Comments start with '#'
const char COMMENT_CHAR = '#';

// Checks each side to verify minimum length >= 1
bool isValidLength(vector<int> sides) {
  return (sides[SIDEA] >= MIN_LENGTH || sides[SIDEB] >= MIN_LENGTH || sides[HYPOTENUSE] >= MIN_LENGTH);
}

// Checks if the passed in triangle has 3 sides
bool hasValidSides(vector<int> sides) {
  return sides.size() == REQ_SIDES;
}

// Returns true if the 2 sides are longer than longest sides
bool fufillsTriangleInequality(vector<int> sides) {
  return (sides[SIDEA] + sides[SIDEB]) > sides[HYPOTENUSE];
}

// Returns true if all conditions above are fulfilled
bool isTriangle(vector<int> sides) {
  return isValidLength(sides) && hasValidSides(sides) && fufillsTriangleInequality(sides);
}

// Returns true if 2 sides are the same
// Expects integer vector with three sides
bool isIsosceles(vector<int> sides) {
  return(sides[SIDEA] == sides[SIDEB] || sides[SIDEA] == sides[HYPOTENUSE] || sides[SIDEB] == sides[HYPOTENUSE]);
}

// Returns true if all sides are the same
// Expects integer vector with three sides
bool isEquilateral(vector<int> sides) {
  return (sides[SIDEA] == sides[SIDEB] && sides[SIDEA] == sides[HYPOTENUSE]);
}

// Returns true if a string starts with '#'
bool isComment(string line) {
  return (line[0] == COMMENT_CHAR);
}

// Gets input until a valid filename is provided
// Returns filename
string getFileName() {
  string fileName;
  do {
    cin.clear();
    cin >> fileName;

    if (cin.fail()) {
      cout << "Please enter a valid file name" << endl;
      cin.ignore(500, '\n');
    }
  } while(cin.fail());

  return fileName;
}

// Sorts a vector representation of triangle side lengths in ascending order
// Returns the sorted triangle vector
vector<int> createSortedTriangle(string fileText) {
  int side;
  vector<int> sides;
  istringstream fileTextStream(fileText);

  while(fileTextStream >> side) {
    sides.push_back(side);
  }

  sort(sides.begin(), sides.end());
  return sides;
}

// Little helper function to convert vector values to string
string triangleString(vector<int> triangle) {
  string tString = to_string(triangle[SIDEA]) + " " + to_string(triangle[SIDEB]) + " " + to_string(triangle[HYPOTENUSE]);
  return tString;
}

// Another helper function to combine triangleString (above) and the calculated type
string printTriangle(string triangleString, string type) {
  return "Triangle " + triangleString + " is " + type;
}

// Wrapper function for some of the boolean functions above; determines triangle type
// Returns a string with triangle type
string calculateTriangleType(vector<int> triangle) {
  if(isTriangle(triangle)) {
    if(isEquilateral(triangle)) return printTriangle(triangleString(triangle), "equilateral!");
    if(isIsosceles(triangle)) return printTriangle(triangleString(triangle), "isosceles!");
    return printTriangle(triangleString(triangle), "scalene!");
  }

  return printTriangle(triangleString(triangle), "not a triangle");
}

// Processes the passed in file line by line; determines if a line is a comment or triangle
// If comment, prints it out. Otherwise it will sort/push values into a vector and calculate
// The corresponding triangle type; prints out the string. 
void processTriangle(ifstream& triangleFile) {
  string fileText;

  while(getline(triangleFile, fileText)) {
    vector<int> triangle;

    if(isComment(fileText)) {
      cout << fileText << endl;
    }
    else {
      triangle = createSortedTriangle(fileText);
      cout << calculateTriangleType(triangle) << '\n' << endl;
    }
  }
}

int main(int argc, char* argv[]) {
  ifstream triangleFile;
  string fileName;

  cout << "Welcome to triangle identifier. Please input file name: ";
  fileName = getFileName();
  triangleFile.open(fileName);

  while(!triangleFile.is_open()) {
    cout << "That doesn't seem to be a valid file name; try again: ";
    fileName = getFileName();
    triangleFile.open(fileName);
  }

  processTriangle(triangleFile);
  triangleFile.close();

  return 0;
}

```

[trianglewiki]: https://en.wikipedia.org/wiki/Triangle_inequality
[trianglegit]: https://github.com/Bearlock/software-testing-and-quality-assurance/tree/master/a5
