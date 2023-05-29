
//image_list_2

image_list_2 = [['https://www.dropbox.com/s/fk1uiw5bmlxfoc0/11-world_view_perspective.jpg?raw=1'], 
             ['https://www.dropbox.com/s/huq73l85q7t6wiy/01-aronian_2.jpg?raw=1'],
             ['https://www.dropbox.com/s/w3za8t451va0jq3/02-aronian_3.jpg?raw=1'],
             ['https://www.dropbox.com/s/0ywvakzj7b49zfy/03-aronian_4.jpg?raw=1'],
             ['https://www.dropbox.com/s/y4dijhru42tpzgm/04-french_1.jpg?raw=1'],
             ['https://www.dropbox.com/s/7vmp4uoi8bonlce/05-02-french_.jpg?raw=1'],
             ['https://www.dropbox.com/s/he6savtn0vsxd36/06-03_french.jpg?raw=1'],
             ['https://www.dropbox.com/s/8prvws87ipf0722/07-french_08_first_half.jpg?raw=1'],
             ['https://www.dropbox.com/s/bxl5i6kho4ppzxn/07-french_08_second_half.jpg?raw=1'],
             ['https://www.dropbox.com/s/meyqx57zq81a6oj/08-Vant_Kruijs.jpg?raw=1'],
             ['https://www.dropbox.com/s/dngldhca8o53ym8/09-scandinavian_3.jpg?raw=1'],
             ['https://www.dropbox.com/s/f824ijve8mro38j/10-scandinavian_1.jpg?raw=1'],
             ['https://www.dropbox.com/s/0ibw3dahdip6i3t/11-scandinavian_2.jpg?raw=1'],
             ['https://www.dropbox.com/s/eevnsu9t6mgufhx/12-caro_kahn_1.jpg?raw=1'],
             ['https://www.dropbox.com/s/4uh4gkqxf92ebge/13-caro_kahn_2.jpg?raw=1'],
             ['https://www.dropbox.com/s/pt5q7ihetxz6o0g/14-caro_kahn_3.jpg?raw=1'],
             ['https://www.dropbox.com/s/gogtvk9j2j6xupp/15-caro_kahn_4.jpg?raw=1'],
             ['https://www.dropbox.com/s/knburffrv8enwjz/16-caro_kahn_5.jpg?raw=1'],
             ['https://www.dropbox.com/s/a92lc5tdbuie0we/17-caro_kahn_6.jpg?raw=1'],
             ['https://www.dropbox.com/s/z9s4oe6n7wnbt8x/18-caro_kahn_7.jpg?raw=1'],
             ['https://www.dropbox.com/s/abzoz7ws6dcj3b0/19-caro_kahn_7.jpg?raw=1'],
             ['https://www.dropbox.com/s/3kxy0q351eme5u8/20-caro_kahn_8.jpg?raw=1'],
             ['https://www.dropbox.com/s/dl6hh05jqwsoedy/21-caro_kahn_9.jpg?raw=1'],
             ['https://www.dropbox.com/s/tsl0169vq8vt4mv/22-caro_kahn_9.jpg?raw=1'],
             ['https://www.dropbox.com/s/qgvq3prl21d8xhb/23-caro_kahn_10.jpg?raw=1'],
             ['https://www.dropbox.com/s/5mkgckbbuop61nx/24-evans_gambit_1.jpg?raw=1'],
             ['https://www.dropbox.com/s/xjiuk14uy00lp9z/25-hans_and_magnus.jpg?raw=1']
              ]


set_fen_arr = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

text_val_num = 0;

text_val_split = "rnbqkbfnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

arr = `rbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2
rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3
rnbqkbnr/pp1p1ppp/4p3/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4
rnbqkbnr/pp1p1ppp/4p3/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4
rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5
rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/3B4/PPP2PPP/RNBQK2R b KQkq - 1 5
r1bqkbnr/1p1p1ppp/p1n1p3/8/3NP3/3B4/PPP2PPP/RNBQK2R w KQkq - 2 6
r1bqkbnr/1p1p1ppp/p1N1p3/8/4P3/3B4/PPP2PPP/RNBQK2R b KQkq - 0 6
r1bqkbnr/3p1ppp/p1p1p3/8/4P3/3B4/PPP2PPP/RNBQK2R w KQkq - 0 7
r1bqkbnr/3p1ppp/p1p1p3/8/4P3/3B4/PPP2PPP/RNBQ1RK1 b kq - 1 7
r1bqkbnr/5ppp/p1p1p3/3p4/4P3/3B4/PPP2PPP/RNBQ1RK1 w kq d6 0 8
r1bqkbnr/5ppp/p1p1p3/3p4/4P3/3B4/PPPN1PPP/R1BQ1RK1 b kq - 1 8
r1bqkb1r/5ppp/p1p1pn2/3p4/4P3/3B4/PPPN1PPP/R1BQ1RK1 w kq - 2 9
r1bqkb1r/5ppp/p1p1pn2/3p4/4P3/1P1B4/P1PN1PPP/R1BQ1RK1 b kq - 0 9
r1bqk2r/5ppp/p1p1pn2/3p4/1b2P3/1P1B4/P1PN1PPP/R1BQ1RK1 w kq - 1 10
r1bqk2r/5ppp/p1p1pn2/3p4/1b2P3/1P1B4/PBPN1PPP/R2Q1RK1 b kq - 2 10
r1bqk2r/5ppp/2p1pn2/p2p4/1b2P3/1P1B4/PBPN1PPP/R2Q1RK1 w kq - 0 11
`;

logical_chess_1 = `
[Event "Logical Chess, Move by Move #01"]
[Site "Berlin GER"]
[Date "1907.??.??"]
[Round "1"]
[White "Scheve"]
[Black "Teichmann"]
[Result "0-1"]
[ECO "C53"]
[PlyCount "34"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Qe7 5. O-O d6 6. d4 Bb6 7. a4 a6 8. a5 Ba7
9. h3 Nf6 10. dxe5 Nxe5 11. Nxe5 Qxe5 12. Nd2 Bxh3 13. gxh3 Qg3+ 14. Kh1 Qxh3+
15. Kg1 Ng4 16. Nf3 Qg3+ 17. Kh1 Bxf2 0-1

 `;

logical_chess_2 = `[Event "Logical Chess, Move by Move #02"]
[Site "Liege BEL"]
[Date "1928.??.??"]
[Round "2"]
[White "Liubarski"]
[Black "Soultanbeieff"]
[Result "0-1"]
[ECO "C53"]
[PlyCount "32"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Bb6 5. d4 Qe7 6. O-O Nf6 7. d5 Nb8 8. Bd3
d6 9. h3 h6 10. Qe2 g5 11. Nh2 g4 12. hxg4 Rg8 13. Bxh6 Nxg4 14. Be3 Nxh2 15.
Kxh2 Qh4+ 16. Kg1 Qh3 0-1

`;

logical_chess_3 = `
[Event "Logical Chess, Move by Move #03"]
[Site "Ghent BEL"]
[Date "1929.??.??"]
[Round "3"]
[White "Colle"]
[Black "Delvaux"]
[Result "1-0"]
[ECO "D05"]
[PlyCount "43"]

1. d4 d5 2. Nf3 Nf6 3. e3 e6 4. Bd3 c5 5. c3 Nc6 6. Nbd2 Be7 7. O-O c4 8. Bc2
b5 9. e4 dxe4 10. Nxe4 O-O 11. Qe2 Bb7 12. Nfg5 h6 13. Nxf6+ Bxf6 14. Qe4 g6
15. Nxe6 fxe6 16. Qxg6+ Bg7 17. Qh7+ Kf7 18. Bg6+ Kf6 19. Bh5 Ne7 20. Bxh6 Rg8
21. h4 Bxh6 22. Qf7# 1-0


`;

logical_chess_4 = `
[Event "Logical Chess, Move by Move #04"]
[Site "London ENG"]
[Date "1891.??.??"]
[Round "4"]
[White "Blackburne"]
[Black "Blanchard"]
[Result "1-0"]
[ECO "C30"]
[PlyCount "35"]

1. e4 e5 2. f4 Bc5 3. Nc3 Nc6 4. Nf3 exf4 5. d4 Bb4 6. Bxf4 d5 7. e5 Bxc3+ 8.
bxc3 Be6 9. Bd3 h6 10. O-O Nge7 11. Rb1 b6 12. Qd2 O-O 13. Bxh6 gxh6 14. Qxh6
Ng6 15. Ng5 Re8 16. Rxf7 Bxf7 17. Qh7+ Kf8 18. Qxf7# 1-0


`;

logical_chess_5 = `
[Event "Logical Chess, Move by Move #05"]
[Site "Dresden GER"]
[Date "1915.??.??"]
[Round "5"]
[White "Ruger"]
[Black "Gebhard"]
[Result "1-0"]
[ECO "C54"]
[PlyCount "33"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 O-O 8.
d5 Ne7 9. e5 Ne4 10. Qc2 Nxc3 11. bxc3 Bc5 12. Ng5 Ng6 13. h4 h6 14. d6 hxg5
15. hxg5 Re8 16. Qxg6 Rxe5+ 17. Kf1 1-0
`;

logical_chess_6 = `
[Event "Logical Chess, Move by Move #06"]
[Site "Vienna AUT"]
[Date "1899.??.??"]
[Round "6"]
[White "Zeissl"]
[Black "Walthoffen"]
[Result "0-1"]
[ECO "C63"]
[PlyCount "34"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. d4 fxe4 5. Nxe5 Nxe5 6. dxe5 c6 7. Bc4 Qa5+ 8.
Nc3 Qxe5 9. O-O d5 10. Bb3 Nf6 11. Be3 Bd6 12. g3 Bg4 13. Qd2 Bf3 14. Bf4 Qf5
15. Nd1 Qh3 16. Ne3 Ng4 17. Rfe1 Qxh2+ 0-1

`;

logical_chess_7 = `
[Event "Logical Chess, Move by Move #07"]
[Site "Vienna AUT"]
[Date "1926.??.??"]
[Round "7"]
[White "Spielmann"]
[Black "Wahle"]
[Result "1-0"]
[ECO "C01"]
[PlyCount "33"]

1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. exd5 exd5 5. Bg5 Be7 6. Bd3 Nc6 7. Nge2 Nb4 8.
Ng3 Nxd3+ 9. Qxd3 g6 10. O-O c6 11. Rae1 O-O 12. Rxe7 Qxe7 13. Qf3 Kg7 14. Nce4
dxe4 15. Nxe4 Qe6 16. Bxf6+ Kg8 17. Qf4 1-0


`;

logical_chess_8 = `
[Event "Logical Chess, Move by Move #08"]
[Site "Budapest HUN"]
[Date "1929.??.??"]
[Round "8"]
[White "Przepiorka"]
[Black "Prokes"]
[Result "1-0"]
[ECO "D05"]
[PlyCount "47"]

1. d4 Nf6 2. Nf3 e6 3. e3 d5 4. Bd3 c5 5. c3 Nbd7 6. Nbd2 Bd6 7. O-O O-O 8. Re1
Qc7 9. e4 cxd4 10. cxd4 dxe4 11. Nxe4 b6 12. Bg5 Nxe4 13. Rxe4 Bb7 14. Rc1 Qb8
15. Rh4 g6 16. Bb5 Qe8 17. Ne5 Bc8 18. Rxc8 Qxc8 19. Bxd7 Qc7 20. Ng4 h5 21.
Nf6+ Kg7 22. Nxh5+ gxh5 23. Qxh5 Rh8 24. Bh6+ 1-0

`;

logical_chess_9 = `
[Event "Logigal Chess, Move by Move #09"]
[Site "Weston-Super-Mare ENG"]
[Date "1924.??.??"]
[Round "9"]
[White "Znosko-Borovsky"]
[Black "Mackenzie"]
[Result "1-0"]
[ECO "C90"]
[PlyCount "59"]
[EventDate "1924.??.??"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3
Na5 9. Bc2 c5 10. d4 Qc7 11. h3 Nc6 12. Be3 O-O 13. Nbd2 Bd7 14. Rc1 Ne8 15.
Nf1 g6 16. Bh6 Ng7 17. Ne3 Rae8 18. Nd5 Qb7 19. Nxe7+ Rxe7 20. dxc5 dxc5 21.
Qd6 c4 22. Qf6 Nh5 23. Qh4 Ng7 24. Be3 Ne6 25. Qf6 Qc7 26. Bh6 Rc8 27. Rcd1
Ree8 28. Nh2 Qd8 29. Ng4 Qe7 30. Qxe7 1-0

`;

logical_chess_10 = `
[Event "Logical Chess, Move by Move #10"]
[Site "Nuremburg GER"]
[Date "1889.??.??"]
[Round "10"]
[White "Tarrasch"]
[Black "Eckhart"]
[Result "1-0"]
[ECO "C05"]
[PlyCount "33"]

1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. e5 Nfd7 5. Bd3 c5 6. c3 Nc6 7. Ne2 Qb6 8. Nf3
Be7 9. O-O O-O 10. Nf4 Nd8 11. Qc2 f5 12. exf6 Nxf6 13. Ng5 g6 14. Bxg6 hxg6
15. Qxg6+ Kh8 16. Qh6+ Kg8 17. Ng6 1-0

`;

logical_chess_11 = `[Event "Logical Chess, Move by Move #11"]
[Site "Bilin"]
[Date "1930.??.??"]
[Round "11"]
[White "Flohr"]
[Black "Pitschak"]
[Result "0-1"]
[ECO "A46"]
[PlyCount "34"]

1. d4 Nf6 2. Nf3 e6 3. Nbd2 c5 4. e3 b6 5. Bd3 Bb7 6. O-O Be7 7. c4 O-O 8. b3
d5 9. Qc2 Nc6 10. a3 cxd4 11. cxd5 Qxd5 12. exd4 Nxd4 13. Qb1 Rfd8 14. Ne1 Qh5
15. Bb2 Bd6 16. g3 Ng4 17. h4 Qxh4 0-1


`;

logical_chess_12 = `
[Event "Logical Chess, Move by Move #12"]
[Site "Liebwerda"]
[Date "1934.??.??"]
[Round "12"]
[White "Pitschak"]
[Black "Flohr"]
[Result "0-1"]
[ECO "A22"]
[PlyCount "38"]

1. c4 e5 2. Nc3 Nf6 3. g3 d5 4. cxd5 Nxd5 5. Bg2 Nb6 6. Nf3 Nc6 7. O-O Be7 8.
d3 O-O 9. Be3 Bg4 10. h3 Bh5 11. Rc1 Qd7 12. Na4 Bxf3 13. Bxf3 Qxh3 14. Bxc6
bxc6 15. Rxc6 Nd5 16. Qe1 f5 17. Bc5 f4 18. Bxe7 fxg3 19. fxg3 Ne3 0-1

`;

logical_chess_13 = `[Event "Logical Chess, Move By Move #13"]
[Site "Prague"]
[Date "1952.??.??"]
[Round "13"]
[White "Dobias"]
[Black "Podgorny"]
[Result "1-0"]
[ECO "C10"]
[PlyCount "39"]

1. e4 e6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Nf3 Be7 6. Bd3 Ngf6 7. Qe2 O-O 8.
O-O Nxe4 9. Qxe4 Nf6 10. Qh4 b6 11. Bg5 g6 12. c4 Bb7 13. d5 exd5 14. Rfe1 h6
15. Qxh6 Ng4 16. Qh4 Bxg5 17. Nxg5 Nf6 18. Qh6 d4 19. Re6 Re8 20. Bxg6 1-0


`;

logical_chess_14 = `
[Event "Logical Chess, Move By Move #14"]
[Site "GER"]
[Date "1916.??.??"]
[Round "14"]
[White "Tarrasch"]
[Black "Mieses"]
[Result "1-0"]
[ECO "C10"]
[PlyCount "39"]

1. e4 e6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Nf3 Ngf6 6. Bd3 Be7 7. O-O Nxe4 8.
Bxe4 Nf6 9. Bd3 b6 10. Ne5 O-O 11. Nc6 Qd6 12. Qf3 Bd7 13. Nxe7+ Qxe7 14. Bg5
Rac8 15. Rfe1 Rfe8 16. Qh3 Qd6 17. Bxf6 gxf6 18. Qh6 f5 19. Re3 Qxd4 20. c3 1-0


`;

logical_chess_15 = `
[Event "Logical Chess, Move By Move #15"]
[Site "Vienna (Simul) AUT"]
[Date "1936.??.??"]
[Round "15"]
[White "Alekhine"]
[Black "Poindle"]
[Result "1-0"]
[ECO "C67"]
[PlyCount "59"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Nd6 6. dxe5 Nxb5 7. a4 Nd6 8.
exd6 Bxd6 9. Ng5 Be7 10. Qh5 g6 11. Qh6 Bf8 12. Re1+ Ne7 13. Ne4 f5 14. Nf6+
Kf7 15. Qh4 Bg7 16. Bg5 h6 17. Qc4+ Kf8 18. Rxe7 Qxe7 19. Nh7+ Rxh7 20. Bxe7+
Kxe7 21. Qxc7 Bxb2 22. Ra2 Bf6 23. c4 Kf7 24. Re2 Rh8 25. Qd6 a5 26. Nc3 Ra6
27. Qd5+ Kg7 28. Nb5 Re6 29. Nd6 Rd8 30. Kf1 1-0


`;

logical_chess_16 = `
[Event "Logical Chess, Move By Move #16"]
[Site "Nuremberg GER"]
[Date "1889.??.??"]
[Round "16"]
[White "Tarrasch"]
[Black "Kurschner"]
[Result "1-0"]
[ECO "D20"]
[PlyCount "43"]

1. d4 d5 2. c4 dxc4 3. e3 Bf5 4. Bxc4 e6 5. Qb3 Be4 6. f3 Bc6 7. Ne2 Nf6 8. e4
Be7 9. Nbc3 Qc8 10. d5 exd5 11. exd5 Bd7 12. d6 Bxd6 13. Bxf7+ Kd8 14. Bg5 Nc6
15. Ne4 Be7 16. Bxf6 gxf6 17. O-O-O Ne5 18. Nf4 Qb8 19. Qe6 Rf8 20. Nxf6 Bd6
21. Nxd7 Nxd7 22. Rhe1 1-0


`;

logical_chess_17 = `[Event "Logical Chess, Move by Move #17"]
[Site "Hastings ENG"]
[Date "1895.??.??"]
[Round "17"]
[White "Pillsbury"]
[Black "Mason"]
[Result "1-0"]
[ECO "D53"]
[PlyCount "71"]

1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. Nf3 b6 6. e3 Bb7 7. Rc1 dxc4 8. Bxc4
Nbd7 9. O-O O-O 10. Qe2 Nd5 11. Bxe7 Qxe7 12. Nxd5 exd5 13. Bb5 Qd6 14. Rc2 c6
15. Bd3 Nf6 16. Rfc1 Rac8 17. Ba6 Bxa6 18. Qxa6 Rc7 19. Ne5 c5 20. Rxc5 Rxc5
21. Rxc5 Nd7 22. Rc6 Nb8 23. Rxd6 Nxa6 24. Nc6 g6 25. Nxa7 Ra8 26. Nc6 Kg7 27.
a3 Rc8 28. g4 Nc7 29. Ne7 Rb8 30. Rd7 Ne6 31. Nxd5 Rc8 32. Nxb6 Rc2 33. b4 Ng5
34. a4 Ne4 35. a5 Nxf2 36. a6 1-0


`;

logical_chess_18 = `[Event "Logical Chess, Move by Move #18"]
[Site "Holland"]
[Date "1931.??.??"]
[Round "18"]
[White "Noteboom"]
[Black "Doesburgh"]
[Result "1-0"]
[ECO "D51"]
[PlyCount "57"]

1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. a3 Be7 7. Qc2 O-O 8. Nf3
a6 9. Rd1 Re8 10. Bd3 dxc4 11. Bxc4 b5 12. Bd3 h6 13. Bxf6 Nxf6 14. O-O Bb7 15.
Ne4 Nxe4 16. Bxe4 f5 17. Bd3 Qb6 18. Rc1 Rac8 19. b4 Qd8 20. Ne5 a5 21. Qb3 Bd6
22. Bxf5 Qf6 23. Bb1 Bxe5 24. dxe5 Qxe5 25. Rc5 a4 26. Qa2 Qd6 27. Qc2 Rcd8 28.
Qh7+ Kf8 29. Bg6 1-0



`;

logical_chess_19 = `[Event "Logical Chess, Move by Move #19"]
[Site "Vienna AUT"]
[Date "1915.??.??"]
[Round "19"]
[White "Grunfeld"]
[Black "Schenkein"]
[Result "1-0"]
[ECO "D11"]
[PlyCount "45"]

1. d4 d5 2. c4 c6 3. Nf3 e6 4. e3 Nf6 5. Bd3 Nbd7 6. Nbd2 Be7 7. O-O Qc7 8. e4
dxe4 9. Nxe4 Nxe4 10. Bxe4 Nf6 11. Bc2 b6 12. Qe2 Bb7 13. Ne5 Rd8 14. Rd1 O-O
15. Bf4 Bd6 16. c5 bxc5 17. dxc5 Bxe5 18. Bxe5 Qa5 19. Bxf6 gxf6 20. Qg4+ Kh8
21. Qh4 f5 22. Qe7 Bc8 23. b4 1-0


`;

logical_chess_20 = `[Event "Logical Chess, Move by Move #20"]
[Site "Lodz POL"]
[Date "1908.??.??"]
[Round "20"]
[White "Rubinstein"]
[Black "Salwe"]
[Result "1-0"]
[ECO "D33"]
[PlyCount "75"]

1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nf6 6. g3 Nc6 7. Bg2 cxd4 8.
Nxd4 Qb6 9. Nxc6 bxc6 10. O-O Be7 11. Na4 Qb5 12. Be3 O-O 13. Rc1 Bg4 14. f3
Be6 15. Bc5 Rfe8 16. Rf2 Nd7 17. Bxe7 Rxe7 18. Qd4 Ree8 19. Bf1 Rec8 20. e3 Qb7
21. Nc5 Nxc5 22. Rxc5 Rc7 23. Rfc2 Qb6 24. b4 a6 25. Ra5 Rb8 26. a3 Ra7 27.
Rxc6 Qxc6 28. Qxa7 Ra8 29. Qc5 Qb7 30. Kf2 h5 31. Be2 g6 32. Qd6 Qc8 33. Rc5
Qb7 34. h4 a5 35. Rc7 Qb8 36. b5 a4 37. b6 Ra5 38. b7 1-0


`;

logical_chess_21 = `[Event "Logical Chess, Move by Move #21"]
[Site "New York USA"]
[Date "1942.??.??"]
[Round "21"]
[White "Chernev"]
[Black "Hahlbohm"]
[Result "1-0"]
[ECO "D05"]
[PlyCount "47"]

1. d4 d5 2. Nf3 e6 3. e3 c5 4. c3 Nf6 5. Bd3 Nc6 6. Nbd2 Be7 7. O-O O-O 8. Qe2
Re8 9. dxc5 Bxc5 10. e4 e5 11. exd5 Nxd5 12. Nb3 Qb6 13. Bxh7+ Kxh7 14. Qe4+
Kg8 15. Qxd5 Bf8 16. Ng5 Be6 17. Qe4 g6 18. Qh4 Bg7 19. Be3 Qa6 20. Nc5 Qc4 21.
Qh7+ Kf8 22. Ncxe6+ fxe6 23. Qxg6 Nd8 24. Nh7+ 1-0


`;

logical_chess_22 = `[Event "Logical Chess, Move by Move #22"]
[Site "Paris FRA"]
[Date "1900.??.??"]
[Round "22"]
[White "Pillsbury"]
[Black "Marco"]
[Result "1-0"]
[ECO "D55"]
[PlyCount "55"]

1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 b6 7. Bd3 Bb7 8. cxd5
exd5 9. Ne5 Nbd7 10. f4 c5 11. O-O c4 12. Bc2 a6 13. Qf3 b5 14. Qh3 g6 15. f5
b4 16. fxg6 hxg6 17. Qh4 bxc3 18. Nxd7 Qxd7 19. Rxf6 a5 20. Raf1 Ra6 21. Bxg6
21... fxg6 {White now demonstrated mate in 7} 22. Rxf8+ Bxf8 23. Rxf8+ Kxf8 24.
Qh8+ Kf7 25. Qh7+ Kf8 26. Qxd7 26... cxb2 {Or any} 27. Bh6+ Kg8 28. Qg7# 1-0
`;

