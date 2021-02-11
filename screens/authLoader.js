import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';

//import * as firebase from 'firebase';
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore';
import '@firebase/database';


export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    //previously componentWillMount
    componentDidMount(): void {
        const firebaseConfig={
            apiKey:'AIzaSyDPyjDfVeKKeaTyjxNm5mQr6BOOUOSM-sM',
            authDomain: 'friendsync-98aca.firebaseapp.com',
            projectId: 'friendsync-98aca',
            storageBucket: 'gs://friendsync-98aca.appspot.com',
        };
        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                //alert('user logged in')

                //TODO the login detection works but but to get the page to go to the home page -- DONE
                //alert(firebase.auth().currentUser.uid);
                this.props.navigation.navigate('App')
            } else {
                //alert('user NOT logged in')
                this.props.navigation.navigate('Auth')
            }
        });
    }

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}