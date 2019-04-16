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
  }

  componentDidUpdate() {
    let {lng, lat} = this.props
    lng = Number(lng.substring(0, lng.length-2))
    lat = Number(lat.substring(0, lat.length-2))

    const allOverlay = this.map.getOverlays()
    
    this.map.clearOverlays(allOverlay)
  
    var point = new BMap.Point(lng || 116.404,  lat || 39.915);
    this.map.centerAndZoom(point, 15);
    var marker = new BMap.Marker(point);
    this.map.addOverlay(marker);

  }

  render() {
    return (
      <div className="mapContainer" id="mapContainer"></div>
    );
  }
}

export default Map; 