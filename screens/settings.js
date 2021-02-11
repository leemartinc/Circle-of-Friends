import React, {Component} from 'react';

import Account from './settings/account.js';

import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    ScrollView, TouchableOpacity,
    Button,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore';



export default class Settings extends Component{

    constructor() {
        super();

    }

    signOutUser = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        return (


            <LinearGradient colors={['#071E36', '#2D5177']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.settingsHolder}>
                            <TouchableOpacity
                                style={styles.touch}
                                onPress={() => this.props.navigation.navigate('Account')}
                            >
                                <Text style={styles.normalContent}>Your Account</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.settingsHolder}>
                            <TouchableOpacity
                                style={styles.touch}
                                onPress={() => Alert.alert(
                                    'Are you sure you want to Sign Out?',
                                    ' ',
                                    [
                                        {text: 'No', onPress: () => console.log('Cancel Pressed!')},
                                        {text: 'Yes', onPress: () => this.signOutUser()},
                                    ],
                                    { cancelable: false }
                                )}
                            >
                                <Text style={styles.dangerContent}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    dangerContent: {
        fontSize: 20,
        //fontFamily: 'Gill Sans',
        textAlign: 'left',
        margin: 10,
        color: 'red',
        backgroundColor: 'transparent',
    },
    settingsHolder:{
        borderTopWidth: .3,
        borderBottomWidth: .3,
        borderBottomColor: 'gray',
        borderTopColor: '#8998af',
        height: 80,
        justifyContent: 'center',
    },
    touch: {
    },
    normalContent: {
        fontSize: 20,
        //fontFamily: 'Gill Sans',
        textAlign: 'left',
        margin: 10,
        color: 'white',
        backgroundColor: 'transparent',
    }
});