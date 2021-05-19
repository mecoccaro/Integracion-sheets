import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-cascade',
  templateUrl: './cascade.component.html',
  styleUrls: ['./cascade.component.css']
})
export class CascadeComponent implements OnInit {

  constructor() { }

  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    this.svg.append("g")
    .call(d3.axisLeft(y));

    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.Framework))
    .attr("y", d => y(d.Stars))
    .attr("width", x.bandwidth())
    .attr("height", (d) => this.height - y(d.Stars))
    .attr("fill", "#d04a35");
  }

  ngOnInit(): void {
    this.createSvg();
    d3.csv("/assets/data.csv").then(data => this.drawBars(data));
  }

}