logical_chess_23 = `[Event "Logical Chess, Move by Move #23"]
[Site "Ostend, BEL"]
[Date "1907.??.??"]
[Round "23"]
[White "Vliet"]
[Black "Znosko-Borovsky"]
[Result "0-1"]
[ECO "D00"]
[PlyCount "72"]
[EventDate "1907.??.??"]

1. d4 d5 2. e3 c5 3. c3 e6 4. Bd3 Nc6 5. f4 Nf6 6. Nd2 Qc7 7. Ngf3 cxd4 8. cxd4
Nb4 9. Bb1 Bd7 10. a3 Rc8 11. O-O Bb5 12. Re1 Nc2 13. Bxc2 Qxc2 14. Qxc2 Rxc2
15. h3 Bd6 16. Nb1 Ne4 17. Nfd2 Bd3 18. Nxe4 Bxe4 19. Nd2 Kd7 20. Nxe4 dxe4 21.
Rb1 Rhc8 22. b4 R8c3 23. Kf1 Kc6 24. Bb2 Rb3 25. Re2 Rxe2 26. Kxe2 Kb5 27. Kd2
Ka4 28. Ke2 a5 29. Kf2 axb4 30. axb4 Kxb4 31. Ke2 Kb5 32. Kd2 Ba3 33. Kc2 Rxb2+
34. Rxb2+ Bxb2 35. Kxb2 Kc4 36. Kc2 b5 0-1



`;

logical_chess_24 = `[Event "Logical Chess, Move by Move #24"]
[Site "Carlsbad CZE"]
[Date "1929.??.??"]
[Round "24"]
[White "Capablanca"]
[Black "Mattison"]
[Result "1-0"]
[ECO "E38"]
[PlyCount "39"]

1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 c5 5. dxc5 Nc6 6. Nf3 Bxc5 7. Bf4 d5 8. e3
Qa5 9. Be2 Bb4 10. O-O Bxc3 11. bxc3 O-O 12. Rab1 Qa3 13. Rfd1 b6 14. cxd5 Nxd5
15. Ng5 f5 16. Bf3 Qc5 17. c4 Ndb4 18. Qb3 e5 19. a3 Na6 20. Bxc6 1-0



`;

logical_chess_25 = `[Event "Logical Chess, Move by Move #25"]
[Site "Barmen"]
[Date "1905.??.??"]
[Round "25"]
[White "Janowsky"]
[Black "Alapin"]
[Result "1-0"]
[ECO "D31"]
[PlyCount "93"]

1. d4 d5 2. c4 e6 3. Nc3 Be7 4. Nf3 Nf6 5. Bg5 h6 6. Bh4 dxc4 7. e3 a6 8. Bxc4
b5 9. Bb3 Nbd7 10. Qe2 c6 11. O-O O-O 12. Rac1 Bb7 13. Rfd1 Rc8 14. Ne5 Nxe5
15. dxe5 Nd5 16. Bxe7 Nxc3 17. Rxc3 Qxe7 18. Rcd3 Rfd8 19. Rd6 Rxd6 20. exd6
Qd7 21. e4 c5 22. e5 c4 23. Bc2 Qc6 24. f3 Qc5+ 25. Kh1 Rd8 26. Qe1 Rd7 27. h3
Bc6 28. f4 Ra7 29. f5 Bd7 30. f6 g6 31. Qg3 Kh7 32. h4 Qc8 33. h5 Qg8 34. Rd4
Be8 35. Rh4 Qf8 36. Rg4 Qg8 37. Qe3 Rd7 38. Rh4 Qf8 39. g4 Kh8 40. hxg6 fxg6
41. Rxh6+ Rh7 42. Rxh7+ Kxh7 43. Qg5 Qf7 44. Qh5+ Kg8 45. Bxg6 Qxg6 46. Qxg6+
Bxg6 47. d7 1-0


`;

logical_chess_26 = `[Event "Logical Chess, Move by Move #26"]
[Site "Coburg GER"]
[Date "1904.??.??"]
[Round "26"]
[White "Bernstein"]
[Black "Mieses"]
[Result "1-0"]
[ECO "B45"]
[PlyCount "97"]

1. e4 c5 2. Nc3 e6 3. Nf3 Nc6 4. d4 cxd4 5. Nxd4 Nf6 6. Nxc6 bxc6 7. e5 Nd5 8.
Ne4 f5 9. exf6 Nxf6 10. Nd6+ Bxd6 11. Qxd6 Ne4 12. Qd4 Nf6 13. Qd6 Ne4 14. Qb4
d5 15. Bd3 Qd6 16. Qxd6 Nxd6 17. f4 a5 18. Be3 Ba6 19. Kd2 Nc4+ 20. Bxc4 Bxc4
21. a4 Kd7 22. b3 Ba6 23. Bb6 Bc8 24. Ke3 Ra6 25. Bc5 Kc7 26. Kd4 Bd7 27. Rhe1
h5 28. Re5 g6 29. Rg5 Rg8 30. Ke5 Be8 31. Re1 Ra8 32. Kf6 Bd7 33. g3 Rae8 34.
Ree5 Rh8 35. Rxg6 Rh7 36. Rg7 Reh8 37. Rxh7 Rxh7 38. Kg6 Rh8 39. Kg7 Rd8 40.
Rxh5 Be8 41. Rh7 Rd7+ 42. Kh6 Rxh7+ 43. Kxh7 Bh5 44. h4 Bd1 45. c3 Bxb3 46. g4
Kd7 47. g5 e5 48. f5 Bxa4 49. f6 1-0


`;

logical_chess_27 = `[Event "Logical Chess, Move by Move #27"]
[Site "Moscow RUS"]
[Date "1945.??.??"]
[Round "27"]
[White "Chekhover"]
[Black "Rudakowsky"]
[Result "1-0"]
[ECO "D61"]
[PlyCount "77"]

1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nc3 Nbd7 7. Qc2 c6 8. Bd3
dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7 11. O-O b5 12. Be2 a6 13. Ne4 Bb7 14. Ne5 Rac8
15. Nxd7 Qxd7 16. Nc5 Qc7 17. Rfd1 Rcd8 18. Rac1 Bc8 19. Qe4 Nf6 20. Qh4 Qa5
21. a3 b4 22. a4 Nd7 23. b3 Nxc5 24. Rxc5 Qb6 25. Rdc1 Bb7 26. a5 Qa7 27. Bd3
g6 28. Qf6 Rd6 29. Qe7 Rfd8 30. h4 R8d7 31. Qf6 Qa8 32. Be4 Qe8 33. h5 Rd8 34.
Bxc6 Bxc6 35. h6 Kf8 36. Rxc6 Rxc6 37. Rxc6 Rd7 38. Rc8 Qxc8 39. Qh8+ 1-0



`;

logical_chess_28 = `[Event "Logical Chess, Move by Move #28"]
[Site "Gothenberg SWE"]
[Date "1920.??.??"]
[Round "28"]
[White "Tarrasch"]
[Black "Mieses"]
[Result "1-0"]
[ECO "B01"]
[PlyCount "81"]

1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 e5 5. Nf3 Bb4 6. Bd2 Bg4 7. Be2 exd4 8.
Nxd4 Qe5 9. Ncb5 Bxe2 10. Qxe2 Bxd2+ 11. Kxd2 Qxe2+ 12. Kxe2 Na6 13. Rhe1 O-O-O
14. Nxa7+ Kb8 15. Ndc6+ bxc6 16. Nxc6+ Kc8 17. Nxd8 Kxd8 18. Rad1+ Ke8 19. Kd3+
Ne7 20. Kc4 h5 21. Rd3 Nb8 22. Rde3 Nbc6 23. b4 f6 24. f4 Kf7 25. a4 Rb8 26. c3
Rd8 27. Rd3 Rxd3 28. Kxd3 Ke8 29. a5 Kd7 30. a6 Nd5 31. Ra1 Na7 32. g3 c6 33.
Ra4 Nb6 34. Ra5 g6 35. c4 Nbc8 36. Ra1 Nd6 37. Kd4 Ndc8 38. Kc5 Kc7 39. Re1 Nb6
40. Re7+ Nd7+ 41. Rxd7+ 1-0


`;

logical_chess_29 = `[Event "Logical Chess, Move by Move #29"]
[Site "Nuremberg GER"]
[Date "1905.??.??"]
[Round "29"]
[White "Marshall"]
[Black "Tarrasch"]
[Result "0-1"]
[ECO "D51"]
[PlyCount "88"]

1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Qc2 Qa5 7. cxd5 Nxd5 8.
Nf3 Bb4 9. Kd2 c5 10. a3 Bxc3+ 11. bxc3 cxd4 12. exd4 N7b6 13. Bd3 Bd7 14. Rhc1
Rc8 15. Qb3 O-O 16. Ke2 Rxc3 17. Rxc3 Qxc3 18. Qb1 h6 19. Bd2 Qc7 20. Kf1 Nc4
21. Bc1 Ba4 22. Qa2 Rc8 23. Qe2 Nc3 24. Qe1 Na5 25. Bxh6 Nb3 26. Bd2 Nxa1 27.
Qxa1 Bb5 28. Bxb5 Nxb5 29. g3 Qc6 30. Kg2 Rd8 31. Be3 Qe4 32. Qb2 Rd5 33. a4
Nd6 34. Bf4 Nf5 35. Be3 Nxe3+ 36. fxe3 Qxe3 37. g4 f5 38. g5 Qe4 39. Qc3 f4 40.
Qc8+ Kh7 41. Qc3 e5 42. h4 Rxd4 43. g6+ Kh6 44. Kh2 Qe2+ 0-1


`;

logical_chess_30 = `[Event "Logical Chess, Move by Move #30"]
[Site "Buenos Aires ARG"]
[Date "1914.??.??"]
[Round "30"]
[White "Capablanca"]
[Black "Villegas"]
[Result "1-0"]
[ECO "D04"]
[PlyCount "67"]

1. d4 d5 2. Nf3 Nf6 3. e3 c6 4. Bd3 Bg4 5. c4 e6 6. Nbd2 Nbd7 7. O-O Be7 8. Qc2
Bh5 9. b3 Bg6 10. Bb2 Bxd3 11. Qxd3 O-O 12. Rae1 Qc7 13. e4 dxe4 14. Nxe4 Nxe4
15. Rxe4 Bf6 16. Qe3 c5 17. Ne5 cxd4 18. Nxd7 Qxd7 19. Bxd4 Bxd4 20. Rxd4 Qc7
21. Rfd1 Rfd8 22. b4 Rxd4 23. Qxd4 b6 24. g3 Rc8 25. Rc1 Rd8 26. Qe3 Kf8 27. c5
bxc5 28. Qe4 Rd5 29. bxc5 g6 30. c6 Kg7 31. a4 Rd6 32. Qe5+ f6 33. Qxd6 Qxd6
34. c7 1-0



`;

logical_chess_31 = `[Event "Logical Chess, Move by Move #31"]
[Site "Budapest HUN"]
[Date "1929.??.??"]
[Round "31"]
[White "Havasi"]
[Black "Capablanca"]
[Result "0-1"]
[ECO "E32"]
[PlyCount "68"]

1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5 5. Nf3 c5 6. cxd5 Qxd5 7. a3 Bxc3+ 8.
bxc3 Nc6 9. e3 O-O 10. Be2 cxd4 11. cxd4 b6 12. Nd2 Bb7 13. Bf3 Qd7 14. O-O
Rac8 15. Qb1 Na5 16. Bxb7 Qxb7 17. Bb2 Qa6 18. Re1 Nd5 19. Ra2 Rc6 20. e4 Nc3
21. Bxc3 Rxc3 22. Nf3 Rfc8 23. h3 Nc4 24. a4 Na3 25. Qb2 Qxa4 26. Re2 b5 27. d5
exd5 28. exd5 b4 29. Qd2 b3 30. Rb2 Rc2 31. Qe3 Rxb2 32. Rxb2 Nc4 33. Qc1 Qa3
34. Rb1 Qxc1+ 0-1



`;

logical_chess_32 = `[Event "Logical Chess, Move by Move #32"]
[Site "Budapest HUN."]
[Date "1929.??.??"]
[Round "32"]
[White "Canal"]
[Black "Capablanca"]
[Result "0-1"]
[ECO "E15"]
[PlyCount "114"]

1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Bb4+ 6. Bd2 Bxd2+ 7. Nbxd2 O-O 8.
O-O c5 9. dxc5 bxc5 10. Qc2 Nc6 11. Rfd1 Qb6 12. a3 Rab8 13. Rab1 Rfc8 14. e4
e5 15. Qd3 d6 16. Nf1 Nd4 17. Nxd4 exd4 18. b4 Qc6 19. bxc5 dxc5 20. Rxb7 Qxb7
21. e5 Qb3 22. exf6 Qxd3 23. Rxd3 Rb1 24. Bd5 Rcb8 25. Kg2 R8b3 26. Rxb3 Rxb3
27. Nd2 Rxa3 28. Ne4 a5 29. Nxc5 gxf6 30. Kf1 a4 31. Ke2 Ra1 32. Nd3 a3 33. c5
a2 34. Kf3 Rd1 35. Bxa2 Rxd3+ 36. Ke4 Rd2 37. Bc4 Kf8 38. f3 Rxh2 39. Kxd4 Ke7
40. Bd3 h5 41. Ke3 Rg2 42. Kf4 Rg1 43. Be4 Rc1 44. c6 Rc3 45. c7 Rxc7 46. Bd5
Rc5 47. Ba2 Rb5 48. Ke3 Ra5 49. Bc4 Rc5 50. Ba6 Ke6 51. Kf4 Rc3 52. Bf1 f5 53.
Ba6 Kf6 54. Bb7 Rc4+ 55. Ke3 Kg5 56. Kf2 f4 57. Kg2 f5 0-1


`;

logical_chess_33 = `[Event "Logical Chess, Move by Move #33"]
[Site "Gothenberg SWE"]
[Date "1920.??.??"]
[Round "33"]
[White "Rubinstein"]
[Black "Maroczy"]
[Result "1-0"]
[ECO "D63"]
[PlyCount "69"]

1. d4 Nf6 2. Nf3 d5 3. c4 e6 4. Bg5 Be7 5. e3 Nbd7 6. Nc3 O-O 7. Rc1 Re8 8. Qc2
dxc4 9. Bxc4 c5 10. O-O cxd4 11. Nxd4 a6 12. Rfd1 Qa5 13. Bh4 Ne5 14. Be2 Ng6
15. Bg3 e5 16. Nb3 Qc7 17. Qb1 Qb8 18. Bf3 Qa7 19. Na5 Bb4 20. Nc4 Bd7 21. Nd5
Nxd5 22. Bxd5 Be6 23. Qe4 Bxd5 24. Rxd5 Rac8 25. Rcd1 Bf8 26. b3 b5 27. Nd6
Bxd6 28. Rxd6 Rc7 29. h4 f6 30. Qd5+ Kh8 31. h5 Nf8 32. h6 Ng6 33. Qe6 Rf8 34.
Rd7 gxh6 35. Bh4 1-0
`;

logical_chess_list = [
  logical_chess_1,
  logical_chess_2,
  logical_chess_3,
  logical_chess_4,
  logical_chess_5,
  logical_chess_6,
  logical_chess_7,
  logical_chess_8,
  logical_chess_9,
  logical_chess_10,
  logical_chess_11,
  logical_chess_12,
  logical_chess_13,
  logical_chess_14,
  logical_chess_15,
  logical_chess_16,
  logical_chess_17,
  logical_chess_18,
  logical_chess_19,
  logical_chess_20,
  logical_chess_21,
  logical_chess_22,
  logical_chess_23,
  logical_chess_24,
  logical_chess_25,
  logical_chess_26,
  logical_chess_27,
  logical_chess_28,
  logical_chess_29,
  logical_chess_30,
  logical_chess_31,
  logical_chess_32,
  logical_chess_33
];

opening_1 = `
Philidor_1 : bad bishop move 
Petrov_1 : 
Kings_pawn_1 
Caro_kahn?

https://www.chess.com/game/live/43965967129

see: shivangbaveja from 4-17-22.


`;

opening_list = [opening_1];



aronian_1 = `d2-d4, g8-f6, c2-c4, g7-g6, b1-c3, d7-d5, g1-f3, f8-g7, c1-g5, f6-e4, c4-d5, e4-g5, f3-g5, e7-e6, d1-d2, e6-d5, d2-e3, e8-f8, g2-g3, h7-h6, g5-h3, c7-c5, d4-c5, d5-d4, e3-d2, d8-e8, c3-d1, b8-d7, h3-f4, d7-c5, f1-g2, g7-e5, e1-g1, h1-f1, f8-g7, f4-d5, e8-d8, a1-c1, c5-a6, b2-b3, h8-e8, d1-b2, a6-c7, d5-f4, c7-e6, f4-d3, e5-f6, b2-c4, e6-g5, d3-c5, d8-e7, d2-b4, c8-g4, h2-h4, g5-e6, c5-e6, e7-e6, b4-b7, a8-d8, f2-f3, g4-h3, c1-c2, g6-g5, h4-h5, d8-d7, b7-b5, d7-e7, g3-g4, h3-g2, g1-g2, e6-c8, c4-a3, c8-d8, c2-d2, d8-d6, a3-c4, e7-e2, f1-f2, e2-f2, d2-f2, d6-e6, c4-d6, e8-d8, d6-f5, g7-h8, f2-e2, e6-c8, b5-d3, c8-c3, d3-c3, d4-c3, g2-f2, d8-d1, e2-c2, h8-h7, f2-e2, d1-h1, f5-d6, h1-h2, e2-d3, h2-h3, d3-e3, f6-e5, d6-b5, f7-f5, g4-f5, g5-g4, e3-e4, h3-h2, c2-c1, h2-e2, e4-d3, g4-f3, b5-c3, e5-c3, c1-c3, e2-a2, d3-e4, f3-f2, c3-f3, h7-g7, e4-e5, a2-e2, e5-d6, g7-f6, b3-b4, e2-b2, d6-c5, a7-a6, c5-c4, b2-a2, c4-b3, a2-e2, b3-c4, e2-d2, c4-c5, d2-b2, c5-c4, b2-c2, c4-d3, c2-a2, d3-d4, a2-b2, d4-c3, b2-a2, c3-d4, a2-a4, d4-c5, a6-a5, b4-b5, a4-a2, b5-b6, a2-b2, c5-c6, a5-a4, b6-b7, b2-c2, c6-d7, c2-b2, d7-c7, b2-c2,`


aronian_2 = `d2-d4, g8-f6, c2-c4, g7-g6, b1-c3, d7-d5, g1-f3, f8-g7, c1-g5, f6-e4, c4-d5, e4-g5, f3-g5, e7-e6, d1-d2, e6-d5, d2-e3, e8-f8, g2-g3, h7-h6, g5-h3, c7-c5, d4-c5, d5-d4, e3-d2, d8-e8, c3-d1, b8-d7, h3-f4, d7-c5, f1-g2, g7-e5, e1-g1, h1-f1, f8-g7, f4-d5, e8-d8, a1-c1, c5-a6, b2-b3, h8-e8, d1-b2, a6-c7, d5-f4, c7-e6, f4-d3, e5-f6, b2-c4, e6-g5, d3-c5, d8-e7, d2-b4, c8-g4, h2-h4, g5-e6, c5-e6, e7-e6, b4-b7, a8-d8, f2-f3, g4-h3, c1-c2, g6-g5, h4-h5, d8-d7, b7-b5, d7-e7, g3-g4, h3-g2, g1-g2, e6-c8, c4-a3, c8-d8, c2-d2, d8-d6, a3-c4, e7-e2, f1-f2, e2-f2, d2-f2, d6-e6, c4-d6, e8-d8, d6-f5, g7-h8, f2-e2, e6-c8, b5-d3, c8-c3, d3-c3, d4-c3, g2-f2, d8-d1, e2-c2, h8-h7, f2-e2, d1-h1, f5-d6, h1-h2, e2-d3, h2-h3, d3-e3, f6-e5, d6-b5, f7-f5, g4-f5, g5-g4, e3-e4, h3-h2, c2-c1, h2-e2, e4-d3, g4-f3, b5-c3, e5-c3, c1-c3, e2-a2, d3-e4, f3-f2, c3-f3, h7-g7, e4-e5, a2-e2, e5-d6, g7-f6, b3-b4, e2-b2, d6-c5, a7-a6, c5-c4, b2-a2, c4-b3, a2-e2, b3-c4, e2-d2, c4-c5, d2-b2, c5-c4, b2-c2, c4-d3, c2-a2, d3-d4, a2-b2, d4-c3, b2-a2, c3-d4, a2-a4, d4-c5, a6-a5, b4-b5, a4-a2, b5-b6, a2-b2, c5-c6, a5-a4, b6-b7, b2-c2, c6-d7, c2-b2, d7-c7, b2-c2,`

aronian_3 = `d2-d4, g8-f6, c2-c4, g7-g6, b1-c3, d7-d5, g1-f3, f8-g7, c1-g5, f6-e4, c4-d5, e4-g5, f3-g5, e7-e6, d1-d2, e6-d5, d2-e3, e8-f8, g2-g3, h7-h6, g5-h3, c7-c5, d4-c5, d5-d4, e3-d2, d8-e8, c3-d1, b8-d7, h3-f4, d7-c5, f1-g2, g7-e5, e1-g1, h1-f1, f8-g7, f4-d5, e8-d8, a1-c1, c5-a6, b2-b3, h8-e8, d1-b2, a6-c7, d5-f4, c7-e6, f4-d3, e5-f6, b2-c4, e6-g5, d3-c5, d8-e7, d2-b4, c8-g4, h2-h4, g5-e6, c5-e6, e7-e6, b4-b7, a8-d8, f2-f3, g4-h3, c1-c2, g6-g5, h4-h5, d8-d7, b7-b5, d7-e7, g3-g4, h3-g2, g1-g2, e6-c8, c4-a3, c8-d8, c2-d2, d8-d6, a3-c4, e7-e2, f1-f2, e2-f2, d2-f2, d6-e6, c4-d6, e8-d8, d6-f5, g7-h8, f2-e2, e6-c8, b5-d3, c8-c3, d3-c3, d4-c3, g2-f2, d8-d1, e2-c2, h8-h7, f2-e2, d1-h1, f5-d6, h1-h2, e2-d3, h2-h3, d3-e3, f6-e5, d6-b5, f7-f5, g4-f5, g5-g4, e3-e4, h3-h2, c2-c1, h2-e2, e4-d3, g4-f3, b5-c3, e5-c3, c1-c3, e2-a2, d3-e4, f3-f2, c3-f3, h7-g7, e4-e5, a2-e2, e5-d6, g7-f6, b3-b4, e2-b2, d6-c5, a7-a6, c5-c4, b2-a2, c4-b3, a2-e2, b3-c4, e2-d2, c4-c5, d2-b2, c5-c4, b2-c2, c4-d3, c2-a2, d3-d4, a2-b2, d4-c3, b2-a2, c3-d4, a2-a4, d4-c5, a6-a5, b4-b5, a4-a2, b5-b6, a2-b2, c5-c6, a5-a4, b6-b7, b2-c2, c6-d7, c2-b2, d7-c7, b2-c2,`

aronian_4 = `d2-d4, g8-f6, c2-c4, g7-g6, b1-c3, d7-d5, g1-f3, f8-g7, c1-g5, f6-e4, c4-d5, e4-g5, f3-g5, e7-e6, d1-d2, e6-d5, d2-e3, e8-f8, g2-g3, h7-h6, g5-h3, c7-c5, d4-c5, d5-d4, e3-d2, d8-e8, c3-d1, b8-d7, h3-f4, d7-c5, f1-g2, g7-e5, e1-g1, h1-f1, f8-g7, f4-d5, e8-d8, a1-c1, c5-a6, b2-b3, h8-e8, d1-b2, a6-c7, d5-f4, c7-e6, f4-d3, e5-f6, b2-c4, e6-g5, d3-c5, d8-e7, d2-b4, c8-g4, h2-h4, g5-e6, c5-e6, e7-e6, b4-b7, a8-d8, f2-f3, g4-h3, c1-c2, g6-g5, h4-h5, d8-d7, b7-b5, d7-e7, g3-g4, h3-g2, g1-g2, e6-c8, c4-a3, c8-d8, c2-d2, d8-d6, a3-c4, e7-e2, f1-f2, e2-f2, d2-f2, d6-e6, c4-d6, e8-d8, d6-f5, g7-h8, f2-e2, e6-c8, b5-d3, c8-c3, d3-c3, d4-c3, g2-f2, d8-d1, e2-c2, h8-h7, f2-e2, d1-h1, f5-d6, h1-h2, e2-d3, h2-h3, d3-e3, f6-e5, d6-b5, f7-f5, g4-f5, g5-g4, e3-e4, h3-h2, c2-c1, h2-e2, e4-d3, g4-f3, b5-c3, e5-c3, c1-c3, e2-a2, d3-e4, f3-f2, c3-f3, h7-g7, e4-e5, a2-e2, e5-d6, g7-f6, b3-b4, e2-b2, d6-c5, a7-a6, c5-c4, b2-a2, c4-b3, a2-e2, b3-c4, e2-d2, c4-c5, d2-b2, c5-c4, b2-c2, c4-d3, c2-a2, d3-d4, a2-b2, d4-c3, b2-a2, c3-d4, a2-a4, d4-c5, a6-a5, b4-b5, a4-a2, b5-b6, a2-b2, c5-c6, a5-a4, b6-b7, b2-c2, c6-d7, c2-b2, d7-c7, b2-c2,`

