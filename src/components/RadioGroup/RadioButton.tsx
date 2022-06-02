import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProp {
  title: string;
  selected: any;
  value: string;
  onChange: (val: any) => void;
  iconName: string;
  iconStyle: any;
  disabled: boolean;
  selectIconStyle: any;
  labelWrapStyle: any;
  labelStyle: any;
}

const RadioButton = ({
  title,
  value,
  selected,
  onChange,
  iconName = '',
  iconStyle,
  disabled,
  selectIconStyle,
  labelWrapStyle,
  labelStyle,
}: IProp) => {
  const handleCheck = () => {
    onChange(value);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.container}
      onPress={!disabled ? handleCheck : () => {}}>
      <View style={[styles.textWrap, labelWrapStyle]}>
        {iconName ? <Icon name={iconName} style={iconStyle} size={23} /> : null}
        <Text style={[styles.text, labelStyle, value === selected && styles.boldText]}>
          {title}
        </Text>
      </View>
      {value === selected && <Icon style={selectIconStyle} name="check" size={15} />}
    </TouchableOpacity>
  );
};

RadioButton.propTypes = {
  title: PropTypes.string,
  selected: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func,
  iconName: PropTypes.string,
  iconStyle: PropTypes.object,
  disabled: PropTypes.bool,
  selectIconStyle: PropTypes.any,
  labelWrapStyle: PropTypes.any,
  labelStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 11,
  },
  boldText: {},
});

export default RadioButton;
