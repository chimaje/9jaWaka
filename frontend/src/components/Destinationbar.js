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
                        <TextInput style={styles.input} />
                        <View style={styles.MapIconContainer}>
                            <Icon name="enviroment" size={13} color="#374151" />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}  />
                        <View style={styles.checkIconContainer}>
                            <Icon name="check" size={13} style={styles.checkIcon} color="#FFFF" />
                        </View>
                    </View>
                </View>
                
            </View>
        );
}
export default destinbar