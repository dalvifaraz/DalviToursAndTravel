import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {ModalComponent} from '../Components/Modal';
import {colors} from '../Styles/color';
import {hotelData} from '../Constant/hotelConstant';
import CardView from '../Components/CardView';

const HotelScreen = () => {
  let touchProps = {
    activeOpacity: 1,
    underlayColor: colors.buttonPressedBackgroundColor,
    style: !isPress && [
      styles.searchInputContainer,
      styles.searchButtonContainer,
    ],
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => handleHotelSearch(),
  };
  const [isPress, setIsPress] = React.useState(false);
  const destinationPlaceHolder = 'Please select the destination';
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
  const [locationSearch, setLocationSearch] = useState('Mumbai');
  const [destinationId, setDestinationId] = useState('');
  const [hotelData, setHotelData] = useState([]);

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

  const handleHotelSearch = () => {
    // const options = {
    //   method: 'GET',
    //   url: 'https://hotels4.p.rapidapi.com/properties/list',
    //   params: {
    //     destinationId: destinationId,
    //     pageNumber: '1',
    //     pageSize: '25',
    //     checkIn: dateRange.startDate,
    //     checkOut: dateRange.endDate,
    //     adults1: '2',//The number of adults in first room
    //     // adults2: '2', //The number of adults in second room
    //     sortOrder: 'PRICE',
    //     locale: 'en_US',
    //     currency: 'USD'
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': 'b65626a40amsh0456bd2d1beeae0p1b9396jsne29bd62a701b',
    //     'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    //   }
    // };

    // axios.request(options).then(function (response) {
    //   console.log(response.data);
    //   if(reponse.data){
    //   setHotelData(response.data.body.searchResults.results)
    // }

    // }).catch(function (error) {
    //   console.error(error);
    // });
    setHotelData(hotelData);
  };

  return (
    <View style={styles.hotelContainer}>
      <ScrollView>
        <View style={styles.hotelSearchContainer}>
          <Pressable
            onPress={() =>
              setModal({...modal, visible: true, name: 'location'})
            }
            style={styles.searchInputContainer}>
            <Text>
              {locationSearch ? locationSearch : destinationPlaceHolder}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setModal({...modal, visible: true, name: 'date'})}
            style={styles.searchInputContainer}>
            <Text>From: {dateRange.startDate}</Text>
            <Text>{totalNumberOfDays} Night</Text>
            <Text>To: {dateRange.endDate}</Text>
          </Pressable>

          <Pressable onPress={() => {}} style={styles.searchInputContainer}>
            <Text>1-Room, 2-Adult, 0-Child</Text>
          </Pressable>

          <TouchableHighlight {...touchProps}>
            <Text style={isPress && {color: colors.buttonPressedFontColor}}>
              Search
            </Text>
          </TouchableHighlight>
        </View>

        <CardView />
      </ScrollView>
      <ModalComponent
        headerTitle={modalBackTitle}
        visible={modal.visible}
        modal={modal}
        setModal={setModal}
        setLocationSearch={setLocationSearch}
        locationSearch={locationSearch}
        dateRange={dateRange}
        setDateRange={setDateRange}
        setDestinationId={setDestinationId}
      />
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
