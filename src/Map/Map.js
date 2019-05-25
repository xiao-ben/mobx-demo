import React, { Component } from 'react';
import BMap from 'BMap';
import './Map.css';

class Map extends Component {
  map = null

  componentDidMount() {
    this.map = new BMap.Map("mapContainer"); // 创建Map实例
    
    this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    this.map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    this.map.addControl(new BMap.NavigationControl());
    this.map.addControl(new BMap.ScaleControl());
    this.map.addControl(new BMap.OverviewMapControl());

    this.map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    var point = new BMap.Point(116.404,  39.915);
    this.map.centerAndZoom(point, 15);

    this.renderMap()
  }

  addMarker = (point, label) => {
    var marker = new BMap.Marker(point)
    this.map.addOverlay(marker)
    marker.setLabel(label)
  }

  renderMap  = () => {
    let {lng, lat, mapType, lights} = this.props
    lng = lng ? Number(lng.substring(0, lng.length-2)) : 116.404
    lat = lat ? Number(lat.substring(0, lat.length-2)) : 39.915

    const allOverlay = this.map.getOverlays()
    
    this.map.clearOverlays(allOverlay)
    var point = new BMap.Point(lng || 116.404,  lat || 39.915);

    if (mapType === 'all') {
      for (var i = 0; i < lights.length; i ++) {
        let {lng, lat, deviceName} = lights[i]
        lng = lng ? Number(lng.substring(0, lng.length-2)) : 116.404
        lat = lat ? Number(lat.substring(0, lat.length-2)) : 39.915
        const point = new BMap.Point(lng + (lng === 116.404 ? Math.random() * 0.01 : 0), lat + (lat === 39.915 ? Math.random() * 0.01 : 0))
        const label = new BMap.Label(deviceName,{offset:new BMap.Size(20,-10)})
        this.addMarker(point, label)
      }
    } else {
      this.addMarker(point)
    }
   
    this.map.centerAndZoom(point, 15)
  }

  componentDidUpdate() {
    this.renderMap()
  }

  render() {
    return (
      <div className="mapContainer" id="mapContainer"></div>
    );
  }
}

export default Map; 