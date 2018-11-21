// @TODO: YOUR CODE HERE!
//Set up chart
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Set up wrapper
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Import Data
d3.csv("assets/data/data.csv").then(function(statedata) {
    //FormatData
    statedata.forEach(function(record) {
        record.smokes = +record.smokes;
        record.age = +record.age;
        record.poverty = +record.poverty;
        record.healthcare = +record.healthcare;
        record.obesity = +record.obesity;
      });
    //Make Scale
    var xLinearScale = d3.scaleLinear()
        .domain([0,
        d3.max(statedata,d=>d["poverty"]+1)])
        .range([0,width]);
    var yLinearScale = d3.scaleLinear()
        .domain([0,
            d3.max(statedata, d=>d["healthcare"]+1)])
        .range([height,0]);
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    //Make xAxis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    //Make yAxis
    var yAxis = chartGroup.append("g")
    .call(leftAxis);
    var scatdots =  chartGroup.selectAll("g.dot")
    .data(statedata)
    .enter()
    .append('g');
    //Make scatterplot dots
    scatdots.append("circle")
    .attr("cx", d => xLinearScale(d["poverty"]))
    .attr("cy", d => yLinearScale(d["healthcare"]))
    .attr("r", d=>d.obesity / 2)
    .attr("fill", "steelblue")
    .attr("opacity", ".5");
    //Make state text
    scatdots.append("text").text(d=>d.abbr)
    .attr("x", d => xLinearScale(d.poverty)-4)
    .attr("y", d => yLinearScale(d.healthcare)+2)
    .style("font-size",".6em")
    .classed("fill-text", true);
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);
    //X-label
    var censusRecordLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "poverty")
    .classed("axis-text", true)
    .text("In Poverty(%)");
    //Y-lable
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare(%)");
});
