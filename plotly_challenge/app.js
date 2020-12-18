function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}
// this will create a Javscript Object for reference later

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
// this will allow the comptuer to find the value and then match it to the object set above


var data_1 = {}
var data_1Names = [];
var d1 = [];

d3.json("samples.json").then((d) => {
    //  Create the Traces
    data_1 = d;
    d1 = d;
    console.log(d);
    data_1Names = data_1.names;
    console.log(data_1.names);
    // this is setting the variable of the array of participants

    var otuLabels = d1.samples[0].otu_labels;
    // this is list with the otuLabels
    console.log(otuLabels);

    var OtuID = d.samples[0].otu_ids;
    // this is getting the variable name and id
    // the reason why I needed to map was to add the word otu in front of the sample number
    
    var SampleValues = d.samples[0].sample_values;
    // this is getting the sample values of the bacteria numbers

    var OtuLabels = d.samples[0].otu_labels;
    // get the name of otulabels
  

    var sortedByOtuID = OtuID.sort((a,b) => b - a);
    var sortedBySampleValues = SampleValues.sort((a,b) => b-a);
    // computer, we only want the top 10 
    // computer please save this sample into a javascript object so you can reference it


    slicedByOtuID = sortedByOtuID.slice(0,10);
    slicedBySampleValues = sortedBySampleValues.slice(0,10);
    // computer, we only want the top 10

    reversedByOtuID = slicedByOtuID.reverse();
    reversedBySampleValues = slicedBySampleValues.reverse();
    // this is so that plotly can optimize the viewing

    var reversedByOtuIDPlusString = reversedByOtuID.map(string => 'otc ' + string);
    
    var select = document.getElementById("selDataset");
    var options = data_1.names;
    // computer, you are setting the dropdown menu 

    console.log(reversedByOtuID);

    var textReferenceOtuId = toObject(OtuID);
    // this will get your SampleValues into an Javascript Object
    console.log(textReferenceOtuId);

    console.log(getKeyByValue(textReferenceOtuId, reversedByOtuID[0]));

    // now I need to build a new array
    
    var textArray = [];

    for (var i = 0; i < reversedByOtuID.length; i++){
      var thisByNumber = getKeyByValue(textReferenceOtuId, reversedByOtuID[i])
      textArray.push(otuLabels[thisByNumber])
    }

    console.log(textArray)


    for (var i = 0; i < options.length; i++ ) {
      var opt = options[i];
      var el = document.createElement("option");
      el.text = opt;
      el.value = opt;
      select.add(el);
    }

    // computer this is what we need to graph 
    var barTrace1 = {
      y: reversedByOtuIDPlusString,
      x: reversedBySampleValues,
      text: textArray,
      type: 'bar',
      orientation: 'h'
    }

    var barLayout = {
      title: "Belly Button Biodiversity",
      xaxis: { title: "Sample Values"}
    };

    var bubbleLayout = {
      xaxis: { title: "OTU ID"},
    };

    console.log(OtuID);
    console.log(SampleValues);

    var bubbleTrace1 = {
      x: OtuID,
      y: SampleValues,
      mode: 'markers',
      text: otuLabels,
      marker: {
        color: OtuID,
        colorscale: 'YlGnBu',
        size: SampleValues
      }
    };

    console.log(OtuID);
    console.log(SampleValues);

    var barData = [barTrace1]
    Plotly.newPlot('bar', barData, barLayout);
   
    var bubbleData = [bubbleTrace1];
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    //append a list

    var metaDataAge = data_1.metadata[0].age;
    console.log(metaDataAge);
    var metaDataEthnicity = data_1.metadata[0].ethnicity;
    console.log(metaDataEthnicity);
    var metaDataGender = data_1.metadata[0].gender;
    var metaDataID = data_1.metadata[0].id;
    var metaDataLocation = data_1.metadata[0].location;
    var metaDataWfreq = data_1.metadata[0].wfreq;

    metaDataArray = [`Age: ${metaDataAge}`, `Ethnicity: ${metaDataEthnicity}`, `Gender: ${metaDataGender}`, `ID: ${metaDataID}`, `Location: ${metaDataLocation}`, `Wfreq: ${metaDataWfreq}`];
    console.log(metaDataArray)

    var ul = d3.select('#sample-metadata')
      .append('ul')
      .attr("class", "aClass");

    ul.selectAll('li')
      .data(metaDataArray)
      .enter()
      .append('li')
      .html(String)

  });

  d3.selectAll("body").on('change', getData);

  function getData() {
    var dropdownMenu = d3.selectAll('#selDataset').node();
    var dropdownMenuID = dropdownMenu.id;
    var selectedOption = dropdownMenu.value;
    console.log(typeof selectedOption, selectedOption);
    console.log(data_1Names.indexOf(selectedOption))
    indexNames = data_1Names.indexOf(selectedOption);
    // prints out the number 

    var OtuIDRestyle = d1.samples[indexNames].otu_ids.map(sure => 'otu ' + sure);
    // this is getting the variable name and id
    
    var SampleValuesRestyle = d1.samples[indexNames].sample_values;
    // this is getting the sample values of the bacteria numbers

    var sortedByOtuIDRS = OtuIDRestyle.sort((a,b) => b - a);
    var sortedBySampleValuesRS = SampleValuesRestyle.sort((a,b) => b-a);
    // computer, we only want the top 10 

    slicedByOtuIDRS = sortedByOtuIDRS.slice(0,10);
    slicedBySampleValuesRS = sortedBySampleValuesRS.slice(0,10);
    // computer, we only want the top 10

    reversedByOtuIDRS = slicedByOtuIDRS.reverse();
    reversedBySampleValuesRS = slicedBySampleValuesRS.reverse();
    // this is so that plotly can optimize the viewing
  
    Plotly.restyle("bar", "y", [reversedByOtuIDRS]);
    Plotly.restyle("bar", "x", [reversedBySampleValuesRS]);

    var OtuIDRestyle = d1.samples[indexNames].otu_ids;
    var SampleValuesRestyle = d1.samples[indexNames].sample_values;

    Plotly.restyle("bubble", "x", [OtuIDRestyle]);
    Plotly.restyle("bubble", "y", [SampleValuesRestyle]);
    
    var metaDataAge = data_1.metadata[indexNames].age;
    console.log(metaDataAge);
    var metaDataEthnicity = data_1.metadata[indexNames].ethnicity;
    console.log(metaDataEthnicity);
    var metaDataGender = data_1.metadata[indexNames].gender;
    var metaDataID = data_1.metadata[indexNames].id;
    var metaDataLocation = data_1.metadata[indexNames].location;
    var metaDataWfreq = data_1.metadata[indexNames].wfreq;

    metaDataArray = [`Age: ${metaDataAge}`, `Ethnicity: ${metaDataEthnicity}`, `Gender: ${metaDataGender}`, `ID: ${metaDataID}`, `Location: ${metaDataLocation}`, `Wfreq: ${metaDataWfreq}`];
    console.log(metaDataArray)

    d3.selectAll(".aClass").remove();

    var ul = d3.select('#sample-metadata')
      .append('ul')
      .attr("class", "aClass");

    ul.selectAll('li')
      .data(metaDataArray)
      .enter()
      .append('li')
      .html(String)

  }

// I want to update the x and the y axis


// console.log(data_1Names.indexOf('941'))
// // okay cool 
// console.log(typeof selectedOption, selectedOption);
// // this returns a string