petrov_1 = `e2-e4, e7-e5, g1-f3, g8-f6, b1-c3, d7-d5, e4-d5, f6-d5, c3-d5, d8-d5, d1-e2, b8-c6, b2-b3, g7-g6, c1-b2, c8-f5, c2-c4, d5-a5, a2-a3, a8-d8, a1-d1, f5-c2, b3-b4, c6-b4, b2-e5, b4-d3, e2-d3, c2-d3, f1-d3, d8-d3, e5-h8, f8-a3, e1-g1, a3-c5, f1-e1, e8-f8, h8-f6, g6-g5, e1-e5, g5-g4, 

`



italian_1 = `e2-e4, e7-e5, g1-f3, b8-c6, f1-c4, d7-d6, c2-c3, f7-f5, d2-d3, f5-e4, d3-e4, c8-g4, b1-d2, d8-e7, h2-h3, g4-e6, c4-e6, e7-e6, b2-b4, e8-c8, a8-d8, a2-a4, a7-a5, b4-a5, c6-a5, f3-g5, e6-f6, h3-h4, g8-h6, d1-f3, f6-f3, g5-f3, d6-d5, e1-g1, h1-f1, d5-e4, d2-e4, c7-c6, f3-e5, d8-e8, f2-f4, h6-f5, g2-g3, h7-h6, c1-a3, f8-a3, a1-a3, a5-c4, e5-c4, e8-e4, c4-b6, c8-b8, a4-a5, f5-g3, f1-f3, g3-f5, a3-a4, e4-e1, g1-f2, e1-c1, c3-c4, f5-h4, f3-g3, g7-g5, f4-g5, h6-g5, g3-g5, h8-f8, f2-g3, h4-f5, g3-g4, f5-e3, g4-g3, f8-d8, g5-e5, c1-c3, c4-c5, b8-a7, g3-f4, e3-g2, f4-e4, d8-d3, a4-d4, d3-e3, e4-f5, e3-f3, f5-e4, f3-f4, 


`;

italian_2 = `e2-e4, e7-e5, g1-f3, g8-f6, b1-c3, f8-c5, f3-e5, d8-e7, e5-f3, e8-g8, h8-f8, d2-d3, f6-g4, d3-d4, c5-b6, h2-h3, g4-f2, e1-f2, f7-f5, e4-e5, d7-d6, c1-f4, d6-e5, f4-e5, b8-c6, f1-d3, g7-g5, h1-e1, g5-g4, e5-g3, e7-b4, f3-h2, c6-d4, d1-d2, d4-c2, f2-f1, c2-a1, e1-a1, g4-h3, g2-h3, c7-c6, a2-a3, b4-c5, c3-a4, c5-g1, f1-e2, g1-a1, d3-c4, g8-g7, g3-e5, g7-g6, e2-d3, c8-d7, d2-g2, g6-h5, g2-f3, h5-g5, f3-f4, g5-g6, f4-g3, g6-h5, g3-f3, h5-g6, f3-g3, g6-h6, g3-f4, h6-g6, f4-g3, 


`;

italian_3 = `e2-e4, e7-e5, g1-f3, b8-c6, f1-c4, d7-d6, c2-c3, f7-f5, d2-d3, f5-e4, d3-e4, c8-g4, b1-d2, d8-e7, h2-h3, g4-e6, c4-e6, e7-e6, b2-b4, e8-c8, a8-d8, a2-a4, a7-a5, b4-a5, c6-a5, f3-g5, e6-f6, h3-h4, g8-h6, d1-f3, f6-f3, g5-f3, d6-d5, e1-g1, h1-f1, d5-e4, d2-e4, c7-c6, f3-e5, d8-e8, f2-f4, h6-f5, g2-g3, h7-h6, c1-a3, f8-a3, a1-a3, a5-c4, e5-c4, e8-e4, c4-b6, c8-b8, a4-a5, f5-g3, f1-f3, g3-f5, a3-a4, e4-e1, g1-f2, e1-c1, c3-c4, f5-h4, f3-g3, g7-g5, f4-g5, h6-g5, g3-g5, h8-f8, f2-g3, h4-f5, g3-g4, f5-e3, g4-g3, f8-d8, g5-e5, c1-c3, c4-c5, b8-a7, g3-f4, e3-g2, f4-e4, d8-d3, a4-d4, d3-e3, e4-f5, e3-f3, f5-e4, f3-f4, 


`;
italian_4 = `rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2
rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3
r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3
r1bqkbnr/pppp1pp1/2n4p/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4
r1bqkbnr/pppp1pp1/2n4p/4p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4
r1bqkb1r/pppp1pp1/2n2n1p/4p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5
r1bqkb1r/pppp1pp1/2n2n1p/4p3/2B1P3/2PP1N2/PP3PPP/RNBQK2R b KQkq - 0 5
r1bqkb1r/ppp2pp1/2n2n1p/3pp3/2B1P3/2PP1N2/PP3PPP/RNBQK2R w KQkq d6 0 6
r1bqkb1r/ppp2pp1/2n2n1p/3Pp3/2B5/2PP1N2/PP3PPP/RNBQK2R b KQkq - 0 6
r1bqkb1r/ppp2pp1/2n4p/3np3/2B5/2PP1N2/PP3PPP/RNBQK2R w KQkq - 0 7
r1bqkb1r/ppp2pp1/2n4p/3Bp3/8/2PP1N2/PP3PPP/RNBQK2R b KQkq - 0 7
r1b1kb1r/ppp2pp1/2n4p/3qp3/8/2PP1N2/PP3PPP/RNBQK2R w KQkq - 0 8
r1b1kb1r/ppp2pp1/2n4p/3qp3/8/2PP1N2/PP3PPP/RNBQ1RK1 b kq - 1 8
r3kb1r/ppp2pp1/2n4p/3qp3/6b1/2PP1N2/PP3PPP/RNBQ1RK1 w kq - 2 9
r3kb1r/ppp2pp1/2n4p/3qp3/6b1/2PP1N2/PP1N1PPP/R1BQ1RK1 b kq - 3 9
r3kb1r/ppp2pp1/2n4p/4p3/6b1/2Pq1N2/PP1N1PPP/R1BQ1RK1 w kq - 0 10
r3kb1r/ppp2pp1/2n4p/4p3/6b1/2Pq1N1P/PP1N1PP1/R1BQ1RK1 b kq - 0 10
r3kb1r/ppp2pp1/2n4p/4p2b/8/2Pq1N1P/PP1N1PP1/R1BQ1RK1 w kq - 1 11
r3kb1r/ppp2pp1/2n4p/4p2b/6P1/2Pq1N1P/PP1N1P2/R1BQ1RK1 b kq g3 0 11
r3kb1r/ppp2pp1/2n3bp/4p3/6P1/2Pq1N1P/PP1N1P2/R1BQ1RK1 w kq - 1 12
r3kb1r/ppp2pp1/2n3bp/4p3/6P1/1NPq1N1P/PP3P2/R1BQ1RK1 b kq - 2 12
r3kb1r/ppp2pp1/2n3bp/4p3/6P1/1NP2N1P/PP3P2/R1Bq1RK1 w kq - 0 13
r3kb1r/ppp2pp1/2n3bp/4p3/6P1/1NP2N1P/PP3P2/R1BR2K1 b kq - 0 13
r3k2r/ppp2pp1/2n3bp/2b1p3/6P1/1NP2N1P/PP3P2/R1BR2K1 w kq - 1 14
r3k2r/ppp2pp1/2n3bp/2N1p3/6P1/2P2N1P/PP3P2/R1BR2K1 b kq - 0 14
r3k2r/p1p2pp1/1pn3bp/2N1p3/6P1/2P2N1P/PP3P2/R1BR2K1 w kq - 0 15
r3k2r/p1p2pp1/1pn3bp/4p3/6P1/2PN1N1P/PP3P2/R1BR2K1 b kq - 1 15
3rk2r/p1p2pp1/1pn3bp/4p3/6P1/2PN1N1P/PP3P2/R1BR2K1 w k - 2 16
3rk2r/p1p2pp1/1pn3bp/4p3/6P1/2PN3P/PP3P2/R1BRN1K1 b k - 3 16
3rk2r/p1p2pp1/1pn3bp/8/4p1P1/2PN3P/PP3P2/R1BRN1K1 w k - 0 17
3rk2r/p1p2pp1/1pn3bp/8/4pBP1/2PN3P/PP3P2/R2RN1K1 b k - 1 17
3rk2r/p1p2pp1/1pn3bp/8/5BP1/2Pp3P/PP3P2/R2RN1K1 w k - 0 18
3rk2r/p1B2pp1/1pn3bp/8/6P1/2Pp3P/PP3P2/R2RN1K1 b k - 0 18
4k2r/p1Br1pp1/1pn3bp/8/6P1/2Pp3P/PP3P2/R2RN1K1 w k - 1 19
4k2r/p2r1pp1/1pn3bp/8/5BP1/2Pp3P/PP3P2/R2RN1K1 b k - 2 19
5rk1/p2r1pp1/1pn3bp/8/5BP1/2Pp3P/PP3P2/R2RN1K1 w - - 3 20
5rk1/p2r1pp1/1pn3bp/8/5BP1/2Pp1N1P/PP3P2/R2R2K1 b - - 4 20
4r1k1/p2r1pp1/1pn3bp/8/5BP1/2Pp1N1P/PP3P2/R2R2K1 w - - 5 21
4r1k1/p2r1pp1/1pn3bp/8/1P3BP1/2Pp1N1P/P4P2/R2R2K1 b - b3 0 21
4r1k1/3r1pp1/1pn3bp/p7/1P3BP1/2Pp1N1P/P4P2/R2R2K1 w - a6 0 22
4r1k1/3r1pp1/1pn3bp/pP6/5BP1/2Pp1N1P/P4P2/R2R2K1 b - - 0 22
3nr1k1/3r1pp1/1p4bp/pP6/5BP1/2Pp1N1P/P4P2/R2R2K1 w - - 1 23
3nr1k1/3r1pp1/1p4bp/pP2N3/5BP1/2Pp3P/P4P2/R2R2K1 b - - 2 23
3nr1k1/5pp1/1p4bp/pP1rN3/5BP1/2Pp3P/P4P2/R2R2K1 w - - 3 24
3nr1k1/5pp1/1p4bp/pP1r4/5BP1/2PN3P/P4P2/R2R2K1 b - - 0 24
4r1k1/5pp1/1p2n1bp/pP1r4/5BP1/2PN3P/P4P2/R2R2K1 w - - 1 25
4r1k1/5pp1/1p2n1bp/pP1r4/6P1/2PN3P/P4P1B/R2R2K1 b - - 2 25
4r1k1/5pp1/1p2n2p/pP1r4/6P1/2Pb3P/P4P1B/R2R2K1 w - - 0 26
4r1k1/5pp1/1p2n2p/pP1r4/P5P1/2Pb3P/5P1B/R2R2K1 b - a3 0 26
3r2k1/5pp1/1p2n2p/pP1r4/P5P1/2Pb3P/5P1B/R2R2K1 w - - 1 27
3r2k1/5pp1/1p2n2p/pP1r4/P5P1/2Pb3P/5P1B/R1R3K1 b - - 2 27
3r2k1/5pp1/1p5p/pPnr4/P5P1/2Pb3P/5P1B/R1R3K1 w - - 3 28
3r2k1/5pp1/1p5p/pPnr4/P1P3P1/3b3P/5P1B/R1R3K1 b - - 0 28
3r2k1/5pp1/1p5p/pPnr4/P1b3P1/7P/5P1B/R1R3K1 w - - 0 29
3r2k1/5pp1/1p5p/pPnr4/P1b3P1/7P/5PKB/R1R5 b - - 1 29
3r2k1/5pp1/1p5p/pP1r4/P1b3P1/1n5P/5PKB/R1R5 w - - 2 30
3r2k1/5pp1/1p5p/pP1r4/P1R3P1/1n5P/5PKB/R7 b - - 0 30
3r2k1/5pp1/1p5p/pP1r4/P1R3P1/7P/5PKB/n7 w - - 0 31
3r2k1/2B2pp1/1p5p/pP1r4/P1R3P1/7P/5PK1/n7 b - - 1 31
6k1/2Br1pp1/1p5p/pP1r4/P1R3P1/7P/5PK1/n7 w - - 2 32
6k1/3r1pp1/1B5p/pP1r4/P1R3P1/7P/5PK1/n7 b - - 0 32
6k1/3r1pp1/1B5p/pP1r4/P1R3P1/1n5P/5PK1/8 w - - 1 33
6k1/3r1pp1/1B5p/pP1r4/P5P1/1nR4P/5PK1/8 b - - 2 33
6k1/3r1pp1/1B5p/pP6/P5P1/1nRr3P/5PK1/8 w - - 3 34
2R3k1/3r1pp1/1B5p/pP6/P5P1/1n1r3P/5PK1/8 b - - 4 34
2R5/3r1ppk/1B5p/pP6/P5P1/1n1r3P/5PK1/8 w - - 5 35
2R5/3r1ppk/1B5p/pP6/P5PP/1n1r4/5PK1/8 b - - 0 35
2R5/5ppk/1B1r3p/pP6/P5PP/1n1r4/5PK1/8 w - - 1 36
2R5/B4ppk/3r3p/pP6/P5PP/1n1r4/5PK1/8 b - - 2 36
2R5/B4ppk/3r3p/pP6/P5PP/3r4/3n1PK1/8 w - - 3 37
2R5/B4ppk/3r3p/pP4P1/P6P/3r4/3n1PK1/8 b - - 0 37
2R5/B4ppk/3r4/pP4p1/P6P/3r4/3n1PK1/8 w - - 0 38
2R5/B4ppk/3r4/pP4P1/P7/3r4/3n1PK1/8 b - - 0 38
2R5/B4pp1/3r2k1/pP4P1/P7/3r4/3n1PK1/8 w - - 1 39
2R5/B4pp1/1P1r2k1/p5P1/P7/3r4/3n1PK1/8 b - - 0 39
2R5/B4pp1/1P1r4/p5k1/P7/3r4/3n1PK1/8 w - - 0 40
2R5/BP3pp1/3r4/p5k1/P7/3r4/3n1PK1/8 b - - 0 40
2R5/BP3pp1/3r4/p5k1/P7/1r6/3n1PK1/8 w - - 1 41
1QR5/B4pp1/3r4/p5k1/P7/1r6/3n1PK1/8 b - - 0 41
1rR5/B4pp1/3r4/p5k1/P7/8/3n1PK1/8 w - - 0 42
1BR5/5pp1/3r4/p5k1/P7/8/3n1PK1/8 b - - 0 42
1BR5/5pp1/6r1/p5k1/P7/8/3n1PK1/8 w - - 1 43
1BR5/5pp1/6r1/p5k1/P7/7K/3n1P2/8 b - - 2 43
1BR5/5pp1/6r1/p5k1/P3n3/7K/5P2/8 w - - 3 44
1BR5/5pp1/6r1/p5k1/P3nP2/7K/8/8 b - f3 0 44
1BR5/5pp1/6r1/p4k2/P3nP2/7K/8/8 w - - 1 45
1B6/2R2pp1/6r1/p4k2/P3nP2/7K/8/8 b - - 2 45
1B6/2R3p1/5pr1/p4k2/P3nP2/7K/8/8 w - - 0 46
1B6/1R4p1/5pr1/p4k2/P3nP2/7K/8/8 b - - 1 46
1B6/1R4p1/5p1r/p4k2/P3nP2/7K/8/8 w - - 2 47
1B6/1R4p1/5p1r/p4k2/P3nP2/8/6K1/8 b - - 3 47
1B6/1R6/5p1r/p4kp1/P3nP2/8/6K1/8 w - g6 0 48
1B6/1R6/5p1r/p4kP1/P3n3/8/6K1/8 b - - 0 48
1B6/1R6/7r/p4kp1/P3n3/8/6K1/8 w - - 0 49
1B6/8/7r/pR3kp1/P3n3/8/6K1/8 b - - 1 49
1B6/8/7r/pR4p1/P3n1k1/8/6K1/8 w - - 2 50
1B6/8/7r/R5p1/P3n1k1/8/6K1/8 b - - 0 50
1B6/8/7r/R5p1/P5k1/2n5/6K1/8 w - - 1 51
1B6/R7/7r/6p1/P5k1/2n5/6K1/8 b - - 2 51
1B5r/R7/8/6p1/P5k1/2n5/6K1/8 w - - 3 52
7r/R7/8/4B1p1/P5k1/2n5/6K1/8 b - - 4 52
4r3/R7/8/4B1p1/P5k1/2n5/6K1/8 w - - 5 53
4r3/R7/8/6p1/P5k1/2B5/6K1/8 b - - 0 53
8/R7/8/6p1/P5k1/2B1r3/6K1/8 w - - 1 54


`;

italian_5 = `e2-e4, e7-e5, g1-f3, b8-c6, f1-c4, f8-c5, c2-c3, g8-f6, d2-d3, h7-h6, b2-b4, c5-b6, b4-b5, c6-e7, f3-e5, e8-g8, h8-f8, e1-g1, h1-f1, d7-d5, c4-b3, c7-c6, a2-a4, a7-a6, c1-h6, g7-h6, b1-d2, a6-b5, a4-b5, a8-a1, d1-a1, d5-e4, d3-d4, e7-d5, f1-e1, c6-b5, d2-e4, f6-e4, e1-e4, c8-f5, e4-e2, f5-d3, e2-a2, d3-c4, a2-a8, d8-e7, b3-c2, g8-g7, e5-c4, f8-a8, a1-d1, b5-c4, h2-h3, d5-c3, d1-g4, e7-g5, 
`;

//3

grob_1 = `g2-g4, e7-e6, f1-g2, d7-d5, c2-c4, c7-c6, d1-b3, b8-d7, d2-d4, g8-f6, h2-h3, f8-e7, c4-c5, a8-b8, c1-f4, b8-a8, b1-d2, d8-a5, e1-c1, a1-d1, b7-b6, f4-c7, e7-c5, d4-c5, d7-c5, b3-a3, a5-a3, b2-a3, h7-h6, e2-e4, f6-e4, d2-e4, c5-e4, g2-e4, d5-e4, d1-d8, e8-e7, d8-h8, c8-b7, h8-a8, b7-a8, g1-e2, e4-e3, f2-e3, c6-c5, e2-c3, a8-h1, c3-e4, h1-e4, c7-e5, f7-f6, e5-b8, e6-e5, b8-a7, e7-e6, a7-b6, c5-c4, c1-d2, e6-d5, d2-c3, g7-g5, b6-d8, f6-f5, g4-f5, e4-f5, d8-f6, g5-g4, h3-g4, f5-g4, f6-g7, h6-h5, a3-a4, h5-h4, a4-a5, h4-h3, a5-a6, h3-h2, a6-a7, h2-h1, a7-a8, d5-e6, a8-e8, e6-f5, e8-e5, f5-g6, e5-f6, g6-h5, f6-h6, `

grob_list = [grob_1]


aronian_list = [aronian_1, aronian_2, aronian_3, aronian_4]

italian_list = [italian_1, italian_2, italian_3, italian_4, italian_5]

petrov_list = [petrov_1]

kings_knight_1 = `

rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2
rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
rnbqk1nr/pppp1ppp/8/2b1p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3
rnbqk1nr/pppp1ppp/8/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3
rnb1k1nr/pppp1ppp/5q2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4
rnb1k1nr/pppp1ppp/5q2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4
rnb1k1nr/pppp1pp1/5q1p/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5
rnb1k1nr/pppp1pp1/5q1p/2b1p3/2B1P3/3P1N2/PPPB1PPP/RN1QK2R b KQkq - 1 5
rnb1k1nr/ppp2pp1/3p1q1p/2b1p3/2B1P3/3P1N2/PPPB1PPP/RN1QK2R w KQkq - 0 6
rnb1k1nr/ppp2pp1/3p1q1p/2b1p3/1PB1P3/3P1N2/P1PB1PPP/RN1QK2R b KQkq b3 0 6
rnb1k1nr/ppp2pp1/1b1p1q1p/4p3/1PB1P3/3P1N2/P1PB1PPP/RN1QK2R w KQkq - 1 7
rnb1k1nr/ppp2pp1/1b1p1q1p/4p3/PPB1P3/3P1N2/2PB1PPP/RN1QK2R b KQkq a3 0 7
rnb1k1nr/pp3pp1/1bpp1q1p/4p3/PPB1P3/3P1N2/2PB1PPP/RN1QK2R w KQkq - 0 8
rnb1k1nr/pp3pp1/1bpp1q1p/P3p3/1PB1P3/3P1N2/2PB1PPP/RN1QK2R b KQkq - 0 8
rnbbk1nr/pp3pp1/2pp1q1p/P3p3/1PB1P3/3P1N2/2PB1PPP/RN1QK2R w KQkq - 1 9
rnbbk1nr/pp3pp1/2pp1q1p/P3p3/1PB1P3/2PP1N2/3B1PPP/RN1QK2R b KQkq - 0 9
rnbbk2r/pp2npp1/2pp1q1p/P3p3/1PB1P3/2PP1N2/3B1PPP/RN1QK2R w KQkq - 1 10
rnbbk2r/pp2npp1/2pp1q1p/P3p3/1PB1P3/1QPP1N2/3B1PPP/RN2K2R b KQkq - 2 10
rnbb1rk1/pp2npp1/2pp1q1p/P3p3/1PB1P3/1QPP1N2/3B1PPP/RN2K2R w KQ - 3 11
rnbb1rk1/pp2npp1/2pp1q1p/PP2p3/2B1P3/1QPP1N2/3B1PPP/RN2K2R b KQ - 0 11
rnbb1rk1/1p2npp1/p1pp1q1p/PP2p3/2B1P3/1QPP1N2/3B1PPP/RN2K2R w KQ - 0 12
rnbb1rk1/1p2npp1/p1pp1q1p/PP2p3/2B1P3/1QPP1N2/3B1PPP/RN3RK1 b - - 1 12
rnbb1rk1/1p2npp1/p1p2q1p/PP1pp3/2B1P3/1QPP1N2/3B1PPP/RN3RK1 w - - 0 13
rnbb1rk1/1p2npp1/p1p2q1p/PP1Pp3/2B5/1QPP1N2/3B1PPP/RN3RK1 b - - 0 13
rnbb1rk1/1p2npp1/p4q1p/PP1pp3/2B5/1QPP1N2/3B1PPP/RN3RK1 w - - 0 14
rnbb1rk1/1p2npp1/p4q1p/PP1Bp3/8/1QPP1N2/3B1PPP/RN3RK1 b - - 0 14
rnbb1rk1/1p2npp1/5q1p/Pp1Bp3/8/1QPP1N2/3B1PPP/RN3RK1 w - - 0 15
rnbb1rk1/1p2npp1/5q1p/PQ1Bp3/8/2PP1N2/3B1PPP/RN3RK1 b - - 0 15
rnbb1rk1/1p2npp1/6qp/PQ1Bp3/8/2PP1N2/3B1PPP/RN3RK1 w - - 1 16
rnbb1rk1/1p2npp1/6qp/PQ1BN3/8/2PP4/3B1PPP/RN3RK1 b - - 0 16
rnbb1rk1/1p2npp1/7p/PQ1BNq2/8/2PP4/3B1PPP/RN3RK1 w - - 1 17
rnbb1rk1/1p2npp1/7p/PQ1BNq2/3P4/2P5/3B1PPP/RN3RK1 b - - 0 17
1nbb1rk1/1p2npp1/r6p/PQ1BNq2/3P4/2P5/3B1PPP/RN3RK1 w - - 1 18
1nbb1rk1/1B2npp1/r6p/PQ2Nq2/3P4/2P5/3B1PPP/RN3RK1 b - - 0 18
1nbb1rk1/1B2npp1/r3q2p/PQ2N3/3P4/2P5/3B1PPP/RN3RK1 w - - 1 19
1nbb1rk1/4npp1/B3q2p/PQ2N3/3P4/2P5/3B1PPP/RN3RK1 b - - 0 19
1n1b1rk1/4npp1/b3q2p/PQ2N3/3P4/2P5/3B1PPP/RN3RK1 w - - 0 20
1Q1b1rk1/4npp1/b3q2p/P3N3/3P4/2P5/3B1PPP/RN3RK1 b - - 0 20
1Q1b1rk1/4npp1/4q2p/P3N3/3P4/2P5/3B1PPP/RN3bK1 w - - 0 21
1Q1b1rk1/4npp1/4q2p/P3N3/3P4/2P5/3B1PPP/RN3K2 b - - 0 21
1Q3rk1/4npp1/4q2p/b3N3/3P4/2P5/3B1PPP/RN3K2 w - - 0 22
5rk1/4npp1/4q2p/bQ2N3/3P4/2P5/3B1PPP/RN3K2 b - - 1 22
3b1rk1/4npp1/4q2p/1Q2N3/3P4/2P5/3B1PPP/RN3K2 w - - 2 23
3b1rk1/4npp1/4q2p/1Q1PN3/8/2P5/3B1PPP/RN3K2 b - - 0 23
3b1rk1/4npp1/7p/1Q1PNq2/8/2P5/3B1PPP/RN3K2 w - - 1 24
3b1rk1/4npp1/3P3p/1Q2Nq2/8/2P5/3B1PPP/RN3K2 b - - 0 24
3b1rk1/5pp1/3P2np/1Q2Nq2/8/2P5/3B1PPP/RN3K2 w - - 1 25
3b1rk1/5pp1/3P2nB/1Q2Nq2/8/2P5/5PPP/RN3K2 b - - 0 25
3b1rk1/5p2/3P2np/1Q2Nq2/8/2P5/5PPP/RN3K2 w - - 0 26
3b1rk1/5p2/3P2np/1Q2Nq2/2P5/8/5PPP/RN3K2 b - - 0 26
3b1rk1/5p2/3P3p/1Q2nq2/2P5/8/5PPP/RN3K2 w - - 0 27
3b1rk1/5p2/3P3p/1QP1nq2/8/8/5PPP/RN3K2 b - - 0 27
5rk1/5p2/3P1b1p/1QP1nq2/8/8/5PPP/RN3K2 w - - 1 28
5rk1/1Q3p2/3P1b1p/2P1nq2/8/8/5PPP/RN3K2 b - - 2 28
5rk1/1Q3p2/3P1b1p/2P2q2/8/3n4/5PPP/RN3K2 w - - 3 29
5rk1/1Q3p2/2PP1b1p/5q2/8/3n4/5PPP/RN3K2 b - - 0 29
5rk1/1Q3p2/2PP1b1p/8/8/3n4/5qPP/RN3K2 w - - 0 30

`;

