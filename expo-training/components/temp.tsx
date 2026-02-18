import { View, StyleSheet, Image } from 'react-native';
type props = {
    imgsource: any;
    style?: any;
}

export default function ImageViewer({imgsource, style}: props){
    return(
        <View style={style}>
            <Image source={ imgsource} style={[styles.img, style]}/>
        </View>
    )
}
const styles = StyleSheet.create({
    img:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        alignSelf: 'center',
    }
})