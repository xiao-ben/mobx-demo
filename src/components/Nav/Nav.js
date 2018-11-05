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
        return (
            <div className="navWrap">
                <div className="topNavBar">{this.store.navList[1]}</div>
            </div>
        )
    }
}

export default Nav;
