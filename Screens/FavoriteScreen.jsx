import { ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { commonStyles } from '../Styles/commonStyle'
import { hotelData } from '../Constant/hotelConstant'
import CardView from '../Components/CardView'

const FavoriteScreen = () => {
  return (
    <ScrollView style={commonStyles.mainContainer}>
    <CardView hotelData={hotelData}/>
    </ScrollView>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({})