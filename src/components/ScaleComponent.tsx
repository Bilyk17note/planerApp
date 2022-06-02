import React, {useRef} from 'react';
import {Animated, TouchableWithoutFeedback, StyleSheet} from 'react-native';

interface IProp {
  onPress: () => void;
  outputRange: number;
  styles?: any;
  wrapStyle?: any;
}

const ScaleTouchable: React.FC<IProp> = ({
  onPress,
  children,
  outputRange = 0.5,
  styles,
  wrapStyle,
}) => {
  const animationValue = useRef(new Animated.Value(0)).current;

  const interpolation = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, outputRange],
  });

  const animatedStyle = {
    transform: [
      {
        scale: interpolation,
      },
    ],
  };

  const pressInAnimation = () => {
    Animated.spring(animationValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const pressOutAnimation = () => {
    Animated.spring(animationValue, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={pressInAnimation}
      onPressOut={pressOutAnimation}>
      <Animated.View style={[animatedStyle, wrapStyle]}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export default ScaleTouchable;
