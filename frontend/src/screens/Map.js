//map.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabMenu from '../components/Navigationbar';
import MapScreen from '../components/Mapdisplay';

const Map= ({navigation,destination,query})=>{
  return (
    <View style={styles.container}>
        <MapScreen query={query} destination={destination}/>
      <TabMenu navigation={navigation}/>
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
export default Map;