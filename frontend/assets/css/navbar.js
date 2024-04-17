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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 0,
        justifyContent: 'space-between', // Added for equivalent to gap
        paddingHorizontal: 55, // Added for equivalent to gap
        position: 'absolute',
        width: 287.26,
        height: 65,
        left: 48,
        top: 715,
    },
  });
  
