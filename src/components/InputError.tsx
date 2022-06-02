import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextStyle, StyleProp} from 'react-native';

// styles
// import theme from '../theme';

interface IProp {
  error: any;
  textStyle?: StyleProp<TextStyle>;
}

const ErrorText = ({error, textStyle}: IProp) => {
  const [mess, setMess] = useState('');

  const setMessText = () => {
    switch (error.type) {
      case 'required':
        setMess('This field is required');
        break;
      case 'custom':
        setMess(error.message);
        break;
      case 'validate':
        setMess(error.message);
        break;
      default:
        setMess(error.message);
        break;
    }
  };

  useEffect(() => {
    if (error) {
      setMessText();
    }
  }, [error]);

  return (
    <>
      {error ? (
        <View style={{}}>
          <Text style={[styles.text, textStyle]}>{mess}</Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'red',
    marginTop: 10,
  },
});

export default ErrorText;
