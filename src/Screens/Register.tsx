import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, Text as ReactText, View, Dimensions, Platform, Image, ScrollView, ToastAndroid } from 'react-native';
import Text from '../modified_components/components';
// import { TextInput } from 'react-native-gesture-handler';
import { TextInput, Button, } from 'react-native-paper';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { StatusBar } from 'expo-status-bar';
import * as Crypto from 'expo-crypto';
import { themeColor } from '../helper/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';





export default function RegisterScreen({ navigation }: any) {
    
    function Register(){
        const auth = getAuth();
        const db = getFirestore();
        if (Name == "" || Email == "" || Password == ""){
            ToastAndroid.show("Error: All Fields Are Required!!!", ToastAndroid.SHORT);
            return;
        }
        createUserWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            var hashedPassword:any;
            console.log("User Regisered");
            Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA512,
                Password
            ).then(hashed=>{
                console.log(hashed)
                hashedPassword = hashed;
            }).finally(()=>{
                setDoc(doc(db, "Users", user.uid), {'Name': Name,'Email': Email,'Password': hashedPassword}).then(e=>console.log('done'+e));
            });
            navigation.navigate('Home Screen');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error Occurred: "+errorCode+" Message: "+errorMessage);
            // ..
        });
    }



    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, SetPassword] = useState('');
    const [HideShowPWD, SetHideShowPWD] = useState(true);
    const [Correctinput, SetCorrectinput] = useState(false);

    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#630BDD" style="light" hidden={false} translucent={false}></StatusBar>
            <View style={styles.sub_container} focusable={true}>
                <ScrollView style={styles.Register_form} focusable={true}>
                    <View style={styles.icon_cont} focusable={true}><Image style={styles.form_icon} source={require('./../../assets/barrier.png')} /></View>
                    <Text style={styles.Heading}>Register</Text>

                    <TextInput
                        placeholder='Name'
                        textContentType='name'
                        keyboardType='default'
                        value={Name}
                        mode= 'outlined' 
		                theme={{ roundness: 12 }} 
                        autoCapitalize= 'sentences'
                        clearButtonMode='always' 
                        removeClippedSubviews = {true}
                        dense= {true}
                        label={'Name'}
                        style={styles.input}
                        onChangeText={setName} />
                    <TextInput
                        placeholder='Email' 
                        textContentType='emailAddress' 
                        keyboardType='email-address' 
                        value={Email} 
                        mode= 'outlined' 
		                theme={{ roundness: 12 }} 
                        dense= {true}
                        label={'Email'}
                        style={styles.input}
                        onChangeText={setEmail} />
                    <TextInput 
                        placeholder='Password' 
                        textContentType='password' 
                        keyboardType='default' 
                        label={'Password'} 
                        mode= 'outlined' 
                        dense= {true}
		                theme={{ roundness: 12 }} 
                        value={Password} 
                        selectionColor='#6200ee' 
                        right={<TextInput.Icon style={{transform: [{scale: 0.88}]}} onPress={()=>{HideShowPWD ? SetHideShowPWD(false): SetHideShowPWD(true);SetCorrectinput(true)}} name={HideShowPWD ? "eye": "eye-off"} color={themeColor} />}
                        style={styles.input} 
                        secureTextEntry={HideShowPWD}
                        onChangeText={
                            Platform.OS=='web' ? 
                                (val)=>{Correctinput ? SetPassword(Password+val[0]): SetPassword(val);Correctinput ? SetCorrectinput(false):null}
                                :
                                SetPassword} />
                    <Button 
                        mode='contained'
                        style={styles.button}
                        onPress={() => Register()} >
                        Register
                    </Button>
                    
                    <View style={styles.goToLogin}>
                        <Text style={{fontSize: 16}}>Already Registered? </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Login Screen')}>
                            <Text style={styles.link_text}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: '#E8E9F8',
        // backgroundColor: '#6300EE3B',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    sub_container: {
        width: '100%',
        // backgroundColor: '#6300EE3B',
        alignItems: 'center',
        height: '100%',
        marginBottom: Platform.OS == 'android'? '40%' : '10%',
    },
    Register_form: {
        // borderColor:
        alignSelf: 'center',
        // height: '100%',
        paddingHorizontal: 10,
        paddingTop: Platform.OS == 'android'? '15%' : '5%',
        maxWidth: Platform.OS == 'android'? 340 : 370,
        width: '100%',
    },
    icon_cont: {
        borderColor: '#6300EED3',
        borderWidth: 2,
        shadowColor: '#6200ee',
        shadowRadius: 4,
        backgroundColor: '#6300EE41',
        shadowOpacity: 1,
        position: 'relative',
        opacity: 1,
        padding: 15,
        marginBottom: 5,
        alignSelf: 'center',
        borderRadius: 50,
    },
    form_icon: {
        width: 50,
        height: 50,
        opacity: 1,
        alignSelf: 'center',
        // borderStyle: 'dotted',
    },
    Heading: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6200ee',
        marginBottom: 20,
    },
    input: {
        // height: 40,
        fontSize: 15,
        overflow: 'hidden',
        marginBottom: 5,
        backgroundColor: '#E8E9F8',
    },
    button: {
        borderRadius: 20,
        paddingVertical: 3,
        marginTop: 15,
    },
    link_text: {
        fontSize: 16,
        color: themeColor,
        textAlign: 'center',
    },
    goToLogin: {
        fontSize: 16,
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 12,
        alignSelf: 'center'
    },
});