kings_knight_info_1 = `
22b:
e5-d7,f8-e8,d7-f6,e6-f6,b5-e8,

there is a nasty combination with the knight

and move your knight to the rim to develop...

1. e4 e5 2. Nf3 Bc5 3. Bc4 Qf6 4. d3 h6 5. Bd2 d6 6. b4 Bb6 7. a4 c6 8. a5 Bd8
9. c3 Ne7 10. Qb3 O-O 11. b5 a6 12. O-O d5 13. exd5 cxd5 14. Bxd5 axb5 15. Qxb5
Qg6 16. Nxe5 Qf5 17. d4 Ra6 18. Bxb7 Qe6 19. Bxa6 Bxa6 20. Qxb8 Bxf1 21. Kxf1
Bxa5 22. Qb5 Bd8 23. d5 Qf5 24. d6 Ng6 25. Bxh6 gxh6 26. c4 Nxe5 27. c5 Bf6 28.
Qb7 Nd3 29. c6 Qxf2# 0-1

https://www.chess.com/openings/Kings-Pawn-Opening-Kings-Knight-Busch-Gass-Gambit

`;

kings_knight_list = [kings_knight_1];

kings_knight_info_list = [kings_knight_info_1];

nimzo_defense_1 = `rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1
rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2
rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2
rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3
rnbqkb1r/pppp1ppp/4pn2/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3
rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4
rnbqk2r/pppp1ppp/4pn2/8/1bPP4/P1N5/1P2PPPP/R1BQKBNR b KQkq - 0 4
rnbqk2r/pppp1ppp/4pn2/8/2PP4/P1b5/1P2PPPP/R1BQKBNR w KQkq - 0 5
rnbqk2r/pppp1ppp/4pn2/8/2PP4/P1P5/4PPPP/R1BQKBNR b KQkq - 0 5
rnbqk2r/pp1p1ppp/4pn2/2p5/2PP4/P1P5/4PPPP/R1BQKBNR w KQkq c6 0 6
rnbqk2r/pp1p1ppp/4pn2/2p5/2PPP3/P1P5/5PPP/R1BQKBNR b KQkq e3 0 6
rnb1k2r/pp1p1ppp/4pn2/q1p5/2PPP3/P1P5/5PPP/R1BQKBNR w KQkq - 1 7
rnb1k2r/pp1p1ppp/4pn2/q1p1P3/2PP4/P1P5/5PPP/R1BQKBNR b KQkq - 0 7
rnb1k2r/pp1p1ppp/4p3/q1p1P3/2PPn3/P1P5/5PPP/R1BQKBNR w KQkq - 1 8
rnb1k2r/pp1p1ppp/4p3/q1p1P3/2PPn3/P1P5/3B1PPP/R2QKBNR b KQkq - 2 8
r1b1k2r/pp1p1ppp/2n1p3/q1p1P3/2PPn3/P1P5/3B1PPP/R2QKBNR w KQkq - 3 9
r1b1k2r/pp1p1ppp/2n1p3/q1p1P3/2PPn3/P1P2N2/3B1PPP/R2QKB1R b KQkq - 4 9
r1b1k2r/pp1p1ppp/2n1p3/q1p1P3/2PP4/P1n2N2/3B1PPP/R2QKB1R w KQkq - 0 10
r1b1k2r/pp1p1ppp/2n1p3/q1p1P3/2PP4/P1n2N2/2QB1PPP/R3KB1R b KQkq - 1 10
r1b1k2r/pp1p1ppp/2n1p3/q3P3/2Pp4/P1n2N2/2QB1PPP/R3KB1R w KQkq - 0 11
r1b1k2r/pp1p1ppp/2n1p3/q3P3/P1Pp4/2n2N2/2QB1PPP/R3KB1R b KQkq - 0 11
r1b1k2r/p2p1ppp/1pn1p3/q3P3/P1Pp4/2n2N2/2QB1PPP/R3KB1R w KQkq - 0 12
r1b1k2r/p2p1ppp/1pn1p3/q3P3/P1Pp4/2n2N2/2QBBPPP/R3K2R b KQkq - 1 12
r3k2r/p2p1ppp/bpn1p3/q3P3/P1Pp4/2n2N2/2QBBPPP/R3K2R w KQkq - 2 13
r3k2r/p2p1ppp/bpn1p3/q3P3/P1Pp4/2n2N2/2QBBPPP/R4K1R b kq - 3 13
2r1k2r/p2p1ppp/bpn1p3/q3P3/P1Pp4/2n2N2/2QBBPPP/R4K1R w k - 4 14
2r1k2r/p2p1ppp/bpn1p3/q3P3/P1Pp4/2n2NP1/2QBBP1P/R4K1R b k - 0 14
2r1k2r/p2p1ppp/bp2p3/q3n3/P1Pp4/2n2NP1/2QBBP1P/R4K1R w k - 0 15
2r1k2r/p2p1ppp/bp2p3/q3n3/P1PN4/2n3P1/2QBBP1P/R4K1R b k - 0 15
2r1k2r/p2p1ppp/bp2p3/q3n3/P1PN4/6P1/2QBnP1P/R4K1R w k - 0 16
2r1k2r/p2p1ppp/bp2p3/B3n3/P1PN4/6P1/2Q1nP1P/R4K1R b k - 0 16
2r1k2r/p2p1ppp/bp2p3/B3n3/P1Pn4/6P1/2Q2P1P/R4K1R w k - 0 17
2r1k2r/p2p1ppp/bp2p3/B3n3/P1Pn4/6P1/1Q3P1P/R4K1R b k - 1 17
4k2r/p2p1ppp/bp2p3/B3n3/P1rn4/6P1/1Q3P1P/R4K1R w k - 0 18
4k2r/p2p1ppp/bp2p3/B3n3/P1rn4/6P1/1Q3PKP/R6R b k - 1 18
4k2r/pb1p1ppp/1p2p3/B3n3/P1rn4/6P1/1Q3PKP/R6R w k - 2 19
4k2r/pb1p1ppp/1p2p3/B3n3/P1rn4/6PK/1Q3P1P/R6R b k - 3 19
4k2r/pb1p1ppp/1p2p3/B7/P1rn4/3n2PK/1Q3P1P/R6R w k - 4 20
4k2r/pb1p1ppp/1p2p3/B7/P1rn4/3n2PK/3Q1P1P/R6R b k - 5 20
4k2r/pb1p1ppp/1p2p3/B7/P1r5/3n1nPK/3Q1P1P/R6R w k - 6 21
4k2r/pb1p1ppp/1p2p3/B7/P1r5/3nQnPK/5P1P/R6R b k - 7 21
4k2r/pb1p1ppp/1p2p3/B5n1/P1r5/3nQ1PK/5P1P/R6R w k - 8 22


`;

nimzo_defense_list = [nimzo_defense_1];

nimzo_defense_info_1 = `
move 5a:

you want to be able to : push the pawns e2 to e3 or d2 to d3  and queen to c2


at move 6a: queen has a double attack if the pawn is captured


double attacker on the c3 pawn at 7b

white needs to get the knight out the way when attacked by a pawn

10b knight is cemented

10b:
f3-d4,a5-e5,d4-e2,c3-e2,f1-e2,e5-a1 with check and you have all sorts of problems


purpose of 11b is to bring the bishop to attack the c4 pawn

13a: cannot castle because then e2 bishop is hanging 


14b: for white to capture the knight at e5 do not gain anything...

15b: black offers queen

now in this variation bishop cannot move or the knight hangs with the bishop lining up against the king

d4-e2,a5-d5,c4-d5,c8-c2,


c4 square under triple attack 

18b:
g2-g1,c4-c2,b2-d4,e5-f3,g1-f1,f3-d4


20b:
d2-d2,d2-d3,f3-g5,


21b: e3-g5,d3-f2, checkmate

`;

nimzo_defense_info_list = [nimzo_defense_info_1];

birds_opening_1 = `
rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1
rnbqkbnr/ppp1pppp/8/3p4/5P2/8/PPPPP1PP/RNBQKBNR w KQkq d6 0 2
rnbqkbnr/ppp1pppp/8/3p4/5P2/5N2/PPPPP1PP/RNBQKB1R b KQkq - 1 2
rnbqkbnr/pp2pppp/2p5/3p4/5P2/5N2/PPPPP1PP/RNBQKB1R w KQkq - 0 3
rnbqkbnr/pp2pppp/2p5/3p4/3P1P2/5N2/PPP1P1PP/RNBQKB1R b KQkq d3 0 3
rn1qkbnr/pp2pppp/2p5/3p1b2/3P1P2/5N2/PPP1P1PP/RNBQKB1R w KQkq - 1 4
rn1qkbnr/pp2pppp/2p5/3p1b2/3P1P2/4PN2/PPP3PP/RNBQKB1R b KQkq - 0 4
rn1qkbnr/pp2ppp1/2p4p/3p1b2/3P1P2/4PN2/PPP3PP/RNBQKB1R w KQkq - 0 5
rn1qkbnr/pp2ppp1/2p4p/3p1b2/3P1P2/2N1PN2/PPP3PP/R1BQKB1R b KQkq - 1 5
rn1qkbnr/pp2p1p1/2p2p1p/3p1b2/3P1P2/2N1PN2/PPP3PP/R1BQKB1R w KQkq - 0 6
rn1qkbnr/pp2p1p1/2p2p1p/3p1b2/3P1P2/2NBPN2/PPP3PP/R1BQK2R b KQkq - 1 6
rn1qkbnr/pp2p1p1/2p2p1p/3p4/3P1P2/2NbPN2/PPP3PP/R1BQK2R w KQkq - 0 7
rn1qkbnr/pp2p1p1/2p2p1p/3p4/3P1P2/2NQPN2/PPP3PP/R1B1K2R b KQkq - 0 7
r2qkbnr/pp1np1p1/2p2p1p/3p4/3P1P2/2NQPN2/PPP3PP/R1B1K2R w KQkq - 1 8
r2qkbnr/pp1np1p1/2p2p1p/3p4/3P1P2/3QPN2/PPP1N1PP/R1B1K2R b KQkq - 2 8
r2qkbnr/pp1n2p1/2p1pp1p/3p4/3P1P2/3QPN2/PPP1N1PP/R1B1K2R w KQkq - 0 9
r2qkbnr/pp1n2p1/2p1pp1p/3p4/3P1P1N/3QP3/PPP1N1PP/R1B1K2R b KQkq - 1 9
r3kbnr/pp1n2p1/2p1pp1p/q2p4/3P1P1N/3QP3/PPP1N1PP/R1B1K2R w KQkq - 2 10
r3kbnr/pp1n2p1/2p1pp1p/q2p4/3P1P1N/2PQP3/PP2N1PP/R1B1K2R b KQkq - 0 10
r3kb1r/pp1nn1p1/2p1pp1p/q2p4/3P1P1N/2PQP3/PP2N1PP/R1B1K2R w KQkq - 1 11
r3kb1r/pp1nn1p1/2p1pp1p/q2p4/1P1P1P1N/2PQP3/P3N1PP/R1B1K2R b KQkq b3 0 11
r3kb1r/ppqnn1p1/2p1pp1p/3p4/1P1P1P1N/2PQP3/P3N1PP/R1B1K2R w KQkq - 1 12
r3kb1r/ppqnn1p1/2p1pp1p/3p4/1P1P1P1N/2PQP3/P3N1PP/R1B2RK1 b kq - 2 12
r3kb1r/p1qnn1p1/1pp1pp1p/3p4/1P1P1P1N/2PQP3/P3N1PP/R1B2RK1 w kq - 0 13
r3kb1r/p1qnn1p1/1pp1pp1p/3p1P2/1P1P3N/2PQP3/P3N1PP/R1B2RK1 b kq - 0 13
r3kb1r/p1qnn1p1/1pp2p1p/3p1p2/1P1P3N/2PQP3/P3N1PP/R1B2RK1 w kq - 0 14
r3kb1r/p1qnn1p1/1pp2p1p/3p1N2/1P1P4/2PQP3/P3N1PP/R1B2RK1 b kq - 0 14
r3kb1r/p1qn2p1/1pp2p1p/3p1n2/1P1P4/2PQP3/P3N1PP/R1B2RK1 w kq - 0 15
r3kb1r/p1qn2p1/1pp2p1p/3p1Q2/1P1P4/2P1P3/P3N1PP/R1B2RK1 b kq - 0 15
r3kbr1/p1qn2p1/1pp2p1p/3p1Q2/1P1P4/2P1P3/P3N1PP/R1B2RK1 w q - 1 16
r3kbr1/p1qn2pQ/1pp2p1p/3p4/1P1P4/2P1P3/P3N1PP/R1B2RK1 b q - 2 16
2kr1br1/p1qn2pQ/1pp2p1p/3p4/1P1P4/2P1P3/P3N1PP/R1B2RK1 w - - 3 17
2kr1bQ1/p1qn2p1/1pp2p1p/3p4/1P1P4/2P1P3/P3N1PP/R1B2RK1 b - - 0 17
2kr2Q1/p1qn2p1/1ppb1p1p/3p4/1P1P4/2P1P3/P3N1PP/R1B2RK1 w - - 1 18
2kr4/p1qn2Q1/1ppb1p1p/3p4/1P1P4/2P1P3/P3N1PP/R1B2RK1 b - - 0 18
2kr4/p1qn2Q1/1pp2p1p/3p4/1P1P4/2P1P3/P3N1Pb/R1B2RK1 w - - 0 19
2kr4/p1qn2Q1/1pp2p1p/3p4/1P1P4/2P1P3/P3N1Pb/R1B2R1K b - - 1 19
2kr4/p1qn2Q1/1p3p1p/2pp4/1P1P4/2P1P3/P3N1Pb/R1B2R1K w - - 0 20
2kr4/p1qn4/1p3p1Q/2pp4/1P1P4/2P1P3/P3N1Pb/R1B2R1K b - - 0 20
2kr4/p1qn4/1p1b1p1Q/2pp4/1P1P4/2P1P3/P3N1P1/R1B2R1K w - - 1 21
2kr4/p1qn4/1p1b1p1Q/2pp4/1P1P4/2P1P1P1/P3N3/R1B2R1K b - - 0 21
2k3r1/p1qn4/1p1b1p1Q/2pp4/1P1P4/2P1P1P1/P3N3/R1B2R1K w - - 1 22
2k3r1/p1qn2Q1/1p1b1p2/2pp4/1P1P4/2P1P1P1/P3N3/R1B2R1K b - - 2 22
2k5/p1qn2r1/1p1b1p2/2pp4/1P1P4/2P1P1P1/P3N3/R1B2R1K w - - 0 23
2k5/p1qn2r1/1p1b1p2/2pp4/1P1P4/2P1P1P1/P7/R1B2RNK b - - 1 23
2k5/p1qn2r1/1p3p2/2pp4/1P1P4/2P1P1b1/P7/R1B2RNK w - - 0 24
2k5/p1qn2r1/1p3p2/2pp4/1P1P4/2P1PRb1/P7/R1B3NK b - - 1 24
2kq4/p2n2r1/1p3p2/2pp4/1P1P4/2P1PRb1/P7/R1B3NK w - - 2 25
2kq4/p2n2r1/1p3p2/2pp4/1P1P4/2P1PRb1/P3N3/R1B4K b - - 3 25
2k4q/p2n2r1/1p3p2/2pp4/1P1P4/2P1PRb1/P3N3/R1B4K w - - 4 26
2k4q/p2n2r1/1p3p2/2pp4/1P1P4/2P1PRb1/P3N1K1/R1B5 b - - 5 26
2k4q/p2n2r1/1p1b1p2/2pp4/1P1P4/2P1PR2/P3N1K1/R1B5 w - - 6 27
2k4q/p2n2r1/1p1b1p2/2pp4/1P1P4/2P1PR2/P3NK2/R1B5 b - - 7 27
2k5/p2n2r1/1p1b1p2/2pp4/1P1P4/2P1PR2/P3NK1q/R1B5 w - - 8 28
2k5/p2n2r1/1p1b1p2/2pp4/1P1P4/2P1PR2/P3N2q/R1B1K3 b - - 9 28
2k5/p2n4/1p1b1p2/2pp4/1P1P4/2P1PR2/P3N1rq/R1B1K3 w - - 10 29
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2P1PR2/P5rq/R1B1K3 b - - 11 29
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2P1PR2/P5r1/R1B1K2q w - - 12 30
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2P1P3/P5r1/R1B1KR1q b - - 13 30
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2P1P3/P7/R1B1KRrq w - - 14 31
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2P1P3/P7/R1B1K1Rq b - - 0 31
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2P1P3/P7/R1B1K1q1 w - - 0 32
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2P1P3/P2K4/R1B3q1 b - - 1 32
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2P1P3/P2K1q2/R1B5 w - - 2 33
2k5/p2n4/1p1b1p2/2pp4/1P1P1N2/2PKP3/P4q2/R1B5 b - - 3 33
2k5/p2n4/1p1b1p2/3p4/1PpP1N2/2PKP3/P4q2/R1B5 w - - 0 34


`;

birds_opening_list = [birds_opening_1];

birds_opening_info_1 = `
https://www.chessable.com/blog/how-to-play-birds-opening/


9a,g8-e7,


1. f4 d5 2. Nf3 c6 3. d4 Bf5 4. e3 h6 5. Nc3 f6 6. Bd3 Bxd3 7. Qxd3 Nd7 8. Ne2
e6 9. Nh4 Qa5+ 10. c3 Ne7 11. b4 Qc7 12. O-O b6 13. f5 exf5 14. Nxf5 Nxf5 15.
Qxf5 Rg8 16. Qh7 O-O-O 17. Qxg8 Bd6 18. Qxg7 Bxh2+ 19. Kh1 c5 20. Qxh6 Bd6 21.
g3 Rg8 22. Qg7 Rxg7 23. Ng1 Bxg3 24. Rf3 Qd8 25. Ne2 Qh8+ 26. Kg2 Bd6+ 27. Kf2
Qh2+ 28. Ke1 Rg2 29. Nf4 Qh1+ 30. Rf1 Rg1 31. Rxg1 Qxg1+ 32. Kd2 Qf2+ 33. Kd3
c4# 0-1

https://www.chess.com/game/live/51122348471

it says it is good to fianchetto the kingside, why did I move the pawn the wrong way?

`;

birds_opening_info_list = [birds_opening_info_1];

kings_pawn_1 = `rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1
rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2
rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
rnbqkbnr/pppp1p1p/6p1/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3
rnbqkbnr/pppp1p1p/6p1/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 3
r1bqkbnr/pppp1p1p/2n3p1/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4
r1bqkbnr/pppp1p1p/2n3p1/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 3 4
r1b1kbnr/pppp1p1p/2n3p1/4p1q1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 5
r1b1kbnr/pppp1p1p/2n3p1/4p1q1/2B1P3/3P4/PPP2PPP/RNBQK2R b KQkq - 0 5
r1b1kbnr/pppp1p1p/2n3p1/4p3/2B1P3/3P4/PPP2PqP/RNBQK2R w KQkq - 0 6
r1b1kbnr/pppp1p1p/2n3p1/4p3/2B1P3/3P4/PPP2PqP/RNBQKR2 b Qkq - 1 6
r1b1k1nr/pppp1pbp/2n3p1/4p3/2B1P3/3P4/PPP2PqP/RNBQKR2 w Qkq - 2 7
r1b1k1nr/pppp1pbp/2n3p1/4p3/2B1P3/2NP4/PPP2PqP/R1BQKR2 b Qkq - 3 7
r1b1k1nr/ppp2pbp/2np2p1/4p3/2B1P3/2NP4/PPP2PqP/R1BQKR2 w Qkq - 0 8
r1b1k1nr/ppp2pbp/2np2p1/3Np3/2B1P3/3P4/PPP2PqP/R1BQKR2 b Qkq - 1 8
1rb1k1nr/ppp2pbp/2np2p1/3Np3/2B1P3/3P4/PPP2PqP/R1BQKR2 w Qk - 2 9
1rb1k1nr/ppN2pbp/2np2p1/4p3/2B1P3/3P4/PPP2PqP/R1BQKR2 b Qk - 0 9
1rb3nr/ppNk1pbp/2np2p1/4p3/2B1P3/3P4/PPP2PqP/R1BQKR2 w Q - 1 10
1rb3nr/pp1k1pbp/2np2p1/3Np3/2B1P3/3P4/PPP2PqP/R1BQKR2 b Q - 2 10
1rb3nr/pp1k1pbp/2np2p1/3Np3/2B1P3/3P4/PPP2P1q/R1BQKR2 w Q - 0 11
1rb3nr/pp1k1pbp/2np2p1/3Np3/2B1P1Q1/3P4/PPP2P1q/R1B1KR2 b Q - 1 11
1rbk2nr/pp3pbp/2np2p1/3Np3/2B1P1Q1/3P4/PPP2P1q/R1B1KR2 w Q - 2 12
1rbk2nr/pp3pbp/2np2p1/3Np1B1/2B1P1Q1/3P4/PPP2P1q/R3KR2 b Q - 3 12
1rbk2nr/pp4bp/2np1pp1/3Np1B1/2B1P1Q1/3P4/PPP2P1q/R3KR2 w Q - 0 13
1rbk2nr/pp4bp/2np1pp1/3Np1B1/2B1P3/3P4/PPP2P1q/R3KRQ1 b Q - 1 13
1rbk2nr/1p4bp/p1np1pp1/3Np1B1/2B1P3/3P4/PPP2P1q/R3KRQ1 w Q - 0 14
1rbk2nr/1p4bp/p1np1pp1/3Np1B1/2B1P3/3P4/PPP2P1Q/R3KR2 b Q - 0 14

`;

kings_pawn_list = [kings_pawn_1];

kings_pawn_info_1 = `
hello world

lost my knight.. then..  

should not have gone bishop after put my queen there because get attacked by pawn
`;

kings_pawn_info_list = [kings_pawn_info_1];

