import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Calendar from 'react-native-calendar-range-picker';
import moment from 'moment';
// import { DestinationField } from '../utils/DestinationField';
// import { fetchDestination } from '../utils/apis';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const HotelScreen = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    name: '',
  });
  const [dateRange, setDateRange] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
  });
  const [text, onChangeText] = useState('Mumbai');
  const [destinationList, setDestinationList] = useState([]);
  //FOR TESTING
  const handleOnPress = async () => {
    let data = await axios.get(
      'https://dalvi-tours-and-travel-server-7r78elcvv-dalvifaraz.vercel.app/api/home',
    );
  };

  //For Location Search
  useEffect(() => {
    handleSearchLocation(text);
  }, [text]);

  const handleSearchLocation = async text => {
    let url =
      'https://dalvi-tours-and-travel-server-7r78elcvv-dalvifaraz.vercel.app/api/search-location?subType=CITY&keyword=';
    try {
      console.log('HELLO',url + text);
      let response = await axios.get(url + text);
      if(response){
        setDestinationList(response.data.data);
      }else{
        setDestinationList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.hotelContainer}>
      <View style={styles.hotelSearchContainer}>
        <Pressable
          onPress={() => setModal({...modal, visible: true, name: 'location'})}
          style={styles.searchInputContainer}>
          <Text>Mumbai</Text>
        </Pressable>

        <View style={styles.searchInputContainer}>
          <Text>{dateRange.startDate}</Text>
          <Text
            onPress={() => {
              setShowCalendar(!showCalendar);
            }}>
            DATE
          </Text>
          <Text>{dateRange.endDate}</Text>
        </View>

        <Text onPress={handleOnPress}>TEST</Text>

        <Pressable
          onPress={() => setModal({...modal, visible: true, name: 'count'})}
          style={styles.searchInputContainer}>
          <Text>1-Room, 2-Adult, 0-Child</Text>
        </Pressable>

        <View
          style={[styles.searchInputContainer, styles.searchButtonContainer]}>
          <Button title="Search" color="black" />
        </View>

        {showCalendar && (
          <Calendar
            disabledBeforeToday={true}
            startDate={moment()}
            endDate={moment().add(1, 'days')}
            isMonthFirst
            onChange={({startDate, endDate}) =>
              setDateRange({...dateRange, startDate, endDate})
            }
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal.visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
          setModal({...modal, visible: false, name: ''});
        }}>
        <SafeAreaView style={{margin: 8}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Location Search</Text>
            <Ionicons
              name="close"
              size={24}
              onPress={() => setModal({...modal, visible: false, name: ''})}
            />
          </View>
          {modal.name === 'location' && (
            <>
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeText}
                  value={text}
                />
                <Text style={styles.small}>
                  keyword that should represent the start of a word in a city
                  name or code
                </Text>
                <View>
                  {destinationList && destinationList.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        autoComplete(item.name, item.address.cityCode)
                      }>
                      <View style={styles.destinationCard}>
                        <Text
                          style={
                            styles.text
                          }>{`${item.name}, ${item.address.cityCode}`}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}
          {modal.name === 'count' && <Text>Hello Count!</Text>}
        </SafeAreaView>
      </Modal>
      <ScrollView>
        {/* {hotelData?.map((hotel, index) => {
          return (
            <View>
              {hotel.lastMinuteDealsCardImageUrl && (
                <View style={styles.hotelDetailContainer} key={index}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: hotel.lastMinuteDealsCardImageUrl,
                    }}
                  />
                  <Text>{hotel.siteId}</Text>
                  <Text>{hotel.lastMinuteDealsCardImageUrl}</Text>
                </View>
              )}
            </View>
          );
        })} */}
      </ScrollView>
    </View>
  );
};

export default HotelScreen;

const styles = StyleSheet.create({
  hotelContainer: {},
  hotelSearchContainer: {
    borderColor: 'green',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  hotelImageStyle: {},
  tinyLogo: {
    width: '100%',
    height: 240,
  },
  hotelDetailContainer: {
    paddingHorizontal: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  searchButtonContainer: {
    backgroundColor: 'pink',
    justifyContent: 'center',
  },

  small: {
    fontSize: 12,
    marginBottom: 20,
  },
  searchViewContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: 100,
    width: '100%',
  },
  destinationCard: {
    marginTop: 12,
    backgroundColor: 'white',
    padding: 16,
  },
  bold: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    color: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
    color: 'black',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
});
