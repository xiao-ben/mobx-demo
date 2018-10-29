import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Nav from './components/Nav/Nav'
import './App.css';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

@inject('store') @observer
class Counter extends Component {
  constructor(props){
    super(props)
    this.store = props.store.store
  }

  render() {
    return (
      <div>
        <Nav/>
        <DatePicker />
        <ul>
          {this.store.todos.map(
            (todo, index) => <li key={index}>
              {todo.count}
              <input type="button" onClick={() => {
                this.store.increase(index);
              }} value="+" />
              <input type="button" onClick={() => {
                this.store.decrease(index);
              }} value="---" />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Counter;
