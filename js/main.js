    // Hint: This is a good place to declare your global variables

    var female_data, male_data, svg, margin = {top: 80, right: 20, bottom: 40, left: 60},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom,
    country = 'Afghanistan', x, y, xx, yy;

    // This function is called once the HTML page is fully loaded by the browser
    document.addEventListener('DOMContentLoaded', function () {
    // Hint: create or set your svg element inside this function

    svg = d3.select('#myDataVis')
     .append('svg')
       .attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom)
       .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    // This will load your two CSV files and store them into two arrays.
    Promise.all([d3.csv('data/females_data.csv'), d3.csv('data/males_data.csv')])
        .then(function (values) {
            console.log('loaded females_data.csv and males_data.csv');
            female_data = values[0];
            male_data = values[1];

            x = d3.scaleTime()
               .range([0, width])
               .domain([new Date(1990, 0, 1), new Date(2023, 0, 1)])
            xx = svg.append("g")
               .attr("transform", "translate(0," + height + ")")

            y = d3.scaleLinear()
               .range([height, 0]);
            yy = svg.append("g")
               .attr("class", "yaxis")

        // initial positions of lollipop circles on x axis
        svg.selectAll(".linesMale")
           .data(male_data)
           .enter()
           .append("line")
           .attr("class", "linesMale")
           .attr("x1", d => x(new Date(d.Year)) - 5)
           .attr("y1", y(0))
           .attr("x2", d => x(new Date(d.Year)) - 5)
           .attr("y2", y(0))
           .attr("stroke", "#2B8F8B")

        svg.selectAll(".linesFemale")
           .data(male_data)
           .enter()
           .append("line")
           .attr("class", "linesFemale")
           .attr("x1", d => x(new Date(d.Year)) + 5)
           .attr("y1", y(0))
           .attr("x2", d => x(new Date(d.Year)) + 5)
           .attr("y2", y(0))
           .attr("stroke", "#DD18DA")

        svg.selectAll(".circlesMale")
           .data(male_data)
           .enter()
           .append("circle")
           .attr("class", "circlesMale")
           .attr("cx", d => x(new Date(d.Year)) - 5)
           .attr("cy", y(0))
           .attr("r", "4")
           .style("fill", "#2B8F8B")
           .attr("stroke", "#2B8F8B")

        svg.selectAll(".circlesFemale")
           .data(female_data)
           .enter()
           .append("circle")
           .attr("class", "circlesFemale")
           .attr("cx", d => x(new Date(d.Year)) + 5)
           .attr("cy", y(0))
           .attr("r", "4")
           .style("fill", "#DD18DA")
           .attr("stroke", "#DD18DA")

            var countries = document.getElementById('countries');
            countries.addEventListener('change', function handleChange(event) {
            country = event.target.value;
            drawLolliPopChart();
            });

            drawLolliPopChart();
        });
    });

    // Use this function to draw the lollipop chart.
    function drawLolliPopChart() {
    console.log('trace:drawLollipopChart()');

    maleER = male_data.map(x =>
         ({"Year": new Date(x.Year, 0, 1), "ER": parseFloat(x[country])}));
    femaleER = female_data.map(x =>
         ({"Year": new Date(x.Year, 0, 1), "ER": parseFloat(x[country])}));

        xx
        .transition()
        .duration(2000)
        .call(d3.axisBottom(x))

        y
        .domain([0, d3.max((femaleER.concat(maleER)).map(x => x.ER))])

       yy
        .transition()
        .duration(2000)
        .call(d3.axisLeft(y))

    const linesPrevMale = svg.selectAll(".linesMale")
              .data(maleER)

      linesPrevMale
      .join("line")
      .attr("class", "linesMale")
      .transition()
      .duration(2000)
      .attr("x1", function(d) { return x(d.Year) - 5; })
      .attr("y1", y(0))
      .attr("x2", function(d) { return x(d.Year) - 5; })
      .attr("y2", function(d) { return y(d.ER); })
      .attr("stroke", "#2B8F8B")

    const circlesPrevMale = svg.selectAll(".circlesMale")
                 .data(maleER)

      circlesPrevMale
      .join("circle")
      .attr("class", "circlesMale")
      .transition()
      .duration(2000)
      .attr("cx", function(d) { return x(d.Year) - 5; })
      .attr("cy", function(d) { return y(d.ER); })
      .attr("r", "4")
      .style("fill", "#2B8F8B")
      .attr("stroke", "#2B8F8B")

    const linesPrevFemale = svg.selectAll(".linesFemale")
              .data(femaleER)

      linesPrevFemale
      .join("line")
      .attr("class", "linesFemale")
      .transition()
      .duration(2000)
      .attr("x1", function(d) { return x(d.Year) + 5; })
      .attr("y1", y(0))
      .attr("x2", function(d) { return x(d.Year) + 5; })
      .attr("y2", function(d) { return y(d.ER); })
      .attr("stroke", "#DD18DA")

    const circlesPrevfemale = svg.selectAll(".circlesFemale")
                 .data(femaleER)

      circlesPrevfemale
      .join("circle")
      .attr("class", "circlesFemale")
      .transition()
      .duration(2000)
      .attr("cx", function(d) { return x(d.Year) + 5; })
      .attr("cy", function(d) { return y(d.ER); })
      .attr("r", "4")
      .style("fill", "#DD18DA")
      .attr("stroke", "#DD18DA")

    //adding legend
    svg.append("rect").attr("x",width-230).attr("y", -80).attr("width", 15).attr("height", 15).style("fill", "#2B8F8B")
    svg.append("rect").attr("x",width-230).attr("y", -60).attr("width", 15).attr("height", 15).style("fill", "#DD18DA")
    svg.append("text").attr("x", width-210).attr("y", -65).text("Male Employment Rate").style("font-size", "15px")
    svg.append("text").attr("x", width-210).attr("y", -45).text("Female Employment Rate").style("font-size", "15px")

    //adding axes labels
    svg.append('text').attr("x", width/2).attr("y", height + margin.top - 40).text("Year");
    svg.append("text").attr("transform", "rotate(-90)").attr("x", -height/2 - 35).attr("y", -margin.top + 35).text("Employment Rate")
    }

