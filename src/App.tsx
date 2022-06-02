import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import {observer} from 'mobx-react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import dayjs from 'dayjs';

//screens
import TabBar from '../src/containers/TabBar';
import Auth from './containers/Auth';
import NewMeet from './screens/additional/NewMeet';
import InviteList from './screens/additional/InviteList';
import Event from './screens/additional/Event';

// styles
import theme from '../src/theme';

// store
import {useStore} from '../src/stores';

import i18n from './assets/translations';

type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  InviteList: undefined;
  NewMeet: undefined;
  Event: undefined;
};

// conts
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = observer(() => {
  const {userStore} = useStore();
  const {user, setUser} = userStore;

  const init = async () => {
    const lang = await AsyncStorage.getItem('lang');
    if (!lang) {
      await AsyncStorage.setItem('lang', 'en');
    } else {
      i18n.changeLanguage(lang);
    }

    const user = auth().currentUser;
    if (user) {
      const {displayName, email, photoURL, uid} = user;
      const userDb = await (await firestore().collection('users').doc(uid).get()).data();

      if (userDb) {
        setUser({displayName, email, photoURL, uid, phone: userDb.phone});
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (dayjs().format('DD/MM/YYYY') === '02/06/2022') {
      const timer = setTimeout(() => {
        RNBootSplash.hide();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={'Auth'}
        screenOptions={{
          animation: 'slide_from_right',
        }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={TabBar} options={{headerShown: false}} />
            <Stack.Screen name="NewMeet" component={NewMeet} />
            <Stack.Screen name="InviteList" component={InviteList} />
            <Stack.Screen name="Event" component={Event} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} options={{headerShown: false}} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default App;
