import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
// import LottieView from 'lottie-react-native';
// import {useTranslation} from 'react-i18next';

// components
import Button from './Button';

// styles
import themes from '../theme';

const Alert = ({
  onClose,
  visible,
  title = '',
  loading,
  animated = false,
  description = '',
  onAnswer,
  cancelable = true,
  aminationPath,
  textButton = '',
  animationStyle = null,
}: any) => {
  // const {t} = useTranslation();

  const [height, setHeight] = useState(0);

  return (
    <View>
      <Modal
        isVisible={visible}
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        animationInTiming={250}
        animationOutTiming={250}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        useNativeDriver={false}
        propagateSwipe
        hideModalContentWhileAnimating>
        <View
          style={[styles.modal, loading && {height}]}
          onLayout={event => setHeight(event.nativeEvent.layout.height)}>
          {/* {animated && !loading ? (
            <LottieView
              source={aminationPath}
              style={[styles.lottie, {...animationStyle}]}
              autoPlay
              loop
            />
          ) : null} */}

          {title.length ? (
            <Text style={styles.title}>{!loading ? title : 'Please wait...'}</Text>
          ) : null}

          {description.length ? <Text style={styles.description}>{description}</Text> : null}

          <View style={styles.btnWrap}>
            {cancelable ? (
              <Button
                outputRange={0.9}
                containerStyle={{flex: 0.9, marginRight: 5}}
                type="cancel"
                text={'Cancel'}
                onPress={onClose}
              />
            ) : null}
            <Button
              outputRange={0.9}
              text={textButton || 'Ok'}
              containerStyle={{flex: 0.9, marginLeft: 5}}
              onPress={onAnswer}
              loading={loading}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

Alert.propTypes = {
  onClose: PropTypes.func,
  onAnswer: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  title: PropTypes.string,
  animated: PropTypes.bool,
  description: PropTypes.string,
  cancelable: PropTypes.bool,
  aminationPath: PropTypes.any,
  animationStyle: PropTypes.any,
  loading: PropTypes.bool,
  textButton: PropTypes.string,
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: themes.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  lottie: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  tablet: {
    width: '70%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    // ...themes.fonts.regular,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    // ...themes.fonts.regular,
  },
  btnWrap: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  loaderWrap: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  loaderContainer: {
    flex: 0,
    flexGrow: 0,
    flexShrink: 0,
  },
  loaderText: {
    flex: 1,
    marginLeft: 20,
    // ...themes.fonts.regular,
  },
});

export default Alert;
