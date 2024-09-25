//homepage.js
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabMenu from '../components/Navigationbar';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import * as Network from 'expo-network';
import Searchbar from '../components/SearchBar';

const Home = ({navigation})=>{
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await Network.getIpAddressAsync();
      console.log(ip);
      setIpAddress(ip);
    };

    fetchIpAddress();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Searchbar/>
      <View style={styles.textcontain}>
        <Text style = {styles.text1}>
           Recent Search
        </Text>
        <Text style = {styles.text2}>
        Recently you searched for bus stops near you.
        </Text>
      </View>
      <View style={styles.recent}>
          <Text>Recents</Text>
          <View style = {styles.recenticon}>
            <IconAntDesign name="enviroment" size={100} color="#47FE6B"  />
            <View style={styles.recentText}>
            <Text style={styles.recentTitle}>Eleko</Text>
          </View>
          <Text style={styles.distance}>1.5 Km</Text>
        </View>
          
      </View>
      <TabMenu navigation={navigation}/>
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 255, 24,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontain:{
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    position: 'absolute',
    width: 328,
    height: 73,
    left: 16,
    top: 122,

  },
  text1:{
    fontSize: 24,
  },
  text2:{
    fontSize: 14,
  },
  recent:{
    position: 'absolute',
    width: '48%',
    height: 131,
    left: 18,
    top: 235,
  },
  recenticon:{
    position: 'absolute',
    width: 156,
    height: 157,
    left: 16,
    top: 48,
    backgroundColor: 'rgba(0, 135, 24, 0.35)', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  recentText: {
    flex: 1,
    marginLeft: 10,
  },
});
