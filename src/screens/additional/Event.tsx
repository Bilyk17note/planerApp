import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTheme} from '@react-navigation/native';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import firestore from '@react-native-firebase/firestore';
import {useForm, Controller} from 'react-hook-form';
import RNCalendarEvents from 'react-native-calendar-events';
import {useTranslation} from 'react-i18next';

// utils
import {headerOptions} from '../../utils/constants';

// components
import Button from '../../components/Button';
import Alert from '../../components/Alert';
import TextInput from '../../components/TextInput';
import InputError from '../../components/InputError';

// store
import {useStore} from '../../stores';

const Event = () => {
  const {t} = useTranslation();

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {userStore} = useStore();
  const {user} = userStore;

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const {params} = useRoute<any>();

  const [def, setDef] = useState({name: params.name, description: params.description});

  const navigation = useNavigation<any>();

  const [edit, setEdit] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isDirty},
  } = useForm({criteriaMode: 'all', defaultValues: def});

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: t('Event'),
      ...headerOptions,
      headerStyle: {
        backgroundColor: '#00B3FE',
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={onBackPress}>
          <McIcon size={23} name={'arrow-left'} color={'white'} style={{marginRight: 20}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onBackPress = () => {
    navigation.pop();
  };

  const onEditPress = () => {
    reset({name: def.name, description: def.description});

    setEdit(prev => {
      return !prev;
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onEditPress}>
          <McIcon
            size={23}
            name={edit ? 'close-circle-outline' : 'calendar-edit'}
            color={'white'}
            style={{marginRight: 20}}
          />
        </TouchableOpacity>
      ),
    });
  }, [edit]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const {dateTime} = params;
      const {endDate, startDate} = dateTime;

      const start = dayjs(startDate.toDate()).toISOString();
      const end = dayjs(endDate.toDate()).toISOString();

      const junctio_store = await firestore()
        .collection('junction_member_meeting')
        .where('meetId', '==', params.id)
        .get();

      const batch = firestore().batch();

      junctio_store.forEach(doc => {
        batch.delete(doc.ref);
      });

      await firestore().collection('meetings').doc(params.id).delete();

      await batch.commit();

      const ev = await RNCalendarEvents.fetchAllEvents(start, end);
      if (ev.length) {
        const filteredEv: any = ev.filter(el => el.location === params.id);
        if (filteredEv && filteredEv[0]) {
          await RNCalendarEvents.removeEvent(filteredEv[0].id);
        }
      }
    } catch (err: any) {
      console.log(err);
      setLoading(false);
    } finally {
      navigation.pop();
      setShow(false);
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      setLoading(true);

      const eventsRef = firestore().collection('meetings').doc(params.id);
      await eventsRef.update({...data});

      setDef({...data});
      setEdit(false);
    } catch (e) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={{color: 'white'}}>{t('Title')}</Text>

          <Controller
            name="name"
            control={control}
            rules={{
              required: false,
              minLength: {
                value: 2,
                message: 'Name must be minimum 2 charachers.',
              },
              validate: val => {
                if (val.length === 0) {
                  return 'Name must be minimum 2 charachers.';
                }
              },
            }}
            render={({field}) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                inputWrap={[styles.inputWrap, edit && styles.focused]}
                inputStyle={[styles.input]}
                editable={edit}
                iconRightColor={'white'}
                placeholder={t('Title')}
                iconRight={edit ? 'pencil-outline' : ''}
              />
            )}
          />
          <InputError error={errors.name} textStyle={{marginTop: 0, marginBottom: 5}} />

          <Text style={{color: 'white'}}>{t('Description')}</Text>

          <Controller
            name="description"
            control={control}
            rules={{
              required: false,
              minLength: {
                value: 2,
                message: 'Description must be minimum 2 charachers.',
              },
              validate: val => {
                if (val.length === 0) {
                  return 'Description must be minimum 2 charachers.';
                }
              },
            }}
            render={({field}) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                inputWrap={[styles.inputWrap, edit && styles.focused]}
                inputStyle={[styles.input]}
                editable={edit}
                placeholder={t('Description')}
                iconRightColor={'white'}
                iconRight={edit ? 'pencil-outline' : ''}
              />
            )}
          />
          <InputError error={errors.description} textStyle={{marginTop: 0, marginBottom: 5}} />
        </View>
        <View style={{paddingHorizontal: 20, flex: 1}}>
          <Text style={{marginTop: 10}}>{t('Date')}</Text>
          <Text style={{fontSize: 20, marginBottom: 10}}>
            {dayjs(params.dateTime.startDate.toDate()).format('DD/MM/YYYY')}
          </Text>

          <Text>{t('Time')}</Text>
          <Text style={{fontSize: 20, marginBottom: 10}}>
            {`${dayjs(params.dateTime.startDate.toDate()).format('HH:mm')} - ${dayjs(
              params.dateTime.endDate.toDate()
            ).format('HH:mm')}`}
          </Text>

          <Text>{t('Owner')}</Text>
          <Text style={{fontSize: 20, marginBottom: 10}}>{params.owner}</Text>
        </View>
        {user.displayName === params.owner ? (
          <View style={styles.bottomContainer}>
            {!edit ? (
              <Button
                containerStyle={styles.button}
                contentWrap={{backgroundColor: 'white'}}
                onPress={() => setShow(true)}
                text={t('DelBtn')}
                iconName={'calendar-remove-outline'}
                iconColor={'red'}
                textStyle={styles.buttonDelText}
              />
            ) : (
              <Button
                containerStyle={styles.button}
                onPress={handleSubmit(handleSave)}
                contentWrap={{backgroundColor: 'white'}}
                text={t('Save')}
                iconColor={'black'}
                loading={loading}
                loaderColor={'black'}
                textStyle={styles.buttonSaveText}
                iconName={'content-save-outline'}
              />
            )}
          </View>
        ) : null}

        <Alert
          visible={show}
          onAnswer={handleDelete}
          onClose={() => setShow(false)}
          cancelable
          loading={loading}
          title={'Are you sure?'}
          description={'Deleting will remove this event for you and other members'}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    input: {
      fontSize: 20,
      color: 'white',
      margin: 0,
      padding: 0,
    },
    button: {
      width: '70%',
      alignSelf: 'center',
    },
    buttonDelText: {
      color: 'red',
    },
    buttonSaveText: {
      color: 'black',
    },
    topContainer: {
      backgroundColor: '#00B3FE',
      width: '100%',
      paddingHorizontal: 20,
      borderBottomRightRadius: 80,
      justifyContent: 'center',
      paddingBottom: 10,
    },
    bottomContainer: {
      backgroundColor: '#00B3FE',
      height: 90,
      width: '100%',
      paddingHorizontal: 20,
      borderTopLeftRadius: 80,
      justifyContent: 'center',
      alignContent: 'center',
    },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0,
      borderBottomWidth: 1,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
      elevation: 0,
      borderRadius: 0,
      marginBottom: 5,
      height: 40,
      width: '90%',
    },
    focused: {
      borderBottomWidth: 1,
      borderColor: '#ECEFF6',
    },
  });

export default Event;
