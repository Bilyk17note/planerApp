import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

// components
import ModalDatePicker from './ModalDatePicker';

interface IProp {
  startDate?: any;
  endDate?: any;
  onChange?: (date: any) => void;
  dir?: string;
  containerStyle?: StyleProp<ViewStyle>;
  value?: any;
  disable?: boolean;
}

const DateTime = ({value, onChange, containerStyle, dir, disable = false}: IProp) => {
  const {t} = useTranslation();

  const [hmm, setHmm] = useState(false);
  const [show, setShow] = useState<any>({showStart: false, showEnd: false});
  const [date, setDate] = useState<any>({
    startDate: value?.startDate || new Date(),
    endDate: value?.endDate || new Date(),
  });

  const activeOpacity = disable ? 1 : 0.4;

  const handleOpen = (name: any) => {
    if (!disable) {
      setShow((prevVal: any) => ({
        ...prevVal,
        [name]: !show[name],
      }));
    }
  };

  const handleDateChange = (val: any, name: any) => {
    if (name === 'startDate') {
      setDate({startDate: val, endDate: addHours(val)});
    } else {
      setDate((prevVal: any) => ({
        ...prevVal,
        [name]: val,
      }));
    }
  };

  useEffect(() => {
    if (!value?.startDate) {
      setDate({startDate: roundMinutes(new Date()), endDate: roundMinutes(new Date(), 1)});
    }

    setHmm(true);
  }, []);

  useEffect(() => {
    onChange && onChange(date);
  }, [date]);

  const roundMinutes = (date: any, hour = 0) => {
    date.setHours(date.getHours() + Math.round(date.getMinutes() / 60) + hour);
    date.setMinutes(0, 0, 0);

    return date;
  };

  const addHours = (date: any, hours = 1) => {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);

    return newDate;
  };

  return (
    <SafeAreaView>
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => handleOpen('showStart')}
          style={{paddingVertical: 10}}>
          <Text style={styles.textStyle}>{t('StartDate')}</Text>
          <Text style={styles.dateText}>{dayjs(date.startDate).format('YYYY-MM-DD HH:mm')}</Text>

          {hmm ? (
            <ModalDatePicker
              label={t('SetStartDate')}
              show={show.showStart}
              date={date.startDate}
              onDateChange={date => handleDateChange(date, 'startDate')}
              onClose={() => handleOpen('showStart')}
            />
          ) : null}
        </TouchableOpacity>

        <View style={styles.iconWrap}>
          <McIcon
            name={dir === 'col' ? 'chevron-down' : 'chevron-right'}
            size={20}
            style={{zIndex: 100}}
          />
        </View>

        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={() => handleOpen('showEnd')}
          style={{paddingVertical: 10}}>
          <Text style={styles.textStyle}>{t('EndDate')}</Text>
          <Text style={styles.dateText}>{dayjs(date.endDate).format('YYYY-MM-DD HH:mm')}</Text>
          {hmm ? (
            <ModalDatePicker
              label={t('SetEndDate')}
              show={show.showEnd}
              date={date.endDate}
              onDateChange={date => handleDateChange(date, 'endDate')}
              onClose={() => handleOpen('showEnd')}
              minimumDate={date.startDate}
            />
          ) : null}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

DateTime.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  containerStyle: PropTypes.object,
  accordionTitle: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(47, 128, 237, 0.2)',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  textStyle: {},
  iconWrap: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 100,
  },
  dateText: {
    marginTop: 5,
  },
});

export default DateTime;
