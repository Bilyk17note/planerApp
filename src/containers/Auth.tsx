import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// components
import SingUp from '../screens/auth/SingUp';
import LogIn from '../screens/auth/LogIn';

type AuthStackParamList = {
  SingUp: undefined;
  LogIn: undefined;
};

// const
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const Auth = () => {
  return (
    <>
      <StatusBar backgroundColor={'#00B3FE'} />
      <AuthStack.Navigator
        initialRouteName="LogIn"
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        <AuthStack.Screen name="LogIn" component={LogIn} options={{headerShown: false}} />
        <AuthStack.Screen name="SingUp" component={SingUp} options={{headerShown: false}} />
      </AuthStack.Navigator>
    </>
  );
};

export default Auth;
