import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors' 

function ViewImageScreen(props) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/chair.jpg')} resizeMode='contain' />
            <View style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={35} color={colors.white}/>
            </View>
            <View style={styles.deleteButton}>
                <MaterialCommunityIcons name="trash-can-outline" size={35} color={colors.white}/>
            </View>
            
        </View>
    );
}


const styles = StyleSheet.create({
    closeButton:{
        position: 'absolute', 
        top: 40,
        left: 30,
    },
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: 'center'
    },
    image:{
        height: '100%',
        width: '100%'
    },
    deleteButton:{
        position: 'absolute',
        top: 40,
        right: 30,
    }
    
})

export default ViewImageScreen;