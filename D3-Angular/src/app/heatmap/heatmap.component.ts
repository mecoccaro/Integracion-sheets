import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

  private margin = {top: 80, right: 25, bottom: 30, left: 40};
  private width = 450 - this.margin.left - this.margin.right;
  private height = 450 - this.margin.top - this.margin.bottom;
  private svg;


  constructor() { }

  private createSvg(): void {
    this.svg = d3.select("#heat")
    .append("svg")
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }
  private drawPlot(data):void {
    const x = d3.scaleLinear()
      .range([0, this.width])
      .domain([2005, 2013])
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .select(".domain").remove()

    const y = d3.scaleLinear()
      .range([this.height, 0])
      .domain([1, 12])
    this.svg.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove()

    const myColor = d3.scaleSequential()
      .interpolator(d3.interpolateInferno)
      .domain([1,100])

    const tooltip = d3.select("#my_dataviz")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    const mouseover = function(d) {
      tooltip
        .style("opacity", 1)
      d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }

    const mouseleave = function(d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    const squares = this.svg.append("g")
    squares.selectAll()
      .data(data, function(d) {return d.date+':'+d.Month;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.Year) })
        .attr("y", function(d) { return y(d.Month) })
        .attr("rx", 4)
        .attr("ry", 4)
        .style("fill", function(d) { return myColor(d.Power)} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
  }


  ngOnInit(): void {
    this.createSvg();
    d3.csv("../../assets/pge-electric-data.csv").then(data => this.drawPlot(data));
  }

}