kings_fianchetto_1 = `rnbqkbnr/pppppppp/8/8/8/6P1/PPPPPP1P/RNBQKBNR b KQkq - 0 1
rnbqkbnr/ppp1pppp/8/3p4/8/6P1/PPPPPP1P/RNBQKBNR w KQkq d6 0 2
rnbqkbnr/ppp1pppp/8/3p4/8/6P1/PPPPPPBP/RNBQK1NR b KQkq - 1 2
rnbqkbnr/ppp2ppp/8/3pp3/8/6P1/PPPPPPBP/RNBQK1NR w KQkq e6 0 3
rnbqkbnr/ppp2ppp/8/3pp3/8/3P2P1/PPP1PPBP/RNBQK1NR b KQkq - 0 3
rnbqk1nr/ppp2ppp/8/2bpp3/8/3P2P1/PPP1PPBP/RNBQK1NR w KQkq - 1 4
rnbqk1nr/ppp2ppp/8/2bpp3/8/3PP1P1/PPP2PBP/RNBQK1NR b KQkq - 0 4
rnbqk1nr/ppp2ppp/8/2b1p3/3p4/3PP1P1/PPP2PBP/RNBQK1NR w KQkq - 0 5
rnbqk1nr/ppp2ppp/8/2b1p3/3pP3/3P2P1/PPP2PBP/RNBQK1NR b KQkq - 0 5
rnbqk1nr/ppp3pp/8/2b1pp2/3pP3/3P2P1/PPP2PBP/RNBQK1NR w KQkq f6 0 6
rnbqk1nr/ppp3pp/8/2b1pp2/3pP3/3P1NP1/PPP2PBP/RNBQK2R b KQkq - 1 6
r1bqk1nr/pppn2pp/8/2b1pp2/3pP3/3P1NP1/PPP2PBP/RNBQK2R w KQkq - 2 7
r1bqk1nr/pppn2pp/8/2b1ppB1/3pP3/3P1NP1/PPP2PBP/RN1QK2R b KQkq - 3 7
r1bqk2r/pppn2pp/5n2/2b1ppB1/3pP3/3P1NP1/PPP2PBP/RN1QK2R w KQkq - 4 8
r1bqk2r/pppn2pp/5n2/2b1pPB1/3p4/3P1NP1/PPP2PBP/RN1QK2R b KQkq - 0 8
r1bqk2r/pppn2p1/5n1p/2b1pPB1/3p4/3P1NP1/PPP2PBP/RN1QK2R w KQkq - 0 9
r1bqk2r/pppn2p1/5B1p/2b1pP2/3p4/3P1NP1/PPP2PBP/RN1QK2R b KQkq - 0 9
r1bqk2r/ppp3p1/5n1p/2b1pP2/3p4/3P1NP1/PPP2PBP/RN1QK2R w KQkq - 0 10
r1bqk2r/ppp3p1/5n1p/2b1NP2/3p4/3P2P1/PPP2PBP/RN1QK2R b KQkq - 0 10
r2qk2r/ppp3p1/5n1p/2b1Nb2/3p4/3P2P1/PPP2PBP/RN1QK2R w KQkq - 0 11
r2qk2r/pBp3p1/5n1p/2b1Nb2/3p4/3P2P1/PPP2P1P/RN1QK2R b KQkq - 0 11
1r1qk2r/pBp3p1/5n1p/2b1Nb2/3p4/3P2P1/PPP2P1P/RN1QK2R w KQk - 1 12
1r1qk2r/p1p3p1/2B2n1p/2b1Nb2/3p4/3P2P1/PPP2P1P/RN1QK2R b KQk - 2 12
1r1q1k1r/p1p3p1/2B2n1p/2b1Nb2/3p4/3P2P1/PPP2P1P/RN1QK2R w KQ - 3 13
1r1q1k1r/p1p3p1/2B2n1p/2b1Nb2/3p4/3P2P1/PPPN1P1P/R2QK2R b KQ - 4 13
3q1k1r/p1p3p1/2B2n1p/2b1Nb2/3p4/3P2P1/PrPN1P1P/R2QK2R w KQ - 0 14
3q1k1r/p1p3p1/2B2n1p/2b1Nb2/2Np4/3P2P1/PrP2P1P/R2QK2R b KQ - 1 14
1r1q1k1r/p1p3p1/2B2n1p/2b1Nb2/2Np4/3P2P1/P1P2P1P/R2QK2R w KQ - 2 15
1r1q1k1r/p1p3p1/2B2n1p/N1b1Nb2/3p4/3P2P1/P1P2P1P/R2QK2R b KQ - 3 15
1r1q2kr/p1p3p1/2B2n1p/N1b1Nb2/3p4/3P2P1/P1P2P1P/R2QK2R w KQ - 4 16
1r1q2kr/p1p3p1/2B2n1p/N1b1Nb2/3p4/3P1QP1/P1P2P1P/R3K2R b KQ - 5 16
1r1q2kr/p1pb2p1/2B2n1p/N1b1N3/3p4/3P1QP1/P1P2P1P/R3K2R w KQ - 6 17
1r1q2kr/p1pb2p1/5n1p/N1bBN3/3p4/3P1QP1/P1P2P1P/R3K2R b KQ - 7 17
1r1q3r/p1pb2pk/5n1p/N1bBN3/3p4/3P1QP1/P1P2P1P/R3K2R w KQ - 8 18
1r1q3r/p1pb1Npk/5n1p/N1bB4/3p4/3P1QP1/P1P2P1P/R3K2R b KQ - 9 18
1r1q3r/p1p2Npk/5n1p/N1bB4/3p2b1/3P1QP1/P1P2P1P/R3K2R w KQ - 10 19
1r1q3r/p1p2Npk/5n1p/N1b5/3pB1b1/3P1QP1/P1P2P1P/R3K2R b KQ - 11 19
1r1q3r/p1p2N1k/5npp/N1b5/3pB1b1/3P1QP1/P1P2P1P/R3K2R w KQ - 0 20
1r1q3r/p1p2N1k/5npp/N1b5/3pBQb1/3P2P1/P1P2P1P/R3K2R b KQ - 1 20
1r5r/p1p1qN1k/5npp/N1b5/3pBQb1/3P2P1/P1P2P1P/R3K2R w KQ - 2 21
1r5r/p1p1qN1k/5npQ/N1b5/3pB1b1/3P2P1/P1P2P1P/R3K2R b KQ - 0 21
1r4kr/p1p1qN2/5npQ/N1b5/3pB1b1/3P2P1/P1P2P1P/R3K2R w KQ - 1 22
1r4kQ/p1p1qN2/5np1/N1b5/3pB1b1/3P2P1/P1P2P1P/R3K2R b KQ - 0 22
1r5Q/p1p1qk2/5np1/N1b5/3pB1b1/3P2P1/P1P2P1P/R3K2R w KQ - 0 23
1Q6/p1p1qk2/5np1/N1b5/3pB1b1/3P2P1/P1P2P1P/R3K2R b KQ - 0 23
1Q6/p1p1qk2/6p1/N1b5/3pn1b1/3P2P1/P1P2P1P/R3K2R w KQ - 0 24
1Q6/p1p1qk2/6p1/N1b5/3pn1b1/3P2P1/P1P2P1P/R4RK1 b - - 1 24
1Q6/p1p1qk2/6p1/N1b5/3pn3/3P1bP1/P1P2P1P/R4RK1 w - - 2 25
8/p1p1qk2/6p1/N1b5/3pn3/1Q1P1bP1/P1P2P1P/R4RK1 b - - 3 25
8/p1p1q1k1/6p1/N1b5/3pn3/1Q1P1bP1/P1P2P1P/R4RK1 w - - 4 26
8/p1p1q1k1/2N3p1/2b5/3pn3/1Q1P1bP1/P1P2P1P/R4RK1 b - - 5 26
8/p1p3k1/2N3p1/2b3q1/3pn3/1Q1P1bP1/P1P2P1P/R4RK1 w - - 6 27
8/p1p3k1/2N1Q1p1/2b3q1/3pn3/3P1bP1/P1P2P1P/R4RK1 b - - 7 27
8/p1p3k1/2N1Q1p1/2b4q/3pn3/3P1bP1/P1P2P1P/R4RK1 w - - 8 28
8/p1p3k1/2N1Q1p1/2b4q/3pP3/5bP1/P1P2P1P/R4RK1 b - - 0 28
8/2p3k1/p1N1Q1p1/2b4q/3pP3/5bP1/P1P2P1P/R4RK1 w - - 0 29
8/2pQ2k1/p1N3p1/2b4q/3pP3/5bP1/P1P2P1P/R4RK1 b - - 1 29
8/2pQ4/p1N3pk/2b4q/3pP3/5bP1/P1P2P1P/R4RK1 w - - 2 30
8/2pQN3/p5pk/2b4q/3pP3/5bP1/P1P2P1P/R4RK1 b - - 3 30
8/2pQN3/p5pk/2b4q/3pP1b1/6P1/P1P2P1P/R4RK1 w - - 4 31
6N1/2pQ4/p5pk/2b4q/3pP1b1/6P1/P1P2P1P/R4RK1 b - - 5 31
6N1/2pQ4/p5p1/2b3kq/3pP1b1/6P1/P1P2P1P/R4RK1 w - - 6 32
6N1/2p5/p5p1/2bQ2kq/3pP1b1/6P1/P1P2P1P/R4RK1 b - - 7 32
6N1/2p5/p5p1/2bQ1bkq/3pP3/6P1/P1P2P1P/R4RK1 w - - 8 33
6N1/2p5/p5p1/2bQ1Pkq/3p4/6P1/P1P2P1P/R4RK1 b - - 0 33
6N1/2p5/p7/2bQ1pkq/3p4/6P1/P1P2P1P/R4RK1 w - - 0 34
6N1/2p5/p7/2Q2pkq/3p4/6P1/P1P2P1P/R4RK1 b - - 0 34
6N1/2p5/p7/2Q2p1q/3p2k1/6P1/P1P2P1P/R4RK1 w - - 1 35
6N1/2p5/p7/5p1q/3Q2k1/6P1/P1P2P1P/R4RK1 b - - 0 35
6N1/2p5/p7/7q/3Q1pk1/6P1/P1P2P1P/R4RK1 w - - 0 36
6N1/2p5/p7/7q/5Qk1/6P1/P1P2P1P/R4RK1 b - - 0 36
6N1/2p5/p7/7q/5Q2/6Pk/P1P2P1P/R4RK1 w - - 1 37
8/2p5/p4N2/7q/5Q2/6Pk/P1P2P1P/R4RK1 b - - 2 37
8/2p5/p4N2/8/5Q2/6Pk/P1P1qP1P/R4RK1 w - - 3 38
8/2p5/p4N2/8/6Q1/6Pk/P1P1qP1P/R4RK1 b - - 4 38
8/2p5/p4N2/8/6q1/6Pk/P1P2P1P/R4RK1 w - - 0 39
8/2p5/p7/8/6N1/6Pk/P1P2P1P/R4RK1 b - - 0 39
8/2p5/p7/8/6k1/6P1/P1P2P1P/R4RK1 w - - 0 40
8/2p5/p7/8/6k1/6P1/P1P2P1P/R2R2K1 b - - 1 40
8/2p5/p7/8/8/5kP1/P1P2P1P/R2R2K1 w - - 2 41
8/2pR4/p7/8/8/5kP1/P1P2P1P/R5K1 b - - 3 41
8/2pR4/p7/8/8/6P1/P1P1kP1P/R5K1 w - - 4 42
8/2R5/p7/8/8/6P1/P1P1kP1P/R5K1 b - - 0 42
8/2R5/p7/8/8/6P1/P1Pk1P1P/R5K1 w - - 1 43
8/2R5/p7/8/P7/6P1/2Pk1P1P/R5K1 b - a3 0 43
8/2R5/p7/8/P7/6P1/2P1kP1P/R5K1 w - - 1 44
8/2R5/p7/8/P7/6P1/2P1kP1P/1R4K1 b - - 2 44
8/2R5/p7/8/P7/6P1/2Pk1P1P/1R4K1 w - - 3 45
8/2R5/pR6/8/P7/6P1/2Pk1P1P/6K1 b - - 4 45
8/2R5/pR6/8/P7/6P1/2P1kP1P/6K1 w - - 5 46


`;

kings_fianchetto_list = [kings_fianchetto_1];

kings_fianchetto_info_1 = `https://www.chess.com/analysis/game/live/51067192167

I was too tired to attack an exposed king..


15a night jump is a mistake
c5-b4,e1-f1,b4-a5,

18a -- something similiar here
d8-e8,d5-e4,f6-e4,f3-e4,e8-e4,d3-e4,c5-b4,e1-e2,b4-a5,h8-e8,h1-b1,

-- your next move with white is a mistake



1. g3 d5 2. Bg2 e5 3. d3 Bc5 4. e3 d4 5. e4 f5 6. Nf3 Nd7 7. Bg5 Ngf6 8. exf5 h6
9. Bxf6 Nxf6 10. Nxe5 Bxf5 11. Bxb7 Rb8 12. Bc6+ Kf8 13. Nd2 Rxb2 14. Ndc4 Rb8
15. Na5 (15. Na5 Bb4+ 16. Kf1 Bxa5) 15... Kg8 16. Qf3 Bd7 17. Bd5+ Kh7 18. Nf7
(18. Nf7 Qe7+ 19. Be4+ Nxe4 20. Qxe4+ Qxe4+ 21. dxe4 Bb4+ 22. Ke2 Rhe8 23. Rhb1
Bxa5) 18... Bg4 19. Be4+ g6 20. Qf4 Qe7 21. Qxh6+ Kg8 22. Qxh8+ Kxf7 23. Qxb8
Nxe4 24. O-O Bf3 25. Qb3+ Kg7 26. Nc6 Qg5 27. Qe6 Qh5 28. dxe4 a6 29. Qd7+ Kh6
30. Ne7 Bg4 31. Ng8+ Kg5 32. Qd5+ Bf5 33. exf5 gxf5 34. Qxc5 Kg4 35. Qxd4+ f4
36. Qxf4+ Kh3 37. Nf6 Qe2 38. Qg4+ Qxg4 39. Nxg4 Kxg4 40. Rfd1 Kf3 41. Rd7 Ke2
42. Rxc7 Kd2 43. a4 Ke2 44. Rb1 Kd2 45. Rb6 Ke2 1-0

`;

kings_fianchetto_info_list = [kings_fianchetto_info_1];

scandinavian_1 = `e2-e4, d7-d5, e4-d5, d8-d5, b1-c3, d5-d6, d2-d4, c7-c5, g1-f3, c8-g4, c1-e3, g4-f3, g2-f3, b8-c6, d4-d5, c6-b4, a2-a3, b4-a6, h2-h4, e7-e6, d1-d2, e8-c8, a8-d8, e1-c1, a1-d1, g8-f6, f1-a6, d6-a6, d2-e2, a6-e2, c3-e2, e6-d5, e2-f4, d5-d4, e3-d2, f8-d6, f4-d3, c5-c4, d3-b4, d6-b4, d2-b4, d4-d3, c2-c3, b7-b6, h1-g1, g7-g6, b4-e7, d8-e8, e7-f6, h8-g8, c1-b1, e8-e2, g1-g2, d3-d2, f6-g5, e2-e1, b1-c2, e1-d1, c2-d1, g8-d8, g5-d2, c8-c7, g2-g4, b6-b5, g4-e4, c7-c6, e4-e7, d8-d7, e7-d7, c6-d7, d1-e2, d7-c6, e2-d1, c6-b6, d2-g5, b6-a5, f3-f4, f7-f5, g5-h6, a5-a4, f2-f3, a4-b3, d1-c1, a7-a5, h6-g7, b5-b4, c3-b4, a5-b4, a3-b4, b3-b4, c1-c2, b4-c5, c2-c3, c5-d5, g7-h8, d5-c5, h8-g7, c5-d5, g7-f8, h7-h6, f8-h6, d5-c5, 
`;

scandinavian_2 = `e2-e4, d7-d5, e4-d5, d8-d5, b1-c3, d5-e5, g1-e2, b8-c6, d2-d4, c6-d4, f2-f4, e5-e6, d1-d3, d4-e2, f1-e2, g8-f6, h2-h3, c8-d7, f4-f5, e6-e5, g2-g4, h7-h5, h1-g1, h5-g4, h3-g4, h8-h2, b2-b3, f6-g4, c1-b2, g4-f2, d3-d2, d7-f5, c3-b5, e5-b2, b5-c7, `

scandinavian_list = [scandinavian_1, scandinavian_2];

alekhine_1 = `
[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]

1. e4 d5 2. exd5 Nf6 3. Nc3 Nxd5 4. d4 Nxc3 5. bxc3 e6 6. Nf3 c6 7. Bc4 Qa5 8.
Bb2 Ba3 9. Qb1 Bxb2 10. Qxb2 b5 11. Bb3 O-O 12. O-O Ba6 13. a4 b4 14. cxb4 Qb6
15. Rfe1 Qxb4 16. Ne5 c5 17. dxc5 Qxc5 18. Rad1 Bc8 19. Rd3 Na6 20. Rg3 f6 21.
Rc3 Qe7 22. Nc6 Qd6 23. Qc1 Nc5 24. Qe3 Nxb3 25. cxb3 Bd7 26. Nxa7 e5 *
{alkehkine use rooks and queen on the same diagonals} `;

alekhine_list = [alekhine_1];

first_date_1 = `[Result "*"]

1.e4 d5 2.Nf3 dxe4 3.Ng1 Bg4 4.f3 exf3 5.gxf3 Bd7 6.f4 Bc6 7.Nf3 Bxf3 8.Qxf3 e6 9.Qxb7 Nd7 10.Bb5 Nf6 11.Qf3 Bb4 12.a3 Bc5 13.b4 Bd4 14.Nc3 Bxc3 15.Qxc3 O-O 16.Qd3 Qe8 17.Bxd7 { r3qrk1/p1pn1ppp/4pn2/1B6/1P3P2/P2Q4/2PP3P/R1B1K2R } ( 17.Bb2 a6 18.Ba4 e5 19.Rg1 exf4+ 20.Kf1 ) 17...Nxd7 18.Rg1 e5 19.Qe4 f5 20.Qd5+ Rf7 21.fxe5 Nxe5 22.d4 Nf3+ 23.Kf1 Nxg1 24.Kxg1 Qe1+ 25.Kg2 Re8 26.Bf4 Qxa1 27.Bxc7 Qc3 *
`;

first_date_2 = `{guioco piano}

1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3 Bc5 5. c3 d6 6. b4 Bb6 7. a4 a5 8. b5 Ne7
9. O-O h6 10. Re1 O-O 11. Be3 Qe8 12. Bxb6 cxb6 13. Nbd2 Bg4 14. h3 Bxf3 15.
Nxf3 h5 16. Qd2 Kh8 17. Ng5 Neg8 18. Qe3 Qd7 19. Qxb6 g6 20. Qe3 Qc7 21. f4 Kg7
22. fxe5 dxe5 23. Bxf7 Rxf7 24. Ne6+ Kh8 *

`;

first_date_3 = `

[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[TimeControl "-"]

1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. b4 Bb6 6. d3 d6 7. a4 a5 8. b5 Ne7
9. Bg5 O-O 10. O-O Be6 11. Bxf6 gxf6 12. Bxe6 fxe6 13. Qb3 Kf7 14. Nbd2 Rg8 15.
d4 Qc8 16. dxe5 dxe5 17. Kh1 Rb8 18. Rad1 c6 19. Nc4 Bc5 20. Ncxe5+ fxe5 21.
Nxe5+ Kg7 22. Nd7 Kf7 {I wanted to take the rook here} 23. Nxc5 Rg6 24. Nd7 Qh8 25. f4 Rd8 26. f5 Rh6 27. fxe6+
Kg8 28. Nf6+ Kg7 29. Ng4 Rxd1 30. Qxd1 Rxe6 31. Qd4+ Kg8 32. Nh6+ Rxh6 33. Qd8+
Kg7 34. Qxe7+ Kg6 35. Qe6+ Qf6 36. Rxf6+ Kg7 37. Qe7+ Kh8 *`;

first_date_4 = `[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "0-1"]
[TimeControl "-"]

1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Nxc6 Qf6 6. Na5 Qxf2# 0-1 {lost should have let go with the knight because was +3 and use the queen}

`;

first_date_5 = `[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[TimeControl "-"]

1. e4 c5 2. Nf3 Nc6 3. Bc4 e6 4. d4 Nxd4 5. Nxd4 cxd4 6. Qxd4 h5 7. h4 Qc7 8.
Nc3 Ne7 9. Nb5 Nc6 * {required to attack with the knight the next row}

`;

first_date_6 = `
[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[TimeControl "-"]

1. e4 c5 2. Nf3 d6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Qf3 Be6 7. Bb5+ Nc6 8.
Nc3 Qd7 9. d3 Nxc3 *

{analyze this because a lot of moves I am +5.6 not knowing how to move}
`;

first_date_list = [
  first_date_1,
  first_date_2,
  first_date_3,
  first_date_4,
  first_date_5,
  first_date_6
];

alekhine_list = [alekhine_1];


fen_list_puzzles_before_split = `8/8/1R6/p1r1p3/P1P1Pp2/3K2k1/8/8 w - - 1 44 {hello world};
r2qkbnr/pp3ppp/2p1p3/2P1P3/Q2p2b1/7P/PP1P2P1/RNB1KBNR b KQkq - 0 8 {second};
rnb1kbnr/pp4pp/2p1pp2/4N3/1q1Pp3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 8;
2kr4/pq1p1p1Q/1p2p3/2b1Pn2/8/2N5/PPPB2PP/R3R2K w - - 1 25;
4r1k1/1Q3ppp/8/2p5/2Pp4/3P4/P1q1rPPP/R2R2K1 w - - 1 26;
r1bqr1k1/4np2/1p3npB/1P1pN3/3P4/p2B4/P3QPPP/R4RK1 w - - 0 21;8/8/1R6/p1r1p3/P1P1Pp2/3K2k1/8/8 w - - 1 44

`;

fen_list_puzzles = fen_list_puzzles_before_split.split(";");

fen_list_games_before_split = `8/8/1R6/p1r1p3/P1P1Pp2/3K2k1/8/8 w - - 1 44 {hello games};
r2qkbnr/pp3ppp/2p1p3/2P1P3/Q2p2b1/7P/PP1P2P1/RNB1KBNR b KQkq - 0 8 {second};
rnb1kbnr/pp4pp/2p1pp2/4N3/1q1Pp3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 8;
2kr4/pq1p1p1Q/1p2p3/2b1Pn2/8/2N5/PPPB2PP/R3R2K w - - 1 25;
4r1k1/1Q3ppp/8/2p5/2Pp4/3P4/P1q1rPPP/R2R2K1 w - - 1 26;
r1bqr1k1/4np2/1p3npB/1P1pN3/3P4/p2B4/P3QPPP/R4RK1 w - - 0 21;8/8/1R6/p1r1p3/P1P1Pp2/3K2k1/8/8 w - - 1 44

`;

fen_list_games = fen_list_games_before_split.split(";");

modern_defense_1 = `1. d4 g6 2. Bd2 Bg7 3. Bc3 Nf6 4. Nd2 d5 5. f3? (5.a4) 5.. Nc6?! 6. e4?!  (6. e3) 6.. dxe4 7. fxe4 Nxd4 {https://www.chess.com/analysis/game/live/42484742481?tab=review} 
`;

modern_defense_2 = `1. d4 g6 2. c4 Bg7 3. Be3 Nf6 4. Nc3 0-0 5. Qc2 c6 6. 0-0-0? (6. 0-0-0 b5 7. Nf3 d5 8. cxb5 cxb5) 6.. d5 7. cxd5 cxd5 8. Qb3?! Bf5?! {here already a big loss because the pawn will open up the file}  9. Qxb7?! Nbd7 10. Nxd5? Nxd5 11. Qxd5 Rc8+ 12. Kd2 Nb6? 13. Qxd8 Rfxd8 14. Ke1 Nc4?! 15. Bf4? (15. Nf3 Nxb2 16. Rc1 Rxc1+ 17. Bxc1 Na4 18. Rg1 Rc8 19. Ba3 Rc2 20. Bxe7 Rc1+ 21. Kd2 Rc2+ 22. Ke1 Rxa2 23. g4 Bc2 24. e3) 15.. Nxb2 16. Rb1 Bxb1 {https://www.chess.com/analysis/game/live/42232760503}


`;

modern_defense_list = [modern_defense_1, modern_defense_2];

philidor_1 = `
[Result "*"]

1.e4 e5 2.Nf3 d6 3.Nc3 Bg4 * 
{rn1qkbnr/ppp2ppp/3p4/4p3/4P1b1/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4 that is a bad move bishop to attack the knight}

`;

philidor_list = [philidor_1];

mateinthree_1 = `
r5k1/pp1q1p1p/3p1bp1/2p3P1/3n1B1n/3P4/PP3P1P/3QRK2 b - - 0 26
black to move, white pushed pawn to g5, there is check with queen h3.

`;

mateinthree_list = [mateinthree_1];

lightsquares_1 = `
[Result "*"]

1.e4 e5 2.Nf3 d6 3.Nc3 Bg4 4.Bc4 c6 5.h3 Bxf3 6.Qxf3 Nf6 7.d3 b5 8.Bb3 Be7 9.O-O O-O 10.Be3 a5 11.a4 b4 12.Ne2 c5 13.c3 bxc3 14.bxc3 Qb6 15.Rab1 Qa6 16.Bc4 Qc6 17.Bd5 Qxa4 18.Bxa8 * {see how the bishop takes advantage of the light squares and attacks my rook}
`;

lightsquares_list = [lightsquares_1];


