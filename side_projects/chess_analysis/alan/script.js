
counter_ = 0;

const boardReference = { 0:'1.', 
1: '1...',
2: '2.',
3: '2...',
4: '3.',
5: '3...',
6: '4.',
7: '4...',
8: '5.',
9: '5...',
10: '6.',
11: '6...',
12: '7.',
13: '7...',
14: '8.',
15: '8...',
16: '9.',
17: '9...',
18: '10.',
19: '10...',
20: '11.',
21: '11...',
22: '12.',
23: '12...',
24: '13.',
25: '13...',
26: '14.',
27: '14...',
28: '15.',
29: '15...',
30: '16.',
31: '16...',
32: '17.',
33: '17...',
34: '18.',
35: '18...',
36: '19.',
37: '19...',
38: '20.',
39: '20...',
40: '21.',
41: '21...',
42: '22.',
43: '22...',
44: '23.',
45: '23...',
46: '24.',
47: '24...',
48: '25.',
49: '25...',
50: '26.',
51: '26...',
52: '27.',
53: '27...',
54: '28.',
55: '28...',
56: '30.',
57: '30...',
58: '31.',
59: '31...',
60: '32.',
61: '32...',
62: '33.',
63: '33...',
64: '34.',
65: '34...',
66: '35.',
67: '35...',
68: '36.',
69: '36...',
70: '37.',
71: '37...',
72: '38.',
73: '38...',
74: '39.',
75: '39...',
76: '40.',
77: '40...',
78: '41.',
79: '41...',
80: '42.',
81: '42...',
82: '43.',
83: '43...',
84: '44.',
85: '44...',
86: '45.',
87: '45...',
88: '46.',
89: '46...',
90: '47.',
91: '47...',
92: '48.',
93: '48...',
94: '49.',
95: '49...',
96: '50.',
97: '50...',
98: '51.',
99: '51...',
100: '52.',
101: '52...',
102: '53.',
103: '53...',
104: '54.',
105: '54...',
106: '55.',
107: '55...',
108: '56.',
109: '56...',
110: '57.',
111: '57...',
112: '58.',
113: '58...',
114: '59.',
115: '59...',
116: '60.',
117: '60...',
118: '61.',
119: '61...',
120: '62.',
121: '62...',
122: '63.',
123: '63...',
124: '64.',
125: '64...',
126: '65.',
127: '65...',
128: '66.',
129: '66...',
130: '67.',
131: '67...'
}

function changeNextButton() {
  // Get the current page URL
  var currentURL = window.location.href;

  // Extract the filename from the URL
  var filename = currentURL.substring(currentURL.lastIndexOf('/') + 1);

  // return the filename from 'www.url.com/filename'
  parts = filename.split(".")

  // check if the filename has a number
  var hasNumber = /\d/.test(parts[0])

  // replace the filename's number
  var prefixNoNumber = parts[0].replace(/\d+/g, "");

  if (parts[0].length < 1){
      console.log('there is no name after slash in URL')
      // so next is not fixed 
  } else {  
      if(hasNumber) {
          //return the number of the filename
          var URLnum = parseInt(parts[0].match(/\d+/)[0]);
          console.log(parts[0])
          console.log(URLnum)
          var new_number = URLnum + 1
          console.log(prefixNoNumber + new_number.toString() + ".html")
          document.getElementById('next-page').href = prefixNoNumber + new_number.toString() + ".html"
      } else {
          console.log('does not have a number')
          console.log(prefixNoNumber + "2.html")
          document.getElementById('next-page').href = prefixNoNumber + "2.html"
      }
  }
}

setTimeout(changeNextButton, 1000)



const pieces = {
  K:"♔", Q:"♕", R:"♖", B:"♗", N:"♘", P:"♙", 
  k:"♚", q:"♛", r:"♜", b:"♝", n:"♞", p:"♟",
}


function clear_board(tableId) {
  const table = document.getElementById(tableId);
  const rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    for (let j = 0; j < cells.length; j++) {
      cells[j].textContent = '';
    }
  }
}

