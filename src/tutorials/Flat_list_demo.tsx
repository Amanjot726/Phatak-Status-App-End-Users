import { Component, ReactNode } from "react";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, Platform } from 'react-native';

const Gallery = [
    {
        image_name: 'IMG20220726.jpg',
        file_extension: '.jpg',
        timeStamp: "July 26, 2022 13:16",
        size: "2.69 MB",
        height: 3000,
        width: 4000,
        location: 'Internal storage/DCIM/Camera/IMG20220726_541.jpg'
    },
    {
        image_name: 'IMG20220725.jpg',
        file_extension: '.jpg',
        timeStamp: "July 25, 2022 09:16",
        size: "4.52 MB",
        height: 3000,
        width: 4000,
        location: 'Internal storage/DCIM/Camera/IMG20220725_143.jpg'
    },
    {
        image_name: 'IMG20220724.jpg',
        file_extension: '.jpg',
        timeStamp: "July 24, 2022 18:16",
        size: "2.36 MB",
        height: 3000,
        width: 4000,
        location: 'Internal storage/DCIM/Camera/IMG20220724_623.jpg'
    },
    {
        image_name: 'IMG20220723.jpg',
        file_extension: '.jpg',
        timeStamp: "July 23, 2022 20:24",
        size: "3.86 MB",
        height: 3000,
        width: 4000,
        location: 'Internal storage/DCIM/Camera/IMG20220723_733.jpg'
    },
    {
        image_name: 'IMG20220722.jpg',
        file_extension: '.jpg',
        timeStamp: "July 22, 2022 11:56",
        size: "7.49 MB",
        height: 3000,
        width: 4000,
        location: 'Internal storage/DCIM/Camera/IMG20220722_926.jpg'
    },
    {
        image_name: 'IMG20220721.jpg',
        file_extension: '.jpg',
        timeStamp: "July 21, 2022 14:11",
        size: "5.23 MB",
        height: 3000,
        width: 4000,
        location: 'Internal storage/DCIM/Camera/IMG20220721_326.jpg'
    },
    {
        image_name: 'IMG20220721.jpg',
        file_extension: '.jpg',
        timeStamp: "July 21, 2022 15:29",
        size: "4.94 MB",
        height: 3000,
        width: 4000,
        location: 'Internal storage/DCIM/Camera/IMG20220721_842.jpg'
    }
]

	
const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1.5,
          width: "90%",
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
        <Text selectable={false}><Text style={styles.label}>Image Name:</Text> {itemData.image_name}</Text>
        <Text selectable={false}><Text style={styles.label}>File Extension:</Text> {itemData.file_extension}</Text>
        <Text selectable={false}><Text style={styles.label}>Time Stamp:</Text> {itemData.timeStamp}</Text>
        <Text selectable={false}><Text style={styles.label}>Size:</Text> {itemData.size}</Text>
        <Text selectable={false}><Text style={styles.label}>Resolution:</Text> {itemData.width}x{itemData.height}</Text>
        <Text selectable={false}><Text style={styles.label}>Location:</Text> {itemData.location}</Text>
    </View>
);

const renderItem = ({item}:any) => Item(item);

export default function App() {

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#794994" style="light" hidden={false} translucent={false}></StatusBar>
            <View style={styles.navbar}>
                <Text style={{ fontSize: 24, marginBottom: 4, color: '#F0F0F0'}}>Gallery</Text>
                
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
            <FlatList data={Gallery} renderItem={renderItem} alwaysBounceVertical={true} overScrollMode="never" bounces={true} ItemSeparatorComponent={ItemDivider}/>
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
        width: Platform.OS === 'android' ? '95%' : '100%',
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
    label: {
        fontWeight: '500',
        color: '#464646'
    }
});


