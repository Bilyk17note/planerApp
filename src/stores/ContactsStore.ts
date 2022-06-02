import {observable, action, computed, reaction, makeAutoObservable, toJS, runInAction} from 'mobx';

class ContactsStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable contacts: any = [];

  @observable formatedContacts: any = [];

  @observable selectedContacts: any = [];

  @observable filterText = '';

  @action setContacts = (contacts: any) => {
    this.contacts = contacts;

    this.setFormatedCn(contacts);
  };

  @action unSetContacts = async (contacts: any) => {
    this.contacts = contacts;
  };

  @action setFormatedCn = (contacts: any) => {
    this.formatedContacts = contacts;
  };

  @action addSelectedUser = (user: any) => {
    const users = [...this.selectedContacts];
    this.selectedContacts = [...users, user];
  };

  @action removeSelectedUser = (user: any) => {
    const users = [...this.selectedContacts];
    this.selectedContacts = users.filter((el: any) => el.uid !== user.uid);
  };

  @action setSelectedUsers = (list: any[]) => {
    this.selectedContacts = list;
  };

  @action setFilter = (text: string) => {
    this.filterText = text;

    const filteredList = this.contacts.filter(
      (el: any) =>
        el.firstName.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
        el.lastName.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
        el.phone.toLowerCase().indexOf(text.toLowerCase()) >= 0
    );

    this.setFormatedCn(filteredList);
  };
}

export default new ContactsStore();
