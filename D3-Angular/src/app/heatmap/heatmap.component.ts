import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  constructor() { }

  private margin = {top: 80, right: 160, bottom: 70, left: 60};
  private width = 960 - this.margin.left - this.margin.right;
  private height = 500 - this.margin.top - this.margin.bottom;


  private x = d3.scaleLinear().range([0, this.width]).domain([1, 12]);
  private y = d3.scaleLinear().domain([2005, 2013]).range([this.height, 0]);
  // @ts-ignore
  private z = d3.scaleLinear().range(['white', 'red']);

  private xyMargin = 5;
  private xStep = this.x(2) - this.x(1);
  private yStep = this.y(2005) - this.y(2006);

  private drawPlot(data): any {
    const heatData = {};
    const selectOptions = [];
    data.forEach(function(d){
      const newdict = {"Month": +d["Month"], "Year": +d["Year"], "Power":+d["Power"]};
      if (!(d["Zip Code"] in heatData)){
        heatData[d["Zip Code"]] = [];
        selectOptions.push(d["Zip Code"]);
      }
      heatData[d["Zip Code"]].push(newdict);
    });
    selectOptions.sort();


    d3.select("body").append("br")
    const svg = d3.select("body").append("svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    const curData = heatData["90077"];
    // @ts-ignore
    this.z.domain(d3.extent(curData, d => d.Power));

    svg.selectAll(".tile").data(curData).enter().append("rect")
      .attr("class", "tile")
      .attr("x", d => this.x(d["Month"]))
      .attr("y", d => this.y(d["Year"]))
      .attr("width", this.xStep-this.xyMargin).attr("height", this.yStep-this.xyMargin)
      .attr("fill", d => this.z(d["Power"]));

    const legend = svg.selectAll(".legend")
      .data(this.z.ticks(10).slice(1).reverse())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i){
        return "translate(" + (840)+","+(20+i*20)+")";
      });
    legend.append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", this.z);
    legend.append("text")
      .attr("x", 26)
      .attr("y", 10)
      .attr("dy",".35em")
      .text(String);
    svg.append("text")
      .attr("class", "label")
      .attr("x", this.width + 95)
      .attr("y", this.margin.top - 75)
      .attr("dy", ".35em")
      .style("font-weight", "bold")
      .style("font-size", "16px")
      .text("kWh");
    svg.append("text")
      .attr("transform", "translate("+(this.width/2)+", "+(this.margin.top-30)+")")
      .attr("x", -40)
      .attr("y", -100)
      .style("font-weight", "bold")
      .style("font-size", "22px")
      .text("Water Usage Heapmap");


    const xAxis = d3.axisBottom(this.x)
      .tickFormat(function(d){
        if (d==1) return "Jan";
        if (d==2) return "Feb";
        if (d==3) return "Mar";
        if (d==4) return "Apr";
        if (d==5) return "May";
        if (d==6) return "Jun";
        if (d==7) return "Jul";
        if (d==8) return "Aug";
        if (d==9) return "Sep";
        if (d==10) return "Oct";
        if (d==11) return "Nov";
        if (d==12) return "Dec";
        return "Month"
      });

    const yAxis = d3.axisLeft(this.y)
      .tickFormat(function(d){return d.toString();});

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate("+(this.xStep/2)+"," + (this.height+this.yStep) + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", this.width+this.xStep-5)
      .attr("y", 5)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .attr("text-anchor", "end")
      .text("Month");

    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+(-this.xyMargin) +","+(this.yStep/2)+")")
      .call(yAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", -20)
      .attr("y", -15)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .text("Year");


  }



  ngOnInit(): void {
    d3.csv("../../assets/pge-electric-data.csv").then(data => this.drawPlot(data));
  }

}
