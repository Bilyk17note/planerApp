import React, {useMemo, useState} from 'react';
import {View, Text, StyleSheet, Keyboard, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

// components
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import InputError from '../../components/InputError';
import FormWrap from '../../components/FormWrap';
import ForgotModal from '../../components/ForgotModal';

// store
import {useStore} from '../../stores';

// utils
import useTogglePasswordVisibility from '../../utils/hooks/useTogglePasswordVisibility';

const LogIn = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<any>();

  const {userStore} = useStore();
  const {setUser} = userStore;

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useTogglePasswordVisibility();

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: {errors},
  } = useForm({criteriaMode: 'all'});

  const handleSingInPress = () => {
    navigation.navigate('SingUp');
    reset();
  };

  const handleLoginPress = async (data: any) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      const res = await auth().signInWithEmailAndPassword(data.email, data.password);
      if (res && res.user) {
        const {displayName, email, photoURL, uid} = res.user;
        const userDb = await (await firestore().collection('users').doc(uid).get()).data();

        if (userDb) {
          setUser({displayName, email, photoURL, uid, phone: userDb.phone});
        }
      }
    } catch (err: any) {
      setError('password', {
        type: 'custom',
        message: err.message,
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrap onPressBottomBtn={handleSingInPress} type="login">
      <View style={styles.formWrap}>
        <View style={styles.inputWrap}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
            }}
            render={({field}) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                placeholder="Email"
                containerStyle={styles.input}
                iconName={'email-outline'}
              />
            )}
          />
          <InputError error={errors.email} />
        </View>

        <Controller
          name="password"
          control={control}
          rules={{
            required: true,
          }}
          render={({field}) => (
            <TextInput
              {...field}
              onChangeText={field.onChange}
              secureTextEntry={passwordVisibility}
              placeholder="Password"
              containerStyle={styles.input}
              onPressRightIcon={handlePasswordVisibility}
              iconRight={rightIcon}
              iconName={'lock-outline'}
            />
          )}
        />
        <InputError error={errors.password} />

        <TouchableOpacity
          style={styles.forgotWrap}
          activeOpacity={0.6}
          onPress={() => setShow(true)}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Button
          onPress={handleSubmit(handleLoginPress)}
          text={'Login'}
          iconName={'login-variant'}
          loading={loading}
        />

        <ForgotModal visible={show} onBackdropPress={() => setShow(false)} />
      </View>
    </FormWrap>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    inputWrap: {
      marginBottom: 17,
    },
    input: {},
    forgotText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#00B3FE',
    },
    formWrap: {
      paddingHorizontal: 20,
      flex: 1,
    },
    forgotWrap: {
      marginTop: 5,
      marginBottom: 17,
      alignSelf: 'flex-end',
    },
  });

export default LogIn;
