import React from 'react';
import {View,Text,TouchableOpacity,Button} from 'react-native';
import { styles} from '../../assets/css/navbar';
const TabMenu = () => {
    return(
        <View style={styles.navBar}>
                <Text>Testing</Text>
                <View style={styles.iconbar}>
                        <Text>hi</Text>
                        <Text>hello</Text>
                        <Text>works</Text>
                        <Text>lessgo</Text>
                </View>
      </View>
    );
}
export default TabMenu