// used during onload
function renderChessboard(fenString, tableId) {
  const rows = document.getElementById(tableId).rows;
  const fenRows = fenString.split('/');
  for (let i = 0; i < 8; i++) {
    const row = rows[i];
    const fenRow = fenRows[i];
    let col = 0;
    for (let j = 0; j < fenRow.length; j++) {
      const c = fenRow[j];
      if (c >= '0' && c <= '9') {
        col += parseInt(c);
      } else {
        const cell = row.cells[col];
        cell.textContent = pieces[c];
        cell.style.textAlign = 'center';
        cell.style.fontSize = '2em';
        col++;
      }
    }
  }
}


function renderFlippedChessboard(fenString, tableId) {
  var table1 = document.getElementById(tableId)
  var td1 = table1.querySelector('tfoot td');
  clear_board(tableId); // clear the board first
  td1.textContent = fenString
  const rows = document.getElementById(tableId).rows;
  const fenRows = fenString.split('/');
  fenRows.reverse(); // reverse the order of the rows
  for (let i = 0; i < 8; i++) {
    const row = rows[i];
    const fenRow = fenRows[i];
    let col = 0;
    for (let j = fenRow.length - 1; j >= 0; j--) { // reverse the order of the characters
      const c = fenRow[j];
      if (c >= '0' && c <= '9') {
        col += parseInt(c);
      } else {
        const cell = row.cells[col];
        cell.textContent = pieces[c];
        cell.style.textAlign = 'center';
        cell.style.fontSize = '2em';
        col++;
      }
    }
  }
}


var listOfFenPositions = []
var listOfBoardIds = []


window.onload = function () {
  const tables = document.getElementsByTagName('table');
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const td = table.querySelector('tfoot td');

    if (table.classList.contains('chess-table')) {
      console.log('chess-table present');
      if (td) {
        const fen = td.textContent;
        listOfFenPositions.push(fen);
        console.log("fen is" + fen)
        listOfBoardIds.push(table.id);
        renderChessboard(fen, table.id);
        console.log(table.id);
        // returns the id of the table with class "chess-table"
      }
    }
    else {
      if (td){
        const fen = td.textContent;
        renderChessboard(fen, table.id);
        console.log(table.id);
      }
     }

    
  }

}
  
  function toggleAnswer() {
    const answers = document.getElementsByClassName("answer");
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].style.display === "none") {
        answers[i].style.display = "block";
      } else {
        answers[i].style.display = "none";
      }
    }
  }

  odd_count = 0

  renderButton.addEventListener('click', function() {
    if(odd_count % 2 == 0){
      console.log('even')
      const tables = document.getElementsByTagName('table');
      for (let i = 0; i < tables.length; i++) {
        const td = tables[i].querySelector('tfoot td');
        if (td) {
          const fen = td.textContent;
          renderFlippedChessboard(fen, tables[i].id);
        }
      }
      odd_count++;

      board.flip(); // and flip the board
    } else {
      odd_count++;
      console.log('odd')
      console.log('I am not sure why I cannot flip the board multiple times')
    }
   
  });

 
function getSelectedText_to_gotoHighlightedLink() {
  var selectedText = '';
  if (window.getSelection) {
      selectedText = window.getSelection();
  }
  else if (document.getSelection) {
      selectedText = document.getSelection();
  }
  else if (document.selection) {
      selectedText = document.selection.createRange().text;
  } else return;
  console.log(selectedText.toString().trim());
  board.position(selectedText.toString().trim());
 
}


setBoard.addEventListener('click', function() {
  getSelectedText_to_gotoHighlightedLink();
});


arrStrSplit = [];
boardIndex = 0;
convertTextarea.addEventListener('click', function() {
  console.log('hello world')
  var arrStr = textarea.value
  arrStrSplit = arrStr.split('\n');
  console.log(arrStrSplit);
  boardIndex = 0;

});



resetBoardIndex.addEventListener('click', function() {
  boardIndex=0;
  console.log("board index : " + boardIndex)
});

