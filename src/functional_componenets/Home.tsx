import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Platform, Button,SafeAreaView } from 'react-native';

export default function HomeScreen({navigation}:any) {
    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="#630BDD" style="light" hidden={false} translucent={false}></StatusBar> */}
            <Text>HomeScreen</Text>
            <Button title='Go to Order Screen' onPress={()=>navigation.navigate('OrderScreen')}></Button>
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