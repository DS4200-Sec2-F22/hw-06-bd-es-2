const FRAME_HEIGHT = 300;
const FRAME_WIDTH = 300;
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };
const SCALE = 50;
const PADDING = 50;

VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom
VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right

const FRAME1 = d3.select("#column1")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");

d3.csv("data/iris.csv").then((data) => {

  const MAX_SEPAL_LENGTH = d3.max(data, (d) => {
    return parseFloat(d.Sepal_Length);
  });


  const MAX_SEPAL_WIDTH = d3.max(data, (d) => {
    return parseFloat(d.Sepal_Width);
  });

  const MAX_PETAL_LENGTH = d3.max(data, (d) => {
    return parseFloat(d.Petal_Length);
  });


  const MAX_PETAL_WIDTH = d3.max(data, (d) => {
    return parseFloat(d.Petal_Width);
  });

  console.log("Sepal: " + MAX_SEPAL_LENGTH)
  // console.log(MAX_SEPAL_WIDTH)
  console.log("Petal: " + MAX_PETAL_LENGTH)
  // console.log(MAX_PETAL_WIDTH)

  const SEPAL_SCALE_X = d3.scaleLinear()
  .domain([0, MAX_SEPAL_LENGTH])
  .range([0, VIS_WIDTH])

  const PETAL_SCALE_Y = d3.scaleLinear()
    .domain([0, MAX_PETAL_LENGTH])
    .range([VIS_HEIGHT, 0])

  // add x axis to the graph
  FRAME1.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(SEPAL_SCALE_X).ticks(8))
    .attr("font-size", "10px");

  // add y axis to the graph
  FRAME1.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + MARGINS.top + ")")
    .call(d3.axisLeft(PETAL_SCALE_Y).ticks(15))
    .attr("font-size", "10px");


})



const FRAME2 = d3.select("#column2")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");


const FRAME3 = d3.select("#column3")
  .append("svg")
  .attr("height", FRAME_HEIGHT)
  .attr("width", FRAME_WIDTH)
  .attr("class", "frame");



