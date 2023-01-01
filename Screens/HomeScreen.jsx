import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {commonStyles} from '../Styles/commonStyle';
import HomeNavigation from '../Components/HomeNavigation';
import Radio from '../Components/Radio';

const radioButtonsData = [
  {
    id: '1',
    label: 'One Way',
    value: 'oneWay',
  },
  {
    id: '2',
    value: 'roundTrip',
    label: 'Round Trip',
  },
  {
    id: '3',
    value: 'multiCity',
    label: 'Multi City',
  },
];

const HomeScreen = ({navigation}) => {
  const [show, setShow] = useState({
    airplane: true,
    business: false,
    train: false,
    bus: false,
    car: false,
  });

  const [trip, setTrip] = useState(radioButtonsData[0].value);

  useEffect(() => {
    if (show.business) {
      navigation.navigate('Hotel');
      setShow(show);
    }
  }, [show]);

  return (
    <View style={commonStyles.mainContainer}>
      <HomeNavigation show={show} setShow={setShow} />
      <View style={styles.detailContainer}>
        {(show.airplane || show.bus || show.car || show.train) && (
          <View style={styles.radioButtonContainer}>
            <Radio
              containerStyle={{justifyContent: 'space-around'}}
              data={radioButtonsData}
              trip={trip}
              setTrip={setTrip}
            />
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        {show.airplane && (
          <>
            <Text>AIRPLANE</Text>
          </>
        )}
        {show.train && (
          <>
            <Text>TRAIN</Text>
          </>
        )}
        {show.bus && (
          <>
            <Text>BUS</Text>
          </>
        )}
        {show.car && (
          <>
            <Text>CAR</Text>
          </>
        )}
      </View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  contentContainer: {
    borderColor: 'black',
    borderWidth: 2,
  },
  detailContainer: {
    borderColor: 'green',
    borderWidth: 2,
    // paddingHorizontal:8,
  },
  radioButtonContainer: {
    marginVertical: 8,
  },
});
