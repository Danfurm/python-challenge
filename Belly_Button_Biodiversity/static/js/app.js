var Colors = []

function colorgenerator(list){
  Colors =[]
  for(var i=0; i<list.length; i++){
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    Colors.push("rgb(" + x + "," + y + "," + z + ")");
   } 
   return Colors
}

function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  var url= "/metadata/" +sample
  d3.json(url).then(function(response){
    console.log(response)

    // Use d3 to select the panel with id of `#sample-metadata`
    var meta = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    meta.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(response).forEach(([key,value])=>
      meta
      .append('p')
      .text(`${key}: ${value}`)
    )
      });
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = "/samples/" + sample;
  d3.json(url).then((samples) => {
    //Object.entries(samples).forEach(function(data) {
      //data.sample_values = +data.sample_values;
    //});
    console.log(samples);
    console.log(`sample ID ${samples.otu_ids} and label ${samples.otu_labels} and values ${samples.sample_values}`);
    var IDS = samples.otu_ids;
    var Labels = samples.otu_labels;
    var Values = samples.sample_values;
    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: IDS,
      y: Values,
      mode: 'markers',
      marker: {
        size: Values,
        color: colorgenerator(Labels)
      },
      text: Labels
    };
    var layout = {
      showlegend: false,
      height: 600,
      width: 1300
    };
    
    var data = [trace1];
    Plotly.newPlot('bubble', data, layout);
    
    // @TODO: Build a Pie Chart
    //console.log(Object.entries(samples).sort((a,b) => {
    //  return b.sample_values - a.sample_values;
    //}));

    var sliced_IDS = IDS.slice(0,10);
    console.log(sliced_IDS);
    
    var sliced_Labels = Labels.slice(0,10);
    console.log(sliced_Labels);

    var sliced_Values = Values.slice(0,10);
    console.log(sliced_Values);
    
    var pie_data = [{
      values: sliced_Values,
      labels: sliced_IDS,
      hovertext: sliced_Labels,
      type: 'pie'
    }];
    Plotly.newPlot('pie', pie_data);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).    


});
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
