<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: () => null,
    },
  },
  data: () => {
    return {
      defaultOptions: {
        layout: { padding: 1 },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              min: 0,
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.options = this.options || this.defaultOptions;
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
