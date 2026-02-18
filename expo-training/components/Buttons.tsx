import { View, StyleSheet, Pressable, Text  } from "react-native";

type Props = {
    label: string;
    style: any;
    onPress?: () => void;

}

export default function Buttons({label, style, onPress}: Props){
    return(
        <View style={ [styles.Buttoncontainer, style]}>
            <Pressable
            style={ [styles.button, style]}
            onPress = {onPress}>

            <Text style={styles.label}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    Buttoncontainer:{
        width: 350,
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    button:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label:{
        color: 'white',
        fontSize: 15,
    }
})