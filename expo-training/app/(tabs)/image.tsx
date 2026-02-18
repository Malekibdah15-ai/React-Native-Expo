import React, { use, useEffect, useRef, useState } from 'react';
import { StyleSheet , View, ScrollView} from 'react-native';
import ImageViewer from "../../components/temp";
import Buttons from '@/components/Buttons';
import * as ImagePicker from 'expo-image-picker';
import IconButton from '@/components/iconButton';
import CircleButton from '@/components/circleButton';
import Emojipicker from '@/components/emojipicker';
import EmojiList from '@/components/emojiList';
import EmojiStricker from '@/components/emojiStricker';
import * as MediaLibrary from 'expo-media-library';
import {captureRef} from 'react-native-view-shot';
const styles = StyleSheet.create({
    container:{
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    imgcontainer:{
      // flex: 1/2,
      backgroundColor: 'black',
      width: '50%',
      height: '35%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
      marginBottom: 50,
    },
    fotercontainer:{
      flex: 1/3,
      alignItems: 'center', 
    },
    img:{
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      alignSelf: 'center',
    },
    button:{
      flex: 1/3,
    },
    optionsshow:{
      width: '30%',
      position: 'absolute',
      bottom: 80,
      justifyContent: 'center',
      alignItems: 'center',
    }
})

const placeholderimage = require('../../assets/images/react-logo.png');

export default function ImageScreen(){
  const [hasPermission, setHasPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  useEffect(() => {
    if (!hasPermission?.granted) {
      setHasPermission()
  }
  }, [])

  const imgPicker = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1, 
    })

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri);
      setShowOptions(true);
      console.log(result);
  }else{
      console.log("you did not select any image");
  }
  }

  const onModalClose = () => {
    setIsEmojiPickerVisible(false);
  }

  const onRest = () => {
    setShowOptions(false);
  }

  const onAddSticker = () => {
    setIsEmojiPickerVisible(true);
  }
  const onSave = async() => {
    try{
      const uri = await captureRef(imageRef,{
        height: 440,
        quality: 1,
      })
      if(uri){
        await MediaLibrary.saveToLibraryAsync(uri);
        alert('Image saved to gallery!');
      }
    }catch(error){
      console.error('Error saving image:', error);
    }
    
  }

    return(
        <View style={styles.container}>
          <View ref={imageRef} style={styles.imgcontainer}>
            <ImageViewer imgsource={selectedImage? {uri: selectedImage} : placeholderimage} style={styles.img} />
            {selectedEmoji && <EmojiStricker imageSize={50} strickerSource={selectedEmoji} />}
          </View>
          {showOptions ? (
            <View style={styles.optionsshow}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                <IconButton icon="refresh" label="Reset" onPress={onRest} />
                <CircleButton onPress={onAddSticker} />
                <IconButton icon="save-alt" label="save" onPress={onSave} />
              </View> 
            </View>
          ) : (

          <View style={styles.fotercontainer}>
            <Buttons label="Choose a photo" onPress={imgPicker} style={styles.button} />
          </View>
          )}
          <Emojipicker isvisible={isEmojiPickerVisible} onClose={onModalClose}>
            <EmojiList onSelect={ setSelectedEmoji} onClose={onModalClose} />
          </Emojipicker>
        </View>
    )
}
  