currentIndexPosition.addEventListener('click', function() {
  board.position(arrStrSplit[boardIndex])
  boardIndex=boardIndex +1
  console.log("New Board Position" + boardIndex)
});

  gotoId = 'myBoard'
  
  function toggleBoard(argument) {
    var chessTable = document.getElementById(argument);
    var tfoot = chessTable.tFoot.textContent;
    board.position(tfoot)
    gotoID = argument
  
    console.log("Tfoot value of table with id", argument + ":", tfoot);
    console.log(gotoID)
  }


  let previousScrollPosition = 0;
 


  function scrollToElement() {
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
  }
  

  function scrollToTop() {
    event.preventDefault(); // Prevent default link behavior
    const delay = 100; // Delay in milliseconds (adjust as needed)
    previousScrollPosition = window.pageYOffset; // Store the current scroll position
  
    setTimeout(function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, delay);
  }
  

    

  function scrollToHome() {
    event.preventDefault(); // Prevent default link behavior
    const delay = 100; // Delay in milliseconds (adjust as needed)
    previousScrollPosition = window.pageYOffset; // Store the current scroll position
  
    setTimeout(function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, delay);
  }
  




// Get all the tables with a specific class
var tables = document.getElementsByClassName('chess-table');

// Iterate over the tables and attach the event listener
for (var i = 0; i < tables.length; i++) {
  tables[i].addEventListener('click', function() {
    //var tableId = this.id; // Get the ID of the clicked table
    // Your code logic for the table event here
    //console.log("Table clicked: " + tableId);
    var tfootTd = this.querySelector('tfoot td');
    if (tfootTd) {
      var content = tfootTd.textContent;
      board.position(content)
      console.log(content);
      //return index of the list
      counter_ = listOfFenPositions.indexOf(content)
      document.getElementById('forIndexOfList2').innerHTML = counter_
    }
  });
}


//create a mouseover event

for (var i = 0; i < tables.length; i++) {
  tables[i].addEventListener('mouseover', function() {
    var tableId = this.id; // Get the ID of the clicked table
    // Your code logic for the table event here
    console.log("Table's id is " + tableId);
    var indexNumber = listOfBoardIds.indexOf(tableId)
    console.log("Board number is " + indexNumber)
    document.getElementById('highlightBoard').innerHTML = indexNumber;
  });
}


for (var i = 0; i < tables.length; i++) {
  tables[i].addEventListener('mouseout', function() {
    document.getElementById('highlightBoard').innerHTML = '';
  });
}



$("body").keydown(function(e) {
  if(e.keyCode == 37) { // left
   counter_ = counter_ - 1

   if (counter_ < 0) {
      // Reset the counter to 0
          counter_ = 0;
   }
   document.getElementById('forIndexOfList2').innerHTML = counter_
   document.getElementById('boardReferencePosition').innerHTML = boardReference[counter_]

   board.position(listOfFenPositions[counter_])
   
  }
  else if(e.keyCode == 39) { // right
   counter_ = counter_ + 1
   //var table1 = document.getElementsByTagName('table')[1];
   //var second_var = table1.rows[counter_].cells[0].textContent
 
// Check if counter exceeds the number of elements in the list
  if (counter_ >= listOfFenPositions.length) {
  // Reset the counter to 0
      counter_ = 0;
  }
   document.getElementById('forIndexOfList2').innerHTML = counter_
   document.getElementById('boardReferencePosition').innerHTML = boardReference[counter_]
   //<span id="boardReferencePosition"></span>

   console.log(counter_)
   board.position(listOfFenPositions[counter_])
  }
});



     // create a javascript function called "repopulate_table_drop"
     function repopulate_table_drop() {
      // Get the table and the dropdown menu
    
      var dropdown = document.getElementById("table_drop");
    
      // Clear existing options from the dropdown menu
      dropdown.innerHTML = "";
    
      console.log(listOfFenPositions.length)
      // Loop through the rows of the table and add options to the dropdown menu
      for (var i = 0; i < listOfFenPositions.length; i++) {
        // Create a new option element
        var option = document.createElement("option");
      
        // Set the value of the option to the index times 10
        option.value = i;
      
        // Set the text of the option to the index plus a period
        option.text = boardReference[i];
      
        // Add the option to the dropdown menu
        dropdown.add(option);
        }
    
    }
    
    setTimeout(repopulate_table_drop, 2000);



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
    var tables1 = document.getElementsByClassName('chess-table');
    var tfootTd = tables1[counter_].querySelector('tfoot td');
    if (tfootTd) {
      var content = tfootTd.textContent;
      board.position(content)
      console.log(content);
    //return index of the list
      counter_ = listOfFenPositions.indexOf(content)
      document.getElementById('forIndexOfList2').innerHTML = counter_
    }

    //set adding_info to none
})

