import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as EmailValidator from 'email-validator';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

//import SmsRetriever from 'react-native-sms-retriever';


import {createSwitchNavigator} from 'react-navigation';
import dashboard from './home.js';

//import * as firebase from 'firebase';
import firebase from '@firebase/app'
import '@firebase/auth';
import 'firebase/firestore';


/*onPress = {() => this.props.navigation.navigate('dashboard')}*/


import {
    Dimensions,
    Image, ScrollView,
    KeyboardAvoidingView,
    StatusBar, StyleSheet,
    Text, Platform,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
    ImageBackground,
} from "react-native";


import bgImage from "../images/bkg.png";
import logo from "../images/logo-placeholder.png";
import { Ionicons } from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";

const {width: WIDTH} = Dimensions.get('window');
const backButtonHeightPlatform = Platform.select({
    ios:40,
    android:10
});
const headerPadding = Platform.select({
    ios:90,
    android:60
});

let firebaseAppDefined = false;
let uid = '';
let internalPhoneNumber = '';
let verified = false;

const captchaUrl = `https://workers-ef768.firebaseapp.com/captcha.html?appurl=${Linking.createURL('')}`


export default class signUp extends Component{

    constructor(props){
        super(props);

        this.usernameInput = React.createRef();

        this.state={
            fname: '',
            lname: '',
            email: '',
            password: '',
            passwordConfirm: '',
            username:'',
            confirmationResult: undefined,
            code: ''
        };
    }

    async componentDidMount(): Promise<void> {

        try {
            //internalPhoneNumber = await SmsRetriever.requestPhoneNumber();
            //alert(internalPhoneNumber);
          } catch (error) {
            console.log(JSON.stringify(error));
          }

    }

    signUpUser = (fname, lname, username, email, password, passwordConfirm) => {
            //all fields filled?
            if (fname != '' || lname != '' || username != '' || email != '' ||  password != '' || passwordConfirm != ''){
                if(passwordConfirm.length >= 6){
                //password matches?
                    if(password === passwordConfirm){
                        //valid email?
                        if(EmailValidator.validate(email)){
                            //alert('we good to go chief');
                            //add to database
                            try{
                                    //get uid
                                    setInterval(async (): Promise<void> => {
                                        if (!firebaseAppDefined) {
                                            if (firebase.app()) {
                                                // Your code here

                                              
                                                
                                    //create user in auth
                                    firebase.auth().createUserWithEmailAndPassword(email, password);
                                                const db = firebase.firestore();
                                                firebase.auth().onAuthStateChanged( (user) => {
                                                    if (user) {
                                                        //alert('user logged in')
                                    
                                                        //TODO the login detection works but but to get the page to go to the home page -- DONE
                                                        //alert(firebase.auth().currentUser.uid);
                                                        uid = firebase.auth().currentUser.uid;
                                                        //alert(uid);
                                                        addUser();
                                                    } else {
                                                        uid = '00000';
                                                        //alert("user data not found. please sign out and sign back in");
                                                    }
                                                });

                                            
                                                firebaseAppDefined = true
                                            }
                                        }
                                    }, 100);
                                

                                //add to firestore database
                                async function addUser() {
                                    await firebase.firestore().collection('users').doc(uid).set({
                                    fname:  fname,
                                    lname: lname,
                                    email: email,
                                    username: username,
                                    });
                                }
                                
 
                            }catch(error){
                                console.log(error.toString());
                            }
                        }else{
                            alert('invalid email');
                            
                        }
                    }else{
                        alert('Passwords do not match');
                    }
                }else{
                    alert('please enter at least 6 characters for password');
                }
            }else{
                alert("Fill in all fields");
            }


        /*
        try{
            if(this.state.password.length < 6){
                alert('please enter at least 6 characters for password');
                return
            }
            firebase.auth().createUserWithEmailAndPassword(email, password);
        }catch(error){
            console.log(error.toString());
        }
        */

    };


    checkUsername(){

        //check db to see if username exists
        let query = firebase.firestore().collection('users')
        .where('username', '==', this.state.username).get()
        .then(snapshot => {
          if (snapshot.empty) {
            //console.log('No matching documents.');
            //alert('no match');
            return;
          }else{
              alert('This Username is already taken \n Please choose another');
              this.textInputRef.clear();
                this.setState({
                    username: '',
                });
              return;
          }
      
          snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
          });
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

        //if exists, clear state and clear text input

        //clear input
        /*
        this.textInputRef.clear();
        this.setState({
            username: '',
        });
        */

    }



