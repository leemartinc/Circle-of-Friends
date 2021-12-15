import React, {Component} from 'react';
import {AsyncStorage, Dimensions} from 'react-native';
import ignoreWarnings from 'react-native-ignore-warnings';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';



ignoreWarnings('Setting a timer');

import {
    StatusBar,
    StyleSheet,
    Text, View,
    Platform,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image
} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';
import { hidden } from 'ansi-colors';
import { tsMethodSignature } from '@babel/types';

const backButtonHeightPlatform = Platform.select({
    ios:95,
    android:90
});

let firebaseAppDefined = false;
let firstName = '';
let lastname = '';
let _email = '';
let _number = '';
let _uid = '';
let _username = '';

let imgPath = '0000'; 
let imgURL = '';


setInterval(async (): Promise<void> => {
    if (!firebaseAppDefined) {
        if (firebase.app()) {
            // Your code here

            const db = firebase.firestore();
            firebase.auth().onAuthStateChanged( (user) => {
                if (user) {
                    //alert('user logged in')

                    //TODO the login detection works but but to get the page to go to the home page -- DONE
                    //alert(firebase.auth().currentUser.uid);
                    _uid = firebase.auth().currentUser.uid;
                    imgPath = 'images/users/'+_uid+'/pfp.jpg';
    
                    

                    
                } else {
                    _uid = '00000';
                    //alert("user data not found. please sign out and sign back in");
                }
            });

            firebaseAppDefined = true
        }
    }
}, 100);



export default class Account extends Component{
    constructor(props){
        super(props);
        this.state={
            fname: '',
            lname: '',
            email: '',
            username:'',
            spinner: true,
            imageUpload: null,
            uid: '',
            imgURLState: '',
        };


    }

    async componentDidMount(): Promise<void> {
        this.setState({
            fname: '',
            lname: '',
            email: '',
            uid: '',
            imgURLState: '', 
            username:'',
        });

        //alert(_uid);

        


        if (firebaseAppDefined) {
            
            try{
            imgURL = await firebase.storage().ref(imgPath).getDownloadURL();
        }catch (error) {
            // Error retrieving data
            imgURL = await firebase.storage().ref('images/defaults/no_pfp.png').getDownloadURL();
            //alert("photo not found")
        }

            this.ref = firebase.firestore().collection('users').doc(_uid);
            //this.ref.onSnapshot(this.onCollectionUpdate)
            await this.ref.get().then(function (doc) {
                if (doc.exists) {
                    const {fname, lname, email, username} = doc.data();
                    //alert(fname + " " + lname);

                    //alert(firstName)
                    firstName = fname;
                    lastname = lname;
                    _email = email;
                    _username = username;

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });
        }
        
        this._storeData();

        const fname = await AsyncStorage.getItem('key:fname');
        //alert(fname);
        const lname = await AsyncStorage.getItem('key:lname');
        const email = await AsyncStorage.getItem('key:email');
        const number = await AsyncStorage.getItem('key:number');
        const img_url = await AsyncStorage.getItem('key:imgURL');
        const userName = await AsyncStorage.getItem('key:username');
        //alert(img_url);

        this._getImage();


        this.setState({
            fname: fname,
            lname: lname,
            email: email,
            username:userName,
            number: number,
            uid: _uid,
            imgURLState: img_url, 
            spinner: false,
        });
    


    }

    _getImage = async () => {

        //const imgref = firebase.storage().ref(imgPath);
        
        
        let { state } = this
        firebase.storage().ref(imgPath).getDownloadURL().then((url) => {
          state[image] = url
          this.setState(state)
        }).catch((error) => {
          // Handle any errors
          //alert('pic not found');
        })

        // alert(imgURL);
      }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('TASKS');
            if (value !== null) {
                // We have data!!
                console.log(value);
                alert(value);
            }
        } catch (error) {
            // Error retrieving data
            alert("error")
        }
    };

    _storeData = async () => {
        //alert(imgURL);
        try {
            
            await AsyncStorage.multiSet([
                ['key:fname', firstName],
                ['key:lname', lastname],
                ['key:email', _email],
                ['key:number', _number],
                ['key:imgURL', imgURL],
                ['key:username', _username]
                ]);
        } catch (error) {
            alert("data not found");
        }
    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }

      _pickImage = async () => {
        this.getPermissionAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.uploadImage(result.uri)
          .then(()=> {
            this.setState({
                spinner: false,
            });
            //alert('Profile Picture Successfully changed');
            //this.render();
            this.componentDidMount();
          })
          .catch((error) =>{
            this.setState({
                spinner: false,
            });
              alert('Error - profile picture not updated', error);
          });
        }
      };
    

    uploadImage = async(uri) => {
        this.setState({
            spinner: true,
        });
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/users/"+_uid+"/pfp.jpg");
        return ref.put(blob);
    }

    

    render() {

            
            return (
                <LinearGradient colors={['#071E36', '#2D5177']}
                                start={{x: 0, y: 1}}
                                end={{x: 1, y: 0}}
                                style={styles.container}>
                    <StatusBar barStyle="light-content"/>
                    <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                    />
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
                    <View style={styles.imageHolder}>
                        <Image
                            style={styles.userImage}
                            source={this.state.imgURLState ? {uri: this.state.imgURLState} : null}
                        />
                        <TouchableOpacity onPress={this._pickImage}>
                        <Text style={styles.change_pfp}> Change Profile Picture </Text>
                    </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollContainer}>

                        <View style={styles.accountItemHolder}>
                            <Text style={styles.accountItemInfo}>{this.state.fname}</Text>
                            <Text style={styles.accountItemTitle}>First Name</Text>
                        </View>
                        <View style={styles.accountItemHolder}>
                            <Text style={styles.accountItemInfo}>{this.state.lname}</Text>
                            <Text style={styles.accountItemTitle}>Last Name</Text>
                        </View>
                        <View style={styles.accountItemHolder}>
                            <Text style={styles.accountItemInfo}>{this.state.username}</Text>
                            <Text style={styles.accountItemTitle}>Username</Text>
                        </View>
                        <View style={styles.accountItemHolder}>
                            <Text style={styles.accountItemInfo}>{this.state.email}</Text>
                            <Text style={styles.accountItemTitle}>Email Address</Text>
                        </View>
                        


                    </ScrollView>

                </LinearGradient>
            );
            }
        }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        overflow: "hidden",
        
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
    scrollContainer:{
        flexDirection: 'row',
        marginTop:5,
        marginBottom: 70
    },
    accountItemHolder:{
        //flexDirection: 'row',
        textAlign: 'left',
        width: Math.round(Dimensions.get('window').width),
        padding: 7,
        paddingLeft: 15,
        borderBottomColor: 'rgba(255,255,255,.1)',
        borderBottomWidth: 1,

    },
    accountItem:{
        //flexDirection: 'row',
        color: 'white',
        textAlign: 'left',
    },
    accountItemTitle:{
        fontSize: 14,
        color: 'white',
    },
    accountItemInfo:{
        fontSize: 25,
        color: 'white',
        fontWeight: "100",
    },
    userImage: {
        borderRadius: 100,
        width: 200,
        height: 200,
        marginTop: StatusBar.currentHeight,
    },
    imageHolder: {
        alignContent: "center",
        justifyContent: "center",
        height: 270,
        marginTop:backButtonHeightPlatform,
    },
    activityContainer: {
        flex: 1,
        justifyContent: 'center'
      },
    activityHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      },
      spinnerTextStyle: {
        color: '#FFF'
      },
      change_pfp:{
        color: '#477ed3',
        marginTop: 10,
        textAlign: 'center',
    },
});