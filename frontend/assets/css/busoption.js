import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  busBar: {
    position: 'absolute',
    width: 328,
    height: 206,
    left: 15,
    top: 477,
    backgroundColor: '#FFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1.73913,
    },
    shadowOpacity: 0.08,
    shadowRadius: 41.7391,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  busOption: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
  },
  busText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  busDetails: {
    fontSize: 14,
    color: '#555',
  },
  
  busiconcontain: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(68, 199, 129, 0.12)',
    borderRadius: 10.1969,
    justifyContent: 'center',
    alignItems: 'center',
  },
  busicon: {
    color: '#44C781',
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
