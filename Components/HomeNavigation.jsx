import {Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeNavigation = ({show, setShow}) => {
  const homeNavIcon = [
    {name: 'airplane', name_focused: 'airplane-outline', color: '#f5717e'},
    {name: 'business', name_focused: 'business-outline', color: '#f5717e'},
    {name: 'train', name_focused: 'train-outline', color: '#f5717e'},
    {name: 'bus', name_focused: 'bus-outline', color: '#f5717e'},
    {name: 'car', name_focused: 'car-outline', color: '#f5717e'},
  ];

  const handlePress = name => {
    let active = Object.keys(show).filter(k => show[k] === true);
    setShow(prevState => ({...prevState, [active]: false, [name]: true}));
  };

  return (
    <View style={styles.container}>
      {homeNavIcon.map((icon, index) => {
        return (
          <Pressable key={index} onPress={() => handlePress(icon.name)}>
            {({pressed}) => (
              <>
              <Ionicons
                name={icon.name}
                size={24}
                color={pressed ? 'black':icon.color}
              />
              </>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({
  container: {
    // borderColor: 'red',
    // borderWidth: 2,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
