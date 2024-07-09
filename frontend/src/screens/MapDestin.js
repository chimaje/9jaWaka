import React, { useState, useEffect  } from 'react';
import { View } from 'react-native';
import MapScreen from '../components/Mapdisplay';
import TabMenu from '../components/Navigationbar';
import Destinbar from '../components/Destinationbar';
import * as Network from 'expo-network';

const Mapdestin = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [route,setRoute]=useState(null);
  const [busstops,setBusStops] = useState(null);
  const [enddestin,SetendDestin]=useState({ latitude: 0, longitude: 0 });
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);
    };

    fetchIpAddress();
  }, []);

  // const fetchRoute_busstops = async() =>{
  //   if (startLocation && endLocation){
  //     try{
  //        // Fetch coordinates for start location
  //        const startResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startLocation)}`);
  //        const startData = await startResponse.json();
  //        if (startData.length > 0) {
  //          const { lat: startLat, lon: startLon } = startData[0];
 
  //          // Fetch coordinates for end location
  //          const endResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(endLocation)}`);
  //          const endData = await endResponse.json();
  //          if (endData.length > 0) {
  //            const { lat: endLat, lon: endLon } = endData[0];
  //            SetendDestin(endLat,endLon);
  //            //api call to get route and busstops
  //             const response = await fetch(`http://192.168.21.159:8081/api/calculate-route/?latitude=${startLat}&longitude=${startLon}&destination_latitude=${endLat}&destination_longitude=${endLon}`);
  //             const data = await response.json();
  //             setRoute(data.route);
  //             setBusStops(data.bus_stops);
  //          }else{
  //           console.warn('Destination not found')
  //          }
  //       }else{
  //         console.warn('Start location not found')
  //        }
  //     }
  //     catch(error){
  //       console.error('Error fetching route and busstops',route)
  //     }
  //   }
    
  // };
  useEffect(() => {
    const fetchRoute_busstops = async () => {
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
          SetendDestin({ latitude: endLat, longitude: endLon });
  
          // API call to get route and bus stops
          const response = await fetch(`http://10.188.175.158:8000/api/calculate-route/?latitude=${startLat}&longitude=${startLon}&destination_latitude=${endLat}&destination_longitude=${endLon}`);
  
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
          // console.log(data.route);
          if (data.route && data.route.geometry && data.route.geometry.coordinates) {
            const routeCoordinates = data.route.geometry.coordinates.map(coord => ({
              latitude: parseFloat(coord[1]),
              longitude: parseFloat(coord[0])
            }));
            console.log('Route Coordinates:', routeCoordinates);
            setRoute(routeCoordinates);
          }else {
            console.warn('No route found');
          }
  
        } catch (error) {
          console.error('Error fetching route and bus stops:', error);
        }
      } else {
        console.warn('Start or end location is missing');
      }
    };
  
    fetchRoute_busstops();
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
          fetchRoute_busstops();
        }}
      />
      <MapScreen 
      endLocation={enddestin} 
      route = {route}
      busstops = {busstops}/>
      <TabMenu navigation={navigation} />
    </View>
  );
}

export default Mapdestin;
