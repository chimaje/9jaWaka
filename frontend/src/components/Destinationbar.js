import React from "react";
import { View,TextInput } from "react-native";
import { styles } from "../../assets/css/destinabar";
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/EvilIcons'
const destinbar = ()=> {
        return(
            <View style={styles.destincontainer}>
                <Icon name="arrowleft" size={24} style={styles.arrowIcon}/>
                <View style={styles.destinput}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}placeholder='Search ..'>
                        <Icon name="enviroment" size={18} style = {styles.searchIcon} color="#cccc"/>
                        </TextInput>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}  />
                        <View style={styles.checkIconContainer}>
                            <Icon name="check" size={18} style={styles.checkIcon} color="#FFFF" />
                        </View>
                    </View>
                </View>
                
            </View>
        );
}
export default destinbar