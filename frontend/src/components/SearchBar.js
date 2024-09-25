//searchbar
import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import { styles } from '../../assets/css/searchBar';
import Icon from 'react-native-vector-icons/AntDesign';

const Searchbar = ({ value, onSearch }) => {
  const [searchText, setSearchText] = useState(value);

  useEffect(() => {
    setSearchText(value);
  }, [value]);


  const performSearchAndGetSelectedDestination = async (query) => {
    try {
      // Construct the URL for the Nominatim API
      const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

      // Make a GET request to the Nominatim API
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Check if the response contains any results
      if (data.length > 0) {
        // Extract latitude and longitude from the first result
        const { lat, lon } = data[0];
        return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
      } else {
        // Handle the case when no results are found
        console.error('No results found');
        return null;
      }
    } catch (error) {
      // Handle errors that occur during the API request
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const handleSearch = async () => {
    // Perform search logic and get the selected destination
    const selectedDestination = await performSearchAndGetSelectedDestination(searchText);
    // Pass the selected destination to the parent component
    onSearch(selectedDestination);
  };

  return (
    <View style={styles.searchcontainer}>
      <Icon name="arrowleft" size={24} style={styles.arrowIcon} />
      <View style={styles.inputContainer}>
        <Icon name="search1" size={18} style={styles.searchIcon} color="#47FE6B" />
        <TextInput
          style={styles.input}
          placeholder="Search ..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // Call handleSearch when the user submits the input
        />
      </View>
    </View>
  );
};

export default Searchbar;
