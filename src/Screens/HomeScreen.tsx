import { StatusBar } from 'expo-status-bar';
import { getFirestore, getDoc, collection, getDocs, DocumentData } from 'firebase/firestore';
import {Component, ReactElement, useEffect, useState} from 'react';
import { StyleSheet, Text as ReactText, View, Dimensions, Platform, Button,SafeAreaView, Image, ScrollView, ActivityIndicator, TouchableOpacity, useWindowDimensions, Linking, ColorValue, Pressable } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { ImageRequireSource } from 'react-native';
import { globalDocs, themeColor } from '../helper/Constants';
import Text from '../modified_components/components';
import * as React from 'react';



export function navi({navigation}:any){
    navigation.replace('Login Screen')
};

function trafficStatusWidget(trafficStatus:any){
    const trafficStatusMap: Record<string, number> = {
        "high": 3,
        "medium": 2,
        "low": 1,
    }
    const trafficStatusColorMap: Record<string, ColorValue> = {
        "high": '#DB2C00',
        "medium": '#DAA700',
        "low": '#15B600',
    };
    let color = trafficStatusColorMap[trafficStatus.toLowerCase()];
    let status = trafficStatusMap[trafficStatus.toLowerCase()];
    var _widget: Array<ReactElement> = [];

    for(let i=0;i<status;i++){
        _widget.push(<View key={i} style={{backgroundColor: color!=undefined ? color: "#686868", width: 12, height: 3.5, borderRadius: 100, marginHorizontal: 1.1}}></View>)
    }
    for(let i=0;i<3-status;i++){
        _widget.push(<View key={i+status} style={{backgroundColor: "#9B9B9B", width: 12, height: 3.5, borderRadius: 100, marginHorizontal: 1.1}}></View>)
    }
    return(
        <View style={{alignItems:'center', marginTop: 7}}>
            <Text style={{fontSize: 13.8,color: color,fontWeight: '500'}}>Traffic Status</Text>
            <View style={[styles.row,{marginVertical: 4}]}>
                {_widget}
            </View>
        </View>
    );
}

function phatakStatusWidget(phatakStatus:any){
    const phatakStatusColorMap: Record<number, ColorValue> = {
        0: '#15B600',
        1: '#DAA700',
        2: '#E26D00',
        3: '#DB1A00',
    };
    const phatakStatusMap: Array<string> = ['Open','Opening','Closing','Closed',];
    let color = phatakStatusColorMap[phatakStatus];
    let status = phatakStatusMap[phatakStatus];

    return(
        <View style={[styles.row,{alignItems:'center', marginTop: 6, marginVertical: 4}]}>
            <View style={[styles.phatakStatusCircle, {backgroundColor: color!=undefined ? color: "#686868"}]}/>
            <Text style={{fontSize: 15,color: color,fontWeight: '600'}}>{status}</Text>
        </View>
    );
}


