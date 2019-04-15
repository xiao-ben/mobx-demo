import React, { Component } from 'react';
import BMap from 'BMap';
import './Map.css';

class Map extends Component {

  componentDidMount() {
    let {lng, lat} = this.props
    lng = Number(lng.substring(0, lng.length-2))
    lat = Number(lat.substring(0, lat.length-2))

    var map = new BMap.Map("mapContainer"); // 创建Map实例
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
    map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());

    map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

    var point = new BMap.Point(lng || 116.404,  lat || 39.915);
    map.centerAndZoom(point, 15);
    // 编写自定义函数,创建标注
    function addMarker(point) {
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
    }

    addMarker(point);
    

    //创建小狐狸
    // var pt = new BMap.Point(116.417, 39.909);
    // var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
    // var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
    // map.addOverlay(marker2); 
  }

  render() {
    return (
      <div className="mapContainer" id="mapContainer"></div>
    );
  }
}

export default Map; 