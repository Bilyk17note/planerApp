import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';

// components
import Button from '../Button';
import Modal from '../Modal';

const ModalDatePicker = ({show, date, onClose, onDateChange, label, minimumDate}: any) => {
  const {t} = useTranslation();

  const [scopeDate, setScopeDate] = useState(date);

  const handleChange = (date: any) => {
    setScopeDate(date);
  };

  return (
    <Modal visible={show} onBackdropPress={onClose} type="down" label={label}>
      <View style={styles.modalPicker}>
        <DatePicker
          style={styles.picker}
          androidVariant="iosClone"
          date={scopeDate}
          is24hourSource="locale"
          onDateChange={handleChange}
          minimumDate={minimumDate || null}
          locale={i18n.language === 'en' ? 'en' : 'uk'}
        />
      </View>
      <View style={styles.btnsContainer}>
        <Button
          outputRange={0.9}
          containerStyle={styles.btnWrap}
          type="cancel"
          text={t('Cancel')}
          onPress={onClose}
        />
        <Button
          outputRange={0.9}
          containerStyle={styles.btnWrap}
          text={t('Set')}
          onPress={() => {
            onDateChange(scopeDate);
            onClose();
          }}
        />
      </View>
    </Modal>
  );
};

ModalDatePicker.propTypes = {
  onDateChange: PropTypes.func,
  onClose: PropTypes.func,
  value: PropTypes.any,
  date: PropTypes.any,
  show: PropTypes.bool,
  label: PropTypes.string,
  minimumDate: PropTypes.any,
};

const styles = StyleSheet.create({
  modalPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  picker: {
    height: 140,
    borderRadius: 20,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
  btnWrap: {
    width: '48%',
  },
});

export default ModalDatePicker;
