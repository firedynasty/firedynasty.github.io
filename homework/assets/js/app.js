// from data.js
var tableData = data;

var table = d3.select('table')


var tableBody = d3.select('tbody')


tableData.forEach((info) => {

	var row = tableBody.append('tr');

	Object.entries(info).forEach(([key, value]) => {
		row.append('td').text(value);
	});
});


// YOUR CODE HERE!
// testing, see pages for logic


var sampleData = [{
    datetime: "1/1/2010",
    city: "benton",
    state: "ar",
    country: "us",
    shape: "circle",
    durationMinutes: "5 mins.",
    comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."
  },
  {
    datetime: "1/1/2010",
    city: "bonita",
    state: "ca",
    country: "us",
    shape: "light",
    durationMinutes: "13 minutes",
    comments: "Three bright red lights witnessed floating stationary over San Diego New Years Day 2010"
  }]

sampleData.forEach((info) => {

	var row = tableBody.append('tr');

	Object.entries(info).forEach(([key, value]) => {
		row.append('td').text(value);
	});
});


function selectDate(date) {
	return  date.datetime === "1/1/2010";
  }
  
  // filter() uses the custom function as its argument
var selectedDate = data.filter(selectDate);
  
console.log(selectedDate);



var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");

  
button.on("click", runEnter);
form.on("submit", runEnter);

// Create the function to run for both events
function runEnter() {

  // Prevent the page from refreshing
	d3.event.preventDefault();

	// Select the input element and get the raw HTML node
	var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  	var inputValue = inputElement.property("value");

//   Print the value to the console
    console.log(inputValue);

	function selectDate(date) {
		return  date.datetime === inputValue;
	  }
  
	var checkedValue = d3.select('input[name="optradio"]:checked').property("value");

	if (checkedValue === "set1") {





	}
	else if (checkedValue === "set2") {
		console.log("set 2")
	  }

  // filter() uses the custom function as its argument
	var selectedDate = data.filter(selectDate);
 
	// for sure now need to delete the rows
	// and then, add it back again

	d3.select("#ufo-table tbody").remove()
	console.log(selectedDate);
	console.log('printing..')

	var table_2 = d3.select("table")
	var tbody_2 = table_2.append("tbody")
	

	selectedDate.forEach((info) => {

		var row = tbody_2.append('tr');

		Object.entries(info).forEach(([key, value]) => {
			row.append('td').text(value);
	});


});
	
console.log(selectedDate);

}




