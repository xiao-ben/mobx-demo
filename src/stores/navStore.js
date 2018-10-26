import { observable } from 'mobx';

class NavStore {
    @observable navList = [1, 2, 3];
  }
const navStore = new NavStore();

export {navStore}