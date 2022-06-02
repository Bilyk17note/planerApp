import React from 'react';
import {View, Text, Image, StyleSheet, TextStyle, StyleProp} from 'react-native';

// utils
import {colours} from '../utils/constants';

interface IProp {
  user: any;
  size: number;
  textStyle?: StyleProp<TextStyle>;
}

const Avatar = ({user, size = 35, textStyle}: IProp) => {
  const name = user.firstName ? `${user.firstName} ${user.lastName}` : user.displayName;

  const nameSplit = name.split(' ');
  const initials = nameSplit[0].charAt(0).toUpperCase() + nameSplit[1].charAt(0).toUpperCase();

  const charIndex = initials.charCodeAt(0) - 65;
  const colourIndex = charIndex % 19;

  const renderContent = () => {
    if (user.photoURL) {
      return (
        <Image
          source={{uri: user.photoURL}}
          style={{width: size, height: size}}
          resizeMode={'contain'}
        />
      );
    }

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: colours[colourIndex], width: size, height: size},
        ]}>
        <Text style={[styles.text, textStyle]}>{initials}</Text>
      </View>
    );
  };

  return <>{renderContent()}</>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginHorizontal: 10,
  },
  text: {
    color: 'white',
  },
});

export default Avatar;
