import React, {useMemo} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {observer} from 'mobx-react';
import {useTranslation} from 'react-i18next';

// components
import ScaleTouchable from './ScaleComponent';

// const
const TABS_HEIGHT = 55;
const {width} = Dimensions.get('window');

const CustomTabBar = observer(({state, navigation}: any) => {
  const {t} = useTranslation();

  const {routes} = state;

  const tabWidth = useMemo(() => width / state.routes.length, [state.routes.length]);

  const getIcon = (name: any, isFocused: any) => {
    switch (name) {
      case 'Contacts': {
        return <MaterialIcon name={'contacts-outline'} color={'white'} size={19} />;
      }
      case 'Profile': {
        return <MaterialIcon name="account-tie-outline" color={'white'} size={19} />;
      }
      case 'Calendar': {
        return <MaterialIcon name={'calendar-check-outline'} color={'white'} size={19} />;
      }
      case 'Events': {
        return <MaterialIcon name={'account-multiple-outline'} color={'white'} size={19} />;
      }
      default:
        break;
    }

    return null;
  };

  const getText = (name: any, isFocused: any) => {
    return isFocused ? (
      <View style={styles.dot} />
    ) : (
      <Text style={styles.textContainer}>{t(name)}</Text>
    );
  };

  const renderContent = () => {
    return (
      <View style={styles.container}>
        {routes.map((tab: any, index: any) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: tab.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(tab.name);
            }
          };

          return (
            <ScaleTouchable key={String(index)} onPress={onPress} outputRange={0.7}>
              <View style={[styles.tabContent, {width: tabWidth}]}>
                <View style={[isFocused && styles.focused, styles.iconWrap]}>
                  {getIcon(tab.name, isFocused)}
                  {getText(tab.name, isFocused)}
                </View>
              </View>
            </ScaleTouchable>
          );
        })}
      </View>
    );
  };

  const renderLayout = () => {
    return (
      <SafeAreaView edges={['bottom']}>
        <View>{renderContent()}</View>
      </SafeAreaView>
    );
  };

  return <>{renderLayout()}</>;
});

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#00B3FE',
    height: TABS_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'visible',
  },
  focused: {
    backgroundColor: 'rgba(0,58, 93, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  bangleBtn: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
    right: 0,
    top: 2,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 100,
    margin: 5,
  },
  textContainer: {
    color: 'white',
    fontSize: 12,
  },
  tabContent: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});

export default CustomTabBar;
