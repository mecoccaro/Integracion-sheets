import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { waterfallpoint } from './WaterfallPoint';
import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Axis from "d3-axis";

@Component({
  selector: 'app-cascade',
  templateUrl: './cascade.component.html',
  styleUrls: ['./cascade.component.css']
})
export class CascadeComponent {

  //constructor() { }

  width: number;
  height: number;
  screenWidth: number = 610;
  screenHeight: number = 380;
  margin = { top: 20, right: 20, bottom: 40, left: 50 };
  x: any;
  y: any;
  svg: any;
  host: any;
  g: any;
  dataArr: any[];
  barmin: number = 100;
  barmax: number = 280;
  container: string = "";
  @Input() data = [];
  constructor(element: ElementRef) {
    this.host = d3.select(element.nativeElement);
    this.container = "waterfall";
    this.screenWidth = document.querySelector("#" + this.container).clientWidth;

  }
  ngOnChanges() {
    this.renderSvg();
    this.setReSizeEvent();
  }
  renderSvg() {
    this.initSvg();
    if(this.data){
      this.handleResponse(this.data);
    }
  }

  initSvg() {
    if (this.svg) {
      this.svg.selectAll("*").remove();
    } else {
      this.svg = this.host.append('svg');
    }
    this.svg
      .attr("width", this.screenWidth - 70)
      .attr("height", this.screenHeight);

    this.width = +this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height = +this.svg.attr("height") - this.margin.top - this.margin.bottom;
    this.g = this.svg.append("g")
      .attr("transform", "translate(" + (this.margin.left + 15) + "," + (this.margin.top * .9) + ")");
  }
  initAxis() {
    let self = this;
    this.x = d3Scale.scaleBand()
      .rangeRound([0, this.width])
      .padding(0.5)
      .domain(self.dataArr.map((d) => d.name));
    this.y = d3Scale.scaleLinear()
      .rangeRound([this.height, 0])
      .domain([this.barmin, this.barmax]);

  }

  drawAxis() {
    let self = this;
    this.g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(5," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));

    this.g.append("g")
      .attr("class", "axis axis--x--text")
      .attr("transform", "translate(-55,221)")
      .append("text")
      .style("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .text("GP$ (mil)");

    this.g.append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y)
        .tickFormat(function (d) {
          return self.dollerFormateWithDecimal(d);
        })
      )
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end");

    this.g.selectAll(".axis.axis--y")
      .selectAll(".tick line")
      .call(d3Axis.axisLeft(this.y))
      .attr("x2", this.width);

    this.g
      .selectAll(".axis--x .tick text")
      // .attr("transform","rotate(-45)")
      .call(self.wrap);
  }

  drawBars() {
    let self = this;
    let bar = this.g.selectAll(".bar")
      .data(self.dataArr)
      .enter()
      .append("g")
      .attr("class", function (d) { return "bar " + d.CssClass() });

    //Create rectangle on the bar
    bar.append("rect")
      .attr("x", (d) => this.x(d.name))
      .attr("y", function (d) {
        let yval = d.Max();
        return self.y(yval);
      })
      .attr("height", function (d) {
        let dmin = d.start();
        if (dmin <= 0) dmin = self.barmin;
        let yht = Math.abs(self.y(dmin) - self.y(d.value));
        if (yht < 2) yht = 2;
        return yht;
      })
      .attr("width", this.x.bandwidth() + 20)
      .on("click", function (d) {
        d3.select(this).attr("class", "border");
      });

    bar.append("text")
      .text(function (d) {
        return self.dollerFormateWithDecimal(d.diff());
      })
      .attr("text-anchor", "middle")
      .attr("x", (d) => this.x(d["name"]) + 22)
      .attr("y", function (d) {
        return self.y(d.Max()) - 5;
      })
      .attr("width", this.x.bandwidth());

    bar
      .append("line")
      .attr("class", "connector")
      .attr("x1", (d) => this.x(d.prev_name))
      .attr("y1", function (d) {
        return self.y(d.prevMax());
      })
      .attr("x2", (d) => this.x(d.name))
      .attr("y2", function (d) {
        return self.y(d.prevMax());
      });
  }

  handleResponse(response) {
    let lastindx = response.length - 1;
    this.dataArr = [];
    for (let i = 0; i <= lastindx; i++) {
      let value = response[i].value;
      if (!value) {
        value = response[i - 1].value;
      }
      let pobj = null;
      if (i > 0) pobj = this.dataArr[i - 1];
      let dataobj = new waterfallpoint(value, response[i].name, pobj);
      dataobj.isTotal = ((i == lastindx) || i == 0);
      this.dataArr.push(dataobj);
    }

    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }



  dollerFormateWithDecimal(n) {
    return "$" + n.toFixed(1);
  }

  dollarFormatter(n) {
    return "$" + Math.round(n);
  }
  wrap(text) {
    text.each(function () {
      let text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));

        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);

      }
    });
  }
  setReSizeEvent() {
    let resizeTimer;
    let interval = Math.floor(1000 / 60 * 10);
    let self = this;
    window.addEventListener('resize', function (event) {
      if (resizeTimer !== false) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function () {
        self.screenWidth = document.querySelector("#" + self.container).clientWidth;
        self.renderSvg();
      }, interval);
    });
  }

}
