import { useState } from "react";
import { Platform, FlatList, StyleSheet, Pressable} from "react-native";
import { Image } from "expo-image";
type Props = {
    onSelect: (image: string) => void;
    onClose: () => void;
}

export default function EmojiList({onSelect, onClose}: Props){
    const [emojis] = useState([
        require('../assets/images/1f603.png'),
        require('../assets/images/smiling_face_with_3_hearts.png'),
        require('../assets/images/upside_down_face.png'),
    ])
    return(
        <FlatList
        data={emojis}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({item}) => (
            <Pressable onPress={() => {onSelect(item); onClose();}} style={styles.emojiContainer}>
                <Image source={item} style={styles.emoji} />        
            </Pressable>
        )}
    />
   )
}         
const styles = StyleSheet.create({
    emojiContainer:{
        flex: 1/3,      
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',   

    },
    emoji:{
        width: '80%',   
        height: '80%',
        resizeMode: 'contain',
    }
})  
    