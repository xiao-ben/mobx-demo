
import registerServiceWorker from './registerServiceWorker';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { observable, action, computed, useStrict } from 'mobx';
import { observer } from 'mobx-react';
useStrict(true);
class Store {
  @observable todos = [{
    count: 1
  }, {
    count: 1
  }];
  @action increase(index) {
    this.todos[index].count = this.todos[index].count + 1
  }
  @action decrease(index) {
    this.todos[index].count = this.todos[index].count - 1
  }
}
@observer
class Counter extends Component {
  render() {
    console.log('render');
    return (
      <div>
        <ul>
          {this.props.store.todos.map(
            (todo, index) => <li key={index}>
              {todo.count}
              <input type="button" onClick={() => {
                this.props.store.increase(index);
              }} value="+" />
               <input type="button" onClick={() => {
                this.props.store.decrease(index);
              }} value="-" />
            </li>
          )}
        </ul>
      </div>
    )
  }
}
const store = new Store();
render(
  <Counter store={store} />,
  document.getElementById('root')
);
registerServiceWorker();
