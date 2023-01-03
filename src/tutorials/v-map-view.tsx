import { collection, GeoPoint, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState, useRef } from 'react';
import { Button, FlatList, StyleSheet, View, Dimensions, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import Geolocation from '@react-native-community/geolocation';

export default function MapScreen({navigation}:any) {
    const [crossingList, setCrossingList] = useState([]);
    const [location, setLocation] = useState<any | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [region, setRegion] = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    const [distance, setDistance] = useState<any>([]);

    // Any type has to be mentioned that will make the reference readonly
    let mapRef = useRef<any | null>(null);
    let idList : any = [];

    const getCrossings = async () => {
        let documents:any = [];
        try{
          const db = getFirestore();
          const querySnapshots = await getDocs(collection(db, "crossings"));
     
          querySnapshots.forEach((doc)=>{
            const docData = doc.data();
            documents.push(docData);
          })
          setCrossingList(documents);
          // console.log(documents)
          // console.log(documents[0]["location"]["latitude"])
        }
        catch(error) {
          console.log("Something went wrong..");
        }
        return documents;
    }

    // const goToCurrentLoc = () => {
    //   mapRef.current.animateToRegin(region)
    // }

    const setCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({})
      console.log(location);
      
      setLocation(location);
      let currentRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0,
        longitudeDelta: 0,
      };
      
      setRegion(currentRegion);
      mapRef.current.animateToRegion(currentRegion, 3 * 1000);
    }

    function deg2rad(deg : any) {
      return deg * (Math.PI/180)
    }

    function getDistanceFromLatLonInKm(lat1 : any, lon1 : any, lat2 : any, lon2 : any) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }

    useEffect(() => {
      setCurrentLocation();
      getCrossings();
    }, []);
  
    // let text = 'Waiting..';
    // if (errorMsg) {
    //   text = errorMsg;
    // } else if (location) {
    //   text = JSON.stringify(location);
    // }

    let showAllMarkers = () => {
      let size = crossingList.length;
      console.log(size);
      
      console.log(region.latitude);
      console.log(region.longitude);

      // console.log(">>>Crossing List");
      // console.log(crossingList);
      
      crossingList.forEach((element:any)=>{
        let dist = getDistanceFromLatLonInKm(location.coords.latitude, location.coords.longitude, parseFloat(element.location.latitude), parseFloat(element.location.longitude));
        // console.log(dist);
        distance.push(dist);
      })

      let myList : any = crossingList;

      for(let i=0; i<size; i++) {
        myList[i]['distance'] = distance[i];
        myList[i]['index'] = i+1;
      }

      // console.log(myList);
      myList.sort((a : any, b : any) => a.distance - b.distance);
      // console.log(myList);

      setCrossingList(myList);
      console.log(crossingList);

      for(let i=1; i<=5; i++) {
        idList.push('mk'+crossingList[i-1]['index']);
      }
      let prevCurrent = mapRef.current;
      mapRef.current.fitToSuppliedMarkers(idList)
      // mapRef.current = prevCurrent;
    }

    let markersList = () => {
      return crossingList.map((element, index)=> 
        <Marker key={index}
            coordinate={{
                latitude: element["location"]["latitude"] != null ? element["location"]["latitude"] : 30.9024029,
                longitude: element["location"]["longitude"] != null ? element["location"]["longitude"] : 75.8201689,
            }}
            title= {element["phatakName"]}
            // description= {String(element["status"])}
            description={element["location"]["latitude"]+'\t'+element["location"]["longitude"] + '\n' + element['distance']}
            pinColor="green"
            tappable
            identifier={'mk' + index}
        >
        </Marker>
    ) }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          ref={mapRef}
          initialRegion= {{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}>

          {markersList()}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={showAllMarkers}>
            <View style={styles.button}>
              <Text style={styles.textStyle}>Show Nearby Phataks</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={setCurrentLocation}>
            <View style={styles.button}>
              <Text style={styles.textStyle}>Current Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },

    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      ...StyleSheet.absoluteFillObject,
    },

    button: {
      backgroundColor: "#013352",
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 15,
      margin: 20,
    },

    textStyle: {
      color: "white",
      fontWeight: "bold"
    },

    buttonContainer: {
      flexDirection: 'row'
    }
  });
  