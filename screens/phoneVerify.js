import * as React from 'react'
import {Text, View, ScrollView, TextInput, Button, KeyboardAvoidingView } from 'react-native'
import {Linking} from 'expo'
import * as WebBrowser from 'expo-web-browser';
import { WebView } from 'react-native-webview';
import firebase from 'firebase/app'
import 'firebase/auth'

//const captchaUrl = `https://workers-ef768.firebaseapp.com/captcha.html?appurl=${Linking.makeUrl('')}`


const captchaUrl = 'https://friendsync-98aca.firebaseapp.com/index.html';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            phoneSubmitted: false,
            promptSmsCode: false,
            smsCode: '',
            smsCodeSubmitted: false
        }
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
    }

    onAuthStateChanged = async user => {
        if (user) {
            const token = await firebase.auth().currentUser.getIdToken();
            if (token) {
                // User is fully logged in, with JWT in token variable
            }
        }
    }

    updatePhoneNumber = phoneNumber => this.setState({phoneNumber});
    updateSmsCode = smsCode => this.setState({smsCode});

    onSubmitPhoneNumber = () => this.setState({phoneSubmitted: true});

    onGetMessage = async event => {
        const { phoneNumber } = this.state;
        const message = event.nativeEvent.data;

        switch (message) {
            case "DOMLoaded":
                this.webviewRef.injectJavaScript(`getToken('${phoneNumber}')`);
                return;
            case "ErrorSmsCode":
                // SMS Not sent or Captcha verification failed. You can do whatever you want here
                return;
            case "":
                return;
            default: {
                this.setState({
                    promptSmsCode: true,
                    verificationId: message,
                })
            }
        }
    }

    onSignIn = async () => {
        this.setState({smsCodeSubmitted: true});
        const { smsCode, verificationId } = this.state;
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, smsCode);
        firebase.auth().signInWithCredential(credential);
    }

    render() {

        const { phoneSubmitted, phoneNumber, promptSmsCode, smsCode, smsCodeSubmitted } = this.state;

        if (!phoneSubmitted) return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput
                    label='Phone Number'
                    value={phoneNumber}
                    style={{marginTop: 90}}
                    onChangeText={this.updatePhoneNumber}
                    mode="outlined"
                />
            
                <Button
                style={{fontSize: 20, color: 'green'}}
                styleDisabled={{color: 'red'}}
                onPress={() => this.onSubmitPhoneNumber()}
                title="Send me the code!"
                >
                Send me the code!
                </Button>
            </KeyboardAvoidingView >
        );

        if (!promptSmsCode) return (
            <WebView
                ref={r => (this.webviewRef = r)}
                source={{ uri: captchaUrl }}
                onMessage={this.onGetMessage}
            />
        )

        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <TextInput
                    label='Verification code'
                    value={smsCode}
                    style={{marginTop: 90}}
                    onChangeText={this.updateSmsCode}
                    mode="outlined"
                    disabled={smsCodeSubmitted}
                    keyboardType='numeric'
                />
                <Button
                style={{fontSize: 20, color: 'green'}}
                styleDisabled={{color: 'red'}}
                onPress={() => this.onSignIn()}
                title="Verify Me!"
                >
                 Verify Me!
                </Button>
            </KeyboardAvoidingView >
        );
    }
}