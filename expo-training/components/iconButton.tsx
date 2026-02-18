import {StyleSheet, View, Text, Pressable} from 'react-native';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
    icon : keyof typeof MaterialIcons.glyphMap;
    onPress: () => void;
    label: string;
}

export default function IconButton({icon, onPress, label}: Props){
    return(
        <Pressable onPress={onPress} style={styles.button}>
            <MaterialIcons name={icon} size={24} color="white" />
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    label:{
        color: 'white',
        marginTop: 2,
    }
})