import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import './Environment.css'
import axios from '../../lib/http'
import moment from 'moment'

class Environment extends Component {
    state = {
        status: []
    }

    componentDidMount() {
        this.getEnvironmentDate()
        this.dataInterval = setInterval(this.getEnvironmentDate, 1000 * 60 * 10)
    }

    getEnvironmentDate = () => {
        axios('/smart_site/devices/get-monitor-data').then(res => {
            if (!res || !res.data || !res.data.data) return
            const data = res.data.data
            this.setState({
               status: res.data.data.map(item => ({
                ...item,
                legend: item.legend,
                time: item.time.map(time => moment(time * 1000).format('HH:mm')),
                data: item.data
                }))
            })
        })
    }

    componentWillUnmount() {
        clearInterval(this.dataInterval)
    }

    render() {
        const { status } = this.state
        console.log(status, 'status')
        return <div>
            {status.map(item => (
                <ReactEcharts
                key={item.id}
                option={{
                    title: {
                        text: item.device_id
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                            let result = ''
                            params.map((item, index) => ({
                                ...item,
                                index: index
                            })).sort((a, b) => b.value - a.value).forEach(function (col) {
                                result += col.marker + " " + col.seriesName + " : " + col.value + item.unit[col.index] +"</br>";
                            });
                            return result;
                        }
                        // formatter: `{b} <br/>` + item.unit.map((unit, index) => `{a${index}} : {c${index}} ${unit}<br/>`).join('')
                    },
                    legend: {
                        data: item.legend
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
                        data: item.time
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: item.data.map((data, index) => ({
                        name: item.legend[index],
                        type:'line',
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
            ))}
        </div>
    }
}

export default Environment