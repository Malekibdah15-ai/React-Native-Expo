import {Modal, Pressable, StyleSheet, View, Text} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
    isvisible: boolean;
    children: React.ReactNode;
    onClose: () => void;
}

export default function Emojipicker({isvisible, children, onClose}: Props){
    return(
        <Modal visible={isvisible} animationType="slide" transparent={true}>
            <View style={styles.container}>
                <Text style={styles.title}>choose a sticker</Text>
                <Pressable onPress={onClose} style={styles.closebutton}>
                    <MaterialIcons name="close" size={24} color="white" />
                </Pressable>
                {children}
            </View>

        </Modal>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: '25%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    closebutton:{
        position: 'absolute',
        top: 20,
        right: 20,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    }          
    
})