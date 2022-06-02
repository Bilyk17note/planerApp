import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';

// styles
import themes from '../theme';

// const
const {width} = Dimensions.get('window');

const CustomModal = ({onBackdropPress, visible, children, type = 'default', label}: any) => {
  const defaultAnimation: any = {
    animationIn: 'slideInLeft',
    animationOut: 'slideOutRight',
  };

  const downAnimation = {
    swipeDirection: 'down',
  };

  const setAnimation = () => {
    return type === 'down' ? downAnimation : defaultAnimation;
  };

  return (
    <Modal
      onBackdropPress={onBackdropPress}
      isVisible={visible}
      animationInTiming={250}
      animationOutTiming={250}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      useNativeDriver={false}
      style={type === 'down' && styles.downContainer}
      onSwipeComplete={onBackdropPress}
      propagateSwipe
      hideModalContentWhileAnimating
      {...setAnimation()}>
      <SafeAreaView
        style={[
          styles.contentWrap,
          type === 'down' && styles.wrapDown,
          type === 'down' && width > 600 && styles.wrapDownLarge,
        ]}>
        <View style={[type !== 'down' ? styles.modal : styles.downModal]}>
          <MCIcon
            size={26}
            style={styles.closeIcon}
            name="close-circle"
            onPress={onBackdropPress}
          />
          {type === 'down' ? (
            <View style={styles.textWrap}>
              <Text style={styles.text}>{label}</Text>
            </View>
          ) : null}
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

CustomModal.propTypes = {
  onBackdropPress: PropTypes.func,
  visible: PropTypes.bool,
  children: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string,
};

const styles = StyleSheet.create({
  modal: {
    width: '90%',
    backgroundColor: themes.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 23,
    borderRadius: 10,
  },
  contentWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
  },
  wrapDown: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  wrapDownLarge: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  closeIcon: {
    position: 'absolute',
    right: 4,
    top: 4,
    color: 'rgb(0,90,152)',
    zIndex: 100,
  },
  downContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  downModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  textWrap: {
    paddingBottom: 5,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  text: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 5,
  },
});

export default CustomModal;
