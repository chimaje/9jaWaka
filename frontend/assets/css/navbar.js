import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    navBar: {
      position: 'absolute',
      width: 360,
      height: 69,
      left: 0,
      top: 737,
      backgroundColor: '#FFFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1.73913,
      },
      shadowOpacity: 0.08,
      shadowRadius: 41.7391,
      borderRadius: 24,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    iconbar:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      paddingHorizontal: 5, // Padding equivalent to gap
      position: 'absolute',
      width: 287.26,
      height: 65,
      left: 35,
      justifyContent: 'space-between',
    },
    homeIcon: {
      width: 24,
      height: 24,
      backgroundColor: 'rgba(0, 255, 24, 0.12)',
      borderRadius: 6,
      flex: 0,
      flexGrow: 0,
    },
    gradientContainer :{
      flex: 1, /* Ensure the gradient fills the entire container */
      borderRadius: 6, /* Adjust the border radius as needed */
    },
    iconMask :{
      flex: 1, /* Ensure the icon fills the container */
      justifyContent: 'center', /* Center the icon vertically */
      alignItems: 'center', /* Center the icon horizontally */
    },
  });
  
  
