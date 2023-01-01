import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Radio = ({
  data,
  containerStyle,
  wrapperStyle,
  labelStyle,
  setTrip,
  trip,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {data.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => setTrip(item.value)}
            style={[styles.radioButtonWrapper, wrapperStyle]}>
            <View style={styles.outerCircle}>
              {item.value === trip && <View style={styles.innerCircle} />}
            </View>
            <Text style={labelStyle}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  radioButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  outerCircle: {
    borderColor: 'black',
    borderWidth: 0.5,
    width: 18,
    height: 18,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  innerCircle: {
    backgroundColor: 'black',
    width: 11,
    height: 11,
    borderRadius: 11,
  },
});
