
import * as React from 'react';
import {useEffect, useState, Component} from 'react';
// import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Dimensions, Platform, Button, ImageBackground, Image, TextProps } from 'react-native';
import {Text as ReactText} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { NativeScreenNavigationContainer,NativeScreenContainer } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProfileScreen from './src/functional_componenets/profile';
import OrderScreen from './src/functional_componenets/orders';
import ClassComponent from './src/tutorials/ClassComponent';
import LoginScreen from './src/Screens/Login';
import { initializeApp } from 'firebase/app';
import RegisterScreen from './src/Screens/Register';
import { assets, firebaseConfig } from './src/helper/Constants';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import HomeScreen, { navi } from './src/Screens/HomeScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Appbar } from 'react-native-paper';
import Text from './src/modified_components/components';
import PhatakMapViews from './src/Screens/PhatakMapView';


// for any type of navigaton we have to add this in babel.config.js => plugins: ['react-native-reanimated/plugin']



// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//         <Stack.Navigator initialRouteName='Home' defaultScreenOptions={{}}>
//             <Stack.Screen name='Home' component={HomeScreen}></Stack.Screen>
//             <Stack.Screen name='OrderScreen' component={ProfileScreen}></Stack.Screen>
//             <Stack.Screen name='OrderScreen' component={OrderScreen}></Stack.Screen>
//         </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//         <Drawer.Navigator initialRouteName='Home' defaultScreenOptions={{}}>
//             <Drawer.Screen name='Home' component={HomeScreen}></Drawer.Screen>
//             <Drawer.Screen name='ProfileScreen' component={ProfileScreen}></Drawer.Screen>
//             <Drawer.Screen name='OrderScreen' component={OrderScreen}></Drawer.Screen>
//         </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// const Bottom_Tabs = createBottomTabNavigator();

// export default function Tabs() {
//   return (
//     <NavigationContainer>
//         <Bottom_Tabs.Navigator initialRouteName='Home' defaultScreenOptions={{}}>
//             <Bottom_Tabs.Screen name='Home' component={HomeScreen}></Bottom_Tabs.Screen>
//             <Bottom_Tabs.Screen name='ProfileScreen' component={ProfileScreen}></Bottom_Tabs.Screen>
//             <Bottom_Tabs.Screen name='OrderScreen' component={OrderScreen}></Bottom_Tabs.Screen>
//         </Bottom_Tabs.Navigator>
//     </NavigationContainer>
//   );
// }
// }

// const Material_Top_Tabs = createMaterialTopTabNavigator();

// export default function Tabs() {
//   return (
//     
//      <NavigationContainer independent={true} documentTitle={{enabled: true}}>
//         <StatusBar backgroundColor="#630BDD" style="light" hidden={false} translucent={false}></StatusBar>
//         <Material_Top_Tabs.Navigator initialRouteName='Home' overScrollMode='always' transitionStyle='scroll' overdrag={false} style={{ marginTop: Constants.statusBarHeight }} defaultScreenOptions={{title: "Phatak Status"}} screenOptions={{tabBarIndicatorStyle: {backgroundColor:'#6200ee'},}}>
//             <Material_Top_Tabs.Screen name='Home' component={HomeScreen}></Material_Top_Tabs.Screen>
//             <Material_Top_Tabs.Screen name='ProfileScreen' component={ProfileScreen}></Material_Top_Tabs.Screen>
//             <Material_Top_Tabs.Screen name='OrderScreen' component={OrderScreen}></Material_Top_Tabs.Screen>
//         </Material_Top_Tabs.Navigator>
//     </NavigationContainer>
//   );
// }

const Stack = createNativeStackNavigator();

