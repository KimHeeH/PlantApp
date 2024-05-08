import React, {useEffect} from "react";
import { TouchableOpacity, Modal, View, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import AppText from "./AppText";

const ImageSelectModal = ({ visible, onCloseRequest, onCancel, ImageData }) => {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            ImageData(result.assets[0].uri);
            onCloseRequest();
        }
    };

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              
            }
          }
        })();
      }, []);
    
      const PhotopickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
          ImageData(result.assets[0].uri);
          onCloseRequest();
        }
      };
    
    return (
        <View>
            <Modal
                visible = {visible}
                onCloseRequest = {onCloseRequest}
                onCancel = {onCancel}
                animationType="fade"
                transparent = {true}
            >
                <View style = {styles.BackgroundContainer}>
                </View>
            </Modal>
            <Modal
                transparent = { true }
                visible = {visible}
                onRequestClose = {onCloseRequest}
                animationType="slide"
            >
                <View style = {styles.container}>
                    <View style = {styles.ModalView}>
                        <View style = {styles.BtnView}> 
                            <TouchableOpacity
                                style = {styles.BtnStyles}
                                onPress = {onCancel}
                            >
                                <AppText style = {styles.fontStyle}>취소</AppText>
                            </TouchableOpacity>
                        </View>

                        <View style = {styles.BtnView}>
                            <TouchableOpacity
                                style = {styles.BtnStyles}
                                onPress = {PhotopickImage}
                            >
                                <AppText style = {styles.fontStyle}>사진 찍기</AppText>
                            </TouchableOpacity>
                        </View>

                        <View style = {styles.BtnView}>
                            <TouchableOpacity
                                style = {styles.BtnStyles}
                                onPress = {pickImage}
                            >
                                <AppText style = {styles.fontStyle}>사진 선택</AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ImageSelectModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ModalView: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '100%',
        height: 200,
        bottom: 0,
        borderTopWidth: 1,
        borderColor: '#CDD0CB'
    },
    BackgroundContainer: {
        flex: 1,
        backgroundColor: 'rgba(128, 128, 128, 0.5)'
    },
    fontStyle: {
        fontSize: 17,
        alignSelf: 'flex-start',
        padding: '3%'
    },
    BtnView: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    BtnStyles: {
        width: '100%'
    }
});