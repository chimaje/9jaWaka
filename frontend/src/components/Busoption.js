//busoptions.js
import React from 'react';
import { View, Text ,ScrollView} from 'react-native';
import { styles } from "../../assets/css/busoption";
import IconBus from 'react-native-vector-icons/MaterialCommunityIcons';

const BusOption = ({ busOptions }) => {
  return (
    <View style={styles.busBar}>
      <ScrollView  contentContainerStyle={styles.scrollContainer}>
      {busOptions && busOptions.length > 0 ? (
          busOptions.map((option, index) => (
            <View key={index} style={styles.busOption}>
              <View style={styles.busiconcontain}>
                <IconBus name='bus-stop' size={20} style={styles.busicon} />
              </View>
              <View>
                <Text style={styles.busText}>{option.bus_option_name}</Text>
                <Text style={styles.busDetails}>{option.fare}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>No bus options available</Text>
        )}
      </ScrollView>
    </View>
  );
}

export default BusOption;
