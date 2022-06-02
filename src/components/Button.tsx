import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// components
import ScaleTouchable from './ScaleComponent';

interface IProp {
  onPress: any;
  text: string;
  iconName?: string;
  iconStyle?: any;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  outputRange?: number;
  contentWrap?: StyleProp<ViewStyle>;
  loading?: boolean;
  iconSize?: number;
  type?: string;
  disabled?: boolean;
  iconColor?: string;
  loaderColor?: string;
}

const Button = ({
  onPress,
  text,
  type = 'default',
  loading = false,
  iconName,
  iconStyle,
  iconSize = 20,
  containerStyle,
  textStyle,
  contentWrap,
  disabled,
  loaderColor = 'white',
  iconColor = 'white',
  outputRange = 0.9,
}: IProp) => {
  return (
    <ScaleTouchable
      onPress={() => {
        onPress();
      }}
      outputRange={outputRange}
      wrapStyle={[containerStyle]}>
      <View style={[styles.container, type === 'cancel' && styles.cancelBtn, contentWrap]}>
        <Text style={[styles.text, type === 'cancel' && styles.cancelBtnText, textStyle]}>
          {text}
        </Text>
        {loading ? (
          <View style={styles.iconStyle}>
            <ActivityIndicator size={'small'} color={loaderColor} />
          </View>
        ) : iconName ? (
          <McIcon
            size={20}
            name={iconName}
            color={iconColor}
            style={[styles.iconStyle, iconStyle]}
          />
        ) : null}
      </View>
    </ScaleTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#00B3FE',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  cancelBtn: {
    padding: 9,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    marginHorizontal: 5,
  },
  cancelBtnText: {
    color: 'black',
    // ...theme.fonts.regular,
  },
  text: {
    color: 'white',
  },
  iconStyle: {
    marginLeft: 5,
  },
});

export default Button;
