import * as React from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Platform } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: 30.8820421,
        longitude: 75.8339963,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }}>
        <Marker 
            coordinate={{latitude: 30.8820421,longitude: 75.8339963}}
            title = {"Home"}
            description = {"Amanjot's Home"}
            
        />
      </MapView>
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
  map: {
    display: Platform.OS === 'android'? 'flex': 'none',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});