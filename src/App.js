import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router'
import 'antd/dist/antd.css';
import './App.css';


@inject('store') @withRouter @observer
class App extends Component {
  constructor(props){
    super(props)
    this.store = props.store.store
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default App;
