// Native builds get the config from google-services.json GoogleService-Info.plist
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDDj16YI9CFW3Hlf4P_PLbLa9b__7sxcS0',
  authDomain: 'smartplan-313d8.firebaseapp.com',
  projectId: 'smartplan-313d8',
  appId: '1:159405658976:android:9433016465195d7e1ac405',
};

const initializeApp = (): void => {
  firebase.initializeApp(firebaseConfig);
};

export default initializeApp;
