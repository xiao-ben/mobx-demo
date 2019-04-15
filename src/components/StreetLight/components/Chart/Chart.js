import React from 'react'
import ReactEcharts from 'echarts-for-react';
import './Chart.js'

class Chart extends React.Component {
  componentDidMount() { }
  render() {
    const { environment } = this.props
    return (
      <div>
        <ReactEcharts
          option={{
            title: {
              text: environment.device_id
            },
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                let result = ''
                params.map((item, index) => ({
                  ...item,
                  index: index
                })).sort((a, b) => b.value - a.value).forEach(function (col) {
                  result += col.marker + " " + col.seriesName + " : " + col.value + environment.unit[col.index] + "</br>";
                });
                return result;
              }
            },
            legend: {
              data: environment.legend
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: environment.time
            },
            yAxis: {
              type: 'value'
            },
            series: (environment.data || []).map((data, index) => ({
              name: environment.legend[index],
              type: 'line',
              stack: '总量',
              data: data
            }))
          }}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
          onChartReady={this.onChartReadyCallback}
          // onEvents={EventsDict}
          opts={{}} />
      </div>
    )
  }
}

export default Chart
