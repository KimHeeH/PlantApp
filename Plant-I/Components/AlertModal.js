import React from "react";
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import AppText from "./AppText";

const AlertModal = ({ visible, onRequestClose, title, onCancel, onPress, BtnText, CancelBtnText, showBtn }) => {
    return (
        <Modal
            animationType = "none"
            transparent = { true }
            visible = { visible }
            onRequestClose = { onRequestClose }
        >
            <View style = { styles.ModalContainer }>
                <View style = { styles.ModalView }>
                    <AppText bold style = { styles.TitleStyles } allowFontScaling = { false }>
                        {title}
                    </AppText>
                    
                    {showBtn && (
                        <View style = { styles.ModalBtnContainer }>
                            {onCancel && (
                                <TouchableOpacity
                                    onPress = { onCancel }
                                >
                                    <AppText bold style = {{ fontSize: 17 }} >{CancelBtnText}</AppText>
                                </TouchableOpacity>
                            )}

                            {onPress && (
                                <TouchableOpacity
                                    onPress = { onPress }
                                >
                                    <AppText bold style = {{ fontSize:17, color: '#608C27' }} allowFontScaling = { false }>{BtnText}</AppText>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;

const styles = StyleSheet.create({
    ModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    ModalView: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#979797',
        borderRadius: 10,
        padding: '15%',
        minWidth: '78%',
        maxWidth: '94%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    ModalBtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 30,
        right: 0,
        left: 0,
        justifyContent: 'space-around',
    },
    TitleStyles: { 
        fontSize: 17, 
        color: '#979797', 
        bottom: 20, 
        textAlign: 'center' 
    }
})