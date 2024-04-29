import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabMenu from './src/components/Navigationbar';
import Searchbar from './src/components/SearchBar';
import Destinbar from './src/components/Destinationbar';
import MapScreen from './src/components/Mapdisplay';

export default function App() {
  return (
    <View style={styles.container}>
     
      <StatusBar style="auto" />
      <MapScreen  />
      <TabMenu/>
      <Searchbar/> 
      {/* <Destinbar/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
