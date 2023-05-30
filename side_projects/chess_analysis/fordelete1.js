const notesObj = { 'first': 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR\nrnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR\nrnbqkbnr/ppp1pppp/8/3p4/3P4/4P3/PPP2PPP/RNBQKBNR\nrnbqkbnr/ppp2ppp/4p3/3p4/3P4/4P3/PPP2PPP/RNBQKBNR\nrnbqkbnr/ppp2ppp/4p3/3p4/3P4/4P3/PPPN1PPP/R1BQKBNR\nrnbqkbnr/pp3ppp/4p3/2pp4/3P4/4P3/PPPN1PPP/R1BQKBNR\nrnbqkbnr/pp3ppp/4p3/2pp4/3P4/2P1P3/PP1N1PPP/R1BQKBNR\nr1bqkbnr/pp3ppp/2n1p3/2pp4/3P4/2P1P3/PP1N1PPP/R1BQKBNR\nr1bqkbnr/pp3ppp/2n1p3/2pp4/3P1P2/2P1P3/PP1N2PP/R1BQKBNR\nr1bqk1nr/pp3ppp/2nbp3/2pp4/3P1P2/2P1P3/PP1N2PP/R1BQKBNR\nr1bqk1nr/pp3ppp/2nbp3/2pp4/3P1P2/2P1PN2/PP1N2PP/R1BQKB1R\nr1bqk2r/pp3ppp/2nbpn2/2pp4/3P1P2/2P1PN2/PP1N2PP/R1BQKB1R\nr1bq2kr/pp3ppp/2nbpn2/2pp4/3P1P2/2P1PN2/PP1N2PP/R1BQKB1R\nr1bq1rk1/pp3ppp/2nbpn2/2pp4/3P1P2/2P1PN2/PP1N2PP/R1BQKB1R\nr1bq1rk1/pp3ppp/2nbpn2/2pp4/3P1P2/2PBPN2/PP1N2PP/R1BQK2R\nr1bq1rk1/pp3ppp/2nbpn2/2pp4/3P1P2/2PBPN2/PP1N2PP/R1BQ2KR\nr1bq1rk1/pp3ppp/2nbpn2/2pp4/3P1P2/2PBPN2/PP1N2PP/R1BQ1RK1\nr1bq1rk1/pp3ppp/2nbpn2/2ppN3/3P1P2/2PBP3/PP1N2PP/R1BQ1RK1\nr2q1rk1/pp1b1ppp/2nbpn2/2ppN3/3P1P2/2PBP3/PP1N2PP/R1BQ1RK1\nr2q1rk1/pp1b1ppp/2nbpn2/2ppN3/3P1P2/2PBPQ2/PP1N2PP/R1B2RK1\n2rq1rk1/pp1b1ppp/2nbpn2/2ppN3/3P1P2/2PBPQ2/PP1N2PP/R1B2RK1\n2rq1rk1/pp1b1ppp/2nbpn2/2ppN3/3P1PP1/2PBPQ2/PP1N3P/R1B2RK1\n2rqnrk1/pp1b1ppp/2nbp3/2ppN3/3P1PP1/2PBPQ2/PP1N3P/R1B2RK1\n2rqnrk1/pp1b1ppp/2nbp3/2ppN1P1/3P1P2/2PBPQ2/PP1N3P/R1B2RK1\n2rqnrk1/pp1b2pp/2nbpp2/2ppN1P1/3P1P2/2PBPQ2/PP1N3P/R1B2RK1\n2rqnrk1/pp1b2pB/2nbpp2/2ppN1P1/3P1P2/2P1PQ2/PP1N3P/R1B2RK1\n2rqnr2/pp1b2pk/2nbpp2/2ppN1P1/3P1P2/2P1PQ2/PP1N3P/R1B2RK1\n2rqnr2/pp1b2pk/2nbpp2/2ppN1PQ/3P1P2/2P1P3/PP1N3P/R1B2RK1\n2rqnrk1/pp1b2p1/2nbpp2/2ppN1PQ/3P1P2/2P1P3/PP1N3P/R1B2RK1\n2rqnrk1/pp1b2p1/2nbppP1/2ppN2Q/3P1P2/2P1P3/PP1N3P/R1B2RK1\n2rqnrk1/pp1b2p1/2nbp1P1/2ppp2Q/3P1P2/2P1P3/PP1N3P/R1B2RK1\n2rqnrkQ/pp1b2p1/2nbp1P1/2ppp3/3P1P2/2P1P3/PP1N3P/R1B2RK1\n2rqnrkQ/pp1b2p1/2nbp1P1/2ppp3/3P1P2/2P1P2P/PP1N4/R1B2RK1' };

function repopulate_tabledropforNotes() {
    // Get the table and the dropdown menu
  
    var dropdown = document.getElementById("tabledropforNotes");
  
    // Clear existing options from the dropdown menu
    dropdown.innerHTML = "";
  
    //console.log(listOfFenPositions.length)
    const numKeys = Object.keys(notesObj).length;
    const keys = Object.keys(notesObj);

    // Loop through the rows of the table and add options to the dropdown menu
    //for (var i = 0; i < listOfFenPositions.length; i++) {
    for (var i = 0; i < Object.keys(myObj).length; i++) {
      // Create a new option element
      var option = document.createElement("option");
    
      // Set the value of the option to the index times 10
      option.value = keys[i];
      //option.value = i

      // Set the text of the option to the index plus a period
      //option.text = i + ".";
      option.text = keys[i];
      // Add the option to the dropdown menu
      dropdown.add(option);
      }
  
  }
  