import { observable, action } from 'mobx';


class appStore {

    @observable todos = [{
      count: 1
    }];

    @action increase(index) {
      setTimeout(() => this.fn(index) , 3000)
    }
    @action decrease(index) {
      this.todos[index].count = this.todos[index].count - 1
    }

    @action.bound fn = index => {this.todos[index].count = this.todos[index].count + 1} 
  }
const store = new appStore();

export {store}