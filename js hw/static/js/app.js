// from data.js
var tableData = data;

// YOUR CODE HERE!

// Make sure the data is accessible
console.log(tableData);

// Define table location
var tbody = d3.select("tbody")

// Add data to table function
function init() {tableData.forEach((Sighting) => {
    var row = tbody.append("tr");
    Object.entries(Sighting).forEach(([key, value]) => {
      var cell = tbody.append("td");
      cell.text(value);
    });
});
}

init();

// Clear table function
function clear(){
    tbody.remove();
    tbody = d3.select('table').append('tbody');
}


// Select the submit button
var submit = d3.select("#filter-btn");

// Write event listener
submit.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
  
    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");
  
    // Get the value property of the input element
    var inputValue = inputElement.property("value");
  
    console.log(inputValue);
  
    var filteredData = tableData.filter(Sighting => Sighting.datetime === inputValue);
  
    console.log(filteredData);
    
    //Clear table
    clear();

    //Add in filtered data
    filteredData.forEach((Sighting) => {
        var row = tbody.append("tr");
        Object.entries(Sighting).forEach(([key, value]) => {
          var cell = tbody.append("td");
          cell.text(value);
        });
    });

});