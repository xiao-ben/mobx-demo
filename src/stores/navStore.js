import { observable, action } from 'mobx';
import axios from '../lib/http';

class NavStore {
    @observable name = '';

    @action getName = () => {
      this.name = 'admiiii'
      axios('/smart_site/account/get-login-name').then(
        res => {
          this.name = 'admiiii'
          if(!res.data.data) return
          this.name = res.data.data.user_name
        }
      )
    }
  }
const navStore = new NavStore();

export {navStore}