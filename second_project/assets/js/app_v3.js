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

console.log(tableData)

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

var sampleData2 = sampleData;

// I see the problem already there is a null here

// function selectDate(date) {
// 	return  date.datetime === "1/1/2010";
//   }
  
//   // filter() uses the custom function as its argument
// var selectedDate = data.filter(selectDate);
  

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
		console.log("set1");
		console.log(tableData);
		var selectedDate = tableData.filter(ufo => ufo.datetime === inputValue);
		console.log(selectedDate);
		d3.select("#ufo-table tbody").remove()
		var tbody_2 = table.append('tbody');
		selectedDate.forEach((info) => {
			var row_2 = tbody_2.append('tr');
			Object.entries(info).forEach(([key, value]) => {
				row_2.append('td').text(value);
			});
		});
		tableData = selectedDate;
		console.log(tableData);
	}
	else if (checkedValue === "set2") {
		console.log('second')
		console.log(inputValue);
		var selectedState = tableData.filter(ufo => ufo.state === inputValue);
		console.log(selectedState);
		d3.select("#ufo-table tbody").remove();
		selectedState.forEach((info) => {
			var tbody_2 = table.append('tbody');
			var row_2 = tbody_2.append('tr');
			Object.entries(info).forEach(([key, value]) => {
				row_2.append('td').text(value);
			});
		});
		tableData = selectedState;
	}
	else if (checkedValue === "set3") {
		console.log('third');
		console.log(inputValue);
		var selectedCountry = tableData.filter(ufo => ufo.country === inputValue);
		console.log(selectedCountry);
		d3.select("#ufo-table tbody").remove();
		selectedCountry.forEach((info) => {
			var tbody_2 = table.append('tbody');
			var row_2 = tbody_2.append('tr');
			Object.entries(info).forEach(([key, value]) => {
				row_2.append('td').text(value);
			});
		});
		tableData = selectedCountry;
	}
	else if (checkedValue === "set4") {
		console.log('fourth');
		console.log(inputValue);
		var selectedShape = tableData.filter(ufo => ufo.shape === inputValue);
		console.log(selectedShape);
		d3.select("#ufo-table tbody").remove();
		selectedShape.forEach((info) => {
			var tbody_2 = table.append('tbody');
			var row_2 = tbody_2.append('tr');
			Object.entries(info).forEach(([key, value]) => {
				row_2.append('td').text(value);
			});
		});
		tableData = selectedShape;

	}

// 	else if (checkedValue === "set2") {
// 		function selectState(state) {
// 			return  state.state === inputValue;
// 		  }
// 	}
document.getElementById('datetime').value='';


}




