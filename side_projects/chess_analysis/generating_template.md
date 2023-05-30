# print fen positions


Using Ipython access a pgn file to get the fen positions.

```python
import chess.pgn
import pyperclip

# Open the PGN file
with open("01.pgn") as f:
    # Loop through each game in the PGN file
    while True:
        # Read the next game from the PGN file
        game = chess.pgn.read_game(f)
        if game is None:
            break

        # Loop through each move in the game
        board = game.board()
        string_html = ""
        move_list = ['']
        count_ = 0
        for i, move in enumerate(game.mainline_moves()):
            count_ = count_ + 1 
            # Append the FEN position after each move and the word "pink" to the output string
            from_square = move.from_square
            to_square = move.to_square
            uci = chess.Move(from_square, to_square).uci()
            move_list.append(uci)
            #if count_ % 2 == 0:
            #string_html += f"{board.fen()}\nprev move: {move_list[i-1]}, move:{move_list[i]} \n\n"
            string_html += f"{board.fen()}\nmove:{move_list[i]} \n\n"

            board.push(move)

        # Print the final output string for the game
        print(string_html)
        print('\n')  # Print a new line after each game
        print(len(move_list))
pyperclip.copy(string_html)
```

The fen positions should look like: 
r1bqr1k1/ppp2ppp/2np1n2/3P4/8/P1PBB3/P4PPP/R2QK1NR b - - 0 1
prev move: , move:d4d5 

r1bqr1k1/ppp1nppp/3p1n2/3P4/2P5/P2BB3/P4PPP/R2QK1NR b - - 0 2
prev move: c6e7, move:c3c4 

r1bqr1k1/p1p1nppp/3p1n2/1P1P4/8/P2BB3/P4PPP/R2QK1NR b - - 0 3
prev move: b7b5, move:c4b5 

Insert that into the template string below: 


# convert chess template

```python
template="""r1bqr1k1/ppp2ppp/2np1n2/3P4/8/P1PBB3/P4PPP/R2QK1NR b - - 0 1
prev move: , move:d4d5 

r1bqr1k1/ppp1nppp/3p1n2/3P4/2P5/P2BB3/P4PPP/R2QK1NR b - - 0 2
prev move: c6e7, move:c3c4 

r1bqr1k1/p1p1nppp/3p1n2/1P1P4/8/P2BB3/P4PPP/R2QK1NR b - - 0 3
prev move: b7b5, move:c4b5"""

#make sure that your code is sticky here no white spaces
import pyperclip
i = 0
#next  number will be 1 if 0
table_html = ""
for line in template.split("\n\n"):
    i += 1
    fen, instructions = line.split('\n')
    fen = fen.split(' ')[0] #added this
    table_html += f"""<table id="chess{i}" class="chess-table pink">
            <tbody></tbody>
            <tfoot><tr><td>{fen}</td></tr></tfoot>
          </table>
          
          <script>
            var tbody = document.querySelector('#chess{i} tbody');
            for (var row = 1; row <= 8; row++) {{
              var tr = document.createElement('tr');
              for (var col = 1; col <= 8; col++) {{
                var td = document.createElement('td');
                td.className = ((row + col) % 2 == 0) ? "white" : "pink";
                td.setAttribute('data-value', '13'); // Add custom attribute and assign value
                tr.appendChild(td);
              }}
              tbody.appendChild(tr);
            }}
          </script>
          <p>{instructions}</p>
          <br>"""

print(table_html)
print('copied to clipboard!')
pyperclip.copy(table_html)
```

Insert tables into the webpage: 
```html
<table id="chess1" class="chess-table pink">
            <tbody></tbody>
            <tfoot><tr><td>r1bqr1k1/ppp2ppp/2np1n2/3P4/8/P1PBB3/P4PPP/R2QK1NR</td></tr></tfoot>
          </table>
... etc
```

There are two other types of tables: a green table

```html

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
        <p>black to move after white castled</p>

```

Rename the python code so that you change chess{i} to chessA{i}
And for the first green table to change the number after the green table so that it will go to that board

And for purple change:

td.setAttribute('data-value', '13'); // Add custom attribute and assign value

For the board

And for comment, what you want to do is to use <span class="comment">comment:</span>

and that will take you to place in the page that you want to go.

Logic in the index.html file that you will build a table using a dictionary like object to build and locate which openings are which.

tableData = 

var tableData = [
  { opening: 'Pircs Defense', file: '78092083185.html' },
  { opening: 'Indian Colle', file: '78646873375.html' },
  { opening: 'Kings Pawn', file: '78694316111.html' },
  { opening: 'Queens Pawn', file: '78870680593.html' },
  { opening: 'Queens Pawn', file: '78956516771.html' },
  { opening: 'Italian Fried Liver', file: '78960056293.html' }

  // Add more objects for additional openings and files
];



And working with an object

```JS

//obtain the values from the textarea

    const notesObj = { 'first': 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR\nrnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR\nrnbqkbnr/ppp1pppp/8/3p4/3P4/4P3/PPP2PPP/RNBQKBNR\nrnbqkbnr/ppp2ppp/4p3/3p4/3P4/4P3/PPP2PPP/RNBQKBNR\n...' };


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
   // add the button convert textarea
   
});
```