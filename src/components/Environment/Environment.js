import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import './Environment.css'

class Environment extends Component {
    render() {
        return <div>
            <ReactEcharts
                option={{
                    title: { text: 'ECharts 入门示例' },
                    tooltip: {},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                }}
                notMerge={true}
                lazyUpdate={true}
                theme={"theme_name"}
                onChartReady={this.onChartReadyCallback}
                // onEvents={EventsDict}
                opts={{}} />
        </div>
    }
}

export default Environment