// Get all the tables with a specific class
var tables2 = document.getElementsByClassName('chess-line green');

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
        document.getElementById('forIndexOfList2').innerHTML = counter_
      } else {
        console.log("No match found.");
     }
    }
  });
}



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







let chesstableElements = document.querySelectorAll('table.chess-table');
var createBoardLink = document.getElementById('createBoardLink')

createBoardLink.addEventListener('click', function() {
  chesstableElements[counter_].scrollIntoView({ behavior: 'smooth', block: 'center' });

})



// function testFunction(number) {
//   let commentElements = document.querySelectorAll('span.comment');

//   // Handle different test functions based on the number parameter
//   switch (number) {
//     case 1:
//       // Test function for number 1
//       console.log("Test function 1");
//       commentElements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
//       break;
//     case 2:
//       // Test function for number 2
//       console.log("Test function 2");
//       commentElements[1].scrollIntoView({ behavior: 'smooth', block: 'center' });
//       break;
//     case 3:
//       // Test function for number 3
//       console.log("Test function 3");
//       commentElements[2].scrollIntoView({ behavior: 'smooth', block: 'center' });
//       break;
//     case 4:
//       // Test function for number 4
//       console.log("Test function 4");
//       commentElements[3].scrollIntoView({ behavior: 'smooth', block: 'center' });
//       break;
//     case 5:
//       // Test function for number 5
//       console.log("Test function 5");
//       commentElements[4].scrollIntoView({ behavior: 'smooth', block: 'center' });
//       break;
//     default:
//       console.log("Invalid number");
//       break;
//   }
// }




function testFunction(number) {
  let commentElements = document.querySelectorAll('span.comment');
  commentElements[number - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });

}


