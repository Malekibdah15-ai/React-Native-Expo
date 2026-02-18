import { Pressable, StyleSheet, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
    onPress: () => void;
}

export default function CircleButton({onPress}: Props){
    return(
        <View  style ={styles.circlecontainer}>
            <Pressable onPress={onPress} style={styles.circlebutton}>
                <MaterialIcons name="add" size={29} color="white" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    circlecontainer:{
        width: 50,
        height: 50,
        borderRadius: 25,   
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circlebutton:{
        width: '100%',
        height: '100%',
        borderRadius: 25,   
        backgroundColor: 'blue',
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
})