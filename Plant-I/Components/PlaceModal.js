import React from "react";
import { FlatList, Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import JSONDATA from "../JSONData/place.json";

const PlaceModal = ({ visible, onRequestClose, onPress }) => {

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity 
                style = {styles.DataStyles}
                onPress = {() => {
                    onPress(item.name);
                }}
            >
                <AppText bold>{item.name}</AppText>
            </TouchableOpacity>
        )
    }

    return (
        <Modal
            visible = {visible}
            animationType = "none"
            transparent = {true}
            onRequestClose = {onRequestClose}
        >
            <View style = {styles.ModalContainer}>
                <View style = {styles.DataContainer}>
                    <FlatList 
                        data = {JSONDATA}
                        renderItem = {renderItem}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </Modal>
    );
}; 
export default PlaceModal;

const styles = StyleSheet.create({
    ModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    DataContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        minHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 40
    },
    DataStyles: {
        backgroundColor: '#CBDDB4',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: 100,
        height: 30,
        margin: 5
    }
});