var tableDropComments = document.getElementById("tableDropComments");
tableDropComments.addEventListener("change", function () {
    console.log('hello world')
    first_var = parseInt($('#tableDropComments').val())
    console.log(first_var)
    event.preventDefault();
    let commentElements = document.querySelectorAll('span.comment');
    commentElements[first_var - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    //set adding_info to none
})



let listOfPurplePinkChanges1 = [];

let chessTable1 = document.querySelectorAll('table');

chessTable1.forEach(table => {
  let classNames = Array.from(table.classList);
  const color = classNames[1];
  listOfPurplePinkChanges1.push(color);
});



function findColorChanges(list) {
  const colorChanges = [];
  
  let previousElement = list[0]; // Initialize previousElement with the first element of the list

  for (let i = 1; i < list.length; i++) {
    const currentElement = list[i];
    
    if (previousElement !== currentElement) {
      colorChanges.push(i);
    }
    
    previousElement = currentElement; // Update previousElement with the current element
  }
  const spanElement = document.getElementById('colorChanges');
  spanElement.innerHTML = colorChanges.join(', '); // Convert the array to a string with comma-separated values
  
  return colorChanges;
}


function getRepeatingNumbers() {
  let tablePositions = [];
  let chessTable2 = document.querySelectorAll('table');
  let countOfClass = 0;

  chessTable2.forEach(table => {
    let classNames = Array.from(table.classList);
    const color = classNames[1];

    if (color === 'pink') {
      tablePositions.push(countOfClass);
      countOfClass++;
    } else {
      tablePositions.push(countOfClass - 1);
    }
  });

  let occurrences = {};
  let repeatingNumbers = [];

  for (let number of tablePositions) {
    if (occurrences[number]) {
      occurrences[number]++;
    } else {
      occurrences[number] = 1;
    }
  }

  for (let key in occurrences) {
    if (occurrences[key] > 1) {
      repeatingNumbers.push(key);
    }
  }

  const spanElement = document.getElementById('colorChanges');
  spanElement.innerHTML = repeatingNumbers.join(', ');

  return repeatingNumbers;
}



let chessTable3 = document.querySelectorAll('table');

let hasChessTableClass = false;
let hasChessLineClass = false;

chessTable3.forEach(table => {
  if (table.classList.contains('chess-table')) {
    hasChessTableClass = true;
  }
  if (table.classList.contains('chess-line')) {
    hasChessLineClass = true;
  }
});

if (hasChessTableClass && hasChessLineClass) {
  console.log("Both 'chess-table' and 'chess-line' classes appear.");
  getRepeatingNumbers();

} else if (hasChessTableClass) {
  console.log("Only 'chess-table' class appears.");
  findColorChanges(listOfPurplePinkChanges1);
} else {
  console.log("Neither 'chess-table' nor 'chess-line' classes appear.");
}



// create a javascript function called "repopulate_table_drop"
function repopulateTableDropComments() {
  // Get the table and the dropdown menu

  var dropdown = document.getElementById("tableDropComments");

  // Clear existing options from the dropdown menu
  dropdown.innerHTML = "";

  let commentElements2 = document.querySelectorAll('span.comment');
  var addOne = commentElements2.length + 1

  // Loop through the rows of the table and add options to the dropdown menu
  for (var i = 0; i < addOne; i++) {
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

setTimeout(repopulateTableDropComments, 2000);


var inputElement = document.getElementById("myInput");




if (inputElement !== null) {
  // The element with ID "myInput" exists in the document
  document.getElementById('blogPost').style.display = 'none';
  document.getElementById('myInput').addEventListener('keypress', function (e) {
    if (e.which == 13) {
      // Enter key pressed
      // Clear the paragraph
      // Check value of text_chess
  
      var first_var = parseInt(document.getElementById('myInput').value);
      console.log('pressed!')
      console.log(first_var)
      document.getElementById('myInput').value = '';

      if (!isNaN(first_var) && first_var > 1000000 && isPrime(first_var)) {
        // Value is a number greater than 1,000,000, even, and prime
        document.getElementById('blogPost').style.display = 'block';
      }

      function isPrime(num) {
        if (num < 2) return false;
        for (var i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
        }
        return true;
      }
    

    }
  });
} else {
  // The element with ID "myInput" does not exist in the document
  console.log("Element not found!");
}



reduceDuplicates.addEventListener('click', function() {
  console.log('hello world')
  var textareaValue = textarea.value
  // Split the string into an array of lines
  var lines = textareaValue.split('\n');
  // Use an object to keep track of duplicate lines
  var uniqueLines = {};

// Loop over the lines and add them to the uniqueLines object
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim(); // Trim any leading/trailing spaces
  
    if (line !== '') {
      uniqueLines[line] = true; // Add the line to the uniqueLines object
    }
  }

// Convert the uniqueLines object back to an array of lines
  var uniqueLinesArray = Object.keys(uniqueLines);

  var result = uniqueLinesArray.join('\n');

  textarea.value = result;
  console.log(result)
});



var tabledropnotesChoice = document.getElementById("tabledropforNotes");
tabledropnotesChoice.addEventListener("change", function () {
    console.log('hello world')
    //first_var = parseInt($('#table_drop').val())
    second_var = $('#tabledropforNotes').val()
    console.log(second_var)
    event.preventDefault();
    console.log('value of the select drop:\n' + notesObj[second_var]); // output: 'first'
    //set adding_info to none
    textarea.value = notesObj[second_var];
    arrStrSplit = notesObj[second_var].split('\n');
    boardIndex=0;

});


var file_path = window.location.pathname;
  var file_name = file_path.substring(file_path.lastIndexOf('/') + 1);
  var file_name_without_extension = file_name.split('.').slice(0, -1).join('.');

  var url = 'https://www.chess.com/analysis/game/live/' + file_name_without_extension + '?tab=review';
  document.getElementById('urlhere').innerHTML = '<a href="' + url + '" target="_blank">Link to game</a>';