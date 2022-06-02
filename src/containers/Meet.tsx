import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import NewMeet from '../screens/additional/NewMeet';
import InviteList from '../screens/additional/InviteList';

type MeetStackParamList = {
  NewMeet: undefined;
  InviteList: undefined;
};

// const
const MeetStack = createNativeStackNavigator<MeetStackParamList>();

const Auth = () => {
  return (
    <>
      <MeetStack.Navigator
        initialRouteName="NewMeet"
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
        }}>
        <MeetStack.Screen name="NewMeet" component={NewMeet} />
        <MeetStack.Screen name="InviteList" component={InviteList} />
      </MeetStack.Navigator>
    </>
  );
};

export default Auth;
