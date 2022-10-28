// JS Code for DS4200 hw-06
// Brady Duncan and Evan Suslovich
// Last Modifid: 10/28/2002

// constants
const FRAME_HEIGHT = 450;
const FRAME_WIDTH = 450;
const MARGINS = { left: 50, right: 50, top: 50, bottom: 50 };
const SCALE = 50;
const PADDING = 50;
const r = 3.5;
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// set up frame 1
const FRAME1 = d3.select("#column1")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");

// access the data from the csv file
d3.csv("data/iris.csv").then((data) => {
  
  // find max lengths and widths
  const MAX_SEPAL_LENGTH = d3.max(data, (d) => {
    return parseFloat(d.Sepal_Length);
  })
  
  const MAX_PETAL_LENGTH = d3.max(data, (d) => {
    return parseFloat(d.Petal_Length);
  })
  
  const MAX_SEPAL_WIDTH = d3.max(data, (d) => {
    return parseFloat(d.Sepal_Width);
  })
  
  const MAX_PETAL_WIDTH = d3.max(data, (d) => {
    return parseFloat(d.Petal_Width);
  })
  
  // make scales using the max lengths and widths
  const SEPAL_LENGTH_SCALE = d3.scaleLinear()
  .domain([0, MAX_SEPAL_LENGTH])
  .range([0, VIS_WIDTH]);
  
  const PETAL_LENGTH_SCALE = d3.scaleLinear()
  .domain([0, MAX_PETAL_LENGTH])
  .range([VIS_HEIGHT, 0]);
  
  const SEPAL_WIDTH_SCALE = d3.scaleLinear()
  .domain([0, MAX_SEPAL_WIDTH])
  .range([0, VIS_WIDTH]);
  
  const PETAL_WIDTH_SCALE = d3.scaleLinear()
  .domain([0, MAX_PETAL_WIDTH])
  .range([VIS_HEIGHT, 0]);
  
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
  
  // plot the points on the first frame
  let frame1Points = FRAME1.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => { return SEPAL_LENGTH_SCALE(d.Sepal_Length) + PADDING; })
  .attr("cy", (d) => { return PETAL_LENGTH_SCALE(d.Petal_Length) + PADDING; })
  .attr("r", r)
  .attr("class", "point")
  .attr("id", (d) => { return d.id; })
  .style("fill", function (d) {
    if (d.Species == "virginica") {
      return "LightSkyBlue";
    } else if (d.Species == "versicolor") {
      return "LightSalmon";
    } else {
      return "LightGreen";
    }
  })
  
  // create second frame
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
  
  // plot the points on the second scatter plot
  let points = FRAME2.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => { return SEPAL_WIDTH_SCALE(d.Sepal_Width) + PADDING; })
  .attr("cy", (d) => { return PETAL_WIDTH_SCALE(d.Petal_Width) + PADDING; })
  .attr("r", r)
  .attr("class", "point")
  .attr("id", (d) => { return d.id; })
  .style("fill", function (d) {
    if (d.Species == "virginica") {
      return "LightSkyBlue";
    } else if (d.Species == "versicolor") {
      return "LightSalmon";
    } else {
      return "LightGreen";
    }
  })
  
  // brush function
  FRAME2
  .call(d3.brush()
  .extent([[PADDING, PADDING],
    [FRAME_WIDTH, FRAME_HEIGHT - PADDING]])
    .on("start brush", updateChart));
    
    // updates brushed points
    function updateChart(event) {
      extent = event.selection
      points.classed("selected", function (d) { return isBrushed(extent, SEPAL_LENGTH_SCALE(d.Sepal_Length), PETAL_LENGTH_SCALE(d.Petal_Length)); })
      
      let selectedSpecies = [];
      
      // reset selected points 
      if (extent == null) {
        points.classed('selected', false);
        bar.classed('selected', false);
        frame1Points.classed("selected", false);
      }
      // points are brushed - add selected points to the selectedSpecies list
      else {
        isSelected = isBrushed(extent,
          function (d) {
            SEPAL_WIDTH_SCALE(d.Sepal_Width),
            PETAL_WIDTH_SCALE(d.Petal_Width)
          });
          if (isSelected) {
            selectedSpecies.add(d.Species);
          }
          return isSelected
        }
        
        //adds selected class to bar and first frame
        bar.classed("selected", (d) => { return selectedSpecies.has(d.Species); })
        frame1Points.classed("selected", (d) => {
          return selectedSpecies.has(function (d) {
            return d;
          });
        })
      }
      
      // confirms whether a point is brushed or not
      function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;  // This return TRUE or FALSE depending on if the points is in the selected area
      }
      
      // set up frame 3
      const FRAME3 = d3.select("#column3")
      .append("svg")
      .attr("height", FRAME_HEIGHT)
      .attr("width", FRAME_WIDTH)
      .attr("class", "frame");
      
      // axis labels
      const FRAME3_X_AXIS = ["Setosa", "Versicolor", "Virginica"]
      
      // set up scale and x axis for graph 3
      const X_AXIS = d3.scaleBand()
      .range([0, VIS_WIDTH])
      .domain(FRAME3_X_AXIS.map(function (d) { return d }))
      .padding(0.5);
      
      FRAME3.append("g")
      .attr("transform", "translate(" + PADDING + ","
      + (VIS_HEIGHT + MARGINS.top) + ")")
      .call(d3.axisBottom(X_AXIS));
      
      // set up scale and y axis for graph 3
      const Y_AXIS = d3.scaleLinear()
      .domain([0, 50])
      .range([VIS_HEIGHT, 0]);
      
      FRAME3.append("g")
      .attr("transform", "translate(" + PADDING + ","
      + MARGINS.top + ")")
      .call(d3.axisLeft(Y_AXIS).ticks(12))
      .attr("font-size", "8px");
      
      // object for the data to be used in the bar
      
      const barData = [{ Species: "virginica", Location: 87.5 },
      { Species: "versicolor", Location: 187.5 },
      { Species: "setosa", Location: 287.5 }];
      
      // plot the bar data 
      let bar = FRAME3.selectAll("bar")
      .data(barData)
      .enter()
      .append("rect")
      .attr("x", function (d) { return d.Location; })
      .attr("y", 50)
      .attr("height", VIS_HEIGHT)
      .attr("width", 75)
      .attr("class", function (d) { return d.Species; });
      
    })
    
    
    