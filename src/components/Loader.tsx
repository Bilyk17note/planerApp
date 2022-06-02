import React, {useMemo} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from '@react-navigation/native';

const Loader = ({size = 'large'}: any) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return <ActivityIndicator size={size} color={'#00B3FE'} style={styles.indicatorWrap} />;
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    indicatorWrap: {
      flex: 1,
    },
  });

export default Loader;
