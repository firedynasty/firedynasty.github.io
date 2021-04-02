// Select the button
// you can either click or you can press enter

var radioValue = 'time';

var button = d3.select("#button");

// Select the form
var form = d3.select("#form");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit",runEnter);

// Create the function to run for both events


// function runEnter() {

//   // Prevent the page from refreshing
//   d3.event.preventDefault();

//   console.log("hello");
// }

var buttons = d3.selectAll('input')
// getting the input of the selection

function runEnter() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  //get the selection of the radio button
  var radioSelection = buttons.value;
  
  console.log(radioSelection);

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#example-form-input");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // Print the value to the console
  console.log(inputValue);

  // Set the span tag in the h1 element to the text
  // that was entered in the form
  d3.select("h1>span").text(inputValue);

  // now trying to get the value of the selected radio button

    var checkedValue = d3.select('input[name="optradio"]:checked').property("value");

    if (checkedValue === "set1") {
      console.log("set 1")
    }
    else if (checkedValue === "set2") {
      console.log("set 2")
    }

}


