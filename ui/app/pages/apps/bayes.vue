<template>
  <div
    id="canvas"
    class="flex items-center justify-center container m-auto -mt-12 mb-4 w-full h-full rounded bg-gray-700"
  ></div>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {},
  mounted() {
    this.generateArc();
  },
  methods: {
    generateArc() {
      const width = 500;
      const height = 500;
      var svg = d3
        .select("#canvas")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      //create some circles at random points on the screen

      //create 50 circles of radius 20
      //specify centre points randomly through the map function
      var radius = 20;
      var circle_data = d3.range(50).map(function () {
        return {
          x: Math.round(Math.random() * (width - radius * 2) + radius),
          y: Math.round(Math.random() * (height - radius * 2) + radius),
        };
      });

      //add svg circles
      var circles = svg
        .append("g")
        .attr("class", "circles")
        .selectAll("circle")
        .data(circle_data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        })
        .attr("r", radius)
        .attr("fill", "green");

      //create drag handler with d3.drag()
      //only interested in "drag" event listener, not "start" or "end"
      var drag_handler = d3.drag().on("drag", function (e, d) {
        console.log("drag");
        console.log(d);
        console.log(e);
        d3.select(this)
          .attr("cx", (d.x = e.x))
          .attr("cy", (d.y = e.y));
      });

      //apply the drag_handler to our circles
      drag_handler(circles);
    },
  },
};
</script>