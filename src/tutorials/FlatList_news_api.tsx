import { Component, ReactNode, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, Platform, Image } from 'react-native';
import * as react from 'react-native';

	
const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1.5,
          width: Platform.OS === 'android' ? '90%' : '59%',
          alignSelf: 'center',
          shadowOpacity: 0.8,
          shadowColor: '#CCCCCC',
          shadowRadius: 2,
          shadowOffset:{
            height: 0.1,
            width: 0.1
          },
          elevation: 3,
          borderRadius: 100,
          backgroundColor: "#D8D8D8",
        }}
      />
    );
  }


const Item = (itemData:any) => (
    <View style={styles.card}>
        <Image source={{uri: itemData.urlToImage}} style={styles.image}></Image>
        <Text selectable={false}><Text style={styles.label}>Title:</Text> {itemData.title}</Text>
        <Text selectable={false}><Text style={styles.label}>Published At:</Text> {itemData.publishedAt}</Text>
    </View>
);

const renderItem = ({item}:any) => Item(item);
// 24c5a60e9a924705938d1cac2101590f
export default function App() {

    
    const url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=24c5a60e9a924705938d1cac2101590f";

    const [news, setNews] = useState([]);

    const getNewsFromNewsAPI = async () =>{
        try{
            const response = await fetch(url)
            .then(res => res.json());
            const articles = response['articles']
            setNews(articles);
            
        }
        catch(erorr){
            console.error("Something went wrong")
        }
    }

    getNewsFromNewsAPI();
    // useEffect(()=>{
        
    // },[]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#794994" style="light" hidden={false} translucent={false}></StatusBar>
            <View style={styles.navbar}>
                <Text style={{ fontSize: 24, marginBottom: 4, color: '#F0F0F0'}}>News</Text>
                
                <View style={{flexDirection: "row"}}>
                    <View style={styles.header_icon}>
                        <Text selectable={false} style={styles.sort_ascending}>▲</Text>
                    </View>
                    <View style={styles.header_icon}>
                        <Text selectable={false} style={styles.sort_ascending}>▼</Text>
                    </View>
                </View>
                {/* <View style={styles.menu_button}>
                    <Text style={styles.menu_button_bars}>|||</Text>
                </View> */}
            </View>
            {/* <View style={{marginTop: 56}}></View> */}
            <FlatList data={news} renderItem={renderItem} alwaysBounceVertical={true} overScrollMode="never" bounces={true} ItemSeparatorComponent={ItemDivider}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    quote: {
        color: "red",
        fontSize: 24,
        marginBottom: 10,

    },
    navbar: {
        width: '100%',
        backgroundColor: '#794994',
        fontSize: 22,
        textAlign: 'left',
        paddingHorizontal: 25,
        borderRadius: 32,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        paddingVertical: 15,
        display: 'flex',
        flexDirection: 'row',
        elevation: 10,
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowColor: '#673B81',
        shadowOffset: {
            height: 1,
            width: 0
        },
        justifyContent: 'space-between',
        color: '#dfe3e5',
        // position: 'absolute',
        // top: 0,
        // zIndex: 999,
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
    header_icon:{
        borderColor: "#653D72",
        borderWidth: 1.4,
        paddingHorizontal: 7,
        paddingTop: Platform.OS === 'android' ? 1 : 5,
        borderRadius: 100,
        backgroundColor: '#653D72',
        display: 'flex',
        marginHorizontal: 4,
    },
    sort_ascending: {
        fontSize: 19,
        fontFamily: 'sans-serif',
        color: '#C7C7C7',
    },
    card: {
        // width: 400,
        maxWidth: '100%',
        alignSelf: 'center',
        width: Platform.OS === 'android' ? '95%' : '60%',
        borderWidth: 2,
        borderColor: '#DAD8D8',
        borderRadius: 10,
        // margin: 6,
        // marginHorizontal: 8,
        marginVertical: 15,
        textAlign: 'left',
        padding: 10,
        shadowColor: '#CECECE',
        shadowOpacity: 0.8,
        shadowRadius: 12,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        
    },
    image: {
        height: Platform.OS === 'android' ? 200 : 300,
        width: '100%',
        marginTop: 3,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#E7E7E7'
    },
    label: {
        fontWeight: '500',
        color: '#464646'
    }
});


