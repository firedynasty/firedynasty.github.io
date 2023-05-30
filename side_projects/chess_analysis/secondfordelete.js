
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