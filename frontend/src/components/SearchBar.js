import React from 'react';
import {View,Text,TextInput} from 'react-native';
import { styles} from '../../assets/css/searchBar';
import Icon from 'react-native-vector-icons/AntDesign';

const searchbar = ()=>{
    return(
        <View style={styles.searchcontainer}>
            <Icon name="arrowleft" size={24} style={styles.arrowIcon}/>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input}placeholder='Search ..'>
                <Icon name="search1" size={18} style = {styles.searchIcon} color="#47FE6B"/>
                </TextInput>
            </View>
            
        </View>
    )
}
export default searchbar