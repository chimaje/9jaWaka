//mapdestin.js
import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import MapScreen from '../components/Mapdisplay';
import TabMenu from '../components/Navigationbar';
import Destinbar from '../components/Destinationbar';
import BusOption from '../components/Busoption';
import * as Network from 'expo-network';

const Mapdestin = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [route, setRoute] = useState(null);
  const [busStops, setBusStops] = useState(null);
  const [busOptions, setBusOptions] = useState(null); // Add state for bus options
  const [endDestin, setEndDestin] = useState({ latitude: 0, longitude: 0 });
  const [ipAddress, setIpAddress] = useState('');
  const [isbusMarkerDisplayed, setIsbusMarkerDisplayed] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Reset the search query when leaving the Mapsearch screen
      setIsbusMarkerDisplayed(!isbusMarkerDisplayed);
    });
    
    return unsubscribe;
    
  }, [navigation]);
  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await Network.getIpAddressAsync();
      console.log(ip);
      setIpAddress(ip);
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    const fetchRouteBusStops = async () => {
      if (startLocation && endLocation) {
        try {
          // Fetch coordinates for start location
          const startResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startLocation)}`);
          const startData = await startResponse.json();
  
          if (startData.length === 0) {
            console.warn('Start location not found');
            return;
          }
  
          const { lat: startLat, lon: startLon } = startData[0];
  
          // Fetch coordinates for end location
          const endResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endLocation)}`);
          const endData = await endResponse.json();
  
          if (endData.length === 0) {
            console.warn('Destination not found');
            return;
          }
  
          const { lat: endLat, lon: endLon } = endData[0];
          setEndDestin({ latitude: endLat, longitude: endLon });
  
          // API call to get route and bus stops
          const response = await fetch(`http://192.168.136.194:8000/api/calculate-route/?latitude=${startLat}&longitude=${startLon}&destination_latitude=${endLat}&destination_longitude=${endLon}`);
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          console.log("API Response Data:", data);
          
          // Parse bus stops from the data
          if (data.bus_stops) {
            const parsedBusStops = data.bus_stops.map(busStop => {
              const match = busStop.location.match(/POINT \(([^ ]+) ([^ ]+)\)/);
              if (!match) {
                console.error('Failed to parse bus stop location:', busStop.location);
                return null;
              }
              const [longitude, latitude] = match.slice(1, 3).map(Number);
              return {
                ...busStop,
                latitude,
                longitude,
              };
            }).filter(busStop => busStop !== null);
            
            setBusStops(parsedBusStops);
          }

          // Parse route data and set state
          if (data.route && data.route.geometry && data.route.geometry.coordinates) {
            const routeCoordinates = data.route.geometry.coordinates.map(coord => ({
              latitude: parseFloat(coord[1]),
              longitude: parseFloat(coord[0])
            }));
            console.log('Route Coordinates:', routeCoordinates);
            setRoute(routeCoordinates);
          } else {
            console.warn('No route found');
          }

          // Set bus options from data
          if (data.bus_options) {
            setBusOptions(data.bus_options);
            
          }
  
        } catch (error) {
          console.error('Error fetching route and bus stops:', error);
        }
      } else {
        console.log('Start or end location is missing');
      }
    };
  
    fetchRouteBusStops();
  }, [startLocation, endLocation]);

  return (
    <View style={{ flex: 1 }}>
      <Destinbar
        startLocation={startLocation}
        setStartLocation={setStartLocation}
        endLocation={endLocation}
        setEndLocation={setEndLocation}
        onSearch={() => {
          Keyboard.dismiss();
          fetchRouteBusStops();
        }}
      />
      <MapScreen 
        endLocation={endDestin} 
        route={route}
        busStops={busStops}
        isbusMarkerDisplayed = {isbusMarkerDisplayed}
      />
      {busOptions && <BusOption busOptions={busOptions} />}
      <TabMenu navigation={navigation} />
    </View>
  );
}

export default Mapdestin;
