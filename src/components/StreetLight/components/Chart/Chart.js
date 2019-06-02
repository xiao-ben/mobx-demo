import React from 'react'
import ReactEcharts from 'echarts-for-react';
import './Chart.js'

const realTimeDataMap = [
  { name: 'PM2.5', value: 'P25', unit: '' },
  { name: 'PM10', value: 'P10', unit: '' },
  { name: '噪音', value: 'ns', unit: 'dB' },
  { name: '温度', value: 'tep', unit: '℃' },
  { name: '湿度', value: 'hum', unit: '%' },
  { name: '光照', value: 'ill', unit: 'Lx' },
  { name: '气压', value: 'pre', unit: 'hpa' },
  // {name: '经度', value: 'Log'},
  // {name: '纬度', value: 'Lat'},
  // {name: '海拔', value: 'Alt'},
  // {name: '路灯状态', value: 'LIT'},
  // {name: '喷雾机状态', value: 'SPY'},
]

class Chart extends React.Component {
  componentDidMount() { }
  render() {
    const { environment: data, type, name} = this.props
    const xName = realTimeDataMap.find(item => item.value === type) || {}
    const environment = data.data ? {
      legend: data.legend,
      time: data.data.filter(item => item).map(item => item.Ti || item.Time ? item.Ti || item.Time : 'noTime'),
      data: data.data.filter(item => item).map(item => item[type])
    } : {
      legend: [],
      time: [],
      data: []
    }
    return (
      <div>
        <ReactEcharts
          option={{
            tooltip: {
              trigger: 'axis',
              // formatter: function (params) {
              //   let result = ''
              //   params.map((item, index) => ({
              //     ...item,
              //     index: index
              //   })).sort((a, b) => b.value - a.value).forEach(function (col) {
              //     result += col.marker + " " + col.seriesName + " : " + col.value + environment.unit[col.index] + "</br>";
              //   });
              //   return result;
              // }
            },
            legend: {
              data: [...environment.legend || []]
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              name: '时间',
              boundaryGap: false,
              data: [...environment.time || []]
            },
            yAxis: {
              name: xName.unit ? xName.name + `(${xName.unit})` : xName.name,
              type: 'value'
            },
            series: [{
              name: xName.name || '',
              type: 'line',
              stack: '总量',
              data: [...environment.data || []]
            }]
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
