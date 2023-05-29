import re
import chess.pgn
import pyperclip

pgn_file = "78960056293.pgn"
# Read the file
with open(pgn_file) as file:
    data = file.read()

# Combine the data into one string
# this allows for the string to capture better more lines
combined_template = ''.join(data.splitlines())

# Find all occurrences of text within curly braces
matches = re.findall(r"\{(.*?)\}", combined_template)

# Process the matches
comments = ''
for match in matches:
    comments += match
    comments += "  \n"



# Loop through each game in the PGN file
games = []
with open(pgn_file) as f:
    while True:
        game = chess.pgn.read_game(f)
        if game is None:
            break
        games.append(game)
        pgn_string = str(game)
        clean_moves = re.sub(r'\[[^\]]*\]', '', pgn_string)
        clean_moves = clean_moves.strip()

board_fen = [];
for_append_move_list = [];

# Process the games
string_html = "template=\"\"\""
for game in games:
    board = game.board()
    move_list = ['']
    for move in game.mainline_moves():
        from_square = move.from_square
        to_square = move.to_square
        uci = chess.Move(from_square, to_square).uci()
        move_list.append(uci)
        board.push(move)
        board_fen.append(board.fen())
        for_append_move_list.append(move_list[-1])

#        string_html += f"{board.fen()}\nmove:{move_list[-1]} \n\n"

print('length of board_fen:' + str(len(board_fen)))
print('length of for_append_move_list:' + str(len(for_append_move_list)))

for i, variable_ in enumerate(board_fen):
    if i != len(board_fen) - 1:
        #this is not the last line
        string_html += f"{variable_}\nmove:{for_append_move_list[i]} \n\n"
    else:
        string_html += f"{variable_}\nmove:{for_append_move_list[i]}"

#here it adds the three extra quotes
string_html += "\"\"\"\n\npgn_str=\"\"\""
#append the pgn_string to string_html under clean_moves

string_html += clean_moves.strip()
string_html += "\"\"\"\n\ncomments_=\"\"\""
# Append the comments to string_html
string_html += comments.strip()
string_html += "\"\"\""

# Print the final output string
print(string_html)
pyperclip.copy(string_html)