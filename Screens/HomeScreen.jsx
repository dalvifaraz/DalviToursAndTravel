import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {commonStyles} from '../Styles/commonStyle';
import HomeNavigation from '../Components/HomeNavigation';
import TravelComponent from './TravelComponent';

const showDefault = {
  airplane: true,
  business: false,
  train: false,
  bus: false,
  car: false,
};

const HomeScreen = ({navigation}) => {
  const [show, setShow] = useState(showDefault);
  useEffect(() => {
    if (show.business) {
      navigation.navigate('Hotel');
      setShow(showDefault);
    }
  }, [show]);

  return (
    <View style={commonStyles.mainContainer}>
      <HomeNavigation show={show} setShow={setShow} />
      {(show.airplane || show.bus || show.car || show.train) && (
        <TravelComponent show={show} />
      )}
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  
});
