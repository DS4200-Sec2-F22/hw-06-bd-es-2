const FRAME_HEIGHT = 450;
const FRAME_WIDTH = 450;
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


  const MAX_PETAL_LENGTH = d3.max(data, (d) => {
    return parseFloat(d.Petal_Length);
  });

  const MAX_SEPAL_WIDTH = d3.max(data, (d) => {
    return parseFloat(d.Sepal_Width);
  });


  const MAX_PETAL_WIDTH = d3.max(data, (d) => {
    return parseFloat(d.Petal_Width);
  });


  const SEPAL_LENGTH_SCALE = d3.scaleLinear()
    .domain([0, MAX_SEPAL_LENGTH])
    .range([0, VIS_WIDTH])

  const PETAL_LENGTH_SCALE = d3.scaleLinear()
    .domain([0, MAX_PETAL_LENGTH])
    .range([VIS_HEIGHT, 0])

  const SEPAL_WIDTH_SCALE = d3.scaleLinear()
    .domain([0, MAX_SEPAL_WIDTH])
    .range([0, VIS_WIDTH])

  const PETAL_WIDTH_SCALE = d3.scaleLinear()
    .domain([0, MAX_PETAL_WIDTH])
    .range([VIS_HEIGHT, 0])

  // add x axis to the first graph
  FRAME1.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(SEPAL_LENGTH_SCALE).ticks(8))
    .attr("font-size", "10px");

  // add y axis to the  first graph
  FRAME1.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + MARGINS.top + ")")
    .call(d3.axisLeft(PETAL_LENGTH_SCALE).ticks(15))
    .attr("font-size", "10px");


  FRAME1.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => { return SEPAL_LENGTH_SCALE(d.Sepal_Length) + PADDING; })
    .attr("cy", (d) => { return PETAL_LENGTH_SCALE(d.Petal_Length) + PADDING; })
    .attr("r", 2)
    .attr("class", "point")
    .style("fill", function (d) {
      if (d.Species == "virginica") {
        return "LightSkyBlue";
      } else if (d.Species == "versicolor") {
        return "LightSalmon";
      } else {
        return "LightGreen";
      }
    })


  const FRAME2 = d3.select("#column2")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

  // add x axis to the second graph
  FRAME2.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(SEPAL_WIDTH_SCALE).ticks(7))
    .attr("font-size", "10px");

  // add y axis to the second graph
  FRAME2.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + MARGINS.top + ")")
    .call(d3.axisLeft(PETAL_WIDTH_SCALE).ticks(8))
    .attr("font-size", "10px");

  FRAME2.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => { return SEPAL_WIDTH_SCALE(d.Sepal_Width) + PADDING; })
    .attr("cy", (d) => { return PETAL_WIDTH_SCALE(d.Petal_Width) + PADDING; })
    .attr("r", 2)
    .attr("class", "point")
    .style("fill", function (d) {
      if (d.Species == "virginica") {
        return "LightSkyBlue";
      } else if (d.Species == "versicolor") {
        return "LightSalmon";
      } else {
        return "LightGreen";
      }
    })

  const FRAME3 = d3.select("#column3")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

  const FRAME3_X_AXIS = ["Setosa", "Versicolor", "Virginica"]

  const X_AXIS = d3.scaleBand()
    .range([0, VIS_WIDTH])
    .domain(FRAME3_X_AXIS.map(function (d) { return d }))
    .padding(0.5);


  FRAME3.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(X_AXIS))

  const Y_AXIS = d3.scaleLinear()
    .domain([0, 50])
    .range([VIS_HEIGHT, 0])

  // add y axis to the second graph
  FRAME3.append("g")
    .attr("transform", "translate(" + PADDING + ","
      + MARGINS.top + ")")
    .call(d3.axisLeft(Y_AXIS).ticks(12))
    .attr("font-size", "8px");



  // Bars

  const array = [100,200,300]

  FRAME3.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", array.map(function (d) { return d }))
    .attr("width", 25)
    .attr("height", VIS_HEIGHT)
    .attr("fill", "black")

})