export default function Tabs({navigation}:any) {
  
  const [showSplash,SetSplashScreen] = useState(true);
  const [LoggedIn,SetLoggedIn] = useState(false);
  const [IsMaps,SetMaps] = useState(false);
  initializeApp(firebaseConfig);

  useEffect(
    ()=>{
      
      const auth = getAuth();
      // auth.signOut()
      // .then(() => console.log('User signed out!'));
      onAuthStateChanged(auth, (user)=>{
        console.log(auth.currentUser );
        if (auth.currentUser != null){
          SetLoggedIn(true);
        }
        if (LoggedIn == false && auth.currentUser == null){
          SetSplashScreen(true);
        }
        // setTimeout(()=>{SetSplashScreen(false);},3000);
        setTimeout(()=>{SetSplashScreen(false);},3000);
      });
    },
  []);

  if (showSplash){
    return(
      <View style={styles.container}>
        <ImageBackground source={require('./assets/Splash.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.icon_cont} focusable={true}><Image style={styles.form_icon} source={require('./assets/barrier.png')} resizeMethod="scale"/></View>
          <Text style={styles.Welcome_text}>Welcome To Phatak Status</Text>
        </View>
        </ImageBackground>
        {/* <Text ></Text> */}
      </View>
    )
  }
  else{
    if (LoggedIn){
      return (
        <NavigationContainer independent={true} documentTitle={{enabled: true}}>
          <StatusBar backgroundColor="#630BDD" style="light" hidden={false} translucent={false}></StatusBar>
            <Stack.Navigator initialRouteName='Home Screen' defaultScreenOptions={{title: "Phatak Status"}}>
                {/* <Material_Top_Tabs.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Login Screen' component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name='Register Screen' component={RegisterScreen} options={{headerShown: false}} /> */}
                <Stack.Screen name='Home Screen' component={HomeScreen} options={{
                  title: "Phatak Status",
                  headerRight: ()=>
                    <Appbar.Action 
                      icon="logout" 
                      onPress={()=>{
                        const auth = getAuth();
                        auth.signOut();
                        SetLoggedIn(false);
                      }}
                    />
                }}/>
                <Stack.Screen name='MapView' component={PhatakMapViews} />
                {/* <Material_Top_Tabs.Screen name='ProfileScreen' component={ProfileScreen} /> */}
                {/* <Material_Top_Tabs.Screen name='OrderScreen' component={OrderScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
      );
    }
    else{
      return (
        <NavigationContainer independent={true} documentTitle={{enabled: true}}>
          <StatusBar backgroundColor="#630BDD" style="light" hidden={false} translucent={false}></StatusBar>
            <Stack.Navigator initialRouteName='Login Screen' defaultScreenOptions={{title: "Phatak Status"}}>
              {/* <Material_Top_Tabs.Screen name='Home' component={HomeScreen} /> */}
              <Stack.Screen name='Login Screen' component={LoginScreen} options={{headerShown: false}} />
              <Stack.Screen name='Register Screen' component={RegisterScreen} options={{headerShown: false}} />
              <Stack.Screen name='Home Screen' component={HomeScreen} options={{
                title: "Phatak Status",
                headerRight: ()=>
                  <Appbar.Action 
                    icon="logout" 
                    onPress={()=>{
                      const auth = getAuth();
                      auth.signOut();
                      SetLoggedIn(false);
                    }}
                  />
              }}/>
              <Stack.Screen name='MapView' component={PhatakMapViews} />
              {/* <Material_Top_Tabs.Screen name='ProfileScreen' component={ProfileScreen} /> */}
              {/* <Material_Top_Tabs.Screen name='OrderScreen' component={OrderScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
      );
    }
    
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#00000080',
    width: '100%',
    alignItems: 'center',
  },
  icon_cont: {
      // borderColor: '#1D1D1D13',
      // borderWidth: 5,
      shadowColor: '#000000',
      shadowRadius: 20,
      backgroundColor: '#000000B0',
      shadowOffset: {
        height: 0,
        width: 0
      },
      shadowOpacity: 1,
      position: 'relative',
      opacity: 1,
      padding: 30,
      marginBottom: 5,
      alignSelf: 'center',
      borderRadius: 100,
  },
  form_icon: {
      width: 100,
      height: 100,
      opacity: 0.62,
      alignSelf: 'center',
      // borderStyle: 'dotted',
  },
  Welcome_text: {
    color: '#B8B8B8',
    fontSize: Platform.OS == "android" ? 22 :  25,
    fontWeight: 'bold',
    marginTop: 10,
    textShadowColor: '#000000',
    textShadowRadius: 20,
  }
});