export default function HomeScreen({navigation}:any) {
    
    const window = useWindowDimensions();
    // let a: Array<DocumentData>=[];
    const [documents, setDocuments] = useState(Array<DocumentData>);

    const getCrossings = async () => {
        const db = getFirestore();
        // const tempp:  Array<DocumentData>=[];
        const querySnapshot = await getDocs(collection(db,"Crossings"));
        querySnapshot.forEach((doc)=>{
            console.log(doc.id, "=>", doc.data());
            // tempp.push(doc.data());
            globalDocs.push(doc.data());
        });
        setDocuments(globalDocs.reverse());
    }
    useEffect(
        ()=>{
            getCrossings();
        },
      []);


    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#630BDD" style="light" hidden={false} translucent={false}></StatusBar>
            <View style={styles.sub_container} focusable={true}>
            <TouchableOpacity style={styles.fab} onPress={()=>{navigation.navigate('MapView')}}>
                 <Avatar.Icon icon="map" size={35} style={styles.fabIcon}/>
            </TouchableOpacity>
                {
                    documents.length != 0 ?
                    (
                        <ScrollView style={styles.ScrollView} focusable={true}>
                            <View style={styles.CardsView} focusable={true}> 
                                {
                                    documents.map((doc) => {
                                        return (
                                            <View key={documents.indexOf(doc)} style={styles.card}>
                                                <Image style={[styles.image,{width: Platform.OS == "android" ? window.width-40 : 330,}]} source={{uri: doc['imageURL']}} />
                                                <View style={{width: '100%', marginTop: 0, backgroundColor: '#4D4C4C6B', height: 2.5}} />
                                                <View style={styles.cardHeading}>
                                                    <View style={styles.line} />
                                                    <Text style={styles.crossingName}>{doc['phatakName']}</Text>
                                                    <View style={styles.line} />
                                                </View>
                                                
                                                <View style={styles.cardDetails}>
                                                    <View style={styles.cardDetailsLeft}>
                                                        <TouchableOpacity style={[styles.row,{alignSelf:'flex-start'}]}>
                                                            <Avatar.Icon 
                                                                color={'#616161'} 
                                                                icon="account" size={30} 
                                                                style={styles.cardIcon} 
                                                            />
                                                            <Text style={[styles.leftDetails,{flexWrap: 'wrap',flexGrow: 0}]}>
                                                                {doc['personInChargeName']}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        
                                                        <TouchableOpacity style={[styles.row,{alignSelf:'flex-start'}]} onPress={()=>Linking.openURL((Platform.OS == "ios" || Platform.OS == 'macos' ? 'telprompt:':'tel:') + doc['personInChargePhone']) }>
                                                            <Avatar.Icon 
                                                                color={'#616161'} 
                                                                icon="phone" size={30}  
                                                                style={styles.cardIcon}
                                                            />
                                                            <Text style={styles.leftDetails}>
                                                                {doc['personInChargePhone']}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.cardDetailsRight}>
                                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                            {trafficStatusWidget(doc['trafficStatus'])}
                                                            {phatakStatusWidget(doc['phatakStatus'])}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                                {/* {
                                    documents.map((doc) => {
                                        return (
                                            <View key={documents.indexOf(doc)} style={styles.card}>
                                                <Image style={[styles.image,{width: Platform.OS == "android" ? window.width-40 : 330,}]} source={{uri: doc['imageURL']}} />
                                                <View style={{width: '100%', marginTop: 0, backgroundColor: '#4D4C4C6B', height: 2.5}} />
                                                <View style={styles.cardHeading}>
                                                    <View style={styles.line} />
                                                    <Text style={styles.crossingName}>{doc['phatakName']}</Text>
                                                    <View style={styles.line} />
                                                </View>
                                                
                                                <View style={styles.cardDetails}>
                                                    <View style={styles.cardDetailsLeft}>
                                                        <TouchableOpacity style={[styles.row,{alignSelf:'flex-start'}]}>
                                                            <Avatar.Icon 
                                                                color={'#616161'} 
                                                                icon="account" size={30} 
                                                                style={styles.cardIcon} 
                                                            />
                                                            <Text style={[styles.leftDetails,{flexWrap: 'wrap',flexGrow: 0}]}>
                                                                {doc['personInChargeName']}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        
                                                        <TouchableOpacity style={[styles.row,{alignSelf:'flex-start'}]} onPress={()=>Linking.openURL((Platform.OS == "ios" || Platform.OS == 'macos' ? 'telprompt:':'tel:') + doc['personInChargePhone']) }>
                                                            <Avatar.Icon 
                                                                color={'#616161'} 
                                                                icon="phone" size={30}  
                                                                style={styles.cardIcon}
                                                            />
                                                            <Text style={styles.leftDetails}>
                                                                {doc['personInChargePhone']}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.cardDetailsRight}>
                                                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                                            {trafficStatusWidget(doc['trafficStatus'])}
                                                            {phatakStatusWidget(doc['phatakStatus'])}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                } */}
                            </View>
                            {/* <Button title='Maps' onPress={()=>navigation.navigate('MapView')}></Button> */}
                        </ScrollView>
                    )
                        
                    :
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}><ActivityIndicator color={themeColor} /></View>
                }    
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        // justifyContent: 'center',
        alignContent: 'center',
    },
    sub_container: {
        width: '100%',
        alignItems: 'center',
        alignContent: 'center',
        height: '100%',
        // height: '100%',
        marginBottom: Platform.OS == 'android'? '40%' : '10%',
    },
    ScrollView:{
        width: '100%',
        paddingHorizontal: 15,
        alignContent: 'center',
        alignSelf: 'center',
    },
    CardsView: {
        // borderColor:
        alignSelf: 'center',
        alignContent: 'center',
        // height: '100%',
        // paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20,
        width: '100%',
        flexWrap: 'wrap',
    },
    card: {
        alignSelf: 'center',
        shadowColor: '#8B8B8B',
        shadowRadius: 8,
        borderColor: '#6161611F',
        borderWidth: Platform.OS == "android" ? 2 : 0,
        backgroundColor: '#FAFAFA',
        elevation: 8,
        // padding: 10,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 8 
    },
    image: {
        height: 200,
        maxHeight: 260,
        opacity: 1,
        // minWidth: 300,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        width: Platform.OS == "android" ? Dimensions.get('screen').width-40 : 330,
    },
    cardDetails: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        paddingTop: 0,
        paddingHorizontal: 12
    },
    cardHeading: {
        marginVertical: 8,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        height: 1.19,
        marginTop: 1.5,
        width: 90,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: '#783BE9',
    },
    crossingName: {
        textAlign: 'center',
        color: themeColor,
        fontSize: Platform.OS == "android" ? 17 : 16,
        fontWeight:'500',
    },
    cardDetailsLeft: {
        width: '70%',
    },
    cardDetailsRight: {
        width: '30%',
        alignItems: 'flex-end',
    },
    cardIcon: {
        height: 24,
        width:24,
        backgroundColor: 'transparent',
        margin: 4
    },
    phatakStatusCircle:{
        width: 8,
        height: 8,
        borderRadius: 100,
        marginRight: 4
    },
    leftDetails: {
        fontSize: 15
    },
    fab: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        bottom: 20,
        right: 20,
        shadowColor: '#8B8B8B',
        shadowOpacity: 0.9,
        shadowOffset: {width: 10, height: 10},
        shadowRadius: 8,
        borderColor: '#6161611F',
        backgroundColor: "#630BDD",
        paddingHorizontal: 13,
        paddingVertical: 13,
        elevation: 50,
        zIndex: 10,
    },
    fabIcon:{
        height: 24,
        width:24,
        backgroundColor: 'transparent',
        margin: 4,
        color: '#ffffff'
    }
  });