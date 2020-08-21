import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';


export default {
  extends: Line,
  mixins: [reactiveProp],
  props: { 
    chartData: {type: Object},
    options: {type: Object}
  },
  components: {ChartJsPluginDataLabels},
  
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}