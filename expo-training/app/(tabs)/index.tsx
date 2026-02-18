import React, {use, useEffect, useState} from 'react';
import { StyleSheet, Text, View, Pressable, Alert, Button, ActivityIndicator, FlatList } from 'react-native';
import { blue } from 'react-native-reanimated/lib/typescript/Colors';
import {Link} from 'expo-router'
import {
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native';
import {router} from 'expo-router'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    red:{
      color: 'red'
    },
    button:{
      margin:25,
      backgroundColor: 'blue'
    },
    text:{
      fontSize: 15,
      color: 'black'
    }

  })

  type Movie = {
    id : number;
    title: string;
    releaseYear: string;
  }
export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Movie[]>([]);

  const getMovies = async () =>{
    try{
      setLoading(true);
      const responce = await fetch('https://reactnative.dev/movies.json');
      const json = await responce.json();
      setData(json.movies);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    getMovies();
}, []);



  const onPress = ()=>{
    Alert.alert("yoy tapped thios button ")
  }

  const opacity = useSharedValue(0);

  useEffect(() =>{
    opacity.value = withTiming(1,{duration: 1000})
  },[])

  
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SafeAreaProvider>

    <View style={styles.container}>
      <Text style={styles.red}>Hello from index.tsx 🚀</Text>

      <Pressable
      onPress={()=> alert("pressed")}
      style={{
        backgroundColor:'#4f46e5',
        paddingVertical: 12,
        paddingHorizontal:15,
        borderRadius: 8,
      }}
      >
        <Text style={{color:'white', fontSize:16}}>press me</Text>
      </Pressable>
      <View style={styles.button}>
        <Button onPress={onPress} title='click' color={'red'}/>
      </View>

      <TouchableOpacity onPress={onPress}>
        <View style = {styles.button}>
          <Text style={styles.text}>opasity Buttton</Text>
        </View>

      </TouchableOpacity>
      <View style={{margin:25}}>
        <Text style={{fontSize:20, color:'green'}}>dggggggggggggggggggbbbbbbbbb</Text>
      </View>
      <View style={{margin:25}}>
        <Pressable onPress={()=> router.push('/(tabs)/profile')}>
          <Text style={{fontSize:20, color:'black'}}>go to profile</Text>
        </Pressable>
      </View>

      <Animated.View
      style={[{width: 200, height: 100, backgroundColor: 'orange'},animatedStyle]}>

        <Text>Animation!!</Text>


      </Animated.View>
      <View style={{margin:25}}>
        <Pressable onPress={()=> router.push('/(tabs)/image')}>
          <Text style={{fontSize:20, color:'black'}}>go to image</Text>
        </Pressable>
      </View>

      <Link href="/(tabs)/community">go to chat</Link>

    </View>
    </SafeAreaProvider>
  );

  
}
