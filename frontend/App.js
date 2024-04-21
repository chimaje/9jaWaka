import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabMenu from './src/components/Navigationbar';
import Searchbar from './src/components/SearchBar';
import Destinbar from './src/components/Destinationbar';

export default function App() {
  return (
    <View style={styles.container}>
     
      <StatusBar style="auto" />
      <TabMenu/>
      {/* <Searchbar/> */}
      <Destinbar/>
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
