import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
const Colors = {
    lighter: '#f2f2f2',
    darker: '',
    white: '#fff',
    black: '#000',
    blue: '#015eb8',
  };
export const DestinationField = ({
  onChange,
  value,
  loading,
  autoComplete,
  destinationList,
}) => (
  <View>
    <Text style={[styles.bold]}>Destination (Airport / City)</Text>
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      value={value}
      placeholder="Search for Airports and Cities"
    />
    <Text style={styles.small}>
      keyword that should represent the start of a word in a city or airport
      name or code
    </Text>
    <View
      contentInsetAdjustmentBehavior="automatic"
      style={styles.searchViewContainer}>
      {loading ? (
        <ActivityIndicator style={{marginTop: 24}} />
      ) : (
        <View>
          {destinationList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => autoComplete(item.name, item.address.cityCode)}>
              <View style={styles.destinationCard}>
                <Text
                  style={
                    styles.text
                  }>{`${item.name}, ${item.address.cityCode}`}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  bold: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 24,
    color: Colors.black,
  },
  small: {
    fontSize: 12,
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchViewContainer: {
    backgroundColor: Colors.lighter,
    position: 'absolute',
    marginTop: 100,
    width: '100%',
  },
  destinationCard: {
    marginTop: 12,
    backgroundColor: Colors.white,
    padding: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.black,
  },
});
