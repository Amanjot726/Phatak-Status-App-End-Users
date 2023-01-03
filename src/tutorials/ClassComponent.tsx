import { Component, ReactNode } from "react";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';

export default class ClassComponent extends Component{

    idx = 0;

    quotes = [
        "Honesty is best policy",
        "Be Exceptional",
        "Hard work is key to success"
    ]

    state = {
        quote: this.quotes[this.idx++]
    }

    onButtonPressed = () => {
        this.idx++;

        if(this.idx == this.quotes.length){
            this.idx = 0;
        }
        if(this.idx < 0){
            this.idx = this.quotes.length-1;
        }
        
        this.setState(
            {
                quote: this.quotes[this.idx]
            }
        )
    }

    render(){
        return (
                <View style={styles.container}>
                    <StatusBar backgroundColor="#630BDD" style="light" hidden={false} translucent={false}></StatusBar>
                    <Text style={styles.quote}>{this.quotes[this.idx]}</Text>
                    <Button title="New Quote" onPress={this.onButtonPressed}></Button>
                    <StatusBar style="auto" />
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quote: {
        color: "red",
        fontSize: 24,
        marginBottom: 10,

    },
});