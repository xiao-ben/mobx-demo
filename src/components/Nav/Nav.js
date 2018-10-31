import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './TopNavBar.css'

@inject('store') @observer
class Nav extends Component {
    constructor(props){
        super(props)
        this.store = props.store.navStore
    }

    render() {
    console.log(this.props)
        return (
            <div className="topNavBar">{this.store.navList[1]}</div>
        )
    }
}

export default Nav;
