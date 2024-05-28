import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TabMenu from '../components/Navigationbar';

const Home = ({navigation})=>{
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TabMenu navigation={navigation}/>
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
