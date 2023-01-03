import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import {Avatar, Divider} from '@rneui/themed';


// export default function App() {

//   const quotes = [
//     "Honesty is best policy",
//     "Be Exceptional",
//     ""
//   ]

//   const [idx, setIndex] = useState(0);
//   var i = idx;

//   if (i == quotes.length-1){
//     i = 0
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.quote}>{quotes[i]}</Text>
//       <Button title="New Quote" onPress={(event)=> setIndex(++i)}></Button>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

export default function App() {
    return (
        <View style={{ paddingTop: 0 }}>
            <StatusBar backgroundColor="white" style="light" hidden={false} translucent={false}></StatusBar>
            <View style={styles.navbar}>
                <Text style={{ fontSize: 24, color: '#D3D5D6'}}>Chats</Text>
                <View style={styles.menu_button}>
                    <Text style={styles.menu_button_bars}>|||</Text>
                </View>
            </View>
            {/* <Text style={styles.quote}>Hello</Text> */}
            <View style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                backgroundColor: '#111b21',
            }}>
                <View style={styles.chat}>
                <Avatar
                    size={42}
                    rounded
                    icon={{ name: 'user', type: 'font-awesome' }}
                    containerStyle={{ backgroundColor: '#6a7175' }}
                />
                <Text style={styles.chat_contact}>+91 99999 11111</Text>
                </View>
                <Divider color='#3E4F50' style={{margin: 22}}></Divider>
            {/* <FlatList
                data={[
                {key: 'Devin'},
                {key: 'Dan'},
                {key: 'Dominic'},
                {key: 'Jackson'},
                {key: 'James'},
                {key: 'Joel'},
                {key: 'John'},
                {key: 'Jillian'},
                {key: 'Jimmy'},
                {key: 'Julie'},
                ]}
                renderItem={({item}) => <Text style={styles.chat}>{item.key}</Text>}
            /> */}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#202020',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quote: {
        color: "red",
        fontSize: 24,
        marginBottom: 10,

    },
    navbar: {
        backgroundColor: '#202c33',
        fontSize: 22,
        textAlign: 'left',
        paddingHorizontal: 13,
        paddingVertical: 13,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: '#dfe3e5'
    },
    menu_button: { 
        display: 'flex',
        borderColor: '#005c00',
        borderWidth: 1.5,
        borderRadius: 5,
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 0,
        paddingLeft: 15,
        paddingHorizontal: 10,

    },
    menu_button_bars: {
        transform: [
            { rotate: '90deg' }
        ],
        // paddingVertical: 6,
        // paddingHorizontal: 10,
        borderRadius: 100,
        fontSize: 24,
        fontFamily: 'sans-serif',
        color: '#005c00'
    },
    chat: {
      padding: 10,
      fontSize: 18,
      height: 44,
    //   borderColor: '#24323a',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    //   borderWidth: 1
    },
    chat_contact: {
        color: '#C8CDCF',
        fontSize: 20,
        alignContent: 'center'
    }
});
