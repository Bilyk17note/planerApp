import React, {useMemo, forwardRef} from 'react';
import {
  TextInput as RnTextInpit,
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  StyleProp,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputWrap?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<any>;
  iconName?: string;
  iconRight?: string;
  iconLeftColor?: string;
  iconRightColor?: string;
  onPressRightIcon?: () => void;
}

const TextInput = forwardRef<any, IProps>(
  (
    {
      placeholder,
      containerStyle,
      inputWrap,
      iconName,
      value,
      onChangeText,
      secureTextEntry = false,
      multiline = false,
      numberOfLines = 1,
      iconStyle,
      textAlignVertical,
      editable = true,
      iconLeftColor = '#1E73BE',
      iconRightColor = '#1E73BE',
      iconRight,
      inputStyle,
      onPressRightIcon,
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);

    const handleRightIconPress = () => {
      onPressRightIcon && onPressRightIcon();
    };

    const getRightIcon = (): string => {
      if (iconRight) {
        return iconRight;
      }
      return '';
    };

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.inputWrap, inputWrap, !editable && styles.editable]}>
          {iconName ? (
            <McIcon
              size={20}
              name={iconName}
              color={iconLeftColor}
              style={[styles.iconStyle, iconStyle]}
            />
          ) : null}
          <RnTextInpit
            editable={editable}
            value={value}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            style={[styles.input, inputStyle]}
            multiline={multiline}
            placeholder={placeholder}
            textAlignVertical={textAlignVertical}
            numberOfLines={numberOfLines}
          />

          {(secureTextEntry && value?.length) || iconRight ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleRightIconPress}
              style={styles.iconRightWrap}>
              <McIcon name={getRightIcon()} size={20} color={iconRightColor} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
);

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    input: {
      flex: 1,
    },
    inputWrap: {
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#ECEFF6',
      borderWidth: 1,
      backgroundColor: 'white',
      borderRadius: 10,
      height: 50,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 2,
    },
    iconStyle: {
      marginRight: 5,
    },
    iconRightWrap: {},
    text: {
      color: theme.colors.white,
      fontSize: 14,
      marginBottom: 5,
    },
    editable: {
      // opacity: 0.6,
    },
  });

export default TextInput;
