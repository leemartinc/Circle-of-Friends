import React, {Component} from 'react';

import {
    StatusBar,
    StyleSheet,
    Text, View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class Events extends Component{
    render() {
        return (


            <LinearGradient colors={['#071E36', '#2D5177']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>

                    <Text style={styles.buttonText}>Event screen</Text>


                </View>
            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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