alan_1 = `rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1
rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2
rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2
rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3
rnbqkb1r/ppp1pppp/5n2/3p4/3P4/4PN2/PPP2PPP/RNBQKB1R b KQkq - 0 3
rn1qkb1r/ppp1pppp/5n2/3p4/3P2b1/4PN2/PPP2PPP/RNBQKB1R w KQkq - 1 4
rn1qkb1r/ppp1pppp/5n2/3p4/3P2b1/4PN2/PPP1BPPP/RNBQK2R b KQkq - 2 4
rn1qkb1r/ppp2ppp/4pn2/3p4/3P2b1/4PN2/PPP1BPPP/RNBQK2R w KQkq - 0 5
rn1qkb1r/ppp2ppp/4pn2/3pN3/3P2b1/4P3/PPP1BPPP/RNBQK2R b KQkq - 1 5
rn1qkb1r/ppp2ppp/4pn2/3pN3/3P4/4P3/PPP1bPPP/RNBQK2R w KQkq - 0 6
rn1qkb1r/ppp2ppp/4pn2/3pN3/3P4/4P3/PPP1QPPP/RNB1K2R b KQkq - 0 6
rn1qkb1r/pp3ppp/4pn2/2ppN3/3P4/4P3/PPP1QPPP/RNB1K2R w KQkq c6 0 7
rn1qkb1r/pp3ppp/4pn2/2PpN3/8/4P3/PPP1QPPP/RNB1K2R b KQkq - 0 7
rn1qk2r/pp3ppp/4pn2/2bpN3/8/4P3/PPP1QPPP/RNB1K2R w KQkq - 0 8
rn1qk2r/pp3ppp/4pn2/1QbpN3/8/4P3/PPP2PPP/RNB1K2R b KQkq - 1 8
r2qk2r/pp1n1ppp/4pn2/1QbpN3/8/4P3/PPP2PPP/RNB1K2R w KQkq - 2 9
r2qk2r/pp1N1ppp/4pn2/1Qbp4/8/4P3/PPP2PPP/RNB1K2R b KQkq - 0 9
r2qk2r/pp1n1ppp/4p3/1Qbp4/8/4P3/PPP2PPP/RNB1K2R w KQkq - 0 10
r2qk2r/pp1n1ppp/4p3/1Qbp4/8/4P3/PPP2PPP/RNB2RK1 b kq - 1 10
r2qk2r/pp1n1ppp/1b2p3/1Q1p4/8/4P3/PPP2PPP/RNB2RK1 w kq - 2 11
r2qk2r/pp1n1ppp/1b2p3/1Q1p4/8/2N1P3/PPP2PPP/R1B2RK1 b kq - 3 11
r2q1rk1/pp1n1ppp/1b2p3/1Q1p4/8/2N1P3/PPP2PPP/R1B2RK1 w - - 4 12
r2q1rk1/pp1n1ppp/1b2p3/1Q1p4/8/1PN1P3/P1P2PPP/R1B2RK1 b - - 0 12
2rq1rk1/pp1n1ppp/1b2p3/1Q1p4/8/1PN1P3/P1P2PPP/R1B2RK1 w - - 1 13
2rq1rk1/pp1n1ppp/1b2p3/1Q1p4/8/1P2P3/P1P1NPPP/R1B2RK1 b - - 2 13
2rq1rk1/pp3ppp/1b2p3/1Q1pn3/8/1P2P3/P1P1NPPP/R1B2RK1 w - - 3 14
2rq1rk1/pp3ppp/1b2p3/1Q1pn3/8/1P2P3/PBP1NPPP/R4RK1 b - - 4 14
2rq1rk1/pp3ppp/1b2p1n1/1Q1p4/8/1P2P3/PBP1NPPP/R4RK1 w - - 5 15
2rq1rk1/pp3ppp/1b2p1n1/3p4/1Q6/1P2P3/PBP1NPPP/R4RK1 b - - 6 15
2r2rk1/pp3ppp/1b2p1n1/3p2q1/1Q6/1P2P3/PBP1NPPP/R4RK1 w - - 7 16
2r2rk1/pp3ppp/1b2p1n1/3p2q1/1Q1B4/1P2P3/P1P1NPPP/R4RK1 b - - 8 16
2r2rk1/pp3ppp/4p1n1/3p2q1/1Q1b4/1P2P3/P1P1NPPP/R4RK1 w - - 0 17
2r2rk1/pp3ppp/4p1n1/3p2q1/1Q1N4/1P2P3/P1P2PPP/R4RK1 b - - 0 17
2r2rk1/p4ppp/1p2p1n1/3p2q1/1Q1N4/1P2P3/P1P2PPP/R4RK1 w - - 0 18
2r2rk1/p4ppp/1p2p1n1/3p2q1/1Q1N4/1P2P1P1/P1P2P1P/R4RK1 b - - 0 18
2r2rk1/p4ppp/1p2p3/3p2q1/1Q1N3n/1P2P1P1/P1P2P1P/R4RK1 w - - 1 19
2r2rk1/p4ppp/1p2p3/3p2q1/1Q1N1P1n/1P2P1P1/P1P4P/R4RK1 b - f3 0 19
2r2rk1/p4ppp/1p2p1q1/3p4/1Q1N1P1n/1P2P1P1/P1P4P/R4RK1 w - - 1 20
2r2rk1/p4ppp/1p2p1q1/3p4/1Q1N1P1n/1PP1P1P1/P6P/R4RK1 b - - 0 20
2r2rk1/p4ppp/1p2p1q1/3p1n2/1Q1N1P2/1PP1P1P1/P6P/R4RK1 w - - 1 21
2r2rk1/p4ppp/1p2p1q1/3p1N2/1Q3P2/1PP1P1P1/P6P/R4RK1 b - - 0 21
2r2rk1/p4ppp/1p2p3/3p1q2/1Q3P2/1PP1P1P1/P6P/R4RK1 w - - 0 22
2r2rk1/p4ppp/1p2p3/3p1q2/3Q1P2/1PP1P1P1/P6P/R4RK1 b - - 1 22
5rk1/p4ppp/1p2p3/2rp1q2/3Q1P2/1PP1P1P1/P6P/R4RK1 w - - 2 23
5rk1/p4ppp/1p2p3/2rp1q2/3Q1P2/1PP1P1P1/P6P/3R1RK1 b - - 3 23
2r3k1/p4ppp/1p2p3/2rp1q2/3Q1P2/1PP1P1P1/P6P/3R1RK1 w - - 4 24
2r3k1/p4ppp/1p2p3/2rp1q2/3Q1P2/1PP1P1P1/P2R3P/5RK1 b - - 5 24
2r3k1/p4ppp/1p2p3/3p1q2/3Q1P2/1Pr1P1P1/P2R3P/5RK1 w - - 0 25
2r3k1/p4ppp/1p2p3/3p1q2/3Q1P2/1Pr1P1P1/P5RP/5RK1 b - - 1 25
2r3k1/p4pp1/1p2p2p/3p1q2/3Q1P2/1Pr1P1P1/P5RP/5RK1 w - - 0 26
2r3k1/p4pp1/1p2p2p/3p1q2/3Q1PP1/1Pr1P3/P5RP/5RK1 b - - 0 26
2r3k1/p4pp1/1p2p1qp/3p4/3Q1PP1/1Pr1P3/P5RP/5RK1 w - - 1 27
2r3k1/p4pp1/1p2p1qp/3p1P2/3Q2P1/1Pr1P3/P5RP/5RK1 b - - 0 27
2r3k1/p4pp1/1p2p2p/3p1Pq1/3Q2P1/1Pr1P3/P5RP/5RK1 w - - 1 28
2r3k1/p4pp1/1p2P2p/3p2q1/3Q2P1/1Pr1P3/P5RP/5RK1 b - - 0 28
2r3k1/p5p1/1p2p2p/3p2q1/3Q2P1/1Pr1P3/P5RP/5RK1 w - - 0 29
2r3k1/p5p1/1p2p2p/3p2q1/3QP1P1/1Pr5/P5RP/5RK1 b - - 0 29
2r3k1/p5p1/1p2p2p/3p2q1/3QP1P1/1P6/P1r3RP/5RK1 w - - 1 30
2r3k1/p5p1/1p2p2p/3P2q1/3Q2P1/1P6/P1r3RP/5RK1 b - - 0 30
2r3k1/p5p1/1p5p/3p2q1/3Q2P1/1P6/P1r3RP/5RK1 w - - 0 31
2r3k1/p5p1/1p5p/3p2q1/3Q2P1/1P4R1/P1r4P/5RK1 b - - 1 31
2r4k/p5p1/1p5p/3p2q1/3Q2P1/1P4R1/P1r4P/5RK1 w - - 2 32
2r4k/p5p1/1p5p/3p2q1/3Q2P1/1P4RP/P1r5/5RK1 b - - 0 32
2r4k/p5p1/1p5p/3p2q1/3Q2P1/1P4RP/r7/5RK1 w - - 0 33
2r4k/p5p1/1p5p/3p2q1/6P1/1P1Q2RP/r7/5RK1 b - - 1 33
7k/p5p1/1p5p/3p2q1/6P1/1P1Q2RP/r1r5/5RK1 w - - 2 34
5R1k/p5p1/1p5p/3p2q1/6P1/1P1Q2RP/r1r5/6K1 b - - 3 34



`;

alan_list = [alan_1];

alan_info_1 = `https://www.chess.com/analysis/game/live/50554198608

move 23a should push the pawn up to get the open file for a backrank

[Result "1-0"]

1.d4 d5 2.Nf3 Nf6 3.e3 Bg4 4.Be2 e6 5.Ne5 Bxe2 6.Qxe2 c5 7.dxc5 Bxc5 8.Qb5+ Nbd7 9.Nxd7 Nxd7 10.O-O Bb6 11.Nc3 O-O 12.b3 Rc8 13.Ne2 Ne5 14.Bb2 Ng6 15.Qb4 Qg5 16.Bd4 Bxd4 17.Nxd4 b6 18.g3 Nh4 19.f4 Qg6 20.c3 Nf5 21.Nxf5 Qxf5 22.Qd4 Rc5 23.Rad1 Rfc8 24.Rd2 Rxc3 25.Rg2 h6 26.g4 Qg6 27.f5 Qg5 28.fxe6 fxe6 29.e4 Rc2 30.exd5 exd5 31.Rg3 Kh8 32.h3 Rxa2 33.Qd3 Rcc2 34.Rf8# 1-0

`;

alan_info_list = [alan_info_1];

caro_kahn_info_1 = `@https://www.chess.com/a/NTtS6huQ2Es6N?tab=analysis;13

`;

caro_kahn_info_2 = `@https://www.chess.com/a/We7gPBqG2Es6N?tab=review;14
`;

caro_kahn_info_3 = `@https://www.chess.com/analysis/game/live/49856946873?tab=analysis;15


`;

caro_kahn_info_4 = `@https://www.chess.com/game/live/50772678387;16



`;

caro_kahn_info_5 = `@https://www.chess.com/analysis/game/pgn/4EdLeSRxu4?tab=analysis;17

white gets crushed at the end so focusing on white's moves
`;

caro_kahn_info_6 = `@https://www.chess.com/analysis/game/pgn/3jCxhh3374?tab=analysis;18

`;

caro_kahn_info_7 = `@https://www.chess.com/analysis/game/live/51484283317?tab=analysis;19;20

`;

caro_kahn_info_8 = `@https://www.chess.com/analysis/game/live/51514167021?tab=review;21


`

caro_kahn_info_9 = `@https://www.chess.com/analysis/game/live/51679154053?tab=analysis;22;23

`


caro_kahn_info_10 = `@https://www.chess.com/analysis/game/pgn/5FzYs1BHQr?tab=analysis;24

1. e4 c6 2. Nf3 d5 3. exd5 cxd5 4. d4 e6 5. Bd3 g6 6. O-O Bg7 7. Re1 Nf6 8. Bg5
h6 9. Bh4 g5 10. Bg3 O-O 11. Nbd2 Nc6 12. c4 Nb4 13. Be2 b6 14. a3 Nc6 15. Ne5
Nxd4 16. Nb3 Nxe2+ 17. Qxe2 Ne4 18. Rad1 Nxg3 19. fxg3 f6 20. Ng6 Re8 21. cxd5
e5 22. Nd2 Qxd5 23. Ne4 Qc6 24. Kh1 Bb7 25. Rd6 Qc7 26. h4 Qf7 27. h5 f5 28. Rf1
Re6 29. Rxe6 Qxe6 30. Nd2 a5 31. Nc4 Ba6 0-1





`

caro_kahn_info_11 = `@6

crazy variations here

rnQb1k1r/pp3ppp/8/3N4/3q1B2/8/PPP2KPP/4RB1R

trying to save the knight??

f4-e3,d4-d5,e3-c5,f8-g8,e1-e1,e1-e1,e1-e8,


`
  


caro_kahn_info_list = [
  caro_kahn_info_1,
  caro_kahn_info_2,
  caro_kahn_info_3,
  caro_kahn_info_4,
  caro_kahn_info_5,
  caro_kahn_info_6,
  caro_kahn_info_7, 
  caro_kahn_info_8, 
  caro_kahn_info_9, 
  caro_kahn_info_10,
  caro_kahn_info_11
];

scandinavian_info_1 = `@11

https://www.chess.com/a/2Cyjt5mNv2Es6N;11



rnb1kbnr/pp2pppp/3q4/2p5/3P4/2N5/PPP2PPP/R1BQKBNR;c7-c5,c3-b5,d6-d7,c1-f4,b8-a6,g1-f3,g8-g8,g8-f6,d4-c5,a6-c5,b5-c7,e8-d8,c7-a8,

* I was white








so many moves.

12a,e3-f4, attack the queen instead of taking the knight here

12b, e3-f4,e6-e5,c3-b5,d6-d6,d6-b8,f4-g3,b7-b6,d5-d6,b8-b7,g3-e5,

1. e4 d5 2. exd5 Qxd5 3. Nc3 Qd6 4. d4 c5 5. Nf3 Bg4 6. Be3 Bxf3 7. gxf3 Nc6 8.
d5 Nb4 9. a3 Na6 10. h4 e6 11. Qd2 O-O-O 12. O-O-O Nf6 13. Bxa6 Qxa6 14. Qe2
Qxe2 15. Nxe2 exd5 16. Nf4 d4 17. Bd2 Bd6 18. Nd3 c4 19. Nb4 Bxb4 20. Bxb4 d3
21. c3 b6 22. Rhg1 g6 23. Be7 Rde8 24. Bxf6 Rhg8 25. Kb1 Re2 26. Rg2 d2 27. Bg5
Re1 28. Kc2 Rxd1 29. Kxd1 Rd8 30. Bxd2 Kc7 31. Rg4 b5 32. Re4 Kc6 33. Re7 Rd7
34. Rxd7 Kxd7 35. Ke2 Kc6 36. Kd1 Kb6 37. Bg5 Ka5 38. f4 f5 39. Bh6 Ka4 40. f3
Kb3 41. Kc1 a5 42. Bg7 b4 43. cxb4 axb4 44. axb4 Kxb4 45. Kc2 Kc5 46. Kc3 Kd5
47. Bh8 Kc5 48. Bg7 Kd5 49. Bf8 h6 50. Bxh6 Kc5 51. b3 cxb3 52. Kxb3 Kd5 53. Kc3
Ke6 54. Kd3 Kf6 55. Ke3 Ke6 56. Kf2 Kf6 57. Kg3 Kf7 58. Bg5 Kg7 59. Kh3 Kh7 60.
h5 gxh5 61. Kh4 Kg6 62. Be7 Kh6 63. Bg5+ Kg6 64. Bd8 Kh6 65. Kg3 Kg6 66. Kf2 Kh6
67. Ke3 Kg6 68. Kd4 Kf7 69. Ke5 Ke8 70. Bh4 Kf7 71. Kxf5 Kg7 72. Kg5 Kh7 73.
Kxh5 Kg7 74. Kg5 Kh7 75. f5 Kg7 76. f6+ Kf7 77. Kf5 Kf8 78. Bg5 Kf7 79. Bh6 Kg8
80. Bg5 Kf7 81. f4 Kg8 82. Ke5 Kf7 83. Kd6 Kg6 84. Ke7 Kf5 85. f7 Kg6 86. f8=Q
Kh5 87. Qh6+ Kg4 88. Qh4+ Kf5 89. Kf7 Ke4 90. Kg7 Kf5 91. Kh6 Ke4 92. Qg4 Ke3
93. f5+ Kd3 94. f6 Kc3 95. f7 1-0

`;

scandinavian_info_2 = `@12

@https://www.chess.com/a/2iLTAwC8N2Es6N;12

--win a pawn

1. e4 d5 2. exd5 Qxd5 3. Nc3 Qe5+ 4. Nge2 Nc6 5. d4 Nxd4 6. f4 Qe6 7. Qd3 Nxe2
8. Bxe2 Nf6 9. h3 Bd7 10. f5 Qe5 11. g4 h5 12. Rg1 hxg4 13. hxg4 Rh2 14. b3 Nxg4
15. Bb2 Nf2 16. Qd2 Bxf5 17. Nb5 Qxb2 18. Nxc7# 1-0


`

scandinavian_info_3 = `@10

@https://www.chess.com/a/hvB8uV8a2Es6N?tab=analysis;10

`

scandinavian_info_list = [scandinavian_info_1, scandinavian_info_2, scandinavian_info_3];

//a

queens_pawn_info_1 = `@r3kb1r/1p2q3/p3p1b1/2pp1ppp/3P4/2P1PQBP/PP1N1PP1/R5KR,r3kb1r/1p2q3/p3ppb1/2pp2pp/3P4/2P1PQBP/PP1N1PP1/R5KR,r3kb1r/1p2q3/p3ppb1/2pp2pp/3P4/2P1PQB1/PP1N1PPP/R5KR

r3kb1r/.../R5KR [1]

this position is a mistake with the pawn up

r3kb1r/.../R5KR [2]
mistake by white to go with his pawn up

so instead go at [3]


r3kb1r/.../R5KR [3]


https://www.chess.com/a/2WvGH9rii2Es6N

moves [4], [5], I don't comprehend 




`;

queens_pawn_info_2 = `
10a:
d6-g6,e3-e4,f5-e4,c3-e4,g6-e4,d1-e2,g8-f6,

15a:
h5-g5,g4-g5,f8-h6,e3-d5,c7-h2,g1-h1,h2-h1,g5-g3,d5-c7,e8-d8,c7-a6,a8-c8,g8-f6,f6-h5,

17a: black should attack the knight with the free pawn

1. d4 d5  2. Nf3 c6 3. e3 Bf5  4. c4 h6  5. cxd5  Qxd5 6. Nfd2  Qd6  7. f4 g5 8. fxg5 hxg5 9. Nc3 Nd7 10. Nc4 Qc7 (10...Qg6 11. e4 Bxe4 12. Nxe4 Qxe4+ 13. Qe2 Ngf6) 11. e4 Bg6 12. Bxg5 Rxh2 13. Rg1 b5 14. Ne3 Rh5 15. Qg4 Ndf6 (15...Rxg5 16. Qxg5 Bh6 17. Ned5 Qh2 18. Rh1 Qxh1 19. Nc7+) 16. Bxf6 Nxf6 17. Qf3 e5 (17... b4) 18. dxe5 Qxe5 19. 0-0-0 Bxe4 20. Nxe4 Nxe4 21. Ng4 Rf5 22. Qd3 Qe7 23. Be2 Rd5 24. Qh3 Rc5+ 25. Kb1 Rd8


`;

queens_pawn_info_3 = `
https://www.chess.com/game/live/51171569971

10a: move your queen down one

11a: pin your bishop to the knight in front of the king instead of trying to trade

13a: mistake to move the knight there because?


best move:  queen behind a pawn protected by en passant 

13a,d6-e5,13a,f2-f4,13a,e4-f3,13a,f4-e3,

13a: 

d6-e5,d2-d4,e5-d4,e3-d4,c8-e6,e1-d2,g8-e7,f2-f3,f7-f5,a2-a4,a7-a5,a1-b1,e8-c8,a8-d8,h1-e1,c8-c7,b2-b4,a5-b4,b1-b4,e7-c8,a4-a5,c8-d6,c3-a4,d8-a8,a5-a6,e6-c8,c2-c4,f5-f4,f3-e4,d6-e4,d2-c2,

and crazy moves

14a-14b is a mistake : should bring the bishop to f5

17a-17b move the queen to e7

your bishop is going to lose a tempo

21a:


d6-e5,d2-d4,f7-f6,g5-g6,e6-g4,d1-d2,b7-b6,c3-d5,e5-d5,d4-d5,


I do not know what is going on here...

21b,c3-e4,e4-f6,d2-c3,

that is a killer move by white

because lining up the queen behind the knight...

 `


queens_pawn_info_4 = `Levy's Game
https://www.365chess.com/tournaments/New_York_Summer_IMC_2022_2022/45133#

https://www.youtube.com/watch?v=fUP7vkeDuOg

1. d4 d5 2. Nf3 c5 3. c3 Nf6 4. dxc5 e6 5. b4 a5 6. e3 axb4 7. cxb4 b6 8. Bb5+ Bd7
9. Bxd7+ Nbxd7 10. a4 bxc5 11. b5 Bd6 12. Bb2 g5 13. e4 g4 14. Nfd2 Qc7 15. Qe2
Rg8 16. g3 Be5 17. Bxe5 Nxe5 18. exd5 Nf3+ 19. Nxf3 gxf3 20. d6 Qxd6 21. Qxf3 Qe5+
22. Kf1 Ne4 23. Kg2 Qxa1 24. Qxe4 Qxa4 25. Qc6+ Ke7 26. Qxc5+ Kf6 27. Nc3 Qg4 28. Re1
Qf5 29. Qd4+ Kg6 30. Re5 Rad8 31. Qc5 Qc2 32. Rg5+ Kh6 33. h4 f6 34. Rxg8 Rxg8 35. b6
Qb3 36. Qc7 Rg4 37. Qc5 e5 38. Qf8+ Kg6 39. Qc8 h5 40. b7 Rb4 41. Qe8+ Kg7 42. Qe7+
Kg6 *

`


queens_pawn_info_5 = `https://www.chess.com/analysis/game/live/51932421887

`

queens_pawn_info_list = [
  queens_pawn_info_1,
  queens_pawn_info_2,
  queens_pawn_info_3, queens_pawn_info_4, queens_pawn_info_5
];

french_1 = `e2-e4`

french_2 = `e2-e4, e7-e6, d2-d4, d7-d5, e4-e5, c7-c5, c2-c4, b8-c6, c4-d5, e6-d5, g1-f3, f7-f6, e5-f6, g8-f6, f1-b5, c8-d7, c1-g5, a7-a6, b5-c6, d7-c6, d1-e2, d8-e7, f3-e5, h7-h6, e2-h5, e8-d8, e1-g1, c6-e8, g5-f6, g7-f6, e5-g6, e8-g6, h5-g6, c5-d4, b1-d2, e7-d6, f1-e1, f8-e7, d2-b3, d6-b4, g6-g7, d8-d7, a1-d1, a8-g8, g7-f7, g8-f8, f7-e6, d7-c7, d1-d4, b4-d6, e6-e7, d6-e7, e1-e7, c7-b8, d4-d5, f8-c8, b3-c5, b7-b6, c5-a6, b8-a8, h2-h3, h8-e8, a6-c7, c8-c7, e7-c7, e8-b8, d5-d7, b8-b7, c7-b7, `

french_3 = `e2-e4, e7-e6, f1-b5, a7-a6, b5-a4, b7-b5, a4-b3, d7-d5, f2-f3, c7-c5, c2-c4, b5-c4, b3-a4, c8-d7, b1-c3, d5-d4, a4-d7, b8-d7, c3-a4, f8-d6, d2-d3, c4-d3, d1-d3, g8-e7, b2-b4, e6-e5, g1-e2, e8-g8, h8-f8, e1-g1, h1-f1, f7-f5, e4-f5, e7-f5, f3-f4, d8-f6, a1-b1, a8-e8, d3-a6, d4-d3, a6-d3, e5-f4, b4-c5, d7-c5, a4-c5, d6-c5, g1-h1, f5-g3, e2-g3, f4-g3, f1-f6, f8-f6, d3-c4, g8-h8, c1-g5, e8-e1, b1-e1,`


french_4 = `e2-e4, e7-e6, f1-b5, a7-a6, b5-a4, b7-b5, a4-b3, d7-d5, f2-f3, c7-c5, c2-c4, b5-c4, b3-a4, c8-d7,b1-c3,g8-f6,e4-e5,d7-a4,d1-a4,f6-d7,f3-f4,d8-h4,g2-g3,h4-h5,c3-b5,a6-b5,a4-a8,g7-g5,g1-e2,g5-f4,e2-f4,h5-e5,e1-d1,e5-f5,h1-e1,f5-g4,e1-e2,d5-d4,d2-d3,`

french_5 = `e2-e4`

french_6 = `e2-e4`

french_7 = `e2-e4`

french_8 = `e2-e4`

french_list = [french_1, french_2, french_3, french_4, french_5, french_6, french_7, french_8]

