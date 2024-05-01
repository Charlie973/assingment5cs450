import React from 'react';
import * as d3 from 'd3';

class Graph1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data1,
      selectedTarget: props.selectedTarget
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data1 !== this.props.data1 || prevProps.selectedTarget !== this.props.selectedTarget) {
      this.setState({
        data: this.props.data1,
        selectedTarget: this.props.selectedTarget
      });
    }
  }

  render() {
    const { data, selectedTarget } = this.state;

    // Group data by day and count occurrences
    const groupedData = d3.rollup(data, v => v.length, d => d.day);

    // Convert grouped data to array of objects
    const dataArray = Array.from(groupedData, ([day, count]) => ({ day, count }));

    // Sort data by day
    dataArray.sort((a, b) => d3.ascending(a.day, b.day));

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(dataArray.map(d => d.day))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(dataArray, d => d.count)])
      .nice()
      .range([height, 0]);

    return (
      <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {dataArray.map(d => (
            <rect
              key={d.day}
              x={x(d.day)}
              y={y(d.count)}
              width={x.bandwidth()}
              height={height - y(d.count)}
              fill="steelblue"
            />
          ))}
          <g transform={`translate(0,${height})`} ref={node => d3.select(node).call(d3.axisBottom(x))} />
          <g ref={node => d3.select(node).call(d3.axisLeft(y))} />
        </g>
      </svg>
    );
  }
}

export default Graph1;
