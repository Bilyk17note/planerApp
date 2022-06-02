import React from 'react';
import {FlatList, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {observer} from 'mobx-react';
import {FAB, Chip} from 'react-native-paper';

// store
import {useStore} from '../stores';

// components
import Avatar from './Avatar';

interface IProp {
  columnWrapperStyle?: StyleProp<ViewStyle>;
  listStyle?: StyleProp<ViewStyle>;
}

const ChipList = observer(({columnWrapperStyle, listStyle}: IProp) => {
  const {contactsStore} = useStore();
  const {selectedContacts, removeSelectedUser, addSelectedUser} = contactsStore;

  const handleSelect = (user: any) => {
    const index = selectedContacts.findIndex((el: any) => el.uid === user.uid);
    if (index >= 0) {
      removeSelectedUser(user);
    } else {
      addSelectedUser(user);
    }
  };

  const renderChipIcon = ({item}: any) => {
    const {firstName} = item;

    return (
      <Chip
        style={styles.chip}
        ellipsizeMode="tail"
        avatar={<Avatar user={item} size={23} textStyle={styles.chipText} />}
        onClose={() => handleSelect(item)}>
        {firstName}
      </Chip>
    );
  };

  const keyExtractorChip = (index: number) => String(index);

  return (
    <>
      {selectedContacts.length ? (
        <FlatList
          data={selectedContacts.slice()}
          columnWrapperStyle={[styles.listContent, columnWrapperStyle]}
          keyExtractor={keyExtractorChip}
          renderItem={renderChipIcon}
          numColumns={3}
          style={[styles.list, listStyle]}
        />
      ) : null}
    </>
  );
});

const styles = StyleSheet.create({
  listContent: {
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
  },
  list: {
    marginTop: 15,
    maxHeight: 150,
    minHeight: 50,
    flexGrow: 0,
  },
  chipText: {
    fontSize: 10,
  },
  chip: {
    marginBottom: 5,
    marginRight: 5,
  },
});

export default ChipList;
