//App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Mapsearch from './src/screens/MapSearch';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Homepage';
import TabMenu from './src/components/Navigationbar';
import Map from './src/screens/Map';
import Mapdestin from './src/screens/MapDestin';

const Stack = createStackNavigator();
export default function App() {
  return (
    
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false,}}>
            <Stack.Screen name="Home" component={Home} />
             <Stack.Screen name="Search" component={Mapsearch} />
             <Stack.Screen name="Map" component={Map} />
             <Stack.Screen name="Mapdestin" component={Mapdestin} />
        </Stack.Navigator>
    </NavigationContainer>
    
   
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
