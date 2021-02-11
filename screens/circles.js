import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
    StyleSheet,
    Text, View,
    StatusBar,
    Dimensions
} from 'react-native';

const WIDTH = Dimensions.get('window').width; //full width
const HEIGHT = Dimensions.get('window').height; //full height

export default class Circles extends Component{
    render() {
        return (
            <React.Fragment> 
            <StatusBar barStyle="light-content"></StatusBar>
            <View style={styles.container}>
            <LinearGradient
            colors={['#071E36', '#2D5177']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center',justifyContent: 'center'}}>
                <Text style={styles.buttonText}>Main Home screen</Text>
                </LinearGradient>
            </View>
            </React.Fragment>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    buttonText: {
        fontSize: 18,
        //fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});