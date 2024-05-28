import React, {useState,useEffect}from 'react';
import {StyleSheet, View } from 'react-native';
import MapScreen from '../components/Mapdisplay';
import Searchbar from '../components/SearchBar';
import TabMenu from '../components/Navigationbar';
import {useIsFocused} from '@react-navigation/native'

const Mapsearch = ({navigation}) => {
  const [destination, setDestination] = useState(null);
  const [query, setQuery] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      // Reset the search query when leaving the Mapsearch screen
      setQuery('');
    });
    
    return unsubscribe;
    
  }, [navigation]);

  const handleSearch = (selectedDestination) => {
    setDestination(selectedDestination);
  };
  return (
    <View style={styles.container}>
      <Searchbar value={query} onSearch={handleSearch}/>
      <MapScreen  style={styles.mapContainer} query={query} destination={destination}/>
      <TabMenu navigation={navigation} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
});

export default Mapsearch;
