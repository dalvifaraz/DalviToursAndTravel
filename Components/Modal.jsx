import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Calendar from 'react-native-calendar-range-picker';
import moment from 'moment';
import {locations} from '../Constant/hotelConstant';

export const ModalComponent = ({
  animationType,
  transparent,
  visible,
  onRequestClose,
  modal,
  setModal,
  headerTitle,
  setLocationSearch,
  locationSearch,
  dateRange,
  setDateRange,
  setDestinationId,
}) => {
  const handleOnLocationSelect = (value, id) => {
    setLocationSearch(value);
    setDestinationId(id);
    setModal({visible: false, name: ''});
  };

  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}>
      <SafeAreaView style={{margin: 8}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{headerTitle}</Text>
          <Ionicons
            name="close"
            size={24}
            onPress={() => setModal({...modal, visible: false, name: ''})}
          />
        </View>
        {modal?.name === 'location' && (
          <>
            <View>
              {/* <View style={styles.inputContainer}>
                <TextInput
                  style={{paddingHorizontal:16}}
                  onChangeText={setLocationSearch}
                  value={locationSearch}
                  placeholder="Enter the destination to..."
                />
              </View> */}
              <View style={styles.inputContainerView}>
                <TextInput
                  style={styles.inputContainer}
                  onChangeText={setLocationSearch}
                  value={locationSearch}
                  placeholder="Enter location..."
                />
                <Button title="CLEAR" onPress={() => setLocationSearch('')} />
              </View>
              <Text style={styles.small}>
                keyword that should represent the start of a word in a city name
                or code
              </Text>
              <View>
                <ScrollView>
                  {locations &&
                    locations.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          handleOnLocationSelect(item.name, index)
                        }>
                        <View style={styles.destinationCard}>
                          <Text style={styles.text}>{`${item.name}`}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </View>
          </>
        )}
        {modal?.name === 'date' && (
          <Calendar
            disabledBeforeToday={true}
            startDate={moment()}
            endDate={moment().add(1, 'days')}
            isMonthFirst
            onChange={({startDate, endDate}) => {
              setDateRange({...dateRange, startDate, endDate});
            }}
          />
        )}
        {modal?.name === 'count' && <Text>Hello Count!</Text>}
      </SafeAreaView>
    </Modal>
  );
};

ModalComponent.propTypes = {
  animationType: PropTypes.string,
  transparent: PropTypes.bool,
  visible: PropTypes.bool,
  onRequestClose: PropTypes.func,
  modal: PropTypes.object,
  setModal: PropTypes.func,
  headerTitle: PropTypes.string,
  setLocationSearch: PropTypes.func,
  locationSearch: PropTypes.string,
  dateRange: PropTypes.object,
  setDateRange: PropTypes.func,
  setDestinationId: PropTypes.func,
};

// Same approach for defaultProps too
ModalComponent.defaultProps = {
  animationType: 'slide',
  transparent: false,
  visible: false,
  headerTitle: 'Close',
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flex:1,
  },
  inputContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  small: {
    fontSize: 12,
    marginBottom: 20,
  },
  destinationCard: {
    marginTop: 12,
    backgroundColor: 'white',
    padding: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
});
