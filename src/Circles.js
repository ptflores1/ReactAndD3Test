import React, {Component} from 'react';
import './App.css';
import * as d3 from 'd3';
import _ from 'lodash';


const width = 600;
const height = 500;

let simulation = d3.forceSimulation()
  .force("center", d3.forceCenter(width / 2, height / 2))
  .alphaDecay(0.001)
  .velocityDecay(0.3)
  .force('x', d3.forceX(d => d.focusX))
  .force('y', d3.forceY(d => d.focusY))
  .force("collide", d3.forceCollide(d => d.size))
  .stop();

class Circles extends Component {

  constructor(props) {
    super(props);
    this.forceTick = this.forceTick.bind(this);
    this.points = this.props.points;
    simulation.on('tick', this.forceTick);
  }
  
  componentDidMount() {
    this.container = d3.select(this.refs.container);
    this.processPoints()
    this.renderCircles();
    simulation.nodes(this.points).alpha(0.9).restart();
  }
  
  componentDidUpdate(prevProps, prevState) {
    this.points = this.props.points;
    this.processPoints()
    this.renderCircles();
    simulation.nodes(this.points).alpha(0.9).restart();
  }
  processPoints() {
    this.points = _.map(this.props.points, point => {
      return Object.assign(point, {
        focusX: width / 2,
        focusY: height / 2,
        x: point.x || _.random(0.25 * width, 0.75 * width),
        y: point.y || _.random(0.25 * height, 0.5 * height),
      });
    });
  }
  renderCircles() {
    
    this.circles = this.container.selectAll("circle")
      .data(this.points);
    this.circles.exit().remove();

    let enter = this.circles.enter().append("circle");
    enter.attr("r", d => d.size);
    this.circles = enter.merge(this.circles);
    // console.log(this.circles);
    // console.log(this.points);
    // this.circles = this.circles.enter().append("circle")
    //   .merge(this.circles)
    //   .attr("r", d => d.size);
    // console.log(this.circles);
  }

  forceTick() {
    // console.log(this.circles);
    this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
  }

  render() {
    return (
      <svg width={width} height={height} ref="container">
      </svg>
    );
  }
}

export default Circles;
