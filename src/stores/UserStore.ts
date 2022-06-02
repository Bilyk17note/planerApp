import {observable, action, computed, reaction, makeAutoObservable, toJS, runInAction} from 'mobx';

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable user: any = null;

  @action setUser = async (userInfo: any) => {
    this.user = userInfo;
  };

  @action unSetUser = async (userInfo: any) => {
    this.user = userInfo;
  };
}

export default new UserStore();
