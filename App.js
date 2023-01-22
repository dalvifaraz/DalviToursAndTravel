/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from './Styles/color';
import OfferScreen from './Screens/OfferScreen';
import HomeScreen from './Screens/HomeScreen';
import FavoriteScreen from './Screens/FavoriteScreen';
import SearchScreen from './Screens/SearchScreen';
import SettingsScreen from './Screens/SettingsScreen';
import DetailScreen from './Screens/DetailScreen';
import HotelScreen from './Screens/HotelScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerStyle: {backgroundColor: colors.headerBackgroundColor},
        headerTitleStyle: {color: colors.headerFontColor},
      })}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Hotel" component={HotelScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    // <SafeAreaView>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomePage"
          screenOptions={({route}) => ({
            headerShown: route.name !== 'HomePage' && true,
            headerStyle: {backgroundColor: colors.headerBackgroundColor},
            headerTitleStyle: {color: colors.headerFontColor},
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              switch (route.name) {
                case 'Search':
                  iconName = focused ? 'search' : 'search-outline';
                  break;
                case 'Favorite':
                  iconName = focused ? 'star' : 'star-outline';
                  break;
                case 'HomePage':
                  iconName = focused ? 'home' : 'home-outline';
                  break;
                case 'Offers':
                  iconName = focused ? 'pricetags' : 'pricetags-outline';
                  break;
                case 'Settings':
                  iconName = focused ? 'ios-list' : 'ios-list-outline';
                  break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.tabIconColorFocused,
            tabBarInactiveTintColor: colors.tabIconColor,
            tabBarStyle: {
              backgroundColor: colors.tabBackgroundColor,
              paddingTop: 10,
            },
          })}>
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen
            name="Favorite"
            component={FavoriteScreen}
            options={{tabBarBadge: 10, tabBarBadgeStyle: {opacity: 0.7}}}
          />
          <Tab.Screen name="HomePage" component={HomeStackScreen} />
          <Tab.Screen name="Offers" component={OfferScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
