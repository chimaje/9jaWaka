import React from 'react';
import {  Text, View } from 'react-native';
import MapScreen from '../components/Mapdisplay';
import TabMenu from '../components/Navigationbar';
import Destinbar from '../components/Destinationbar';
const Mapdestin = () =>{
    return(
            <View>
                <Destinbar/>
                <MapScreen/>
                <TabMenu/>
            </View>
    );
}
export default Mapdestin;