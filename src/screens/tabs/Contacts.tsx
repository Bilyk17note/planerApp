import React from 'react';
import {observer} from 'mobx-react';

// components
import ContactsList from '../../components/ContactsList';

const Contacts = observer(() => {
  return <ContactsList />;
});

export default Contacts;
