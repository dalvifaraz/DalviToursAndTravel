import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {hotelData} from '../Constant/hotelConstant';
import {colors} from '../Styles/color';

let data = [
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
];

const CardView = () => {
  return (
    <View style={{marginHorizontal: 0}}>
      {hotelData.map((hotel, index) => {
        return (
          <View key={index} style={styles.cardViewContainer}>
            <Image
              style={{height: 230, width: '100%', borderRadius: 8}}
              source={{
                uri: hotel.thumbnailUrl,
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
                marginBottom: 2,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: colors.ratingBackgroundColor,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    marginRight: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    {hotel.tripAdvisorGuestReviews.rating.toFixed(1)}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                  }}>
                  {hotel.tripAdvisorGuestReviews.total} Verified Ratings
                </Text>
              </View>
              {hotel?.roomsLeft && (
                <View>
                  <Text>Number of room left : {hotel?.roomsLeft}</Text>
                </View>
              )}
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <View>
                  <Text style={{fontSize: 21, fontWeight: 'bold'}}>
                    {hotel.name}
                  </Text>
                </View>
                <Text style={{fontSize: 16, marginTop: 4}}>
                  {hotel.address.streetAddress} |{' '}
                  {hotel?.landmarks[0]?.distance} from{' '}
                  {hotel?.landmarks[0]?.label}
                </Text>
              </View>
              <View
                style={[
                  !hotel?.roomsLeft && {marginTop: -16},
                  {flex: 0.3, alignItems: 'center'},
                ]}>
                <Text
                  style={{
                    textDecorationColor: 'black',
                    textDecorationLine: 'line-through',
                    color: 'red',
                  }}>
                  {hotel?.ratePlan?.price?.old}
                </Text>
                <Text style={{fontSize: 18}}>
                  {hotel?.ratePlan?.price?.current}
                </Text>
                <Text>Per Night</Text>
                <Text>You Save </Text>
                <Text style={{color: 'green'}}>
                  $
                  {hotel?.ratePlan?.price?.old?.substring(1) -
                    hotel?.ratePlan?.price?.current?.substring(1)}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  cardViewContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 18,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
