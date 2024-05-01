import React, { Component } from "react";
import * as d3 from "d3";

class Graph3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    const margin = { top: 10, right: 10, bottom: 30, left: 20 };
    const width = 1300 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const data = this.props.data3;
    const tempData = Array.from(
      d3.rollup(
        data,
        (d) => d.length,
        (d) => d.day
      ),
      ([day, count]) => ({ day, count })
    );

    const svg = d3.select(".child3_svg");

    svg.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const container = svg.select(".g_3")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // X axis
    const xData = tempData.map((item) => item.day);
    const xScale = d3.scaleBand()
      .domain(xData)
      .range([0, width])
      .padding(0.2);

    container.selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    // Y axis
    const yData = tempData.map((item) => item.count);
    const yMax = d3.max(yData);
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height, 0]);

    container.selectAll(".y_axis_g")
      .data([0])
      .join("g")
      .attr("class", "y_axis_g")
      .call(d3.axisLeft(yScale));

    // Circles
    container.selectAll("circle")
      .data(tempData)
      .join("circle")
      .attr("cx", (d) => xScale(d.day) + xScale.bandwidth() / 2)
      .attr("cy", (d) => yScale(d.count))
      .attr("r", 3)
      .style("fill", "#69b3a2");
  }

  render() {
    return (
      <svg className="child3_svg">
        <g className="g_3"></g>
      </svg>
    );
  }
}

export default Graph3;
