import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

// components
import Avatar from '../../components/Avatar';
import Button from '../../components/Button';
import Accordion from '../../components/Accordion';
import Language from '../../components/Language';

// store
import {useStore} from '../../stores';

const Profile = () => {
  const {t} = useTranslation();

  const {userStore} = useStore();
  const {setUser, user} = userStore;

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleSingOut = () => {
    auth()
      .signOut()
      .then(() => setUser(null));
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrap}>
        <View style={styles.avatarWrap}>
          <Avatar size={70} user={user} />
          <Text style={styles.avatarText}>{user.displayName}</Text>
        </View>

        <View style={styles.styledContainer}>
          <View style={styles.infoWrap}>
            <Text>
              {t('Phone')}: {user.phone}
            </Text>
          </View>

          <View style={styles.infoWrap}>
            <Accordion titleContainerStyle={styles.accTitle} title={t('Language')}>
              <Language />
            </Accordion>
          </View>

          <View style={styles.infoWrap}>
            <Accordion titleContainerStyle={styles.accTitle} title={t('Theme')}>
              {/* <Language /> */}
              <View />
            </Accordion>
          </View>

          <View style={styles.btnWrap}>
            <Button
              contentWrap={{backgroundColor: 'white'}}
              onPress={handleSingOut}
              text={t('SingOut')}
              textStyle={styles.buttonSaveText}
              loading={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: 'white',
      paddingBottom: 20,
    },
    buttonSaveText: {
      color: 'black',
    },
    contentWrap: {
      flex: 1,
    },
    avatarWrap: {
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    avatarText: {
      marginTop: 5,
    },
    infoWrap: {
      backgroundColor: 'white',
      paddingHorizontal: 5,
      paddingVertical: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    styledContainer: {
      backgroundColor: '#00B3FE',
      flex: 1,
      marginVertical: 10,
      paddingVertical: 30,
      paddingHorizontal: 25,
      borderTopLeftRadius: 80,
      borderBottomLeftRadius: 80,
      marginLeft: 20,
    },
    accTitle: {
      paddingVertical: 0,
    },
    btnWrap: {
      flex: 1,
      justifyContent: 'flex-end',
    },
  });

export default Profile;
