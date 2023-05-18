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
            if count_ % 2 == 0:
                string_html += f"{board.fen()}\nprev move: {move_list[i-1]}, move:{move_list[i]} \n\n"
            board.push(move)

        # Print the final output string for the game
        print(string_html)
        print('\n')  # Print a new line after each game
        print(len(move_list))
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

```html
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
          <p>prev move: , move:d4d5 </p>
          <br><table id="chess2" class="chess-table pink">
            <tbody></tbody>
            <tfoot><tr><td>r1bqr1k1/ppp1nppp/3p1n2/3P4/2P5/P2BB3/P4PPP/R2QK1NR</td></tr></tfoot>
          </table>
          
          <script>
            var tbody = document.querySelector('#chess2 tbody');
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
          <p>prev move: c6e7, move:c3c4 </p>
          <br><table id="chess3" class="chess-table pink">
            <tbody></tbody>
            <tfoot><tr><td>r1bqr1k1/p1p1nppp/3p1n2/1P1P4/8/P2BB3/P4PPP/R2QK1NR</td></tr></tfoot>
          </table>
          
          <script>
            var tbody = document.querySelector('#chess3 tbody');
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
          <p>prev move: b7b5, move:c4b5</p>
          <br>
```