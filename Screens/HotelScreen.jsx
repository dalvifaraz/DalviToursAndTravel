import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {ModalComponent as NewModal} from '../Components/Modal';
import { colors } from '../Styles/color';

const HotelScreen = () => {
  let touchProps = {
    activeOpacity: 1,
    underlayColor: colors.buttonPressedBackgroundColor,                               // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: !isPress && [styles.searchInputContainer, styles.searchButtonContainer],
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),              // <-- "onPress" is apparently required
    onPress: () => handleHotelSearch(),
  };
  const [ isPress, setIsPress ] = React.useState(false);
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
  const [text, onChangeText] = useState('Mumbai');
  const [destinationId, setDestinationId] = useState('');
  const [destinationList, setDestinationList] = useState([]);
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

  const handleSearchLocation = async text => {
    // const options = {
    //   method: 'GET',
    //   url: 'https://rapidapi.com/apidojo/api/hotels4',
    //   params: {query: text, locale: 'en_US'},
    //   headers: {
    //     'X-RapidAPI-Key': 'b65626a40amsh0456bd2d1beeae0p1b9396jsne29bd62a701b',
    //     'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    //   }
    // };

    // axios.request(options).then(function (response) {
    //   if(response.data){
    //     setDestinationList(response.data.suggestions[0])
    //   }
    // }).catch(function (error) {
    //   console.error(error);
    // });

    setDestinationList([
      {
        geoId: '2621',
        destinationId: '1506246',
        landmarkCityDestinationId: null,
        type: 'CITY',
        redirectPage: 'DEFAULT_PAGE',
        latitude: 40.75668,
        longitude: -73.98647,
        searchDetail: null,
        caption:
          "<span class='highlighted'>New</span> <span class='highlighted'>York</span>, New York, United States of America",
        name: 'New York',
      },
      {
        geoId: '129440',
        destinationId: '1535616',
        landmarkCityDestinationId: null,
        type: 'NEIGHBORHOOD',
        redirectPage: 'DEFAULT_PAGE',
        latitude: 40.77827894430704,
        longitude: -73.96990559824117,
        searchDetail: null,
        caption:
          "Manhattan, <span class='highlighted'>New</span> <span class='highlighted'>York</span>, New York, United States of America",
        name: 'Manhattan',
      },
      {
        geoId: '6234083',
        destinationId: '11108016',
        landmarkCityDestinationId: null,
        type: 'REGION',
        redirectPage: 'DEFAULT_PAGE',
        latitude: 43.04737748563339,
        longitude: -75.65465713202158,
        searchDetail: null,
        caption:
          "Upstate <span class='highlighted'>New</span> <span class='highlighted'>York</span>, New York, United States of America",
        name: 'Upstate New York',
      },
      {
        geoId: '6203489',
        destinationId: '1737998',
        landmarkCityDestinationId: null,
        type: 'NEIGHBORHOOD',
        redirectPage: 'DEFAULT_PAGE',
        latitude: 40.7520567817666,
        longitude: -73.9874924492131,
        searchDetail: null,
        caption:
          "Midtown, <span class='highlighted'>New</span> <span class='highlighted'>York</span>, New York, United States of America",
        name: 'Midtown',
      },
      {
        geoId: '6157019',
        destinationId: '1634459',
        landmarkCityDestinationId: null,
        type: 'NEIGHBORHOOD',
        redirectPage: 'DEFAULT_PAGE',
        latitude: 40.75852956154528,
        longitude: -73.98571085482959,
        searchDetail: null,
        caption:
          "Theater District, <span class='highlighted'>New</span> <span class='highlighted'>York</span>, New York, United States of America",
        name: 'Theater District',
      },
      {
        geoId: '149004',
        destinationId: '1633594',
        landmarkCityDestinationId: null,
        type: 'NEIGHBORHOOD',
        redirectPage: 'DEFAULT_PAGE',
        latitude: 40.71025273032951,
        longitude: -73.81875841072811,
        searchDetail: null,
        caption:
          "Queens, <span class='highlighted'>New</span> <span class='highlighted'>York</span>, United States of America",
        name: 'Queens',
      },
      {
        geoId: '6360640',
        destinationId: '1912147',
        landmarkCityDestinationId: null,
        type: 'REGION',
        redirectPage: 'DEFAULT_PAGE',
        latitude: 40.72015720913082,
        longitude: -73.9987452185321,
        searchDetail: null,
        caption:
          "Lower Manhattan, <span class='highlighted'>New</span> <span class='highlighted'>York</span>, United States of America",
        name: 'Lower Manhattan',
      },
    ]);
  };
  useEffect(() => {
    handleSearchLocation(text);
  }, [text]);

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
    setHotelData([
      {
        id: 634418464,
        name: 'The Grand NYC',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/20000000/19800000/19794400/19794327/b02255b8_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '38 West 31st Street',
          extendedAddress: '',
          locality: 'New York',
          postalCode: '10001',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 5.6,
          rating: '5.6',
          total: 139,
          scale: 10,
        },
        tripAdvisorGuestReviews: {
          rating: 1.5,
          total: 68,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '0.7 miles',
          },
          {
            label: 'Times Square',
            distance: '0.6 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$41',
            exactCurrent: 41.29,
            old: '$199',
            info: 'nightly price per unit',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$289</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'NoMad',
        deals: {
          greatRate: true,
          priceReasoning: 'GR',
        },
        messaging: {
          scarcity: '1 left on our app',
        },
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.74725,
          lon: -73.98776,
        },
        roomsLeft: 1,
        providerType: 'LOCAL',
        supplierHotelId: 19794327,
      },
      {
        id: 476997,
        name: 'Howard Johnson by Wyndham Long Island City',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/10000000/9070000/9062600/9062555/53c7638c_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '38-61 12th Street',
          extendedAddress: '',
          locality: 'Long Island City',
          postalCode: '11101',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 7.4,
          rating: '7.4',
          total: 575,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 3.5,
          total: 1059,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.3 miles',
          },
          {
            label: 'Times Square',
            distance: '2.3 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$56',
            exactCurrent: 56,
            old: '$80',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$392</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Long Island City',
        deals: {
          specialDeal: {
            dealText: 'Special deal: save 20%',
          },
          priceReasoning: 'DRR-442',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.756674,
          lon: -73.942238,
        },
        providerType: 'LOCAL',
        supplierHotelId: 9062555,
      },
      {
        id: 452703,
        name: 'Riviera Hotel',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/9000000/8090000/8081700/8081652/70f4ff31_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '169 Clinton Ave',
          extendedAddress: '',
          locality: 'Newark',
          postalCode: '07108',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 4.8,
          rating: '4.8',
          total: 578,
          scale: 10,
        },
        tripAdvisorGuestReviews: {
          rating: 1.5,
          total: 169,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '11 miles',
          },
          {
            label: 'Times Square',
            distance: '11 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$59',
            exactCurrent: 58.56,
            old: '$75',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$410</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Newark',
        deals: {
          secretPrice: {
            dealText: 'Save more with Secret Prices',
          },
          priceReasoning: 'DRR-445',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'priceRangeCA|D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.724332,
          lon: -74.184373,
        },
        providerType: 'LOCAL',
        supplierHotelId: 8081652,
      },
      {
        id: 256601,
        name: 'Lexington Inn at JFK Airport',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/2000000/1710000/1705900/1705822/744a2280_l.jpg',
        starRating: 2.5,
        address: {
          streetAddress: '138 05 Jamaica Ave',
          extendedAddress: '',
          locality: 'Jamaica',
          postalCode: '11435',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 5.2,
          rating: '5.2',
          total: 266,
          scale: 10,
        },
        tripAdvisorGuestReviews: {
          rating: 3,
          total: 266,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '9.7 miles',
          },
          {
            label: 'Times Square',
            distance: '9.7 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$64',
            exactCurrent: 64.35,
            old: '$99',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$450</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Queens',
        deals: {
          secretPrice: {
            dealText: 'Save more with Secret Prices',
          },
          priceReasoning: 'DRR-445',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.702502,
          lon: -73.815059,
        },
        providerType: 'LOCAL',
        supplierHotelId: 1705822,
      },
      {
        id: 693909,
        name: 'Giorgio Hotel',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/19000000/18380000/18380000/18379930/319991ca_l.jpg',
        starRating: 2.5,
        address: {
          streetAddress: '38-60 13th Street',
          extendedAddress: '',
          locality: 'Long Island City',
          postalCode: '11101',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 7.8,
          rating: '7.8',
          total: 316,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 3,
          total: 64,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.4 miles',
          },
          {
            label: 'Times Square',
            distance: '2.4 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$65',
            exactCurrent: 65,
            old: '$199',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$455</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Long Island City',
        deals: {
          greatRate: true,
          priceReasoning: 'GR',
        },
        messaging: {
          scarcity: '2 left on our app',
        },
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.756257,
          lon: -73.941538,
        },
        roomsLeft: 2,
        providerType: 'LOCAL',
        supplierHotelId: 18379930,
      },
      {
        id: 697336448,
        name: 'Queens County Inn & Suites',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/22000000/21770000/21760600/21760514/23b46997_l.jpg',
        starRating: 2.5,
        address: {
          streetAddress: '40-34 crescent st',
          extendedAddress: '',
          locality: 'Long Island City',
          postalCode: '11101',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 7.2,
          rating: '7.2',
          total: 444,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 3.5,
          total: 2062,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.5 miles',
          },
          {
            label: 'Times Square',
            distance: '2.5 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$68',
            exactCurrent: 67.99,
            old: '$80',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$476</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Long Island City',
        deals: {
          specialDeal: {
            dealText: 'Book now and save!',
          },
          priceReasoning: 'DRR-446',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.75274,
          lon: -73.93895,
        },
        providerType: 'LOCAL',
        supplierHotelId: 21760514,
      },
      {
        id: 367796,
        name: 'Hotel Vetiver',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/5000000/4120000/4116400/4116370/bcc80d94_l.jpg',
        starRating: 3.5,
        address: {
          streetAddress: '29-11 39th Avenue',
          extendedAddress: '',
          locality: 'Long Island City',
          postalCode: '11101',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 7.2,
          rating: '7.2',
          total: 362,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 4,
          total: 1247,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.8 miles',
          },
          {
            label: 'Times Square',
            distance: '2.8 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$69',
            exactCurrent: 69,
            old: '$199',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$483</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Long Island City',
        deals: {
          greatRate: true,
          priceReasoning: 'GR',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.753289,
          lon: -73.934011,
        },
        providerType: 'LOCAL',
        supplierHotelId: 4116370,
      },
      {
        id: 340668,
        name: 'Rodeway Inn Meadowlands',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/4000000/3410000/3402500/3402469/89f044a6_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '155 Route 3 East',
          extendedAddress: '',
          locality: 'Secaucus',
          postalCode: '07094',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 6.8,
          rating: '6.8',
          total: 208,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 3,
          total: 164,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '4.5 miles',
          },
          {
            label: 'Times Square',
            distance: '4.5 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$71',
            exactCurrent: 71.1,
            old: '$149',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$498</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Secaucus',
        deals: {
          greatRate: true,
          priceReasoning: 'GR',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.793268,
          lon: -74.057289,
        },
        providerType: 'LOCAL',
        supplierHotelId: 3402469,
      },
      {
        id: 205823,
        name: 'Knights Inn South Hackensack',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/1000000/900000/894700/894631/0443d16b_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '410 Rt 46 West I 80 Exit 64',
          extendedAddress: '',
          locality: 'South Hackensack',
          postalCode: '07606',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 5.4,
          rating: '5.4',
          total: 62,
          scale: 10,
        },
        tripAdvisorGuestReviews: {
          rating: 2,
          total: 91,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '7.6 miles',
          },
          {
            label: 'Times Square',
            distance: '7.6 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$73',
            exactCurrent: 72.86,
            old: '$80',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$510</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'South Hackensack',
        deals: {
          greatRate: true,
          priceReasoning: 'GR',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'priceRangeCA|D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.85608,
          lon: -74.04726,
        },
        providerType: 'LOCAL',
        supplierHotelId: 894631,
      },
      {
        id: 593247,
        name: 'Travelodge by Wyndham South Hackensack',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/16000000/15130000/15124600/15124578/1ce2f11d_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '636 Huyler St',
          extendedAddress: '',
          locality: 'South Hackensack',
          postalCode: '07606',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 6.6,
          rating: '6.6',
          total: 196,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 2.5,
          total: 70,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '7.8 miles',
          },
          {
            label: 'Times Square',
            distance: '7.8 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$73',
            exactCurrent: 73.46,
            old: '$126',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$514</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'South Hackensack',
        deals: {
          greatRate: true,
          priceReasoning: 'GR',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.858354,
          lon: -74.051069,
        },
        providerType: 'LOCAL',
        supplierHotelId: 15124578,
      },
      {
        id: 222985,
        name: 'The Solita Soho Hotel, Ascend Hotel Collection',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/2000000/1110000/1107500/1107496/9ab453f0_l.jpg',
        starRating: 3,
        address: {
          streetAddress: '159 Grand St',
          extendedAddress: '',
          locality: 'New York',
          postalCode: '10013',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 7.6,
          rating: '7.6',
          total: 150,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 4,
          total: 544,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.6 miles',
          },
          {
            label: 'Times Square',
            distance: '2.6 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$75',
            exactCurrent: 74.53,
            old: '$99',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$522</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'HC',
        },
        neighbourhood: 'Manhattan',
        deals: {
          specialDeal: {
            dealText: 'Special deal: save 24%',
          },
          priceReasoning: 'DRR-442',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.719813,
          lon: -73.99894,
        },
        providerType: 'LOCAL',
        supplierHotelId: 1107496,
      },
      {
        id: 133946,
        name: 'Howard Johnson Hotel by Wyndham Newark Airport',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/1000000/20000/14100/14035/2ab065ff_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '20 Frontage Rd',
          extendedAddress: '',
          locality: 'Newark',
          postalCode: '07114',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 6.4,
          rating: '6.4',
          total: 798,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 2.5,
          total: 1522,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '9.4 miles',
          },
          {
            label: 'Times Square',
            distance: '9.4 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$75',
            exactCurrent: 74.55,
            old: '$83',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$522</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Newark',
        deals: {
          secretPrice: {
            dealText: 'Save more with Secret Prices',
          },
          priceReasoning: 'DRR-443',
        },
        messaging: {
          scarcity: '3 left on our app',
        },
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.7104,
          lon: -74.15603,
        },
        roomsLeft: 3,
        providerType: 'LOCAL',
        supplierHotelId: 14035,
      },
      {
        id: 116796,
        name: 'Holiday Inn Newark Airport',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/1000000/20000/15700/15651/bb878191_l.jpg',
        starRating: 3.5,
        address: {
          streetAddress: '450 US Highway One and Nine South',
          extendedAddress: '',
          locality: 'Newark',
          postalCode: '07114',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 8.4,
          rating: '8.4',
          total: 730,
          scale: 10,
          badge: 'very-good',
          badgeText: 'Very Good',
        },
        tripAdvisorGuestReviews: {
          rating: 4,
          total: 1119,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '11 miles',
          },
          {
            label: 'Times Square',
            distance: '11 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$75',
            exactCurrent: 74.95,
            old: '$100',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$525</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Newark',
        deals: {
          secretPrice: {
            dealText: 'Save more with Secret Prices',
          },
          priceReasoning: 'DRR-443',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'priceRangeUS|TESCO',
        coordinate: {
          lat: 40.69895,
          lon: -74.186984,
        },
        providerType: 'LOCAL',
        supplierHotelId: 15651,
      },
      {
        id: 200301,
        name: 'Comfort Suites Newark - Harrison',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/1000000/860000/859300/859293/5b861c8c_l.jpg',
        starRating: 2.5,
        address: {
          streetAddress: '1348 Mccarter Hwy',
          extendedAddress: '',
          locality: 'Newark',
          postalCode: '07104',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 8.4,
          rating: '8.4',
          total: 515,
          scale: 10,
          badge: 'very-good',
          badgeText: 'Very Good',
        },
        tripAdvisorGuestReviews: {
          rating: 3.5,
          total: 379,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '9.4 miles',
          },
          {
            label: 'Times Square',
            distance: '9.4 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$75',
            exactCurrent: 75.19,
            old: '$84',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$526</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Newark',
        deals: {
          secretPrice: {
            dealText: 'Save more with Secret Prices',
          },
          priceReasoning: 'DRR-443',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.754952,
          lon: -74.166608,
        },
        providerType: 'LOCAL',
        supplierHotelId: 859293,
      },
      {
        id: 674505152,
        name: 'Hotel Nirvana',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/22000000/21050000/21047100/21047036/5dba8052_l.jpg',
        starRating: 2.5,
        address: {
          streetAddress: '12-02 37th Avenue',
          extendedAddress: '',
          locality: 'Long Island City',
          postalCode: '11101',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 7.8,
          rating: '7.8',
          total: 196,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 3,
          total: 109,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.4 miles',
          },
          {
            label: 'Times Square',
            distance: '2.5 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$77',
            exactCurrent: 77.39,
            old: '$90',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$542</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Long Island City',
        deals: {
          secretPrice: {
            dealText: 'Save more with Secret Prices',
          },
          priceReasoning: 'DRR-443',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.75914,
          lon: -73.93988,
        },
        providerType: 'LOCAL',
        supplierHotelId: 21047036,
      },
      {
        id: 216337,
        name: 'Howard Johnson by Wyndham North Bergen',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/1000000/970000/967300/967211/b7299a11_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '1300 Tonnelle Ave',
          extendedAddress: '',
          locality: 'North Bergen',
          postalCode: '07047',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 5.8,
          rating: '5.8',
          total: 397,
          scale: 10,
        },
        tripAdvisorGuestReviews: {
          rating: 2.5,
          total: 561,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '3.3 miles',
          },
          {
            label: 'Times Square',
            distance: '3.2 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$79',
            exactCurrent: 78.74,
            old: '$105',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$551</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'North Bergen',
        deals: {
          specialDeal: {
            dealText: 'Book early and save 25%',
          },
          priceReasoning: 'DRR-448',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.765792,
          lon: -74.047456,
        },
        providerType: 'LOCAL',
        supplierHotelId: 967211,
      },
      {
        id: 256047,
        name: 'Days Inn by Wyndham Long Island City',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/2000000/1810000/1810000/1809968/7331e630_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '31-36 Queens Blvd',
          extendedAddress: '',
          locality: 'Long Island City',
          postalCode: '11101',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 6.6,
          rating: '6.6',
          total: 208,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 3,
          total: 633,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.9 miles',
          },
          {
            label: 'Times Square',
            distance: '2.9 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$79',
            exactCurrent: 79.2,
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$554</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Long Island City',
        deals: {
          specialDeal: {
            dealText: 'Stay 3 nights and save 20% off your stay!',
          },
          priceReasoning: 'DRR-3',
        },
        messaging: {
          scarcity: '3 left on our app',
        },
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.745186,
          lon: -73.933638,
        },
        roomsLeft: 3,
        providerType: 'LOCAL',
        supplierHotelId: 1809968,
      },
      {
        id: 422980,
        name: 'Nesva Hotel',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/6000000/5530000/5522800/5522763/3a44f294_l.jpg',
        starRating: 2.5,
        address: {
          streetAddress: '39-12 29th Street',
          extendedAddress: '',
          locality: 'Long Island City',
          postalCode: '11101',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 8.4,
          rating: '8.4',
          total: 91,
          scale: 10,
          badge: 'very-good',
          badgeText: 'Very Good',
        },
        tripAdvisorGuestReviews: {
          rating: 4,
          total: 599,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.7 miles',
          },
          {
            label: 'Times Square',
            distance: '2.7 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$80',
            exactCurrent: 80.25,
            old: '$107',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$562</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Long Island City',
        deals: {
          specialDeal: {
            dealText: 'Special deal: save 24%',
          },
          priceReasoning: 'DRR-442',
        },
        messaging: {
          scarcity: '3 left on our app',
        },
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.753197,
          lon: -73.934758,
        },
        roomsLeft: 3,
        providerType: 'LOCAL',
        supplierHotelId: 5522763,
      },
      {
        id: 201844,
        name: 'Super 8 by Wyndham North Bergen NJ/NYC Area',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/1000000/860000/856100/856099/466cd4ad_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '2800 Columbia Ave',
          extendedAddress: '',
          locality: 'North Bergen',
          postalCode: '07047',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 7.4,
          rating: '7.4',
          total: 662,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 3.5,
          total: 1395,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '3.0 miles',
          },
          {
            label: 'Times Square',
            distance: '3.0 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$82',
            exactCurrent: 81.7,
            old: '$92',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$572</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'North Bergen',
        deals: {
          secretPrice: {
            dealText: 'Save more with Secret Prices',
          },
          priceReasoning: 'DRR-443',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.77487,
          lon: -74.038477,
        },
        providerType: 'LOCAL',
        supplierHotelId: 856099,
      },
      {
        id: 292787,
        name: 'The Hotel @ Fifth Avenue',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/1000000/30000/28300/28291/dab6f2e3_l.jpg',
        starRating: 3.5,
        address: {
          streetAddress: '17 West 32nd St',
          extendedAddress: '',
          locality: 'New York',
          postalCode: '10001',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 8,
          rating: '8.0',
          total: 250,
          scale: 10,
          badge: 'very-good',
          badgeText: 'Very Good',
        },
        tripAdvisorGuestReviews: {
          rating: 4,
          total: 2986,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '0.6 miles',
          },
          {
            label: 'Times Square',
            distance: '0.6 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$84',
            exactCurrent: 83.55,
            old: '$139',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$585</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Koreatown',
        deals: {
          specialDeal: {
            dealText: 'Special deal: save 39%',
          },
          priceReasoning: 'DRR-442',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'XMPV2|TESCO',
        coordinate: {
          lat: 40.74777,
          lon: -73.98655,
        },
        providerType: 'LOCAL',
        supplierHotelId: 28291,
      },
      {
        id: 630346,
        name: 'Hotel RL Brooklyn',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/17000000/16250000/16241600/16241516/38832c9a_l.jpg',
        starRating: 3,
        address: {
          streetAddress: '1080 Broadway',
          extendedAddress: '',
          locality: 'Brooklyn',
          postalCode: '11221',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 8.2,
          rating: '8.2',
          total: 501,
          scale: 10,
          badge: 'very-good',
          badgeText: 'Very Good',
        },
        tripAdvisorGuestReviews: {
          rating: 4,
          total: 195,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '5.2 miles',
          },
          {
            label: 'Times Square',
            distance: '5.2 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$84',
            exactCurrent: 83.68,
            old: '$93',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$586</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Bedford-Stuyvesant',
        deals: {
          secretPrice: {
            dealText: 'Save more with Secret Prices',
          },
          priceReasoning: 'DRR-443',
        },
        messaging: {},
        badging: {
          hotelBadge: {
            type: 'vipBasic',
            label: 'VIP',
          },
        },
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.69429,
          lon: -73.93105,
        },
        providerType: 'LOCAL',
        supplierHotelId: 16241516,
      },
      {
        id: 650836736,
        name: 'Feather Factory',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/21000000/20310000/20307400/20307398/6749ae3f_l.jpg',
        starRating: 2.5,
        address: {
          streetAddress: '26-32 Skillman Ave',
          extendedAddress: '',
          locality: 'Long Island City',
          postalCode: '11101',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 8.4,
          rating: '8.4',
          total: 338,
          scale: 10,
          badge: 'very-good',
          badgeText: 'Very Good',
        },
        tripAdvisorGuestReviews: {
          rating: 4,
          total: 64,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.5 miles',
          },
          {
            label: 'Times Square',
            distance: '2.5 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$84',
            exactCurrent: 84,
            old: '$140',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$588</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Long Island City',
        deals: {
          specialDeal: {
            dealText: 'Limited time offer:  save 39%',
          },
          priceReasoning: 'DRR-461',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.74404,
          lon: -73.94099,
        },
        providerType: 'LOCAL',
        supplierHotelId: 20307398,
      },
      {
        id: 273442,
        name: 'Rodeway Inn Capri',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/3000000/2230000/2223600/2223555/cb428927_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '1 Valley Road',
          extendedAddress: '',
          locality: 'Little Ferry',
          postalCode: '07643',
          region: 'NJ',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 6.2,
          rating: '6.2',
          total: 104,
          scale: 10,
          badge: 'good',
          badgeText: 'Good',
        },
        tripAdvisorGuestReviews: {
          rating: 2.5,
          total: 55,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '7.2 miles',
          },
          {
            label: 'Times Square',
            distance: '7.2 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$85',
            exactCurrent: 85,
            old: '$139',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$595</strong> for 7 nights)',
          },
          features: {
            freeCancellation: true,
            paymentPreference: true,
            noCCRequired: false,
          },
          type: 'Dual',
        },
        neighbourhood: 'Little Ferry',
        deals: {
          greatRate: true,
          priceReasoning: 'GR',
        },
        messaging: {},
        badging: {},
        pimmsAttributes: 'TESCO',
        coordinate: {
          lat: 40.854608,
          lon: -74.033352,
        },
        providerType: 'LOCAL',
        supplierHotelId: 2223555,
      },
      {
        id: 629429,
        name: 'Phoenix Hotel',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/17000000/16240000/16239800/16239789/fce403eb_l.jpg',
        starRating: 2.5,
        address: {
          streetAddress: '517 39th Street',
          extendedAddress: '',
          locality: 'Brooklyn',
          postalCode: '11232',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 5.2,
          rating: '5.2',
          total: 151,
          scale: 10,
        },
        tripAdvisorGuestReviews: {
          rating: 2,
          total: 18,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '7.3 miles',
          },
          {
            label: 'Times Square',
            distance: '7.3 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$85',
            exactCurrent: 85,
            old: '$100',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$595</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'HC',
        },
        neighbourhood: 'Brooklyn',
        deals: {
          specialDeal: {
            dealText: 'Save 15%',
          },
          priceReasoning: 'DRR-446',
        },
        messaging: {
          scarcity: '3 left on our app',
        },
        badging: {},
        coordinate: {
          lat: 40.65107,
          lon: -74.00323,
        },
        roomsLeft: 3,
        providerType: 'LOCAL',
        supplierHotelId: 16239789,
      },
      {
        id: 464655,
        name: 'Green Point YMCA',
        thumbnailUrl:
          'https://exp.cdn-hotels.com/hotels/9000000/8430000/8422100/8422014/39545e92_l.jpg',
        starRating: 2,
        address: {
          streetAddress: '99 Meserole Avenue',
          extendedAddress: '',
          locality: 'Brooklyn',
          postalCode: '11222',
          region: 'NY',
          countryName: 'United States',
          countryCode: 'us',
        },
        welcomeRewards: {
          collect: true,
        },
        guestReviews: {
          unformattedRating: 5.8,
          rating: '5.8',
          total: 127,
          scale: 10,
        },
        tripAdvisorGuestReviews: {
          rating: 2.5,
          total: 132,
        },
        landmarks: [
          {
            label: 'City center',
            distance: '2.7 miles',
          },
          {
            label: 'Times Square',
            distance: '2.7 miles',
          },
        ],
        ratePlan: {
          price: {
            current: '$85',
            exactCurrent: 85,
            old: '$129',
            info: 'nightly price per room',
            additionalInfo: 'This is the average nightly price for your dates.',
            totalPricePerStay: '(<strong>$595</strong> for 7 nights)',
          },
          features: {
            freeCancellation: false,
            paymentPreference: false,
            noCCRequired: false,
          },
          type: 'EC',
        },
        neighbourhood: 'Brooklyn',
        deals: {
          greatRate: true,
          priceReasoning: 'GR',
        },
        messaging: {
          scarcity: '4 left on our app',
        },
        badging: {},
        pimmsAttributes: 'D13|TESCO',
        coupon: 'MOB5',
        coordinate: {
          lat: 40.72695,
          lon: -73.953183,
        },
        roomsLeft: 4,
        providerType: 'LOCAL',
        supplierHotelId: 8422014,
      },
    ]);
  };

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

        <Pressable onPress={() => {}} style={styles.searchInputContainer}>
          <Text>1-Room, 2-Adult, 0-Child</Text>
        </Pressable>

        <TouchableHighlight
          // onPress={() => {
          //   handleHotelSearch();
          // }}
          {...touchProps}
          >
          <Text style={isPress&&{color:colors.buttonPressedFontColor}}>Search</Text>
        </TouchableHighlight>
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
        setDestinationId={setDestinationId}
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
