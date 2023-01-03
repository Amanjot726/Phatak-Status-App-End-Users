import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, Button } from 'react-native';

export default function OrderScreen() {
    return (
        <View style={styles.container}>
        <Text>OrderScreen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });