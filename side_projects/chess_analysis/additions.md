
I want to create a button that detects the previous chess table ID.

```html
   <button onclick="toggleBoard()">Toggle Board</button><br>
    <button onclick="toggleBoard('chess5')">Toggle Board</button><br>

```

```js
    function toggleBoard() {
      var chessTable = document.getElementById("chess1");
      var tfoot = chessTable.tFoot.textContent;
      
      console.log("Tfoot value of table with id 'chess1':", tfoot);
    }
```


how do I create a button to go to the id of a page in javascript?

```html
<button onclick="scrollToElement('targetElement')">Go to Target</button>

<!-- Your page content -->
<div id="targetElement">
  <!-- Content you want to scroll to -->
</div>
```

```js

function scrollToElement(elementId) {
  const element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}


```

rewrite the button to  fit in a nav bar with <li>

```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#" onclick="scrollToElement('targetElement')">Go to Target</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<!-- Your page content -->
<div id="targetElement">
  <!-- Content you want to scroll to -->
</div>
```

```js

function scrollToElement(elementId) {
  const element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

```


rewrite using <li>


```html
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#" onclick="scrollToElement('chess6')">Go to Target</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<!-- Your page content -->
<div id="chess6">
  <!-- Content you want to scroll to -->
</div>
```

```js
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);

  if (element) {
    event.preventDefault(); // Prevent default link behavior
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
```

how do I look at the javascript variable that is loaded in javascript.js?

```html
<li><a href="#" onclick="scrollToElement(window.gotoID)">Go to Target</a></li>
```



Had to rewrite it:

```js

  let previousScrollPosition = 0;

  function scrollToElement() {
    event.preventDefault(); // Prevent default link behavior
    window.scrollTo(0, previousScrollPosition); 
  }


  function scrollToHome() {
    const element = document.getElementById('myBoard');
    previousScrollPosition = window.pageYOffset; // Store the current scroll position

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  ```

  ```html 
      <li><a href="#" onclick="scrollToElement()">Go to Target</a></li>
```

create a table click event:

