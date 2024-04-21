import React from 'react';
import {View,Text,TouchableOpacity,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconMap from 'react-native-vector-icons/Entypo';
import { LinearGradient } from 'react-native-linear-gradient';
import { styles} from '../../assets/css/navbar';



const TabMenu = () => {
    return(
        <View style={styles.navBar}>
                <View style={styles.iconbar}>
                    <Icon name="home" size={24} color="#47FE6B" style={styles.homeIcon} />
                    {/* <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradientContainer}> */}
                        <IconAntDesign name="enviroment" size={24} color="#47FE6B" />
                    {/* </LinearGradient>           */}
                    <IconMap name ="map" size={24} color="#47FE6B"/>
                    <IconMap name ="line-graph" size = {24} color="#47FE6B" />
                </View>
        </View>
    );
}
export default TabMenu