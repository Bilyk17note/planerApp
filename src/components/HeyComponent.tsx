import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import dayjs from 'dayjs';
import {useNavigation} from '@react-navigation/native';

// components
import Avatar from './Avatar';

// store
import {useStore} from '../stores/index';

const HeyComponent = () => {
  const {userStore} = useStore();
  const {user} = userStore;

  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      activeOpacity={0.5}
      style={{
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text style={{color: 'black', fontSize: 20}}>Hey {user.displayName}</Text>
        <Text style={{fontSize: 12, marginTop: 3}}>{dayjs().format('DD/MM/YYYY')}</Text>
      </View>
      <Avatar user={user} />
    </TouchableOpacity>
  );
};

export default HeyComponent;
