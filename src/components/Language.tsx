import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import RadioGroup from './RadioGroup';

// utils
import {formatLngArr} from '../utils/constants';

// import i18n from '../assets/translations';

const Language = () => {
  const {i18n} = useTranslation();
  const [data, setData] = useState(formatLngArr);

  const formatLng = (lng: any) => {
    setData(lng);
  };

  const changeLng = async (lng: any) => {
    i18n.changeLanguage(lng);
    formatLng(lng);
    await AsyncStorage.setItem('lang', lng);
  };

  const initLng = async () => {
    const currLng = await AsyncStorage.getItem('lang');
    if (currLng) {
      formatLng(currLng);
    }
  };

  useEffect(() => {
    initLng();
  }, []);

  return (
    <RadioGroup
      selectIconStyle={styles.selectIconStyle}
      btnLabelWrapStyle={styles.btnLabelWrapStyle}
      groupType="view"
      selected={data}
      data={formatLngArr}
      onChange={changeLng}
    />
  );
};

const styles = StyleSheet.create({
  selectIconStyle: {
    marginRight: 11,
  },
  btnLabelWrapStyle: {
    marginBottom: 3,
  },
});

export default Language;
