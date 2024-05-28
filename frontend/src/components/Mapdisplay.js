import React, { useState , useEffect} from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = ({ destination }) => {
  const [marker, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [locate,setLocation] = useState({ latitude: 0, longitude: 0 });
  const [isMarkerDisplayed, setIsMarkerDisplayed] = useState(false);

  useEffect(() => {
    if (destination) {
      setCoords({ latitude: destination.latitude, longitude: destination.longitude });
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
    })();
  }, []);
  

  const handlePress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setCoords({ latitude, longitude });
    setIsMarkerDisplayed(!isMarkerDisplayed);
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
        } : {
          latitude: locate.latitude,
          longitude: locate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handlePress}
      >
        {destination && (
          <Marker
            coordinate={destination}
            title="Destination"
            description="Selected Destination"
          />
        )}

        {isMarkerDisplayed && (
          <Marker
            coordinate={marker}
            title="Marker Title"
            description="Marker Description"
            onPress={() => setIsMarkerDisplayed(false)}
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