french_info_1 = `@https://www.chessable.com/variation/19086971/#/13/b/0.2;4



`

french_info_2 = `@https://www.chessable.com/variation/19086971/#/13/b/0.2;5


`

french_info_3 = `@https://www.chessable.com/variation/19086971/#/13/b/0.2;6


`

french_info_4 = `@https://www.chess.com/a/37aPniAra2Es6N;1

test 

`



french_info_5 = `

`

french_info_6 = `

`

french_info_7 = `

`

french_info_8 = `@https://www.chess.com/;rnbq1k1r/pp3pb1/6pp/2P5/3p4/2N3PN/PP1QPP1P/R3KB1R;d8-e7,c3-b5,c8-d7,e2-e3,d4-e3,d2-e3,b8-a6,;7;8

`

french_info_list = [french_info_1, french_info_2, french_info_3, french_info_4, french_info_5, french_info_6, french_info_7, french_info_8]


vant_kruijs_info_1 = `@https://www.chess.com/a/2KaLArDfL2Es6N;9

`

vant_kruijs_info_list = [vant_kruijs_info_1]

vant_kruijs_1 = `d2-d4`

vant_kruijs_list = [vant_kruijs_1]


chess_com_lessons_1 = `d2-d4, g8-f6, g1-f3, e7-e6, c1-g5, c7-c5, e2-e3, c5-d4, e3-d4, f8-e7, b1-d2, d7-d6, c2-c3, b8-d7, f1-d3, b7-b6, d2-c4, c8-b7, d1-e2, d8-c7, e1-g1, e8-g8, f1-e1, f8-e8, a1-d1, d7-f8, g5-c1, f6-d5, f3-g5, b6-b5, c4-a3, b5-b4, c3-b4, d5-b4, e2-h5, e7-g5, c1-g5, b4-d3, d1-d3, c7-a5, b2-b4, a5-f5, d3-g3, h7-h6, a3-c4, f5-d5, c4-e3, d5-b5, g5-f6, b5-h5, g3-g7, g8-h8, g7-f7, h8-g8, f7-g7, g8-h8, g7-b7, h8-g8, b7-g7, g8-h8, g7-g5, h8-h7, g5-h5, h7-g6, h5-h3, g6-f6, h3-h6, f6-g5, h6-h3, e8-b8, h3-g3, g5-f6, g3-f3, f6-g6, a2-a3, a7-a5, b4-a5, a8-a5, e3-c4, a5-d5, f3-f4, f8-d7, e1-e6, g6-g5, g2-g3, 

`

chess_com_lessons_list = [chess_com_lessons_1,]

chess_com_lessons_info_1 = `@7k/1b4pp/p3B3/1pp5/8/7P/PBP3r1/Q4N1K,k1n5/p2R2b1/2p2qpp/4rp2/2P5/1P2Q1P1/P4PBP/6K1
windmill attack Carlos Torre Repetto vs Emanuel Lasker

second one is a checkmate instead of eating material out...


`
  
chess_com_lessons_info_list = [chess_com_lessons_info_1]


attacking_1 = `e2-e4, e7-e5, f2-f4, e5-f4, g1-f3, d7-d5, e4-d5, g8-f6, b1-c3, f6-d5, c3-d5, d8-d5, d2-d4, c8-g4, c1-f4, b8-c6, f1-e2, e8-c8, a8-d8, c2-c3, d5-e4, d1-d2, d8-d4, f3-d4, c6-d4, c3-d4, f8-b4, e1-f2, b4-d2, e2-g4, f7-f5, f4-d2, f5-g4, h1-e1, e4-d4, d2-e3, d4-b2, f2-f1, h8-e8,` 

attacking_2 = `a2-a3,

`

attacking_3 = `e2-e4, e7-e6, d2-d4, d7-d5, b1-c3, g8-f6, e4-e5, f6-d7, f2-f4, c7-c5, g1-f3, b8-c6, c1-e3, f8-e7, d1-d2, e8-g8, f1-e2, a7-a6, e1-g1, b7-b5, a2-a3, d8-b6, c3-d1, a6-a5, c2-c3, c8-a6, d4-c5, e7-c5, b2-b4, c5-e3, d1-e3, f7-f6, f3-d4, c6-d4, c3-d4, f6-e5, f4-e5, d7-e5, d4-e5, d5-d4, e3-d5, e6-d5, b4-a5, b6-c5, a1-c1, c5-a3, d2-d4, a3-a5, e5-e6, a6-b7, e6-e7, f8-f1, c1-f1, b5-b4, d4-f2, 
`

attacking_info_1 = `@2kr1b1r/ppp2ppp/2n5/8/3PqBb1/2P2N2/PP2B1PP/R2QK2R



Lars Hanssen vs Erik Lundin` 

attacking_info_2 = `@r1nqk2r/ppp1bp2/3p2p1/6Bp/3P4/5N2/PPP3PP/R2QR1K1,r1nq1r2/pppkbp2/3p1Bp1/7p/3P4/3Q1N2/PPP3PP/R3R1K1,r1nqkr2/ppp1bp2/3p1Bp1/7p/3P4/3Q1N2/PPP3PP/R3R1K1

the e-file is open..

the second variation is the king moves instead of going c6


`

attacking_info_3 = `the French

the black bishop is very bad, at move 15 white makes a great move with b4

Evgeny Alekseev vs Ni Hua 2008

https://www.chessgames.com/perl/nph-chesspgn?text=1&gid=1508009



`


attacking_info_list = [attacking_info_1, attacking_info_2, attacking_info_3]


attacking_list = [attacking_1, attacking_2, attacking_3] 

//4

grob_info_1 = `@r1bqkbnr/pp1n1ppp/2p1p3/3p4/2PP2P1/1Q6/PP2PPBP/RNB1K1NR

r1bqkbnr/pp1n1ppp/2p1p3/3p4/2PP2P1/1Q6/PP2PPBP/RNB1K1NR :

attack the back pawn when you can

`

grob_info_list = [grob_info_1]

petrov_info_1 = `@r3kb1r/ppp2p1p/2n3p1/3qpb2/8/1P3N2/PBPPQPPP/R3KB1R,3rkb1r/ppp2p1p/6p1/q3p3/1nP5/P4N2/1BbPQPPP/3RKB1R,3rkb1r/ppp2p1p/2n3p1/q3pb2/2P5/PP3N2/1B1PQPPP/3RKB1R


r3kb1r/../R3KB1R [1]

take out the middle because there are three against 2


3rkb1r/../3RKB1R [2]

when white makes a mistake guard against the knight jump


3rkb1r/../3RBK1R [3]

white made a mistake so should go...

`

petrov_info_list = [petrov_info_1]


aronian_info_1 = `

Grunfeld opening,



Variation #13 get out of the pin is confusing


1.d4 Nf6 2.c4 g6 3.Nc3 d5 4.Nf3 Bg7 5.Bg5 Ne4 6.cxd5 Nxg5 7.Nxg5 e6 8.Qd2 exd5 9.Qe3+ Kf8 10.g3 h6 11.Nh3 c5 12.dxc5 d4 13.Qd2 Qe8 14.Nd1 Nd7 15.Nf4 Nxc5 16.Bg2 Be5 17.O-O Kg7 18.Nd5 Qd8 19.Rc1 Na6 20.b3 Re8 21.Nb2 Nc7 22.Nf4 Ne6 23.Nfd3 Bf6 24.Nc4 Ng5 25.Nc5 Qe7 26.Qb4 Bg4 27.h4 Ne6 28.Nxe6+ Qxe6 29.Qxb7 Rad8 30.f3 Bh3 31.Rc2 g5 32.h5 Rd7 33.Qb5 Rde7 34.g4 Bxg2 35.Kxg2 Qc8 36.Na3 Qd8 37.Rd2 Qd6 38.Nc4 Rxe2+ 39.Rf2 Rxf2+ 40.Rxf2 Qe6 41.Nd6 Rd8 42.Nf5+ Kh8 43.Re2 Qc8 44.Qd3 Qc3 45.Qxc3 dxc3 46.Kf2 Rd1 47.Rc2 Kh7 48.Ke2 Rh1 49.Nd6 Rh2+ 50.Kd3 Rh3 51.Ke3 Be5 52.Nb5 f5 53.gxf5 g4 54.Ke4 Rh2 55.Rc1 Re2+ 56.Kd3 gxf3 57.Nxc3 Bxc3 58.Rxc3 Rxa2 59.Ke4 f2 60.Rf3 Kg7 61.Ke5 Re2+ 62.Kd6 Kf6 63.b4 Rb2 64.Kc5 a6 65.Kc4 Ra2 66.Kb3 Re2 67.Kc4 Rd2 68.Kc5 Rb2 69.Kc4 Rc2+ 70.Kd3 Ra2 71.Kd4 Rb2 72.Kc3 Ra2 73.Kd4 Ra4 74.Kc5 a5 75.b5 Ra2 76.b6 Rb2 77.Kc6 a4 78.b7 Rc2+ 79.Kd7 Rb2 80.Kc7 Rc2+ *



`


aronian_info_2 = `@https://www.chessable.com/variation/19086971/#/13/b/0.2;rnbq1k1r/pp3pb1/6pp/2P5/3p4/2N3PN/PP1QPP1P/R3KB1R;d8-e7,c3-b5,c8-d7,e2-e3,d4-e3,d2-e3,b8-a6,;1

move 13; 

also 12a -- white pawn takes... because no good way to defend the pawn 



`


aronian_info_3 = `@https://www.chessable.com/variation/19086971/#/13/b/0.2;rnbq1k1r/pp3pb1/6pp/2P5/3p4/2N3PN/PP1QPP1P/R3KB1R;d8-e7,c3-b5,e7-c5,a1-c1,c5-b5,c1-c8,f8-e7,c8-h8,g7-h8,;2

problem is: if you take the poison pawn

`


aronian_info_4 = `#https://www.chessable.com/variation/19086971/#/13/b/0.2;rnbq1k1r/pp3pb1/6pp/2P5/3p4/2N3PN/PP1QPP1P/R3KB1R;d8-e7,c3-b5,c8-d7,b5-d4,b8-c6,d4-b3,a8-d8,d2-e3,c6-b4,e3-e7,f8-e7,a1-d1,b4-c2,e1-d2,d7-f5,,d2-c1,c2-b4;3


`


aronian_info_list = [aronian_info_1, aronian_info_2, aronian_info_3, aronian_info_4]

italian_info_1 = `
https://www.chess.com/game/live/51661226354

-------------------------------

r3kbnr/ppp1q1pp/2np4/4p3/2B1P1b1/2P2N2/PP1N1PPP/R1BQK2R
white to move

c4-g8,h8-g8,d1-b3,

triple attack...



---------

2kr1bnr/1pp3pp/3pq3/n3p1N1/P3P3/2P4P/3N1PP1/R1BQK2R

here go attack the knight with your knight ...

unblock your bishop

e6-f6,d2-b3,a5-c6,a4-a5,h7-h6,g5-f3,g7-g5,a5-a6,b7-b6,c1-e3,c8-b8,b3-d2,f6-e6,d1-a4,d6-d5,e4-d5,d8-d5,a4-b3,


------------

2k1rb1r/1p4p1/2p4p/n3Nn2/P3NP1P/2P3P1/8/R1B2RK1 w - - 0 22

go e1 here...


`;

italian_info_2 = `@rnb1k2r/ppppqppp/5n2/2b1N3/4P3/2N5/PPPP1PPP/R1BQKB1R,r1b2rk1/ppp1q1pp/1bn5/4Bp2/3P4/2N2N1P/PPP2KP1/R2Q1B1R,r1b2rk1/ppp1q2p/1bn5/4Bp2/3P2p1/2NB1N1P/PPP2KP1/R2QR3

https://www.chess.com/game/live/51665436578

rnbqk2r/../R1BQKB1R [1]


r1b2rk1/../R2Q1B1R [2]


r1b2rk1/.../R2QR3 [3]

* keep using the knight to attack the queen


--------------------------------------------

1. e4 e5 2. Nf3 Nc6 3. Bc4 d6 4. c3 f5 5. d3 fxe4 6. dxe4 Bg4 7. Nbd2 Qe7 8. h3
Be6 9. Bxe6 Qxe6 10. b4 O-O-O 11. a4 a5 12. bxa5 Nxa5 13. Ng5 Qf6 14. h4 Nh6 15.
Qf3 Qxf3 16. Ngxf3 d5 17. O-O dxe4 18. Nxe4 c6 19. Nxe5 Re8 20. f4 Nf5 21. g3 h6
22. Ba3 Bxa3 23. Rxa3 Nc4 24. Nxc4 Rxe4 25. Nb6+ Kb8 26. a5 Nxg3 27. Rf3 Nf5 28.
Ra4 Re1+ 29. Kf2 Rc1 30. c4 Nxh4 31. Rg3 g5 32. fxg5 hxg5 33. Rxg5 Rf8+ 34. Kg3
Nf5+ 35. Kg4 Ne3+ 36. Kg3 Rd8 37. Re5 Rc3 38. c5 Ka7 39. Kf4 Ng2+ 40. Ke4 Rdd3
41. Rd4 Re3+ 42. Kf5 Rf3+ 43. Ke4 Rf4# 0-1

--------------------------------------------

rnb2rk1/ppppq1pp/1b6/5p2/3PP3/2N2N1P/PPP2KP1/R1BQ1B1R w - - 0 10
c3-d5,e7-e8,f1-c4,g8-h8,e4-f5,d7-d6,g2-g4,
move # 10 for white


---------------------------------------------
r1b2rk1/ppp1q1pp/1bn5/4Bp2/3P4/2N2N1P/PPP2KP1/R2Q1B1R w - - 1 13
right here I advantage but then if I don't make the right move, lose tons of advantage


because your pawn is unpinned...
c3-d5,e7-f7,d5-b6,a7-b6,f1-d3,

--> then unpin it. 


-------------------------------------------


r1b2rk1/ppp4p/1b6/5p2/1q1n2p1/2NB2BP/PPP2KPN/R2QR3 w - - 0 17


f2-f1,c8-e6,a2-a3,b4-c5,c3-a4,c5-c6,e1-e6,d4-e6,a4-b6,a7-b6,f2-f1,c8-e6,a2-a3,b4-b4,b4-b4,b4-b4,b4-c5,c3-a4,c5-c6,e1-e1,e1-e6,d4-e6,a4-b6,g4-h3,a7-b6,d1-f3,b6-b5,f3-c6,b7-c6,h2-f3,g3-g3,g3-c7,e6-c5,f8-c8,c7-e5,c5-d3,c2-d3,c6-c5,f1-f2,g8-f7,g2-h3,a1-g1,










`;

italian_info_3 = `@r3kbnr/ppp1q1pp/2np4/4p3/2B1P1b1/2P2N2/PP1N1PPP/R1BQK2R,2kr1bnr/1pp3pp/3pq3/n3p1N1/P3P3/2P4P/3N1PP1/R1BQK2R


https://www.chess.com/game/live/50527774465

--------------------------------------------

https://www.chess.com/analysis/game/live/50624337407?tab=review

at move 7a instead go here:
d2-d3, a7-a6, a4-c3, b7-b5, c4-d5

--------------------------------------------

https://www.chess.com/analysis/game/live/50702385279?tab=review

move 13b: your move where to go?
a3-e7, d8-e7, d1-d4 

14b - the best move is to take the bishop 
d1-a1

19a- you should go to c1



`;

italian_info_4 = `  https://www.chess.com/analysis/game/live/50946048249?tab=review

dont take the knight with your bishop..


best move 6a,d1-b3,

form the battery against the knight

dont retreat your knight but take the pawn and go after the bishop at move 14b

and at move 24.. take out the bishop (this is when Alan took over..) instead of the pawn
`;

italian_info_5 = `@https://www.chess.com/a/2SpHFdNgn2Es6N;r1bq1rk1/1p2npp1/pbp2n1p/1P1pN3/P3P3/1BPP4/5PPP/RNBQ1RK1;b5-c6,b7-c6,
`;


italian_info_6 = `https://www.chess.com/game/live/51836389915

`
 

italian_info_list = [
  italian_info_1,
  italian_info_2,
  italian_info_3,
  italian_info_4,
  italian_info_5
];



agadmator_1 = `d2-d4, g8-f6, c2-c4, e7-e6, b1-c3, f8-b4, a2-a3, b4-c3, b2-c3, c7-c5, e2-e4, d8-a5, e4-e5, f6-e4, c1-d2, b8-c6, g1-f3, e4-c3, d1-c2, c5-d4, a3-a4, b7-b6, f1-e2, c8-a6, e1-f1, a8-c8, g2-g3, c6-e5, f3-d4, c3-e2, d2-a5, e2-d4, c2-b2, c8-c4, f1-g2, a6-b7, g2-h3, e5-d3, b2-d2, d4-f3, d2-e3, f3-g5, `;

agadmator_list = [agadmator_1];

philidor_1 = `e2-e4, e7-e5, g1-f3, g8-f6, b1-c3, d7-d6, d2-d4, c8-g4, f1-e2, e5-d4, f3-d4, g4-e2, d1-e2, d8-e7, f2-f3, d6-d5, e4-e5, f6-d7, f3-f4, b8-c6, c3-d5, c6-d4, e2-c4, e7-c5, c4-c5, f8-c5, e1-d1, e8-g8, h8-f8, c2-c3, d4-e6, b2-b4, c5-b6, d5-b6, d7-b6, c1-e3, b6-c4, e3-f2, a8-d8, d1-c2, e6-f4, g2-g3, d8-d2, c2-b3, d2-f2, 

`;

philidor_list = [philidor_1];

philidor_info_1 = `hello world 
15b should be 15a everything got pushed down one...
(because of castling concerns)

9b: 

c3-d5,

here with this move you will attack the queen if the knight takes the pawn

11a: your knight is hanging in the middle

13b
d5-c7,13b,e8-e8,13b,e8-e7,13b,c7-d5,13b,e7-e7,13b,e7-e6,13b,d5-c7,13b,e6-f5,13b,c7-a8,13b,d4-c2,

already losing a lot here!



`;

philidor_info_list = [philidor_info_1];

english_1 = `c2-c4, e7-e5, g1-f3, b8-c6, d2-d4, e5-d4, f3-d4, f8-b4, b1-c3, g8-f6, g2-g3, f6-e4, d1-d3, e4-c3, b2-c3, b4-c5, c1-e3, c5-b6, c4-c5, b6-a5, d4-b3, b7-b6, f1-g2, d8-f6, a1-c1, a8-b8, e1-g1, h1-f1, e8-g8, h8-f8, e3-f4, c6-e5, d3-d4, f8-e8, b3-a5, b6-a5, c1-b1, b8-b1, f1-b1, d7-d6, b1-b8, g7-g5, c5-d6, g5-f4, g3-f4, e5-d7, d6-c7, f6-d4, c3-d4, g8-f8, e2-e4, f8-e7, e4-e5, d7-b6, d4-d5, e7-d7, d5-d6, f7-f6, g2-h3, d7-c6, b8-c8, e8-c8, h3-c8, b6-c8, g1-g2, c6-d7, g2-g3, c8-b6, g3-g4, 

`;

english_list = [english_1];

english_info_1 = `Levy's last game

https://www.youtube.com/watch?v=WQqvUfjKBaU

mental health recap ..

1. c4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bb4+ 5. Nc3 Nf6 6. g3 Ne4 7. Qd3 Nxc3 8. bxc3
Bc5 9. Be3 Bb6 10. c5 Ba5 11. Nb3 b6 12. Bg2 Qf6 13. Rc1 Rb8 14. O-O O-O 15. Bf4
Ne5 16. Qd4 Re8 17. Nxa5 bxa5 18. Rb1 Rxb1 19. Rxb1 d6 20. Rb8 g5 21. cxd6 gxf4
22. gxf4 Nd7 23. dxc7 Qxd4 24. cxd4 Kf8 25. e4 Ke7 26. e5 Nb6 27. d5 Kd7 28. d6
f6 29. Bh3+ Kc6 30. Rxc8 Rxc8 31. Bxc8 Nxc8 32. Kg2 Kd7 33. Kg3 Nb6 34. Kg4 *

attack the bishop with pawn push in front of the king go backwards... otherwise is a mistake

`;

english_info_list = [english_info_1];

agadmator_info_1 = `Nimzo Defense
move 5a:

you want to be able to : push the pawns e2 to e3 or d2 to d3  and queen to c2


at move 6a: queen has a double attack if the pawn is captured


double attacker on the c3 pawn at 7b

white needs to get the knight out the way when attacked by a pawn

10b knight is cemented

10b:
f3-d4,a5-e5,d4-e2,c3-e2,f1-e2,e5-a1 with check and you have all sorts of problems


purpose of 11b is to bring the bishop to attack the c4 pawn

13a: cannot castle because then e2 bishop is hanging 


14b: for white to capture the knight at e5 do not gain anything...

15b: black offers queen

now in this variation bishop cannot move or the knight hangs with the bishop lining up against the king

d4-e2,a5-d5,c4-d5,c8-c2,


c4 square under triple attack 

18b:
g2-g1,c4-c2,b2-d4,e5-f3,g1-f1,f3-d4


20b:
d2-d2,d2-d3,f3-g5,


21b: e3-g5,d3-f2, checkmate
`;

agadmator_info_list = [agadmator_info_1];

evans_gambit_info_1 = `@https://www.chess.com/analysis/saved;25

the gambit is saved onto the computer
`

evans_gambit_info_list = [evans_gambit_info_1]

openings_info_1 = `

see Evans Gambit

or image [25]



`

openings_info_list = [openings_info_1]



queens_pawn_1 = `d2-d4, d7-d5, c1-f4, c7-c6, e2-e3, c8-f5, c2-c3, b8-d7, g1-f3, c6-c5, b1-d2, e7-e6, d1-a4, g8-e7, f1-b5, e7-c6, f3-e5, c6-e5, f4-e5, f7-f6, e5-g3, a7-a6, b5-d7, d8-d7, a4-d1, g7-g5, d1-h5, f5-g6, h5-f3, d7-e7, e1-g1, h7-h5, h2-h3, f6-f5, g3-e5, h8-h6, c3-c4, g5-g4, f3-e2, g4-h3, g2-g3, h5-h4, g1-h2, g6-h5, e2-d3, a8-d8, d2-b3, b7-b6, b3-c1, e7-g5, f1-g1, g5-g4, e5-f4, h6-g6, e3-e4, f5-e4, d3-e3, f8-g7, c1-e2, g4-e2, e3-e2, h5-e2, g1-e1, e2-g4, b2-b3, g7-d4, g3-h4, d4-a1, e1-a1, g6-f6, f4-g5, f6-f2, h2-g1, f2-g2, g1-f1, g4-e2, f1-e1, d8-d7, e1-d2, e2-f3, d2-e3, g2-g4, a1-h1, f3-h1, 
`;

queens_pawn_2 = `d2-d4, d7-d5, g1-f3, c7-c6, e2-e3, c8-f5, c2-c4, h7-h6, c4-d5, d8-d5, f3-d2, d5-d6, f2-f4, g7-g5, f4-g5, h6-g5, b1-c3, b8-d7, d2-c4, d6-c7, e3-e4, f5-g6, c1-g5, h8-h2, h1-g1, b7-b5, c4-e3, h2-h5, d1-g4, d7-f6, g5-f6, g8-f6, g4-f3, e7-e5, d4-e5, c7-e5, e1-c1, g6-e4, c3-e4, f6-e4, e3-g4, h5-f5, f3-d3, e5-e7, f1-e2, f5-d5, d3-h3, d5-c5, c1-b1, a8-d8, 

`;

queens_pawn_3 = `d2-d4, d7-d5, h2-h3, c7-c6, c1-g5, h7-h6, g5-h4, d8-c7, g1-f3, b8-d7, b1-c3, e7-e5, e2-e3, e5-e4, f3-e5, d7-e5, d4-e5, c7-e5, h4-g3, e5-f6, f1-e2, f8-d6, g3-d6, f6-d6, d1-d2, g8-e7, a2-a3, e7-f5, e2-g4, e8-g8, h8-f8, e1-c1, a1-d1, c8-e6, g4-f5, e6-f5, g2-g4, f5-e6, g4-g5, h6-h5, h3-h4, g7-g6, d1-e1, f7-f6, f2-f4, b7-b5, d2-d4, g8-g7, h1-g1, c6-c5, c3-b5, d6-b6, d4-a4, a7-a6, b5-c3, f8-d8, a4-b3, b6-c6, b3-a4, c6-c7, g5-f6, g7-f6, g1-g5, e6-d7, a4-b3, c5-c4, b3-a2, d7-f5, e1-d1, c7-c5, d1-d4, a6-a5, c3-a4, c5-c6, a4-c3, c6-c5, a3-a4, f6-e6, c3-b5, e6-f6, c2-c3, f6-e6, b5-a3, c5-c6, a3-c2, c6-d7, c2-e1, d7-c6, e1-g2, a8-b8, g2-e1, b8-b7, a2-a3, d8-b8, g5-g2, b7-b3, a3-a1, c6-c5, g2-c2, e6-f6, e1-g2, b8-g8, c1-d1, g6-g5, h4-g5, f6-g6, g2-h4, g6-g7, h4-f5, g7-f7, f5-h6, f7-g7, h6-g8, g7-g8, d1-e2,  `;