    render() {
        return (


            <LinearGradient colors={['#071E36', '#2D5177']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.header}>
                <View style={styles.backHolder}>
                        <LinearGradient
                            style={[StyleSheet.absoluteFill, styles.gradientHolder]}
                            colors={['#96BE76', '#2C4A6A']}
                            start={{x: -.9, y: 0}} end={{x: 0.3, y: 1.5}}
                            locations={[0, 0.9]}
                        >
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}}
                                            onPress={() => this.props.navigation.goBack(null)}>
                                <Ionicons
                                    name="ios-arrow-round-back"
                                    color='white'
                                    size={20}
                                />
                                <Text style={{color: 'white'}}>go back</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </View>
                
                <ScrollView keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>

                    <KeyboardAwareScrollView
                    enableAutomaticScroll={(Platform.OS === 'ios')}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={styles.container}
                    scrollEnabled={true}
                    >
                
                <View style={styles.container}>
                        <View style={styles.usernameView}>
                            <Ionicons name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                            <TextInput
                                style={styles.login_input}
                                placeholder = {'First Name'}
                                placeholderTextColor={'white'}
                                underlineColorAndroid = 'transparent'
                                autoCapitalize = 'none'
                                autoCorrect={false}
                                onChangeText = {(fname) => this.setState({fname})}
                            />
                        </View>
                        <View style={styles.usernameView}>
                            <Ionicons name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                            <TextInput
                                style={styles.login_input}
                                placeholder = {'Last Name'}
                                placeholderTextColor={'white'}
                                underlineColorAndroid = 'transparent'
                                autoCapitalize = 'none'
                                autoCorrect={false}
                                onChangeText = {(lname) => this.setState({lname})}
                            />
                        </View>
                        <View style={styles.usernameView}>
                            <Ionicons name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                            <TextInput
                                ref={ref => this.textInputRef = ref}
                                style={styles.login_input}
                                placeholder = {'Username'}
                                placeholderTextColor={'white'}
                                underlineColorAndroid = 'transparent'
                                autoCapitalize = 'none'
                                autoCorrect={false}
                                onChangeText = {(username) => this.setState({username})}
                                onBlur = {() => this.checkUsername()}
                            />
                        </View>
                        <View style={styles.usernameView}>
                            <Ionicons name={'ios-mail'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
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
                        <View style={styles.passwordView}>
                            <Ionicons name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                            <TextInput
                                style={styles.login_input_password}
                                placeholder = {'Confirm Password'}
                                placeholderTextColor={'white'}
                                underlineColorAndroid = 'transparent'
                                secureTextEntry={true}
                                onChangeText = {(passwordConfirm) => this.setState({passwordConfirm})}
                            />

                        </View>
                    

                        <View style={styles.btnView}>
                            
                            <TouchableOpacity
                                style={styles.signupbtn}
                                onPress = {() => this.signUpUser(this.state.fname, this.state.lname, this.state.username, this.state.email, this.state.password, this.state.passwordConfirm)}
                            >
                                <Text style={styles.btnText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity>
                            <Text style={styles.forgot_pass}> Terms and Service Agreement </Text>
                        </TouchableOpacity>

                            </View>
                            </KeyboardAwareScrollView>
                </ScrollView>
            </LinearGradient>

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
    header: {
        paddingTop: headerPadding ,
        padding: 20,
        backgroundColor: 'transparent',
        alignSelf: 'stretch',
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
        
    },
    passwordView: {
        height: 70,
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
        overflow: 'hidden',
    },
    number_input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        paddingTop: 12,
        
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
        width: (WIDTH - 200),
        height: 45,
        borderRadius: 45,
        backgroundColor: '#90b4ed',
        marginTop: 15,
        //marginLeft: (WIDTH - 55)/4,
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
    },container: {
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
    backArrow: {
        position: 'absolute',
        top: 55,
        left: 5,
        zIndex: 12,

    },
    backHolder:{
        position: 'absolute',
        top: backButtonHeightPlatform,
        zIndex: 12,
        width: 75,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 5,
        left: 0,
        overflow: 'hidden',
    },
    gradientHolder:{
        paddingTop: 6,
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
      },
});
