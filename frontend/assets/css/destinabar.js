import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  destincontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent:'space-between',
    paddingTop: 50, 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0, // Background color of the search bar
    zIndex: 999,
  },
  arrowIcon: {
    marginRight: 20,
    color: '#000', // Adjust color as needed
  },
  inputContainer: {
    flex: 1, 
    marginLeft: 46,
    justifyContent:'space-between',
    marginTop:20,
    marginBottom:0,
    top:15,
    width:200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2', // Background color for TextInput
    borderRadius: 8,
    paddingRight: 8, // Add some padding to the right to separate the check icon
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000', // Text color // Text color
  },
  destinput:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    paddingTop: 50, 
    position: 'absolute',
  },
  checkIconContainer: {
    position: 'absolute',
    left: 8, // Adjust the position as needed
    top: '50%', // Center vertically
    transform: [{ translateY: -9 }], // Adjust the translateY to center vertically
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#47FE6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon:{
    color: '#FFF',
  }
  
  });
  
  
