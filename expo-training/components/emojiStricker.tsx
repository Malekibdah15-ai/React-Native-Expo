import {View } from "react-native";
import {Image} from "expo-image";

type Props = {
    imageSize:  number;
    strickerSource: string;
  }

export default function EmojiStricker({imageSize, strickerSource}: Props){
    return(
        <View style={{position: 'absolute', top: 0, left: 0}}>
            <Image source={strickerSource} style={{width: imageSize, height: imageSize}} />
        </View>
    )
}