```js

var table = document.getElementById('chess4');
table.addEventListener('click', function() {
  table.innerHTML = `
    <table id="chess4">
      <tbody></tbody>
      <tfoot><tr><td>r1bq1rk1/ppp2pbp/3p2p1/4n3/2P5/1P2P3/PB2BPPP/RN1Q1RK1</td></tr></tfoot>
    </table>
    
    <script>
      var tbody = document.querySelector('#chess4 tbody');
      for (var row = 1; row <= 8; row++) {
        var tr = document.createElement('tr');
        for (var col = 1; col <= 8; col++) {
          var td = document.createElement('td');
          td.className = ((row + col) % 2 == 0) ? "white" : "green";
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
    </script>
    <p>move the queen to the second rank to guard against the bishop</p>
      
    <p>hello world</p>`;
});
```

however, I would like it to make the click event possible for every table

obtain the value of tfoot

```js
// Get all the tables with a specific class
var tables = document.getElementsByClassName('chess-table');

// Iterate over the tables and attach the event listener
for (var i = 0; i < tables.length; i++) {
  tables[i].addEventListener('click', function() {
    var tableId = this.id; // Get the ID of the clicked table
    // Your code logic for the table event here
    console.log("Table clicked: " + tableId);
    var tfootTd = this.querySelector('tfoot td');
    if (tfootTd) {
      var content = tfootTd.textContent;
      console.log(content);
    }
  });
}
```


create a new on drop event,
however it was weird how something like this happened.
The way the two lines of code are written is weird at the bottom.s

```js

var board = Chessboard('myBoard', {
  draggable: true,
  dropOffBoard: 'snapback',
  position: 'start',
  snapbackSpeed: 500,
  snapSpeed: 100,
  onDragStart: function(source, piece, position, orientation) {
    // Prevent default browser behavior during drag and drop
    event.preventDefault();
  },
  onDrop: function(source, target, piece, newPos, oldPos, orientation) {
    // Log the new board position
    console.log('New position:', Chessboard.objToFen(newPos));

    // Update the FEN position in the DOM
    document.getElementById('fenposition_1').innerHTML = Chessboard.objToFen(newPos);
  }
});
```

changing the border color


```css
.chess-table:hover {
  border: 2px solid green;
}

.chess-table.pink:hover {
  border-color: pink;
}

```

```html
<table id="chess3" class="chess-table pink">
```

rewrite renderChessboard

```js
var td1 = tables[i].querySelector('tfoot td');
if (td1) {
  var fen = td.textContent;
}
```

But first: how do I declare tableId as a variable? function renderFlippedChessboard(fenString, tableId) {
  var td1 = tableId.querySelector('tfoot td');
  if (td1) {
    var fen = td.textContent;
  }

```js
function renderFlippedChessboard(fenString, tableId) {
  var table = document.getElementById(tableId); // Get the table element using the tableId variable
  
  var td = table.querySelector('tfoot td'); // Query the <tfoot> element within the table

  if (td) {
    var fen = td.textContent; // Retrieve the FEN string from the <td> element
    // Rest of your code logic here...
  }
}
```

Making the scroll smooth 

```js

function scrollToHome() {
  //added prevent event.default
  event.preventDefault(); // Prevent default link behavior
  // so it goes to the part of the page

  const element = document.getElementById('myBoard');
  const delay = 100; // Delay in milliseconds (adjust as needed)
  previousScrollPosition = window.pageYOffset; // Store the current scroll position

  if (element) {
    setTimeout(function() {
      element.scrollIntoView({ behavior: 'smooth' });
    }, delay);
  }
}

```

and add scrollToHome() to table.eventlistener

adding two columns under the CSS flexbox

```css
/* container */
.two-columns-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

/* columns */
.two-columns-grid > * {
    padding:1rem;
}

```
https://matthewjamestaylor.com/2-column-layouts#static-2-column-grid


adjusting the code to two columns:

previously:

had to adjust main instead of div class two-columns grid, because I had too much white space
so made main to have 4 columns

```css

  main {
    display: grid;
    grid-template-columns: 3fr 1fr; /* Adjusted to have four columns */
    column-gap: 20px;
  }
  
  ```

Pretty much now the code is to adjust 

```html
<main>
<div class="two-columns-grid">
  <div>1st column</div>
  <div>2nd column</div>
</div>
    <aside class="sidebar">
      <p>other links</p>
    </aside>
</main>
```

And adjust 
```css
@media screen and (min-width: 70em) {
  main {
    display: grid;
    grid-template-columns: 3fr 1fr; /* Adjusted to have four columns */
    column-gap: 20px;
  }
  
  .two-columns-grid {
    grid-column: 1 / span 3; /* Span three columns */
  }
  
  .sidebar {
    grid-column: 4; /* Place in the fourth column */
  }
}

/* container */
.two-columns-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* columns */
.two-columns-grid > * {
  padding:1rem;
}


```

I need to get the position of an element with indexOf

```JS

var sample_list = [0,1,2,3]

sample_list.indexOf(1)
// will return 1

```

A reminder of scope and global scope. What is the difference between var counter_ = 0 and counter_ = 0:

To summarize, the main difference between var counter_ = 0; and counter_ = 0; is the scoping behavior. The var declaration explicitly declares the variable within its scope, while the absence of any declaration keyword (counter_ = 0;) implicitly declares the variable as global if it's not already declared within a narrower scope. Additionally, var allows the variable to be hoisted, while the implicit declaration does not.




adjust the board

```css
.board {
    width: 400px;
    margin: auto;
    position: fixed;
    top: 50px; /* Adjust this value as needed */
}
```

Readjust to include the board and some other <p> descriptions like FEN and board #

```html

 <div id="storeBoard">


```
However, when you make the position fixed, it gets moved because:

When you use position: fixed; on an element, it takes the element out of the normal document flow and positions it relative to the viewport instead of its parent container. By default, a fixed-positioned element is aligned to the left side of the viewport.

So adjust with 

```CSS

#storeBoard {
  position: fixed;
  left: 25%;
  transform: translateX(-50%);
  top: 150px;
}

```


I would like to add a right and left arrow to toggle the board.s

```JS
$("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
     counter_ = counter_ - 1
     if (counter_ < 0) {
        // Reset the counter to 0
            counter_ = 0;
     }
     board.position(listOfFenPositions[counter_])
    }
    else if(e.keyCode == 39) { // right
     counter_ = counter_ + 1
     //var table1 = document.getElementsByTagName('table')[1];
     //var second_var = table1.rows[counter_].cells[0].textContent
     counter_++;

  // Check if counter exceeds the number of elements in the list
    if (counter_ >= listOfFenPositions.length) {
    // Reset the counter to 0
        counter_ = 0;
    }
    
     console.log(counter_)
     board.position(listOfFenPositions[counter_])
    }
  });
  ```

And what happens when the counter_ goes beyond the list? 

```JS
// Assuming you have a list of elements with the variable `list`
var list = [/* elements of the list */];
var counter_ = 0;

// Add event listener to the click event (you can modify the target element as needed)
document.getElementById("your-button-id").addEventListener("click", function() {
  // Increment the counter
  counter_++;

  // Check if counter exceeds the number of elements in the list
  if (counter_ >= list.length) {
    // Reset the counter to 0
    counter_ = 0;
  }

  // Rest of your code or actions based on the updated counter value
});

```

I want to get the board position of a board on the right, how would I do that? 

Through tooltips?

No through a mouseover event:

```html
<div class="chess-table">Hover over me!</div>
<div id="output"></div>

```

```JS
var chessTable = document.querySelector('.chess-table');
var output = document.getElementById('output');

chessTable.addEventListener('mouseover', function() {
  // Perform an action when the element is hovered over
  output.textContent = 'Hovering over the chess table!';
});

chessTable.addEventListener('mouseout', function() {
  // Reset the action when the mouse leaves the element
  output.textContent = '';
});

```


How does this work?

 window.innerHeight

 window.pageYOffset


dealing with scrolling issues:

So I looked up:

https://stackoverflow.com/questions/5007530/how-do-i-scroll-to-an-element-using-javascript

document.getElementById("chess1").scrollIntoView(); but there is a header and nav that is fixed, is there a way that it can use the bottom of the nav as the top of the page? and pasted how the header and nav looks like

returns 

```js
function scrollToElement() {
  var header = document.getElementById("header1");
  var nav = header.querySelector("nav");
  var element = document.getElementById("chess1");

  var headerHeight = header.offsetHeight;
  var navHeight = nav.offsetHeight;

  var scrollPosition = element.offsetTop - headerHeight - navHeight;
  window.scrollTo({
    top: scrollPosition,
    behavior: "smooth"
  });
}
```

Not sure about how it works, In this example, the scrollToElement() function is assumed to be triggered by the "Go to board" link inside the nav.

Make sure you replace "chess1" with the actual ID of your target element.

Also, note that the header variable is obtained using getElementById("header1"), and then the nav variable is retrieved using querySelector("nav") from within the header. This way, you ensure that you're selecting the correct nav element within the header.

When the scrollToElement() function is called, it calculates the scroll position by subtracting the header and nav heights from the element's offsetTop. Finally, window.scrollTo() is used to smoothly scroll to the calculated position.

Lesson, keep finding alternative ways of doing something, because when you use something that is not working, you make it more complicated than it needs to be.



Create distinguishing things: 

There are some boards that do not move. 



```js
window.onload = function() {
  const tables = document.getElementsByTagName('table');
  for (let i = 0; i < tables.length; i++) {
    const td = tables[i].querySelector('tfoot td');
    if (td) {
      const fen = td.textContent;
      listOfFenPositions.push(fen)
      listOfBoardIds.push(tables[i].id)
      renderChessboard(fen, tables[i].id);
      console.log(tables[i].id)
      //returns chess1
    }
  }
}


window.onload = function () {
  const tables = document.getElementsByTagName('table');
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const td = table.querySelector('tfoot td');

    if (table.classList.contains('chess-table')) {
      console.log('chess-table present');
    }

    if (td) {
      const fen = td.textContent;
      listOfFenPositions.push(fen);
      listOfBoardIds.push(table.id);
      renderChessboard(fen, table.id);
      console.log(table.id);
      // returns the id of the table with class "chess-table"
    }
  }

}

```

Added a dropdown menu that you can acces the cells with

```JS

  // create a javascript function called "repopulate_table_drop"
     function repopulate_table_drop() {
        // Get the table and the dropdown menu
      
        var table = document.getElementById("my-table");
        var dropdown = document.getElementById("table_drop");
      
        // Clear existing options from the dropdown menu
        dropdown.innerHTML = "";
      
        console.log(listOfFenPositions.rows.length)
        // Loop through the rows of the table and add options to the dropdown menu
        for (var i = 0; i < listOfFenPositions.rows.length; i++) {
          // Create a new option element
          var option = document.createElement("option");
        
          // Set the value of the option to the index times 10
          option.value = i;
        
          // Set the text of the option to the index plus a period
          option.text = i + ".";
        
          // Add the option to the dropdown menu
          dropdown.add(option);
          }
      
      }
      
      setTimeout(repopulate_table_drop, 2000);
  

```

Adjusting the drop down menu 


```JS


var table_drop_choice = document.getElementById("table_drop");
table_drop_choice.addEventListener("change", function () {
    console.log('hello world')
    first_var = parseInt($('#table_drop').val())
    console.log(first_var)
    counter_ = first_var
    event.preventDefault();
    var header = document.getElementById("header1");
    var nav = header.querySelector("nav");
    var element = document.getElementById(listOfBoardIds[counter_])
  
    var headerHeight = header.offsetHeight;
    var navHeight = nav.offsetHeight;
  
    var scrollPosition = element.offsetTop - headerHeight - navHeight;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth"
    });

    //set adding_info to none
})

```


I want to create an event listener for a green table

so added the class "chess-line"

```JS


// Get all the tables with a specific class
var tables2 = document.getElementsByClassName('chess-line');

// Iterate over the tables and attach the event listener
for (var i = 0; i < tables2.length; i++) {
  tables2[i].addEventListener('click', function() {
    var tableId = this.id; // Get the ID of the clicked table
    // Your code logic for the table event here
    //console.log("Table clicked: " + tableId);
    var tfootTd = this.querySelector('tfoot td');
    if (tfootTd) {
      var content = tfootTd.textContent;
      board.position(content)
      console.log(content);
      //return index of the list
      var matchResult = tableId.match(/\d+$/);
      if (matchResult !== null) {
        counter_ = parseInt(matchResult[0]);
      } else {
        console.log("No match found.");
     }
    }
  });
}
```


Discovering data-value attribute

```js

// Get all the tables with a specific class
var tables3 = document.getElementsByClassName('chess-line purple');

// Iterate over the tables and attach the event listener
for (var i = 0; i < tables3.length; i++) {
  (function(index) {
    tables3[index].addEventListener('click', function () {
      // ... your event listener code ...
      var firstTd = tables3[index].querySelector('td[data-value]');
      if (firstTd) {
        var dataValue = firstTd.getAttribute('data-value');
        counter_ = parseInt(dataValue);
        document.getElementById('forIndexOfList').innerHTML = counter_;
        document.getElementById('forIndexOfList2').innerHTML = counter_;
      } else {
        console.log("No matching cell found.");
      }
      var tfootTd = this.querySelector('tfoot td');
      if (tfootTd) {
            var content = tfootTd.textContent;
            board.position(content)
            console.log(content);
            //return index of the list
      }
      // ... rest of your event listener code ...
    });
  })(i);
}

```


In summary three different tables,
pink table is the normal table without adjustments

```HTML
 <table id="chess1" class="chess-table pink">
          <tbody></tbody>
          <tfoot><tr><td>rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR</td></tr></tfoot>
        </table>
        
        <script>
          var tbody = document.querySelector('#chess1 tbody');
          for (var row = 1; row <= 8; row++) {
            var tr = document.createElement('tr');
            for (var col = 1; col <= 8; col++) {
              var td = document.createElement('td');
              td.className = ((row + col) % 2 == 0) ? "white" : "pink";
              tr.appendChild(td);
            }
            tbody.appendChild(tr);
          }
        </script>
```

Next is the green table, but there are adjustments:
Adjust the class
Adjust the ID so that it will go to the board that you want.
if is board13 that means the id for pink will be chess14 (because the number starts at 1 instead of 0)

```HTML
  <table id="chessA13" class="chess-line green">
          <tbody></tbody>
          <tfoot><tr><td>r1bq1rk1/ppp1ppbp/2np1np1/8/2BPP3/2N2N1P/PPP2PP1/R1BQ1RK1</td></tr></tfoot>
        </table>
        
        <script>
          var tbody = document.querySelector('#chessA13 tbody');
          for (var row = 1; row <= 8; row++) {
            var tr = document.createElement('tr');
            for (var col = 1; col <= 8; col++) {
              var td = document.createElement('td');
              td.className = ((row + col) % 2 == 0) ? "white" : "green";
              tr.appendChild(td);
            }
            tbody.appendChild(tr);
          }
        </script>

```

Next is the purple table, adjust the id and 
add the td.setAttribute, really you could include that with the code in Python

```HTML

  <br><table id="chessA2" class="chess-line purple">
          <tbody></tbody>
          <tfoot><tr><td>r1bq1rk1/ppp1ppbp/2np2p1/8/2BPn3/2N2N1P/PPP2PP1/R1BQ1RK1</td></tr></tfoot>
        </table>
        
        <script>
          var tbody = document.querySelector('#chessA2 tbody');
          for (var row = 1; row <= 8; row++) {
            var tr = document.createElement('tr');
            for (var col = 1; col <= 8; col++) {
              var td = document.createElement('td');
              td.className = ((row + col) % 2 == 0) ? "white" : "purple";
              td.setAttribute('data-value', '13'); // Add custom attribute and assign value
              tr.appendChild(td);
            }
            tbody.appendChild(tr);
          }
        </script>

```


Error handling:

The error you encountered, "Uncaught TypeError: Cannot read properties of undefined (reading 'querySelector')", occurs when the querySelector method is called on an undefined or null value. In your code, this error is likely occurring when trying to access tables3[i] in the inner loop.

The issue is that when the inner event listener function is executed, the variable i has already reached a value that is out of the range of the tables3 array. This happens because the event listener function is executed asynchronously, after the loop has finished executing. As a result, i is equal to tables3.length when the event listener function is triggered, causing tables3[i] to be undefined.

To fix this issue, you can use a closure or create a separate function to encapsulate the value of i within each iteration. Here's an example using an immediately invoked function expression (IIFE) to create a closure:

In this updated code, an IIFE is used to create a closure for each iteration of the loop. The index parameter of the IIFE captures the value of i for each iteration. Inside the IIFE, the event listener function is defined, and the index parameter is used instead of i to access the correct tables3 element.

By using this approach, each event listener function will have its own encapsulated index value, preventing the "Cannot read properties of undefined" error when accessing tables3[index] within the event listener function.

```JS
// Get all the tables with a specific class
var tables3 = document.getElementsByClassName('chess-line purple');

// Iterate over the tables and attach the event listener
for (var i = 0; i < tables3.length; i++) {
  (function(index) {
    tables3[index].addEventListener('click', function () {
      // ... your event listener code ...
      var firstTd = tables3[index].querySelector('td[data-value]');
      if (firstTd) {
        var dataValue = firstTd.getAttribute('data-value');
        counter_ = parseInt(dataValue);
        document.getElementById('forIndexOfList').innerHTML = counter_;
        document.getElementById('forIndexOfList2').innerHTML = counter_;
      } else {
        console.log("No matching cell found.");
      }
      // ... rest of your event listener code ...
    });
  })(i);
}
```

Compare that to : 


```JS
// Get all the tables with a specific class
var tables3 = document.getElementsByClassName('chess-line purple');

// Iterate over the tables and attach the event listener
for (var i = 0; i < tables3.length; i++) {
    tables3[i].addEventListener('click', function () {
        //var tableId = this.id; // Get the ID of the clicked table
        // Your code logic for the table event here
        //console.log("Table clicked: " + tableId);
        var tfootTd = this.querySelector('tfoot td');

        if (tfootTd) {
            var content = tfootTd.textContent;
            board.position(content)
            console.log(content);
            //return index of the list
            //var matchResult = tableId.match(/\d+$/);
            if (tables3.length > 0) {
                var firstTd = tables3[i].querySelector('td[data-value]');
                // cannot access the i because becomes the tables3.length??
                
                if (firstTd) {
                    var dataValue = firstTd.getAttribute('data-value');
                    counter_ = parseInt(dataValue);
                    document.getElementById('forIndexOfList').innerHTML = counter_
                    document.getElementById('forIndexOfList2').innerHTML = counter_
                } else {
                    console.log("No matching cell found.");
                }
            }

        }
    });

```

Added a link to go to comments and by number: 
However, there is an issue that I cannot dynamically generate these links

```js
function testFunction(number) {
  let commentElements = document.querySelectorAll('span.comment');

  // Handle different test functions based on the number parameter
  switch (number) {
    case 1:
      // Test function for number 1
      console.log("Test function 1");
      commentElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      break;
    case 2:
      // Test function for number 2
      console.log("Test function 2");
      commentElements[1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      break;
    case 3:
      // Test function for number 3
      console.log("Test function 3");
      commentElements[2].scrollIntoView({ behavior: 'smooth', block: 'center' });
      break;
    case 4:
      // Test function for number 4
      console.log("Test function 4");
      commentElements[3].scrollIntoView({ behavior: 'smooth', block: 'center' });
      break;
    case 5:
      // Test function for number 5
      console.log("Test function 5");
      commentElements[4].scrollIntoView({ behavior: 'smooth', block: 'center' });
      break;
    default:
      console.log("Invalid number");
      break;
  }
}


```