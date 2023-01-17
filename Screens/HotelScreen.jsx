import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {ModalComponent as NewModal} from '../Components/Modal';

const HotelScreen = () => {
  const destinationPlaceHolder = 'Please select the destination';
  const [showCalendar, setShowCalendar] = useState(false);
  const [modalBackTitle, setModalBackTitle] = useState('Close');
  const [modal, setModal] = useState({
    visible: false,
    name: '',
  });
  const [dateRange, setDateRange] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().add(1, 'days').format('YYYY-MM-DD'),
  });

  const [totalNumberOfDays, setTotalNumberOfDays] = useState(0);
  const [text, onChangeText] = useState('Mumbai');
  const [destinationList, setDestinationList] = useState([]);

  useEffect(() => {
    const date1 = new Date(dateRange.startDate);
    const date2 = new Date(dateRange.endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotalNumberOfDays(diffDays);
  }, [dateRange]);

  useEffect(() => {
    if (modal.visible && modal.name) {
      if (modal.name === 'location') {
        setModalBackTitle('Location Search');
      } else if (modal.name === 'date') {
        setModalBackTitle('Date Selection');
      } else if (modal.name === 'count') {
        setModalBackTitle('Passengers Count');
      }
    }
  }, [modal]);

  const handleSearchLocation2 = async text => {
    const options = {
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
      params: {q: text, locale: 'en_US', langid: '1033', siteid: '300000001'},
      headers: {
        'X-RapidAPI-Key': 'b65626a40amsh0456bd2d1beeae0p1b9396jsne29bd62a701b',
        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data) {
          if (response.data.sr) {
            setDestinationList(response.data.sr);
          } else {
            setDestinationList([]);
          }
        }
      })
      .catch(function (error) {
        console.error(error, 'HELLO', text);
      });
  };
  //For Location Search
  useEffect(() => {
    handleSearchLocation2(text);
  }, [text]);

  return (
    <View style={styles.hotelContainer}>
      <View style={styles.hotelSearchContainer}>
        <Pressable
          onPress={() => setModal({...modal, visible: true, name: 'location'})}
          style={styles.searchInputContainer}>
          <Text>{text ? text : destinationPlaceHolder}</Text>
        </Pressable>

        <Pressable
          onPress={() => setModal({...modal, visible: true, name: 'date'})}
          // onPress={() => setShowCalendar(true)}
          style={styles.searchInputContainer}>
          <Text>From: {dateRange.startDate}</Text>
          <Text>{totalNumberOfDays} Night</Text>
          <Text>To: {dateRange.endDate}</Text>
        </Pressable>
        {showCalendar && (
          <>
            <Button title="DONE" />
          </>
        )}

        <Pressable onPress={() => {}} style={styles.searchInputContainer}>
          <Text>1-Room, 2-Adult, 0-Child</Text>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={[styles.searchInputContainer, styles.searchButtonContainer]}>
          <Text>Search</Text>
        </Pressable>
      </View>
      <NewModal
        headerTitle={modalBackTitle}
        visible={modal.visible}
        modal={modal}
        setModal={setModal}
        onChangeText={onChangeText}
        text={text}
        destinationList={destinationList}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
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
    paddingHorizontal: 8,
    marginVertical: 8,
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
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    // marginVertical: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  searchButtonContainer: {
    backgroundColor: 'pink',
    justifyContent: 'center',
  },

  searchViewContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    marginTop: 100,
    width: '100%',
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
});
