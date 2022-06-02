import React, {useEffect, useState, useMemo} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import {FAB} from 'react-native-paper';
import {observer} from 'mobx-react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

// components
import TextInput from './TextInput';
import Avatar from './Avatar';
import Loader from './Loader';
import EmptyComponent from './EmptyComponent';
import ChipList from './ChipList';

// store
import {useStore} from '../stores';

interface IProp {
  type?: 'contacts' | 'meet';
}

const ContactsList = observer(({type = 'contacts'}: IProp) => {
  const {t} = useTranslation();

  const {userStore, contactsStore} = useStore();
  const {user} = userStore;
  const {
    setContacts,
    formatedContacts,
    selectedContacts,
    addSelectedUser,
    removeSelectedUser,
    setFilter,
    filterText,
  } = contactsStore;

  const navigation = useNavigation<any>();

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [loading, setLoading] = useState(() => {
    return Boolean(!formatedContacts.length);
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      if (!formatedContacts.length) {
        await getContacts();
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const getContacts = async () => {
    try {
      const res = await firestore().collection('users').get();
      const users: any[] = [];

      if (res) {
        res.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            uid: documentSnapshot.id,
          });
        });

        const sortedArr = users
          .filter((el: any) => el.uid !== user.uid)
          .sort((a: any, b: any) => b.firstName.toLowerCase() - a.firstName.toLowerCase());

        setContacts(sortedArr);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const onRefresh = async () => {
    try {
      setRefresh(true);
      await getContacts();
    } catch (err) {
      console.log(err);
      setRefresh(false);
    } finally {
      setRefresh(false);
    }
  };

  const onItemPress = (item: any) => {
    switch (type) {
      case 'meet':
        handleSelect(item);
        return;
      default:
        return;
    }
  };

  const handleSelect = (user: any) => {
    const index = selectedContacts.findIndex((el: any) => el.uid === user.uid);
    if (index >= 0) {
      removeSelectedUser(user);
    } else {
      addSelectedUser(user);
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.itemWrap}
        onPress={() => onItemPress(item)}
        activeOpacity={0.9}>
        <Avatar user={item} size={40} />
        <View style={styles.itemContentWrap}>
          <Text>
            {item.firstName} {item.lastName}
          </Text>

          <View style={styles.item}>
            <McIcon size={16} name={'at'} color={'#1E73BE'} style={styles.itemIcon} />
            <Text>{item.email}</Text>
          </View>

          <View style={styles.item}>
            <McIcon size={16} name={'phone-outline'} color={'#1E73BE'} style={styles.itemIcon} />
            <Text>{item.phone}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: any) => item.uid;

  if (loading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        iconName="account-search-outline"
        value={filterText}
        placeholder={`${t('Search')}...`}
        onChangeText={setFilter}
      />

      <ChipList />

      <FlatList
        data={formatedContacts}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContainer,
          formatedContacts.length === 0 && styles.emptyListContainer,
        ]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={refresh}
        ListEmptyComponent={() => <EmptyComponent listName={t('CnList')} />}
      />
      {type !== 'contacts' ? (
        <FAB style={styles.fab} icon={'check'} onPress={() => navigation.pop()} />
      ) : null}
    </View>
  );
});

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    fab: {
      position: 'absolute',
      backgroundColor: '#00B3FE',
      bottom: 20,
      right: 20,
    },

    itemWrap: {
      flex: 1,
      marginBottom: 5,
      backgroundColor: 'rgba(47, 128, 237, 0.2)',
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    listContainer: {
      marginTop: 10,
    },
    emptyListContainer: {
      alignItems: 'center',
      flex: 1,
    },
    itemContentWrap: {
      flex: 1,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
    },
    itemIcon: {
      marginRight: 5,
    },

    indicatorWrap: {
      flex: 1,
    },
  });

export default ContactsList;
