import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import ContactsList from '../../components/ContactsList';

// utils
import {headerOptions} from '../../utils/constants';

// store
import {useStore} from '../../stores';

const InviteList = () => {
  const {contactsStore} = useStore();
  const {setSelectedUsers} = contactsStore;

  const navigation = useNavigation<any>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add members',
      ...headerOptions,
      headerLeft: () => (
        <TouchableOpacity onPress={onBackPress}>
          <McIcon size={23} name={'arrow-left'} color={'black'} style={{marginRight: 20}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onBackPress = () => {
    navigation.pop();
    setSelectedUsers([]);
  };

  return <ContactsList type="meet" />;
};

export default InviteList;
