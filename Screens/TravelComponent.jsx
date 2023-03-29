import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Radio from '../Components/Radio';
import React, {useState} from 'react';
import {colors} from '../Styles/color';

export default function TravelComponent({show}) {
  let touchProps = {
    activeOpacity: 1,
    underlayColor: colors.buttonPressedBackgroundColor,
    style: !isPress && [
      styles.searchInputContainer,
      styles.searchButtonContainer,
    ],
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => {},
  };
  const [isPress, setIsPress] = React.useState(false);

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
  const [trip, setTrip] = useState(radioButtonsData[0].value);

  return (
    <ScrollView>
      <View style={styles.detailContainer}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <Pressable
            onPress={() => {}}
            style={[
              styles.searchInputContainer,
              {flex: 1, marginRight: 6},
            ]}>
            <Text>From:</Text>
          </Pressable>
          <Pressable
            onPress={() => {}}
            style={[
              styles.searchInputContainer,
              {flex: 1, marginLeft: 6},
            ]}>
            <Text>To: </Text>
          </Pressable>
        </View>
        <View style={styles.radioButtonContainer}>
          <Radio
            containerStyle={{justifyContent: 'space-around'}}
            data={radioButtonsData}
            trip={trip}
            setTrip={setTrip}
          />
        </View>
        <TouchableHighlight {...touchProps}>
          <Text style={isPress && {color: colors.buttonPressedFontColor}}>
            Search
          </Text>
        </TouchableHighlight>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    // borderColor: 'black',
    // borderWidth: 1,
    // marginVertical: 8,
  },
  detailContainer: {
    // backgroundColor:'white'
    marginHorizontal: 8,
  },
  radioButtonContainer: {
    // borderColor: 'gray',
    // borderWidth: 1,
    // borderRadius: 10,
    marginBottom:8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  searchButtonContainer: {
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
});
