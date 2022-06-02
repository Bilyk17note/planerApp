import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer} from 'mobx-react';

// components
import CustomTabBar from '../components/TabBar';

// containers
import Contacts from '../screens/tabs/Contacts';
import Profile from '../screens/tabs/Profile';
import Mettings from '../screens/tabs/Meetings';

type TabsStackParamList = {
  Mettings: undefined;
  Contacts: undefined;
  Events: undefined;
  Profile: undefined;
};

// const
const BottomTab = createBottomTabNavigator<TabsStackParamList>();

const TabBar = observer(() => {
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <BottomTab.Navigator
        backBehavior="history"
        initialRouteName="Mettings"
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}>
        <BottomTab.Screen name="Contacts" component={Contacts} />
        <BottomTab.Screen name="Events" component={Mettings} />
        <BottomTab.Screen name="Profile" component={Profile} />
      </BottomTab.Navigator>
    </>
  );
});

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
  },
});

export default TabBar;
