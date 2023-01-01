import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { commonStyles } from '../Styles/commonStyle';

const DetailScreen = ({navigation}) => {
  return (
    <View style={commonStyles.mainContainer}>
      <Text>DetailScreen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
