import React, {useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {v4 as uuidv4} from 'uuid';
import firestore from '@react-native-firebase/firestore';
import {observer} from 'mobx-react';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';
import RNCalendarEvents from 'react-native-calendar-events';

// components
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import InputError from '../../components/InputError';
import DateTimePicker from '../../components/DateTimePicker';
import Alert from '../../components/Alert';
import ChipList from '../../components/ChipList';

// store
import {useStore} from '../../stores';

// utils
import {headerOptions} from '../../utils/constants';
import {checkCalendarPermissions} from '../../utils/functions';

const NewMeet = observer(() => {
  const {t} = useTranslation();

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {userStore, contactsStore} = useStore();
  const {user} = userStore;
  const {setSelectedUsers, selectedContacts} = contactsStore;

  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('NewEvent'),
      ...headerOptions,
      headerLeft: () => (
        <TouchableOpacity onPress={onBackPress}>
          <McIcon size={23} name={'arrow-left'} color={'black'} style={{marginRight: 20}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onBackPress = () => {
    navigation.pop();
    setSelectedUsers([]);
  };

  const createMeet = async (data: any) => {
    try {
      setLoading(true);

      const {name, description, dateTime} = data;
      const id = uuidv4();
      const formatedContacts = selectedContacts.map((el: any) => el.uid);
      const members = [...formatedContacts, user.uid];

      const meetData: any = {
        name,
        description,
        dateTime,
        owner: user.displayName,
      };

      const formatSDate = dayjs(dateTime.startDate).toISOString();
      const formatEDate = dayjs(dateTime.endDate).toISOString();

      const res = await RNCalendarEvents.findCalendars();
      const calendars = res.filter(el => el.allowsModifications);

      const targetCalendar = calendars.filter(
        el => el.type === 'LOCAL' || el.type === 'com.xiaomi' || el.type === 'com.google'
      );

      const setting = {
        startDate: formatSDate,
        endDate: formatEDate,
        location: id,
        notes: description,
        description: `${description}`,
      };

      RNCalendarEvents.saveEvent(name, {...setting, calendarId: targetCalendar[0].id});

      await firestore().collection('meetings').doc(id).set(meetData);

      await Promise.all(
        members.map(async member => {
          await firestore()
            .collection('junction_member_meeting')
            .doc(`${member}_${id}`)
            .set({memberId: member, meetId: id});
        })
      );

      setSelectedUsers([]);
      navigation.pop();
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDenied = () => {
    setShow(true);
  };

  const onPermRequest = async (data: any) => {
    await checkCalendarPermissions(
      () => createMeet(data),
      () => handleDenied()
    );
  };

  const handleAlertAnswer = () => {
    Linking.openSettings().then(() => setShow(false));
  };

  const handleAlertClose = () => {
    setShow(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.inputWrap}>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              render={({field}) => (
                <TextInput
                  {...field}
                  onChangeText={field.onChange}
                  placeholder={t('Name')}
                  containerStyle={styles.input}
                  iconName={'rename-box'}
                />
              )}
            />
            <InputError error={errors.email} />
          </View>

          <View style={styles.inputWrap}>
            <Controller
              name="description"
              control={control}
              render={({field}) => (
                <TextInput
                  {...field}
                  onChangeText={field.onChange}
                  placeholder={t('Description')}
                  containerStyle={styles.input}
                  iconName={'rename-box'}
                  multiline
                  numberOfLines={4}
                  iconStyle={{marginTop: 10}}
                  inputWrap={{height: 100, alignItems: 'flex-start'}}
                  textAlignVertical={'top'}
                />
              )}
            />
            <InputError error={errors.email} />
          </View>

          <View style={styles.inputWrap}>
            <Text style={{marginBottom: 5}}>{t('SetDate')}</Text>

            <Controller
              name="dateTime"
              control={control}
              render={({field}) => <DateTimePicker {...field} />}
            />
          </View>

          <View style={{flex: 1}}>
            <Text style={{marginBottom: 5}}>{t('Members')}</Text>
            <ChipList columnWrapperStyle={{marginTop: 0}} listStyle={{marginTop: 0}} />

            <Button
              contentWrap={{height: 35, backgroundColor: 'rgba(47, 128, 237, 0.2)', elevation: 0}}
              containerStyle={{marginBottom: 17}}
              textStyle={{color: 'black'}}
              onPress={() => navigation.navigate('InviteList')}
              text={t('AddMember')}
              iconColor="black"
              iconName={'account-plus-outline'}
            />
          </View>
        </View>
        <Button onPress={handleSubmit(onPermRequest)} text={t('CreateEvent')} loading={loading} />

        <Alert
          visible={show}
          onAnswer={handleAlertAnswer}
          onClose={handleAlertClose}
          cancelable
          description={
            'Please go to the app settings and give the app access to the calendar so that Tevliva can create upcoming event in your linked calendar'
          }
          title={'Calendar permission'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
});

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    inputWrap: {
      marginBottom: 17,
    },
    input: {},
  });

export default NewMeet;
