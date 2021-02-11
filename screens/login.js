import React, {Component} from 'react';

import {createSwitchNavigator} from 'react-navigation';
import dashboard from './home.js';
import signUp from './signup.js';

//import * as firebase from 'firebase';
import firebase from '@firebase/app'
import '@firebase/auth';
import 'firebase/firestore';


/*onPress = {() => this.props.navigation.navigate('dashboard')}*/


import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    StatusBar, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    ImageBackground,
} from "react-native";


import bgImage from "../images/bkg.png";
import logo from "../images/logo-placeholder.png";

import { Ionicons } from '@expo/vector-icons';


const {width: WIDTH} = Dimensions.get('window');

export default class login extends Component{

    constructor(props){
        super(props);

        this.state={
            email: '',
            password: '',
            authenticating: false,
        };
    }


    signIn(){
        this.setState({
            authenticating: true
        });
    }

    signUpUser = (email, password) => {
        this.props.navigation.navigate('signUp');
        
        
        try{

            if(this.state.password.length < 6){
                alert('please enter at least 6 characters for password');
                return
            }

            firebase.auth().createUserWithEmailAndPassword(email, password);
                
            
            
            

        }catch(error){
            console.log(error.toString());
        }
        
        
    };


    loginUser = (email, password) => {

        try{

            firebase.auth().signInWithEmailAndPassword(email, password).then(this.props.navigation.navigate('dashboard'));

        }catch(error){
            alert('Something went wrong.\ntry again');
            console.log(error.toString());
        }

    };


    render() {
        if(this.state.authenticating){

                return(
                    <ImageBackground source={bgImage} style={styles.spinner}>
                        <ActivityIndicator size='large'/>
                    </ImageBackground>
                )

        }
        return (

            <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                <StatusBar
                    barStyle='light-content'
                />
                <KeyboardAvoidingView behavior={'position'}>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo}/>
                        <Text style={styles.logoText}>Friend Sync</Text>
                    </View>
                    <View style={styles.usernameView}>
                        <Ionicons name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.login_input}
                            placeholder = {'Email'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid = 'transparent'
                            autoCapitalize = 'none'
                            autoCorrect={false}
                            onChangeText = {(email) => this.setState({email})}
                        />
                    </View>
                    <View style={styles.passwordView}>
                        <Ionicons name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.login_input_password}
                            placeholder = {'Password'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid = 'transparent'
                            secureTextEntry={true}
                            onChangeText = {(password) => this.setState({password})}
                        />

                    </View>

                    <View style={styles.btnView}>
                        <TouchableOpacity
                            style={styles.loginbtn}
                            onPress = {() => this.loginUser(this.state.email, this.state.password)}
                        >
                                <Text style={styles.btnText}>login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.signupbtn}
                            onPress = {() => this.props.navigation.navigate('signUp')}
                        >
                            <Text style={styles.btnText}>sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.forgot_pass}> forgot password? </Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>

            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    logo: {
        width: 120,
        height: 120,
    },
    logoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.9
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    login_input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
    },
    inputIcon: {
        position: 'absolute',
        left: 37,
        top: 8

    },
    usernameView: {
        height: 70,
        flexDirection: 'row',
        marginTop: 250
    },
    passwordView: {
        flexDirection: 'row',
    },
    btnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_input_password:{
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
    },
    loginbtn: {
        width: (WIDTH - 55)/2.8,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#90b4ed',
        marginTop: 15,
        justifyContent: 'center',

    },
    btnText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',

    },
    signupbtn: {
        width: (WIDTH - 55)/2.8,
        height: 45,
        borderRadius: 45,
        backgroundColor: '#90b4ed',
        marginTop: 15,
        marginLeft: (WIDTH - 55)/4,
        justifyContent: 'center',
    },
    forgot_pass:{
        color: '#477ed3',
        marginTop: 10,
        textAlign: 'center',
    },
    showPass: {
        position: 'absolute',
        top: 13,
        right: 37,
    },
    spinner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
});
