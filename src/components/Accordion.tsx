import React, {useRef, useState} from 'react';
import {Animated, Easing, Text, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

interface IProp {
  title: any;
  componentContainerStyle?: any;
  titleContainerStyle?: any;
  titleStyle?: any;
  icon?: any;
  onPress?: any;
  arrowContainer?: any;
  iconSize?: number;
  iconStyle?: any;
  additionalText?: string;
  iconType?: any;
  animatedArrow?: boolean;
  disable?: boolean;
}

const AnimatedAccordion: React.FC<IProp> = ({
  title,
  titleStyle,
  arrowContainer,
  icon,
  iconType = 'fa',
  iconStyle,
  additionalText,
  iconSize = 24,
  children,
  animatedArrow = true,
  titleContainerStyle,
  onPress,
}) => {
  const [open, setOpen] = useState(false);
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const animatedController = useRef(new Animated.Value(0)).current;
  const animatedControllerContent = useRef(new Animated.Value(1)).current;

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: arrowAngle,
      },
    ],
  };

  const contentAnimatedStyle = {
    opacity: animatedControllerContent,
  };

  const handleToggle = () => {
    if (open) {
      Animated.parallel([
        Animated.timing(animatedControllerContent, {
          duration: 200,
          toValue: 0,
          useNativeDriver: false,
        }),
        Animated.timing(animatedController, {
          duration: 200,
          toValue: 0,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedController, {
          duration: 200,
          toValue: 1,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          useNativeDriver: false,
        }),
        Animated.timing(animatedControllerContent, {
          duration: 200,
          toValue: 1,
          useNativeDriver: false,
        }),
      ]).start();
    }
    onPress && onPress(open);
    setOpen(!open);
  };

  const renderIcon = (iconName: string, iconSize: number) => {
    switch (iconType) {
      case 'mc':
        return <McIcon name={iconName} size={iconSize} />;
      case 'fa':
        return <Icon name={iconName} size={iconSize} />;
      case 'md':
        return <MIcon name={iconName} size={iconSize} />;
      default:
        return null;
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleToggle}>
        <View style={[styles.titleContainer, titleContainerStyle]}>
          <View style={styles.iconContainer}>
            <>
              {icon && <View style={[styles.icon, iconStyle]}>{renderIcon(icon, iconSize)}</View>}
              <Text style={[styles.text, titleStyle]} ellipsizeMode="tail">
                {title}
              </Text>
            </>
          </View>

          <View style={[styles.arrorWrap, arrowContainer]}>
            {additionalText ? <Text style={styles.additionalText}>{additionalText}</Text> : null}
            <Animated.View style={[animatedArrow ? animatedStyle : {}]}>
              <Icon name="angle-right" size={iconSize} />
            </Animated.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.bodyBackground, {height: bodyHeight}, contentAnimatedStyle]}>
        <View
          style={styles.bodyContainer}
          onLayout={event => {
            setBodySectionHeight(event.nativeEvent.layout.height);
          }}>
          {children}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  bodyBackground: {
    overflow: 'hidden',
  },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 22,
  },
  arrorWrap: {
    flexDirection: 'row',
    paddingRight: 15,
    alignItems: 'center',
  },
  additionalText: {
    color: 'black',
    paddingRight: 10,
  },
  bodyContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  text: {
    color: 'black',
  },
});

export default AnimatedAccordion;
