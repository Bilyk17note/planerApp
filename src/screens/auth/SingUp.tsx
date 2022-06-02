import React, {useMemo, useState} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// components
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import InputError from '../../components/InputError';
import FormWrap from '../../components/FormWrap';

// store
import {useStore} from '../../stores';

// utils
import useTogglePasswordVisibility from '../../utils/hooks/useTogglePasswordVisibility';

// const
const photoURL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png';

const SingUp = () => {
  const {userStore} = useStore();
  const {setUser} = userStore;

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm({criteriaMode: 'all'});

  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useTogglePasswordVisibility();

  const navigation = useNavigation();

  const handleLogInPress = () => {
    navigation.goBack();
  };

  const handleSingUpPress = async (data: any) => {
    try {
      Keyboard.dismiss();
      setLoading(true);
      const res = await auth().createUserWithEmailAndPassword(data.email, data.password);
      if (res && res.user) {
        res.user
          .updateProfile({
            displayName: `${data.firstName} ${data.lastName}`,
            photoURL,
          })
          .then(() => {
            const {email, uid} = res.user;
            const db = firestore();
            db.collection('users').doc(uid).set({
              email: email,
              lastName: data.firstName,
              firstName: data.lastName,
              phone: data.phone,
            });
            setLoading(false);

            setUser({
              displayName: `${data.firstName} ${data.lastName}`,
              email,
              photoURL,
              uid,
              phone: data.phone,
            });
          });
      }
    } catch (err: any) {
      setServerErr(err.message);
      setLoading(false);
    }
  };

  const setServerErr = (errMessage: string) => {
    if (errMessage.includes('auth/email-already-in-use')) {
      setError('email', {
        type: 'custom',
        message: errMessage,
      });
      return;
    }
  };

  return (
    <FormWrap onPressBottomBtn={handleLogInPress} type="singin">
      <View style={styles.formWrap}>
        <View style={styles.inputWrap}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
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

        <View style={styles.inputWrap}>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: 'Password must be minimum 8 charachers.',
              },
            }}
            render={({field}) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                secureTextEntry={passwordVisibility}
                onPressRightIcon={handlePasswordVisibility}
                iconRight={rightIcon}
                placeholder="Password"
                containerStyle={styles.input}
                iconName={'lock-outline'}
              />
            )}
          />
          <InputError error={errors.password} />
        </View>

        <View style={styles.inputWrap}>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 2,
                message: 'First name must be minimum 2 charachers.',
              },
              maxLength: {
                value: 14,
                message: 'First name must be maximum 14 charachers.',
              },
            }}
            render={({field}) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                placeholder="First name"
                containerStyle={styles.input}
                iconName={'account-outline'}
              />
            )}
          />
          <InputError error={errors.firstName} />
        </View>

        <View style={styles.inputWrap}>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 2,
                message: 'Last name must be minimum 2 charachers.',
              },
              maxLength: {
                value: 14,
                message: 'Last name must be maximum 14 charachers.',
              },
            }}
            render={({field}) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                placeholder="Last name"
                containerStyle={styles.input}
                iconName={'account-outline'}
              />
            )}
          />
          <InputError error={errors.lastName} />
        </View>

        <View style={styles.inputWrap}>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: true,
            }}
            render={({field}) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                placeholder="Phone number"
                containerStyle={styles.input}
                iconName={'phone-outline'}
              />
            )}
          />
          <InputError error={errors.phone} />
        </View>

        <Button
          onPress={handleSubmit(handleSingUpPress)}
          text={'SingUp'}
          iconName={'login-variant'}
          loading={loading}
        />
      </View>
    </FormWrap>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      height: 60,
      width: 60,
    },
    headerText: {
      marginTop: 5,
      color: theme.colors.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
    inputWrap: {
      marginBottom: 17,
    },
    input: {},
    forgotText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#00B3FE',
      alignSelf: 'flex-end',
      marginBottom: 17,
    },
    bottomText: {
      color: theme.colors.white,
      fontSize: 14,
    },
    bottomBtn: {
      backgroundColor: 'white',
      padding: 2,
      borderRadius: 5,
    },
    bottomBtnText: {
      color: '#00B3FE',
      fontSize: 13,
    },
    styledView: {
      backgroundColor: '#00B3FE',

      alignItems: 'center',
      justifyContent: 'center',
      height: 130,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 2,
    },
    formWrap: {
      paddingHorizontal: 20,
      flex: 1,
    },
    borderedViewBottom: {
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
    },
    borderedViewTop: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      height: 40,
      flexDirection: 'row',
    },
    formPreview: {
      alignItems: 'center',
      marginVertical: 60,
    },
    previewText: {
      fontSize: 16,
      color: '#1E73BE',
      fontWeight: 'bold',
    },
  });

export default SingUp;
