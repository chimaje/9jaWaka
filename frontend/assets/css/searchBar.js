import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchcontainer: {
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2', // Background color for TextInput
    borderRadius: 8,
    marginLeft: 16,
    justifyContent:'space-between',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000', // Text color // Text color
  },
  searchIcon:{
    position: 'absolute',
    width: 18,
    height: 18,
    left: 48,
    top: 8, 
  },
  
  });
  
  
