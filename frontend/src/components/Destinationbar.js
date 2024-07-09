import React from 'react';
import { View, TextInput } from 'react-native';
import { styles } from "../../assets/css/destinabar";
import Icon from 'react-native-vector-icons/AntDesign';

const Destinbar = ({ startLocation, setStartLocation, endLocation, setEndLocation,onSearch }) => {

  const handleKey = (event) => {
    if (event.nativeEvent.key === 'Enter'){
      Keyboard.dismiss();
      console.log(startLocation)
      console.log(endLocation)
      onSearch();
    }
  };
  const handlePress=()=>{
    console.log(startLocation)
    console.log(endLocation)
      onSearch();
  }
  return (
    <View style={styles.destincontainer}>
      <Icon name="arrowleft" size={24} style={styles.arrowIcon} />
      <View style={styles.destinput}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Start Location"
            value={startLocation}
            onChangeText={setStartLocation}
          />
          <View style={styles.MapIconContainer}>
            <Icon name="enviroment" size={13} color="#374151" />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="End Location"
            value={endLocation}
            onChangeText={setEndLocation}
            onSubmitEditing={handleKey}
          />
          <View style={styles.checkIconContainer}>
            <Icon name="check" size={13} style={styles.checkIcon} color="#FFFF" onPress={handlePress} />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Destinbar;
