
counter_ = 0;

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
      var radio1 = document.getElementById("r1");
      var radio2 = document.getElementById("r2");
      radio1.checked = false;
      radio2.checked = true;
      board.flip(); // and flip the board
    } else {
      odd_count++;
      console.log('odd')
      console.log('I am not sure why I cannot flip the board multiple times')
    }
   
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
      document.getElementById("fenposition_1").innerHTML = content
      console.log(content);
      //return index of the list
      counter_ = listOfFenPositions.indexOf(content)
      document.getElementById('forIndexOfList').innerHTML = counter_
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
   document.getElementById('forIndexOfList').innerHTML = counter_
   document.getElementById('forIndexOfList2').innerHTML = counter_

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
  document.getElementById('forIndexOfList').innerHTML = counter_
  document.getElementById('forIndexOfList2').innerHTML = counter_

   console.log(counter_)
   board.position(listOfFenPositions[counter_])
  }
});


var createBoardLink = document.getElementById('createBoardLink')

createBoardLink.addEventListener('click', function() {
  scrollToElement();
})


     // create a javascript function called "repopulate_table_drop"
     function repopulate_table_drop() {
      // Get the table and the dropdown menu
    
      var table = document.getElementById("my-table");
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
        option.text = i + ".";
      
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
      document.getElementById("fenposition_1").innerHTML = content
      console.log(content);
    //return index of the list
      counter_ = listOfFenPositions.indexOf(content)
      document.getElementById('forIndexOfList').innerHTML = counter_
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
        document.getElementById('forIndexOfList').innerHTML = counter_
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


