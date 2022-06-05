import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, SectionList} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {observer} from 'mobx-react';
import {FAB} from 'react-native-paper';
import dayjs from 'dayjs';

// components
import HeyComponent from '../../components/HeyComponent';
import EmptyComponent from '../../components/EmptyComponent';
import Loader from '../../components/Loader';

// store
import {useStore} from '../../stores';

const Meetings = observer(() => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const navigation = useNavigation<any>();

  const {userStore} = useStore();
  const {user} = userStore;

  const [loading, setLoading] = useState(false);

  const [list, setList] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('junction_member_meeting')
      .where('memberId', '==', user.uid)
      .onSnapshot((querySnapshot: any) => {
        getEvents(querySnapshot);
      });

    const subscriberEvents = firestore()
      .collection('meetings')
      .onSnapshot(() => {
        firestore()
          .collection('junction_member_meeting')
          .where('memberId', '==', user.uid)
          .get()
          .then(querySnapshot => {
            getEvents(querySnapshot);
          });
      });

    return () => {
      subscriber();
      subscriberEvents();
    };
  }, []);

  const getEvents = async (junctions: any) => {
    setLoading(true);
    const courses = await Promise.all(
      junctions.docs
        .filter((doc: any) => doc.exists)
        .map((doc: any) => firestore().doc(`meetings/${doc.data().meetId}`).get())
    );

    const res = courses
      .filter(doc => doc.exists)
      .map(doc => ({id: doc.id, ...doc.data()}))
      .sort((a: any, b: any) => b.dateTime.startDate - a.dateTime.startDate);

    const sectionList = getSectionList(res);
    setList(sectionList);
    setLoading(false);
  };

  const getSectionList = (arr: any[]) => {
    return arr.reduce((accum, current) => {
      let dateGroup = accum.find(
        (x: any) => x.title === dayjs(current.dateTime.startDate.toDate()).format('DD/MM/YYYY')
      );
      if (!dateGroup) {
        dateGroup = {
          title: dayjs(current.dateTime.startDate.toDate()).format('DD/MM/YYYY'),
          data: [],
        };
        accum.push(dateGroup);
      }

      dateGroup.data.push(current);
      return accum;
    }, []);
  };

  const getSectionTitle = (title: string) => {
    switch (title) {
      case dayjs().format('DD/MM/YYYY'):
        return 'Today';
      case dayjs().add(-1, 'day').format('DD/MM/YYYY'):
        return 'Yesterday';
      default:
        return title;
    }
  };

  const renderItem = ({item}: any) => {
    const {name, description, dateTime} = item;
    const {endDate, startDate} = dateTime;

    const time = `${dayjs(startDate.toDate()).format('HH:mm')} - ${dayjs(endDate.toDate()).format(
      'HH:mm'
    )}`;

    return (
      <TouchableOpacity
        style={styles.itemContentWrap}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate({
            name: 'Event',
            params: {...item},
          })
        }>
        <Text style={styles.eventText}>{name}</Text>
        <Text style={styles.eventText}>{description}</Text>
        <Text>{time}</Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = ({section: {title}}: any) => {
    return <Text style={styles.header}>{getSectionTitle(title)}</Text>;
  };

  return (
    <View style={styles.container}>
      <HeyComponent />

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.listWrap}>
          <SectionList
            sections={list}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            contentContainerStyle={[
              styles.listContainer,
              !list.length && styles.emptyListContainer,
            ]}
            showsVerticalScrollIndicator={false}
            renderSectionHeader={renderHeader}
            ListEmptyComponent={() => <EmptyComponent listName="Event list" />}
          />

          <FAB style={styles.fab} icon={'plus'} onPress={() => navigation.navigate('NewMeet')} />
        </View>
      )}
    </View>
  );
});

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingBottom: 0,
    },
    listWrap: {
      flex: 1,
    },
    fab: {
      position: 'absolute',
      backgroundColor: '#00B3FE',
      bottom: 20,
      right: 0,
    },
    itemContentWrap: {
      backgroundColor: 'rgba(47, 128, 237, 0.2)',
      paddingHorizontal: 10,
      paddingVertical: 15,
      borderRadius: 10,
      borderLeftColor: theme.colors.blue,
      borderLeftWidth: 10,
      marginTop: 5,
    },
    header: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 5,
      backgroundColor: '#fff',
    },
    emptyListContainer: {
      alignItems: 'center',
      flex: 1,
    },
    listContainer: {
      marginTop: 10,
      paddingBottom: 50,
    },
    eventText: {
      marginBottom: 5,
    },
  });

export default Meetings;
