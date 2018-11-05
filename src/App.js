import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router'
import Nav from './components/Nav/Nav';
import 'antd/dist/antd.css';
import './App.css';


@inject('store') @withRouter @observer
class App extends Component {
  constructor(props){
    super(props)
    this.store = props.store.store
  }

  render() {
    console.log(this.props, 'props123')
    return (
      <div>
        {!this.props.noTopNavBar && <Nav/>}
        {this.props.children}
      </div>
    )
  }
}

export default App;
