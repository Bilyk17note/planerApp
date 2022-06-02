import React, {useMemo, useRef, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface IProp {
  type: string;
  keyboardVerticalOffset?: number;
  onPressBottomBtn: () => void;
}

const FormWrap: React.FC<IProp> = ({
  onPressBottomBtn,
  type,
  children,
  keyboardVerticalOffset = 36,
}) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const animatedHeigth = useRef(new Animated.Value(130)).current;
  const animatedImgHeigth = useRef(new Animated.Value(60)).current;
  const animatedMargin = useRef(new Animated.Value(60)).current;

  const headerText = type === 'login' ? 'Log In to your Account.' : 'Create your Account.';
  const bottomText = type === 'login' ? "Don't have an Account? " : 'Already a Team Member? ';
  const bottomBtnText = type === 'login' ? 'REGISTER' : 'LOGIN';

  useEffect(() => {
    const showEv = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEv = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEv, keyboardWillShow);
    const hideSubscription = Keyboard.addListener(hideEv, keyboardWillHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardWillShow = (event: any) => {
    Animated.parallel([
      Animated.timing(animatedImgHeigth, {
        duration: 150,
        toValue: 40,
        useNativeDriver: false,
      }),
      Animated.timing(animatedHeigth, {
        duration: 150,
        toValue: 90,
        useNativeDriver: false,
      }),
      Animated.timing(animatedMargin, {
        duration: 150,
        toValue: 15,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const keyboardWillHide = (event: any) => {
    Animated.parallel([
      Animated.timing(animatedImgHeigth, {
        duration: 150,
        toValue: 60,
        useNativeDriver: false,
      }),
      Animated.timing(animatedHeigth, {
        duration: 150,
        toValue: 130,
        useNativeDriver: false,
      }),
      Animated.timing(animatedMargin, {
        duration: 150,
        toValue: 60,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const renderChildWrap = () => {
    switch (type) {
      case 'login':
        return (
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={'height'}
            enabled={type === 'login'}
            keyboardVerticalOffset={keyboardVerticalOffset}>
            {renderContent()}
          </KeyboardAvoidingView>
        );
      case 'singin':
        return (
          <>
            <KeyboardAwareScrollView
              style={styles.container}
              enableOnAndroid
              extraScrollHeight={20}
              keyboardShouldPersistTaps={'handled'}>
              {renderContent()}
            </KeyboardAwareScrollView>
            <View style={[styles.styledView, styles.borderedViewTop]}>
              <Text style={styles.bottomText}>{bottomText}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.bottomBtn}
                onPress={onPressBottomBtn}>
                <Text style={styles.bottomBtnText}>{bottomBtnText}</Text>
              </TouchableOpacity>
            </View>
          </>
        );
    }
  };

  const renderContent = () => {
    return (
      <>
        <Animated.View
          style={[styles.styledView, styles.borderedViewBottom, {height: animatedHeigth}]}>
          <Animated.Image
            source={require('../assets/logo.png')}
            style={{width: animatedImgHeigth, height: animatedImgHeigth}}
          />
          <Text style={styles.headerText}>SmartPlanner</Text>
        </Animated.View>

        <Animated.View style={[styles.formPreview, {marginVertical: animatedMargin}]}>
          <Text style={styles.previewText}>{headerText}</Text>
        </Animated.View>

        {children}

        {type !== 'singin' ? (
          <View style={[styles.styledView, styles.borderedViewTop]}>
            <Text style={styles.bottomText}>{bottomText}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.bottomBtn}
              onPress={onPressBottomBtn}>
              <Text style={styles.bottomBtnText}>{bottomBtnText}</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {renderChildWrap()}
    </TouchableWithoutFeedback>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {},
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
      marginTop: 5,
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
      marginTop: 20,
    },
    formPreview: {
      alignItems: 'center',
    },
    previewText: {
      fontSize: 16,
      color: '#1E73BE',
      fontWeight: 'bold',
    },
  });

export default FormWrap;
