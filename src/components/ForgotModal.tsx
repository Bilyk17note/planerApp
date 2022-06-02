import React, {useState} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useForm, Controller} from 'react-hook-form';
import auth from '@react-native-firebase/auth';

// components
import InputError from './InputError';
import TextInput from './TextInput';
import Button from './Button';

interface IProp {
  onBackdropPress: () => void;
  visible: boolean;
}

const ForgotModal: React.FC<IProp> = ({onBackdropPress, visible}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const [loading, setLoading] = useState(false);

  const handleSubmitPress = async (data: any) => {
    try {
      Keyboard.dismiss();
      setLoading(true);

      await auth().sendPasswordResetEmail(data.email);
      setLoading(false);
      onBackdropPress();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onBackdropPress();
  };

  return (
    <Modal
      onBackdropPress={handleClose}
      isVisible={visible}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      useNativeDriver={false}
      onSwipeComplete={handleClose}
      hideModalContentWhileAnimating>
      <SafeAreaView style={styles.contentWrap}>
        <View style={styles.modal}>
          <MCIcon size={26} style={styles.closeIcon} name="close-circle" onPress={handleClose} />

          <Text style={styles.text}>Enter your email:</Text>
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
                  placeholder="Email"
                  containerStyle={styles.input}
                  iconName={'email-outline'}
                />
              )}
            />
            <InputError error={errors.email} />
          </View>

          <Button
            onPress={handleSubmit(handleSubmitPress)}
            text={'Send'}
            iconName={'email-fast-outline'}
            loading={loading}
            iconStyle={{marginLeft: 10}}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 23,
    borderRadius: 10,
  },
  inputWrap: {
    marginBottom: 17,
  },
  input: {},
  contentWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  closeIcon: {
    position: 'absolute',
    right: 4,
    top: 4,
    color: 'rgb(0,90,152)',
    zIndex: 100,
  },
  text: {
    marginBottom: 10,
  },
});

export default ForgotModal;