queens_pawn_4 = `d2-d4, d7-d5, g1-f3, c7-c5, c2-c3, g8-f6, d4-c5, e7-e6, b2-b4, a7-a5, e2-e3, a5-b4, c3-b4, b7-b6, f1-b5, c8-d7, b5-d7, b8-d7, a2-a4, b6-c5, b4-b5, f8-d6, c1-b2, g7-g5, e3-e4, g5-g4, f3-d2, d8-c7, d1-e2, h8-g8, g2-g3, d6-e5, b2-e5, d7-e5, e4-d5, e5-f3, d2-f3, g4-f3, d5-d6, c7-d6, e2-f3, d6-e5, e1-f1, f6-e4, f1-g2, e5-a1, f3-e4, a1-a4, e4-c6, e8-e7, c6-c5, e7-f6, b1-c3, a4-g4, h1-e1, g4-f5, c5-d4, f6-g6, e1-e5, a8-d8, d4-c5, f5-c2, e5-g5, g6-h6, h2-h4, f7-f6, g5-g8, d8-g8, b5-b6, c2-b3, c5-c7, g8-g4, c7-c5, e6-e5, c5-f8, h6-g6, f8-c8, h7-h5, b6-b7, g4-b4, c8-e8, g6-g7, e8-e7, g7-g6, 

`
  
queens_pawn_5 = `d2-d4, d7-d5, g1-f3, c7-c6, c1-f4, c8-f5, e2-e4, d5-e4, f3-g5, h7-h6, g5-f7, e8-f7, f1-c4, e7-e6, d1-h5, g7-g6, h5-e2, d8-d4, f4-b8, a8-b8, b1-c3, b7-b5, a1-d1, d4-c5, c4-b3, f8-g7, d1-d7, g8-e7, e2-e3, c5-c4, b3-c4, b5-c4, e3-e2, b8-b2, g2-g4, b2-b1, c3-d1, g7-c3, e1-f1, f5-g4, e2-g4, `

queens_pawn_list = [queens_pawn_1, queens_pawn_2, queens_pawn_3, queens_pawn_4, queens_pawn_5];


sicilian_info_1 = `@https://www.chess.com/analysis/game/live/53643551117;r1bqk2r/1p1pppbp/p1n3p1/1BB4n/4P3/1PN2N2/P1PP1PPP/R2QK2R;c3-d5,d7-d7,e7-e6,c5-b6,e6-d5,b6-d8,a6-b5,e4-d5,c6-d8,d1-e2,e8-f8,

knight supports bishop to attack the queen

`;

sicilian_info_2 = `@https://www.chess.com/a/2pArH121t2Es6N;r3k2r/1b2ppbp/p1n3p1/qp2P3/8/PPN1BN2/2P1QPPP/3R1RK1;c3-d5,e8-g8,h8-f8,e3-b6,a5-a3,d1-a1,a3-b2,f1-b1,d5-d5,c6-e5,d5-e7,g8-h8,b1-b2,
the queen gets stuck and the knight coming forward leads to a lot of forks


`;


sicilian_1 = `e2-e4, c7-c5, g1-f3, b8-c6, f1-b5, g7-g6, b1-c3, f8-g7, b2-b3, g8-f6, c1-a3, f6-h5, a3-c5, a7-a6, b5-e2, h5-f4, e1-g1, h1-f1, d7-d6, c5-e3, f4-e2, d1-e2, b7-b5, a1-d1, c8-b7, d2-d4, c6-b4, a2-a3, b4-c6, e4-e5, d6-e5, d4-e5, d8-a5, e2-d3, e8-g8, h8-f8, d3-d7, a8-a7, e3-a7, c6-a7, d7-b7, a7-c8, c3-d5, e7-e6, d5-e7, c8-e7, b7-e7, a5-a3, d1-d8, a3-e7, 

`

sicilian_2 = `e2-e4, c7-c5, g1-f3, b8-c6, f1-b5, g7-g6, b1-c3, f8-g7, b2-b3, g8-f6, c1-a3, f6-h5, a3-c5, a7-a6, b5-e2, h5-f4, e1-g1, h1-f1, d7-d6, c5-e3, f4-e2, d1-e2, b7-b5, a1-d1, c8-b7, d2-d4, c6-b4, a2-a3, b4-c6, e4-e5, d6-e5, d4-e5, d8-a5, e2-d3, e8-g8, h8-f8, d3-d7, a8-a7, e3-a7, c6-a7, d7-b7, a7-c8, c3-d5, e7-e6, d5-e7, c8-e7, b7-e7, a5-a3, d1-d8, a3-e7, 

`

sicilian_list = [sicilian_1, sicilian_2];

sicilian_info_list = [sicilian_info_1, sicilian_info_2];

const htmlEl = document.getElementsByTagName("html")[0];

const toggleTheme = (theme) => {
  htmlEl.dataset.theme = theme;
};

function applyTheme(theme) {
  document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
  document.body.classList.add(`theme-${theme}`);
  console.log(theme);
  console.log(`theme-${theme}`);
}

// document.addEventListener("DOMContentLoaded", () => {
//   const savedTheme = localStorage.getItem("theme") || "auto";

//   applyTheme(savedTheme);

//   for (const optionElement of document.querySelectorAll("#selTheme option")) {
//     optionElement.selected = savedTheme === optionElement.value;
//   }

//   document.querySelector("#selTheme").addEventListener("change", function () {
//     localStorage.setItem("theme", this.value);
//     applyTheme(this.value);
//   });
// });

//determine_selection

function determine_selection() {
  if (selection_var == 0) {
    val_choice = parseInt($("#Choice").val()) - 1;
    console.log("val_choice" + val_choice);
    console.log("selection_var_0");
  } else {
    val_choice = 0;
    console.log("val_choice" + val_choice);
    console.log("selection_var_1");
  }
  val = $("#Selection").val();

  if (val === "Alan") {
    num_list = alan_list.length;
    if (number_val > num_list) {
      arr = alan_list[val_choice];
      arr_info = alan_info_list[val_choice];
    } else {
      arr = alan_list[val_choice][number_val_comp];
      arr_info = alan_info_list[val_choice];
    }
  }
  if (val === 'Chess_com_lessons') {
    arr = chess_com_lessons_list[val_choice]
    arr_info = chess_com_lessons_info_list[val_choice]
  }
  if (val === "Sicilian") {
    arr_info = sicilian_info_list[val_choice];
    arr = sicilian_list[val_choice];
    console.log('val_choice:'+val_choice)
  }
   if (val === "Aronian") {
    arr_info = aronian_info_list[val_choice];
    arr = aronian_list[val_choice];
    console.log('val_choice:'+val_choice)
  }
    if (val === "Vant_Kruijs") {
    arr_info = vant_kruijs_info_list[val_choice];
    arr = vant_kruijs_list[val_choice];
    console.log('val_choice:'+val_choice)
  }
  if (val === "Queens_pawn") {
    arr_info = queens_pawn_info_list[val_choice];
    arr = queens_pawn_list[val_choice];
  }
    if (val === "Caro_Kahn") {
    arr_info = caro_kahn_info_list[val_choice];
  }
   if (val === "Scandinavian") {
    arr_info = scandinavian_info_list[val_choice];
  }
   if (val === "Italian") {
    arr_info = italian_info_list[val_choice];
    arr = italian_list[val_choice];
  }
   if (val === 'Petrov') {
     arr_info = petrov_info_list[val_choice];
     arr = petrov_list[val_choice]
   }
   if (val === "French") {
    arr_info = french_info_list[val_choice];
    arr = french_list[val_choice];
  }
     if (val === "Grob") {
    arr_info = grob_info_list[val_choice];
    arr = grob_list[val_choice];
  }
  if (val === 'Attacking') {
    arr_info = attacking_info_list[val_choice];
    arr = attacking_list[val_choice]
  }
  if (val === 'Evans_gambit') {
    arr_info = evans_gambit_info_list[val_choice]
  }
  if (val === 'Openings') {
    arr_info = openings_info_list[val_choice]
  }
  if (val === "Agadmator") {
    console.log("alekhine");
    num_list = agadmator_list.length;
    if (number_val > num_list) {
      arr = agadmator_list[val_choice];
      arr_info = agadmator_info_list[val_choice];
    } else {
      arr = agadmator_list[val_choice][number_val_comp];
      arr_info = agadmator_info_list[val_choice];
    }
  }
  if (val === "Philidor") {
    console.log("alekhine");
    num_list = philidor_list.length;
    if (number_val > num_list) {
      arr = philidor_list[val_choice];
      arr_info = philidor_info_list[val_choice];
    } else {
      arr = philidor_list[val_choice][number_val_comp];
      arr_info = philidor_info_list[val_choice];
    }
  }
  if (val === "English") {
    console.log("alekhine");
    num_list = english_list.length;
    if (number_val > num_list) {
      arr = english_list[val_choice];
      arr_info = englishr_info_list[val_choice];
    } else {
      arr = english_list[val_choice][number_val_comp];
      arr_info = english_info_list[val_choice];
    }
  }
  
  if (val === "Kings_knight") {
    num_list = kings_knight_list.length;
    if (number_val > num_list) {
      arr = kings_knight_list[val_choice];
      arr_info = kings_knight_info_list[val_choice];
    } else {
      arr = kings_knight_list[val_choice][number_val_comp];
      arr_info = kings_knight_info_list[val_choice];
    }
  }
  if (val === "Kings_fianchetto") {
    num_list = kings_fianchetto_list.length;
    if (number_val > num_list) {
      arr = kings_fianchetto_list[val_choice];
      arr_info = kings_fianchetto_info_list[val_choice];
    } else {
      arr = kings_fianchetto_list[val_choice][number_val_comp];
      arr_info = kings_fianchetto_info_list[val_choice];
    }
  }
  if (val === "Kings_pawn") {
    num_list = kings_pawn_list.length;
    if (number_val > num_list) {
      arr = kings_pawn_list[val_choice];
      arr_info = kings_pawn_info_list[val_choice];
    } else {
      arr = kings_pawn_list[val_choice][number_val_comp];
      arr_info = kings_pawn_info_list[val_choice];
    }
  }
  if (val === "Birds_opening") {
    num_list = birds_opening_list.length;
    if (number_val > num_list) {
      arr = birds_opening_list[val_choice];
      arr_info = birds_opening_info_list[val_choice];
    } else {
      arr = birds_opening_list[val_choice][number_val_comp];
      arr_info = birds_opening_info_list[val_choice];
    }
  }
  if (val === "Fianchetto") {
    num_list = fianchetto_list.length;
    if (number_val > num_list) {
      arr = fianchetto_list[0];
    } else {
      arr = fianchetto_list[number_val_comp];
    }
  }


  if (val === "Nimzo_defense") {
    num_list = nimzo_defense_list.length;
    if (number_val > num_list) {
      arr = nimzo_defense_list[val_choice];
      arr_info = nimzo_defense_info_list[val_choice];
    } else {
      arr = nimzo_defense_list[val_choice][number_val_comp];
      arr_info = nimzo_defense_info_list[val_choice];
    }
  }
  if (val === "MateInThree") {
    num_list = mateinthree_list.length;
    if (number_val > num_list) {
      arr = mateinthree_list[0];
    } else {
      arr = mateinthree_list[number_val_comp];
    }
  }
  if (val === "Lightsquares") {
    num_list = lightsquares_list.length;
    if (number_val > num_list) {
      arr = lightsquares_list[0];
    } else {
      arr = lightsquares_list[number_val_comp];
    }
  } else {
    console.log("it is there anyways");
  }
  arr = `hello_world`
}



arr_info = `hello world`;






dictionary_of_links = {
    'Google_docs' : ['https://docs.google.com/document/d/1_jeB_ym6CUn6tdJZXemGKTbAkftE-xG7MYpIxD0yKE4/edit'],
    'French' : ['https://www.chess.com/a/37aPniAra2Es6N','https://www.chess.com/a/NTtS6huQ2Es6N','https://www.chess.com/a/CkUDGjGr2Es6N','https://www.chess.com/a/pKafM55Y2Es6N', 'https://www.chess.com/a/2uvLwAU142Es6N', 'https://www.chess.com/a/26KM8Z18r2Es6N', 'https://www.chess.com/a/2QTraZjKC2Es6N','https://www.chess.com/a/WJTtRyki2Es6N'
    ],
    'Caro_kahn' : ['https://www.chess.com/a/NTtS6huQ2Es6N', 'https://www.chess.com/a/We7gPBqG2Es6N'],
     'English' : ['https://www.chess.com/analysis/game/live/56336660993?tab=analysis'],
    'Italian' : ['https://www.chess.com/a/2EJ5oKuGJ2Es6N','https://www.chess.com/a/3AsMtchJN2Es6N','https://www.chess.com/a/2w2nnpJNA2Es6N'],
    'Kings_pawn' : ['https://www.chess.com/a/2cQHyE8E22Es6N'],
    'Petrov' : ['https://www.chess.com/a/2L4Zorbcz2Es6N','https://www.chess.com/analysis/game/live/55820030675?tab=analysis'],
    'Pirc_modern_d' : ['https://www.chess.com/a/2QnfETyR82Es6N'],
    'Philidor' : ['https://www.chess.com/a/2S16WKnKG2Es6N'],
    'Queens_pawn' :['https://www.chess.com/a/2WvGH9rii2Es6N','https://www.chess.com/a/22pgPPc6z2Es6N', 'https://www.chess.com/a/3ASXREtaA2Es6N'],
    'Ruy_lopez' : ['https://www.chess.com/a/2sjgcLVpS2Es6N?tab=analysis'],
    'Scandinavian' : ['https://www.chess.com/a/2Cyjt5mNv2Es6N', 'https://www.chess.com/a/2iLTAwC8N2Es6N', 'https://www.chess.com/a/hvB8uV8a2Es6N?tab=analysis','https://www.chess.com/a/KNrNcqdg2Es6N', 'https://www.chess.com/a/8zrjjtTQ2Es6N'],
    'Slav' : ['https://www.chess.com/a/2rRxaVcBx2Es6N' , 'https://www.chess.com/analysis/game/computer/18022251?tab=review'],
    'Vant_Kruijs': ['https://www.chess.com/a/2KaLArDfL2Es6N'],
    'Weird' : ['https://www.chess.com/a/V7pNy7qG2Es6N']

}


var chess_openings_choice_catch = document.getElementById("chess_openings_choice");
chess_openings_choice_catch.addEventListener("change", function () {
  console.log('hello world')
  console.log(dictionary_of_links[$("#chess_openings").val()][parseInt($('#chess_openings_choice').val())-1])
  console.log($('#chess_openings_choice').val())
  try {
    window.open(dictionary_of_links[$("#chess_openings").val()][parseInt($('#chess_openings_choice').val())-1])
  } catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}

});



empty_keys_2 = []

empty_values_2 = []

Object.entries(dictionary_of_links).forEach(([key, value]) => {
   empty_keys_2.push(key)
   empty_values_2.push(value)
});

empty_string_2 = ''

/*
for(var i = 0; i < empty_keys_2.length; i++) {
  empty_string_2 = empty_string_2 + empty_keys_2[i]
  empty_string_2 = empty_string_2 + ":  "
  empty_string_2 = empty_string_2 + empty_values_2[i]
  empty_string_2 = empty_string_2 + ', '
}

*/


for(var i =0; i< empty_keys_2.length; i++) {
    empty_string_2 = empty_string_2 + empty_keys_2[i] + ": "
    for(var j=0; j<empty_values_2[i].length;j++){
        k = j + 1
        empty_string_2 = empty_string_2 + k + ", "
    }
}

document.getElementById("dictionary_of_links_id").innerHTML = empty_string_2

 document.getElementById("dictionary_of_links_id").innerHTML = "<span class='highlight'>" + "Google Docs" + "</span>" + document.getElementById("dictionary_of_links_id").innerHTML.substring(11)

var element = document.getElementById("confirm_fen"); //grab the element
element.onclick = function () {
    console.log('hello world')
    document.getElementById("fen_position_on_board").innerHTML = board.fen();
    navigator.clipboard.writeText(board.fen())
}


var element = document.getElementById("gotoHome"); //grab the element
element.onclick = function() { //
  console.log(window.scrollY)
  window.scrollTo(0,0)

  //window.scrollTo(0,0)

}














list_of_completed = {
  'Caro_Kahn' : [1,2,3,4,5,6,7,8,9,10,11],
  'French': [1,2,3],
  'Italian': [1,2,3],
  'Queens_pawn' : [1,2,3,4,5],
  'Scandinavian' : [1,2,3],
  'Sicilian': [1,2],
  'Vant_Kruijs': [1],
  'Aronian': [1,2,3,4]


}


empty_keys = []

empty_values = []

Object.entries(list_of_completed).forEach(([key, value]) => {
   empty_keys.push(key)
   empty_values.push(value)
});

empty_string = ''

counting_values = 0 

for (var i = 0 ; i < empty_keys.length; i++) {
    empty_string = empty_string + empty_keys[i] + ": "
    for (var j = 0; j < empty_values[i].length ; j++ ){
        counting_values = counting_values + 1
        empty_string = empty_string + counting_values + ", "
    }
}

/*
for(var i = 0; i < empty_keys.length; i++) {
  empty_string = empty_string + empty_keys[i]
  empty_string = empty_string + ":  "
  empty_string = empty_string + empty_values[i]
  empty_string = empty_string + ', '
}

*/



document.getElementById("list_of_completed_id").innerHTML = empty_string

/*
for(var i = 0; i < arrsplitArray.length; i++) {
    var tr = tableRef.insertRow()
    for(var j = 0; j < arrsplitArray[i].length; j++) {
      var td = tr.insertCell(); 
      td.appendChild(document.createTextNode(arrsplitArray[i][j]))
      td.style.border = '1px solid black';
    }}
*/

selection_progression = []
choice_progression = []

for(var i = 0; i < empty_values.length; i++) {
  
  for(var j = 0; j < empty_values[i].length; j++) {
      choice_progression.push(empty_values[i][j])
      selection_progression.push(empty_keys[i])
    }}


var selection_catch = document.getElementById("Selection");
selection_catch.addEventListener("change", function () {
  console.log("hello_world");
  another_counter = 0
  selection_var = 0;
  $("#Choice").val(1);
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }

});


var element = document.getElementById("choice1"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(1);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}


var choice_catch = document.getElementById("Choice");
choice_catch.addEventListener("change", function () {
  console.log("hello_world");
  another_counter = 0 
  selection_var = 0;
  num_lock_counter = 0
  first_text_val_split = ''
  second_text_val_split = ''
  determine_selection();
  console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

});





var progression_catch = document.getElementById("ProgressionChoice");
progression_catch.addEventListener("change", function () {
    //progression choice is the select window with the numbers


  console.log('hello world')
  progression_counter = parseInt($("#ProgressionChoice").val()) - 1;
  $("#Selection").val(selection_progression[progression_counter]);
  $("#Choice").val(choice_progression[progression_counter]);
  console.log(
    "selection_progression[progression_counter]" +
      selection_progression[progression_counter]
  );
  console.log(
    "choice_progression[progression_counter]" +
      choice_progression[progression_counter]
  );
  another_counter = 0 
  selection_var = 0;
  determine_selection();
  console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

});



var element = document.getElementById("choice1"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(1);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}


var element = document.getElementById("choice2"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(2);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}

var element = document.getElementById("choice3"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(3);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}


var element = document.getElementById("choice4"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(4);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}



var element = document.getElementById("choice5"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(5);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}





var element = document.getElementById("choice6"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(6);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}



var element = document.getElementById("choice7"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(7);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}



var element = document.getElementById("choice8"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(8);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}


var element = document.getElementById("choice9"); //grab the element
element.onclick = function () {
  console.log('hello world')
  another_counter = 0 
  selection_var = 0;
  first_text_val_split = ''
  second_text_val_split = ''
  //add something here too
  //num_lock_counter = 0
  num_lock_counter = 0 
  $("#Choice").val(9);
  //then add determine_selection
  determine_selection();
   console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split

}




//loading..

progression_counter = 22
// if you want 27 on the list you need to subtract by 1 to get 26.




$("#Selection").val(selection_progression[progression_counter]);
  $("#Choice").val(choice_progression[progression_counter]);
  console.log(
    "selection_progression[progression_counter]" +
      selection_progression[progression_counter]
  );
  console.log(
    "choice_progression[progression_counter]" +
      choice_progression[progression_counter]
  );
  another_counter = 0 
  selection_var = 0;
  determine_selection();
  console.log('arr:'+arr)
  //arr_again = arr.replace(/\n/g, " ");
  text_val_split = arr.split(" ").join("");
  text_val_split = text_val_split.slice(0, -1);
  text_val_split = text_val_split.split(",");
  array_of_moves = text_val_split;
  var tableRef = document.getElementsByTagName("table")[3];
  tableRef.innerHTML = "";

  //  for(var j = 0; j < arrsplit.length; j++) {
  //  var tr = tableRef.insertRow()
  // var td = tr.insertCell();
  // td.appendChild(document.createTextNode(arrsplit[j]))
  // td.style.border = '1px solid black';

  //  }
  var table_ = document.getElementById("my-table");
  $("#myTextAreaSummary").val(arr_info);
  
   arr_info.split('\n')[0]

  split_results_4 = arr_info.split('\n')[0]


  if(split_results_4.includes('@')) {
    console.log('includes')
    split_results_5 = split_results_4.replace('@', '')
    split_results_6 = split_results_5.split(';')

    fen_list_for_text_chess_1 = []
    fen_list_for_text_chess_1 = split_results_6
    try {
        third_text_val_split = split_results_6[0]
        document.getElementById('image1').src=image_list_2[third_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    try {
        fourth_text_val_split = split_results_6[1]
        document.getElementById('image2').src=image_list_2[fourth_text_val_split]
    } catch (error) {
        console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
    }
    // first_text_val_split should be split_results_6[1]
    // split_results_6[2]
    // second_text_val_split
  }
    //marker


  // first_text_val_split should be split_results_6[1]
  //require
  // require
        
  // split_results_6[2]
  // second_text_val_split


function getSelectedText_to_getLink() {
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
        try {
            window.open(split_at_link)
        } catch (error) {
            console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
        }

        
   
}


var element = document.getElementById("get_link_button"); //grab the element
element.onclick = function() { //asign a function
  console.log('hello world')
  getSelectedText_to_getLink()
}


var element = document.getElementById("submit_button"); //grab the element
element.onclick = function () {
    text_val = $("#text_chess").val();
    console.log(text_val)
      if (text_val.includes("/")) {
        document.getElementById('image1').src=text_val
      } else {
        console.log('does not contain /')
      }
    document.getElementById("text_chess").value = ""  
}

$("#text_chess").keypress(function (e) {
  if (e.which == 13) {
        text_val = $("#text_chess").val();
        console.log(text_val)
        if (text_val.includes("/")) {
          document.getElementById('image1').src=text_val
        } else {
          console.log('does not contain /')
        }    
        document.getElementById("text_chess").value = ""
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
        if(selectedText.toString().trim().includes('@')) {
            window.open(selectedText.toString().trim().substring(1));
        } else {
            console.log(selectedText.toString().trim())
            window.open(selectedText.toString().trim())
        }
        
   
}


var element = document.getElementById("goto_highlight_link_button"); //grab the element
element.onclick = function() { //asign a function
  console.log('hello world')
  getSelectedText_to_gotoHighlightedLink()
}






function getSelectedText_to_reload_image() {
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
        if(selectedText.toString().trim().includes('[')) {
            hello_1 = selectedText.toString().trim().replace('[', '')
            hello_2 = hello_1.replace(']','')
            console.log(hello_2)
                try {
                    third_text_val_split = hello_2.split(',')[0]
                    document.getElementById('image1').src=image_list_2[third_text_val_split]
                } catch (error) {
                    console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
                }
                try {
                    fourth_text_val_split = hello_2.split(',')[1]
                    document.getElementById('image2').src=image_list_2[fourth_text_val_split]
                } catch (error) {
                    console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
                }



        } else {
            console.log(selectedText.toString().trim())
        }
        
   
}


var element = document.getElementById("select_reload_image"); //grab the element
element.onclick = function() { //asign a function
  console.log('hello world')
  getSelectedText_to_reload_image()
}

const queryString = window.location.search;

if (queryString.length > 0) {
	console.log('queryString greater than 0')
	const queryString = window.location.search;

	const urlParams = new URLSearchParams(queryString);

	const type_ = urlParams.get('load_image_')

	document.getElementById('image1').src=image_list_2[type_]
} else {
	console.log('queryString not greater than 0')
}
