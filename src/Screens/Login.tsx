import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, Text as ReactText, View, Dimensions, Platform, ScrollView, Image, TouchableOpacity, ToastAndroid, } from 'react-native';
import Text from '../modified_components/components';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import * as Crypto from 'expo-crypto';
import { themeColor } from '../helper/Constants';
// import styled from 'styled-components/native';  


export default function LoginScreen({navigation}:any) {

    function Login(){
        const auth = getAuth();
        const db = getFirestore();
        if (Email == "" || Password == ""){
            onToggleSnackBar();
            return;
        }
        signInWithEmailAndPassword(auth, Email, Password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("User Logged In"+user.uid);


            var data = getDoc(doc(db,'Users',user.uid)).then((Document) => {
                if (Document.exists()) {
                    console.log("Document data:", Document.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
            
            Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512,Password)
                .then(hashed=>{
                    console.log(hashed)
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

    const [Email, setEmail] = useState('');
    const [Password, SetPassword] = useState('');
    const [HideShowPWD, SetHideShowPWD] = useState(true);
    const [Correctinput, SetCorrectinput] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [EmailFocus, setEmailFocus] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#630BDD" style="light" hidden={false} translucent={false}></StatusBar>
            <View style={styles.sub_container} focusable={true}>
                <ScrollView style={styles.Register_form} focusable={true}>
                    <View style={styles.icon_cont} focusable={true}><Image style={styles.form_icon} source={require('./../../assets/barrier.png')} /></View>
                    <Text style={styles.Heading}>Login</Text>

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
                        compact= {false} contentStyle={{paddingVertical:3,}}
                        style={styles.button}
                        onPress={() => Login()} >
                        Login
                    </Button> 
                    
                    <TouchableOpacity onPress={()=>{}}>
                        <Text style={[styles.link_text,{marginTop: 17}]}>Forgot password?</Text>
                    </TouchableOpacity>

                    <View style={styles.new_account}>
                        <Text style={{fontSize: 16}}>New User? </Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('Register Screen')}>
                            <Text style={styles.link_text}>Create an Account</Text>
                        </TouchableOpacity>
                    </View>


                </ScrollView>
            </View>
            <Snackbar visible={visible} onDismiss={onDismissSnackBar} wrapperStyle={{maxWidth:400,borderRadius: 50}} duration={Snackbar.DURATION_SHORT} style={{borderRadius: 50,paddingHorizontal:8}} action={{label: 'Ok', style:{borderRadius:50}, contentStyle:{borderRadius: 50,paddingVertical:2,paddingHorizontal:6},onPress: () => {}}}>
                Error: All Fields Are Required!!!
            </Snackbar>
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
        paddingTop: Platform.OS == 'android'? '15%' : '6%',
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
        transform: [
            {scale: 0.88}
        ]
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
        color: themeColor,
        marginBottom: 20,
    },
    button: {
        borderRadius: 20,
        // paddingVertical: 3,
        marginTop: 15,
    },
    input: {
        // height: 40,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        // borderRadius: 10,
        fontSize: 15,
        overflow: 'hidden',
        marginBottom: 5,
        // borderWidth: 1,
        // fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        // fontWeight: '400',
        backgroundColor: '#E8E9F8',
    },
    link_text: {
        fontSize: 16,
        color: themeColor,
        textAlign: 'center',
    },
    new_account: {
        fontSize: 16,
        display: 'flex', 
        flexDirection: 'row', 
        marginTop: 12,
        alignSelf: 'center'
    },
});