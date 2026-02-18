import React, {use, useEffect} from 'react'
import {router} from 'expo-router'
import {View, Text, FlatList, } from 'react-native'
import * as SecureStore from 'expo-secure-store';

const products = [
    {title: 'lg,bdgb', isFruted: false, id: 1},
    {title: 'lddddgb', isFruted: false, id: 2},
    {title: 'lergerg', isFruted: true, id: 3}
]
type Items = {
    title: string,
    isFruted: boolean,
    id: number
}
const Productitems = ({title, isFruted, id}: Items) => (
    <View>
        <Text>{title}</Text>
        <Text>{isFruted ? 'Fruted' : 'Not Fruted'}</Text>
        <Text>ID: {id}</Text>
    </View>
)
export default function Profile(){
    useEffect(() => {
        const storeToken = async () => {
            await SecureStore.setItemAsync('token', 'items_token'); 
            const token = await SecureStore.getItemAsync('token');
            console.log('Token stored:', token);    
            if (token) {
                console.log('Token retrieved successfully:', token);
        }
    }    
    storeToken();

    }, [])              
                                                                                                                                                                                  


    return(

    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>


        <Text style={{color:'', fontSize:16}}>profile section</Text>
        <View>

        <FlatList<Items>
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
           <Productitems
            title={item.title}
            isFruted={item.isFruted}
            id={item.id}
    />
  )}
/>
        </View>

    </View>
    )
}
