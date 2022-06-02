import React, {forwardRef} from 'react';
import {View, StyleSheet} from 'react-native';

// components
import RadioButton from './RadioButton';
import Loader from '../Loader';

interface IProp {
  forceFunc?: () => void;
  groupType: string;
  data: any[];
  loading?: boolean;
  containerStyle?: any;
  onChange: (val: any) => void;
  btnLabelWrapStyle?: any;
  btnLabelStyle?: any;
  selectIconStyle?: any;
  labelStyle?: any;
  selected: any;
}

const RadioGroup = forwardRef<any, IProp>(
  (
    {
      data,
      containerStyle,
      loading,
      selected,
      onChange,
      selectIconStyle,
      btnLabelWrapStyle,
      labelStyle,
    },
    ref
  ) => {
    const handleChange = async (value: any) => {
      onChange(value);
    };

    const renderContent = () => {
      return (
        <View style={[styles.container, !loading && containerStyle]}>
          {loading ? (
            <Loader size="small" />
          ) : (
            data?.map((el, index) => {
              return el.value ? (
                <RadioButton
                  iconStyle={styles.iconStyle}
                  selectIconStyle={selectIconStyle}
                  labelWrapStyle={btnLabelWrapStyle}
                  labelStyle={labelStyle}
                  iconName={el.iconName}
                  disabled={el.disabled}
                  key={index.toString()}
                  title={el.title}
                  value={el.value}
                  selected={selected}
                  onChange={handleChange}
                />
              ) : null;
            })
          )}
        </View>
      );
    };

    return <>{renderContent()}</>;
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: 100,
  },
  iconStyle: {
    paddingRight: 10,
    paddingLeft: 1,
  },
});

export default RadioGroup;
