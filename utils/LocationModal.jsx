import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {fetchDestination} from './apis';
import {DestinationField} from './components';
const LocationModal = () => {
  const [destinationSearchItem, setDestinationSearchItem] = useState('');
  const [destinationList, setDestinationList] = useState([]);
  const [destinationLoading, setDestinationLoading] = useState(false);
  const [typingId, setTypingId] = useState(null);
  const autoCompleteDestinationField = (destination, code) => {
    setDestinationSearchItem(destination);
    setDestinationList([]);
  };
  const searchDestination = text => {
    setDestinationSearchItem(text);
    const destinationData = async () => {
      try {
        setDestinationLoading(true);
        const result = await fetchDestination(destinationSearchItem);
        setDestinationLoading(false);
        setDestinationList(result);
      } catch (error) {
        setDestinationList([]);
        Alert.alert('An error occured');
        console.log('error', error.response.data);
        setDestinationLoading(false);
      }
    };
    clearTimeout(typingId);
    const timeoutId = setTimeout(destinationData, 1000);
    setTypingId(timeoutId);
  };
  return (
    <SafeAreaView>
      <View style={[styles.screenContainer]}>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView>
          <View style={styles.backgroundContainer}>
            <Text style={[styles.header]}>Amadeus Hotel Booking</Text>
            <DestinationField
              onChange={searchDestination}
              value={destinationSearchItem}
              autoComplete={autoCompleteDestinationField}
              destinationList={destinationList}
              loading={destinationLoading}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default LocationModal;