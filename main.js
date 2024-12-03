d3.csv("climate_change_impact_on_agriculture_2024.csv").then(function(data) {
    // Filter data for Nigeria and Russia
    const nigeria_russia_data = data.filter(d => d.Country === "Nigeria" || d.Country === "Russia");

    const width = 800, height = 400;

    // Create SVG element
    const svg = d3.select("#scatterPlot")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(nigeria_russia_data, d => +d.CO2_Emissions_MT)])
        .range([50, width - 50]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(nigeria_russia_data, d => +d.Crop_Yield_MT_per_HA)])
        .range([height - 50, 50]);

    const colorScale = d3.scaleOrdinal()
        .domain(["Nigeria", "Russia"])
        .range(["green", "orange"]);

    // Add axes
    svg.append("g")
        .attr("transform", `translate(0,${height - 50})`)
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(d3.axisLeft(yScale));

    // Scatter plot: CO2 Emissions vs Crop Yield
    svg.selectAll("circle")
        .data(nigeria_russia_data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(+d.CO2_Emissions_MT))
        .attr("cy", d => yScale(+d.Crop_Yield_MT_per_HA))
        .attr("r", 8)
        .attr("fill", d => colorScale(d.Country))
        .on("mouseover", (event, d) => {
            d3.select(".tooltip")
                .style("opacity", 1)
                .html(`Country: ${d.Country}<br>CO2 Emissions: ${d.CO2_Emissions_MT}<br>Crop Yield: ${d.Crop_Yield_MT_per_HA}`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`);
        })
        .on("mouseout", () => {
            d3.select(".tooltip")
                .style("opacity", 0);
        });

    // Tooltip (you can style it as needed)
    d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
});
