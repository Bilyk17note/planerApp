import RNCalendarEvents from 'react-native-calendar-events';

export const checkCalendarPermissions = async (allowFunc: any, deniedFunc: any) => {
  const perm = await RNCalendarEvents.checkPermissions();
  if (perm === 'authorized') {
    return allowFunc();
  }

  const requestPerm = await RNCalendarEvents.requestPermissions();
  if (requestPerm) {
    switch (requestPerm) {
      case 'authorized':
        return allowFunc();
      case 'denied':
        return deniedFunc();
    }
  }
};
