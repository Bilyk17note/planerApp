import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

interface IProp {
  listName?: string;
}

const EmptyComponent = ({listName = 'List'}: IProp) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.emptyWrap}>
      <Text>{listName} is empty...</Text>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    emptyWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default EmptyComponent;
