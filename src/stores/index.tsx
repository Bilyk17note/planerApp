import {createContext, useContext} from 'react';
import {configure, observable} from 'mobx';

// stores
import userStore from './UserStore';
import contactsStore from './ContactsStore';

configure({enforceActions: 'observed'});

class RootStore {
  @observable userStore = userStore;
  @observable contactsStore = contactsStore;
}

const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};

export default new RootStore();
