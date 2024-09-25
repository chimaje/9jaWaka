//mapdisplay.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Network from 'expo-network';

const MapScreen = ({ destination, route, busstops, endlocation,isbusMarkerDisplayed }) => {
  const [busStops, setBusStops] = useState([]);
  const [marker, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [locate, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [isMarkerDisplayed, setIsMarkerDisplayed] = useState(false);
  const [ipAddress, setIpAddress] = useState('');


  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (destination) {
      setCoords({ latitude: destination.latitude, longitude: destination.longitude });
    }
    if (destination && destination.latitude && destination.longitude) {
      fetchNearbyBusStops(destination.latitude, destination.longitude);
    }
  }, [destination]);

  useEffect(() => {
    // Request permission to access the user's location
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Set the user's location as the initial marker coordinates
      setLocation({ latitude, longitude });
      // Send the user location to find nearby bus stops
      fetchNearbyBusStops(latitude, longitude);
    })();
  }, []);

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoords({ latitude, longitude });
    setIsMarkerDisplayed(!isMarkerDisplayed);
  };

  const fetchNearbyBusStops = async (latitude, longitude) => {
   
    try {
      console.log('response');
      const response = await fetch(`http://192.168.136.194:8000/api/nearby-bus-stops/?latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      if (!Array.isArray(data)) {
        console.error('Expected an array from API, received:', data);
        return;
      }
      const parsedBusStops = data.map(busStop => {
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
    } catch (error) {
      console.error('Error fetching nearby bus stops:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={destination ? {
          latitude: destination.latitude,
          longitude: destination.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : endlocation ? {
          latitude: endlocation.latitude,
          longitude: endlocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : {
          latitude: locate.latitude,
          longitude: locate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handlePress}
      >
        {((destination || endlocation) && (
          <Marker
            coordinate={destination || endlocation}
            title="Destination"
            description="Selected Destination"
            pinColor='#DE3232'
          />
        ))||(<Marker coordinate={locate} title="User Location" pinColor='#DE3232'/>)}

        {isMarkerDisplayed && (
          <Marker
            coordinate={marker}
            title="Marker Title"
            description="Marker Description"
            onPress={() => setIsMarkerDisplayed(false)}
            pinColor='#47FE6B'
          />
        )}

        {isbusMarkerDisplayed&&busStops.length > 0 && busStops.map(busStop => (//this is for fetchnearbybusstops
          <Marker
            key={busStop.bus_stop_id }
            coordinate={{
              latitude: busStop.latitude,
              longitude: busStop.longitude,
            }}
            title={busStop.name}
            pinColor='#47FE6B'
          />
        ))}

        {busstops && busstops.length > 0 && busstops.map(busStop => (//this is for fetchrouteandbusstops
          <Marker
            key={busStop.bus_stop_id }
            coordinate={{
              latitude: busStop.latitude,
              longitude: busStop.longitude,
            }}
            title={busStop.name}
            pinColor='#47FE6B'
          />
        ))}


        {route && (
                  <Polyline
                    coordinates={route}
                    strokeColor="#47FE7B"
                    strokeWidth={6}
                  />
                )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
