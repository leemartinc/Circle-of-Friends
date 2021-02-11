import React, {Component} from 'react';
import Modal from "react-native-modal";


import {
    StatusBar,
    StyleSheet,TouchableHighlight,
    ScrollView, TouchableOpacity,
    TextInput, Button,
    Platform, Dimensions,
    Text, View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

const topHeightPlatform = Platform.select({
    ios:95,
    android:90
});
const {width: WIDTH} = Dimensions.get('window');
const {height: HEIGHT} = Dimensions.get('window');

let _uid = '';
let firebaseAppDefined = false;


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
                    //imgPath = 'images/users/'+_uid+'/pfp.jpg';
    
                    

                    
                } else {
                    _uid = '00000';
                    //alert("user data not found. please sign out and sign back in");
                }
            });

            firebaseAppDefined = true
        }
    }
}, 100);


export default class Friends extends Component{
    state = {
        modalVisible: false,
        addFriendSearch: '',
        friendSearch: '',
        friendArray: [],
      };

      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

      /*const ids = admin.firestore().collection("devices").where("number",'==', id).select("id").get();
ids.forEach(id =>{
    admin.firestore().collection("users").doc(id)...
});*/

async componentDidMount(): Promise<void> {
    
    let dbRef = firebase.firestore().collection('users').doc(_uid);
    dbRef.get().then(function (doc) {
        if (doc.exists) {
            const {currentFriends} = doc.data();
            this.setState={
                friendArray: currentFriends
            };
            //alert(currentFriends);

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });



}



    addFriendPage(){
        
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


    render() {

            

        return (

            <LinearGradient colors={['#071E36', '#2D5177']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.container}>
                        <View>
                        <Ionicons name={'ios-search'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon} />
                        <TextInput
                            style={styles.search_input}
                            placeholder = {'Search Friends'}
                            placeholderTextColor={'white'}
                            underlineColorAndroid = 'transparent'
                            autoCapitalize = 'none'
                            autoCorrect={false}
                            onChangeText = {(email) => this.setState({email})}
                        />
                        </View>
                        <View>

                        </View>
                        <ScrollView>
                            <View>
                            { this.state.friendArray.map((item, key)=>(
                            <Text key={key} style={{top: 200}} onPress={ this.this.state.friendArray.bind(this, item) }> { item } </Text>)
                            )}
                            </View>
                        </ScrollView>











                        <View
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                alignSelf: 'flex-end',
                                right: 0,
                                marginRight: 20,
                                marginBottom: 110,
                                }}
                        >
                        <TouchableOpacity
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                alignSelf: 'flex-end',
                                width:80,
                                height:80,
                                backgroundColor:'#2a5d81',
                                borderRadius:40,
                                right: 0,
                                bottom: 0,
                                }}
                            onPress={() => this.setModalVisible(true)}
                            >
                            <Entypo name={"plus"}  size={60} color="#071E36" />
                        </TouchableOpacity>
                        </View>
                        <View style = {{justifyContent: 'center', alignItems: 'center',}}>
                            <Modal
                                animationType="fade"
                                transparent ={true}
                                backgroundColor = 'rgba(0, 0, 0, 0.8)'
                                visible={this.state.modalVisible}
                                style={{padding: 0, margin: 0}}
                                >
                                <View style = {styles.modalView}>
                                <View>
                                    <TouchableHighlight
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                        }}>
                                        <Ionicons name={'ios-close'} size={50} color={'rgba(255,255,255,0.7)'} style={{right: 10, alignSelf: 'flex-end'}}/>
                                    </TouchableHighlight>
                                    </View>
                                    <View>
                                    <Ionicons name={'ios-search'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.add_inputIcon} />
                                    <TextInput
                                        style={styles.add_search_input}
                                        placeholder = {'Search for new friends'}
                                        placeholderTextColor={'white'}
                                        underlineColorAndroid = 'transparent'
                                        autoCapitalize = 'none'
                                        autoCorrect={false}
                                        onChangeText = {(addFriendSearch) => this.setState({addFriendSearch})}
                                    />
                                    </View>
                                    
                                </View>
                            </Modal>
                        </View>


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
        paddingTop: 50,
    },
    buttonText: {
        fontSize: 18,
        //fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    inputIcon: {
        position: 'absolute',
        left: 37,
        top: 8
    },
    search_input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        top: 0,
    },
    add_inputIcon: {
        position: 'absolute',
        alignSelf: 'center',
        left: 17,
        top: 18
    },
    add_search_input: {
        marginTop: 10,
        width: WIDTH - 70,
        alignSelf: 'center',
        height: 45,
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
        top: 0,
    },
    modalView:{
        //justifyContent: 'center',
        //alignItems: 'center',
        position: 'absolute',
        borderRadius: 15,
        padding: 10,
        margin: 0,
        width: ((WIDTH/8)*7),
        left: (WIDTH/16),
        height: ((HEIGHT/4)*3),
        top: (HEIGHT/8),
        backgroundColor: '#1a4470',
        color: 'white',
    },
});