import React, { Component } from 'react'
import BMap from 'BMap'
import {message} from 'antd'
import './Map.css'

class Map extends Component {
  map = null
  center = false

  componentDidMount() {
    this.map = new BMap.Map("mapContainer") // 创建Map实例
    
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11) // 初始化地图,设置中心点坐标和地图级别
    this.map.addControl(new BMap.MapTypeControl()) //添加地图类型控件
    this.map.addControl(new BMap.NavigationControl())
    this.map.addControl(new BMap.ScaleControl())
    this.map.addControl(new BMap.OverviewMapControl())

    this.map.setCurrentCity("北京") // 设置地图显示的城市 此项是必须设置的
    this.map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放

    var point = new BMap.Point(116.404,  39.915)
    this.map.centerAndZoom(point, 15)
    this.map.enableScrollWheelZoom(true)
    this.renderMap()
  }

  // 添加地图标注 即路灯红点
  addMarker = ({points}, label) => {
    var marker = new BMap.Marker(points[0])
    this.map.addOverlay(marker)
    marker.setLabel(label)
  }

  renderMap = (props = this.props) => {
    const { index, mapType, lights } = props
    let {Log: lng, Lat: lat, deviceName } = lights[index] || {}
    // 格式化坐标
    lng = lng ? Number(lng.substring(0, lng.length-2)) : 0
    lat = lat ? Number(lat.substring(0, lat.length-2)) : 0

    const allOverlay = this.map.getOverlays()
    const convertor = new BMap.Convertor()
    this.map.clearOverlays(allOverlay)
    var point = new BMap.Point(lng,  lat)

    if (mapType === 'all') {
      for (var i = 0 ; i < lights.length ; i ++) {
        let {Log: lng, Lat: lat, deviceName} = lights[i]
        lng = lng ? Number(lng.substring(0, lng.length-2)) : 0
        lat = lat ? Number(lat.substring(0, lat.length-2)) : 0

        const point = new BMap.Point(lng, lat)
        const label = new BMap.Label(deviceName,{offset:new BMap.Size(20,-10)})
        // 转化为百度坐标系坐标
        convertor.translate([point], 1, 5, data => this.addMarker(data, label))
        
        if (i === 0) {
          // 把路灯移动到中心
          this.map.centerAndZoom(point, 13)
        }
        if (lng === 0 && lat === 0 ) {
          // 提示坐标错误
          message.error('存在错误坐标')
        }
      }
    } else {
      const label = new BMap.Label(`${deviceName}`, {offset:new BMap.Size(20,-10)})
      convertor.translate([point], 1, 5, data => this.addMarker(data, label))
      this.map.centerAndZoom(point, 13)
    }
  }

  componentWillReceiveProps(nextProps) {
    // 当传入的路灯不一样时，才重新渲染地图
    if (nextProps.mapType !== this.props.mapType || nextProps.index !== this.props.index) {
      this.renderMap(nextProps)
    }
  }

  render() {
    return (
      <div className="mapContainer" id="mapContainer"></div>
    )
  }
}

export default Map 