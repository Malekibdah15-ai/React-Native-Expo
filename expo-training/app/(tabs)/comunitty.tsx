import { useEffect, useRef, useState } from 'react';
import { TextInput, View } from "react-native";
import { StyleSheet, Text, Pressable, Alert, Button, ActivityIndicator, FlatList } from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  status: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  message: {
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 6,
  },
});
export default function Community(){
    const ws = useRef<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    const connectwebsocket = () =>{
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () =>{
            setIsConnected(true);
            console.log('WebSocket connected');
        }
        socket.onmessage = (event: MessageEvent) =>{
            setMessages(prev=> [...prev, event.data]);
        }
        socket.onclose = ()=>{
            setIsConnected(false);
            console.log('WebSocket disconnected');

            setTimeout(() =>{
                connectwebsocket();
             }, 3000)        
        }
        socket.onerror = (error) =>{
            console.error('WebSocket error:', error);
        }   
        ws.current = socket;
    }
    useEffect(() =>{
        connectwebsocket();
        return () =>{
            ws.current?.close();
        };
    }, [])

    const sendMessage = () =>{
        if(ws.current && isConnected && input.trim() !== ''){
            ws.current.send(input);
            setInput('');
        }
    }
    

    return(
        <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <Text style={styles.status}>Community section</Text>
            
            <Text style={styles.status}>Status: {isConnected ? 'Connected' : 'Disconnected'}</Text>

        </SafeAreaView>

        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => <Text style={styles.message}>{item}</Text>}
        />

        <TextInput 
            style={styles.input}
            value = {input}
            onChangeText={setInput}
            placeholder="Type your message"
        />

        <Button title = 'Send' onPress = {sendMessage}/>
        </SafeAreaProvider>
    )   
}

