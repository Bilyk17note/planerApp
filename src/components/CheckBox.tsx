import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StyleProp, TextStyle} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProp {
  value: boolean;
  onPress: () => void;
  containerStyle: StyleProp<TextStyle>;
  label: string;
  disabled: boolean;
}

const CheckBox = ({value, onChange, containerStyle, label, disabled = false}: any) => {
  const handleChangel = () => {
    onChange && onChange(!value);
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle, disabled && styles.disabled]}
      onPress={!disabled ? handleChangel : () => {}}
      activeOpacity={0.6}>
      <View style={[styles.checkWrap, !value && styles.disableStan, disabled && styles.disabled]}>
        <MCIcon
          size={18}
          color={value ? 'white' : 'rgba(0,0,0,0.4)'}
          name={value ? 'check' : 'minus'}
        />
      </View>
      <Text style={[styles.text, disabled && styles.disabled]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1,
  },
  disableStan: {
    // backgroundColor: themes.colors.lightGrey,
  },
  checkWrap: {
    width: 23,
    height: 23,
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 8,
    marginRight: 10,
    opacity: 1,
  },
  text: {
    fontSize: 14,
    opacity: 1,
    color: 'black',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CheckBox;
