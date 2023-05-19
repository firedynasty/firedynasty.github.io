


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
  clear_board(tableId); // clear the board first
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




 window.onload = function() {
    const tables = document.getElementsByTagName('table');
    for (let i = 0; i < tables.length; i++) {
      const td = tables[i].querySelector('tfoot td');
      if (td) {
        const fen = td.textContent;
        renderChessboard(fen, tables[i].id);
        console.log(tables[i].id)
        //returns chess1
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
    event.preventDefault(); // Prevent default link behavior
    window.scrollTo(0, previousScrollPosition); 
  }


  function scrollToHome() {
    event.preventDefault(); // Prevent default link behavior
    const element = document.getElementById('header_title');
    const delay = 100; // Delay in milliseconds (adjust as needed)
    previousScrollPosition = window.pageYOffset; // Store the current scroll position
  
    if (element) {
      setTimeout(function() {
        element.scrollIntoView({ behavior: 'smooth' });
      }, delay);
    }
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
    }
  });
}
