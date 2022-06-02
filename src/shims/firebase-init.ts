// Native builds get the config from google-services.json GoogleService-Info.plist
import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCEbGZgcic-Q2cGdK_58h-q-iEcwAVgBbI',
  authDomain: 'smartplanner-1874f.firebaseapp.com',
  projectId: 'smartplanner-1874f',
  appId: '1:53286443650:android:8d280c76370513ef60729b',
};

const initializeApp = (): void => {
  firebase.initializeApp(firebaseConfig);
};

export default initializeApp;
