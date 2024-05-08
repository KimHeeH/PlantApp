import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import AppText from "../Components/AppText";
import axios from "axios";
import AlertModal from "../Components/AlertModal";
import CustomInput from '../Components/CustomInput';
import SERVER_ADDRESS from "../Components/ServerAddress";

const EditBoardContent = ({ route, navigation }) => {

    const { Id, Writer, Title, Content, RegDate } = route.params;
    const [ editTitle, setEditTitle ] = useState("");
    const [ editContent, setEditContent ] = useState("");
    const [ updateBoardVisibled, setUpdateBoardVisibled ] = useState(false);

    useEffect(() => {
        setEditTitle(route.params?.Title);
        setEditContent(route.params?.Content);
    }, [route.params?.Title, route.params?.Content]);

    const EditBoard = () => {
        axios.post(`${SERVER_ADDRESS}/Postdb/update`, {
            Id: Id,
            Writer: Writer,
            Title: editTitle,
            Content: editContent,
            RegDate: RegDate
        })
        .then(response => {
            console.log("수정완료");
            console.log(Id);
            navigation.pop();
            navigation.pop();
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleEditBoard = () => {
        EditBoard();
    }

    return (
        <View>
            <View style = { styles.TopConatiner }>
                <TouchableOpacity 
                    style = { styles.BackBtn }
                    onPress = {() => navigation.goBack()}
                >
                    <FontAwesome name = "angle-left" size={ 35 } color = "black" />
                </TouchableOpacity>

                <View style = { styles.centerText }>
                    <AppText bold style = {{ fontSize: 22 }} allowFontScaling = { false }>
                        글 쓰기
                    </AppText>
                </View>

                <TouchableOpacity
                    style = { styles.RegisterBtn }
                    onPress={() => setUpdateBoardVisibled(true)}
                >
                    <AppText bold style = {{ fontSize: 15, color: '#757575' }} allowFontScaling = { false }>등록</AppText>
                </TouchableOpacity>
            </View>

            <View style = { styles.WriteContaier }>
                <CustomInput 
                    style = { styles.WriteTitleView }
                    placeholder="제목을 입력해 주세요."
                    placeholderTextColor = "#979797"
                    value = { editTitle }
                    onChangeText = { setEditTitle }
                />
                <CustomInput 
                    style = { styles.WriteContentView }
                    multiline = {true}
                    numberOfLines = {10}
                    placeholder = "자유롭게 글을 작성해 주세요."
                    value = { editContent }
                    onChangeText = { setEditContent }
                />  
            </View>
            <AlertModal 
                visible = {updateBoardVisibled}
                onRequestClose = {() => setUpdateBoardVisibled(false)}
                title = "작성한 글을 수정할까요?"
                BtnText = "수정하기"
                CancelBtnText = "아니오"
                onCancel = {() => setUpdateBoardVisibled(false)}
                onPress = { handleEditBoard }
                showBtn = {true}
            />
        </View>
    )
}

export default EditBoardContent;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white', 
        height: '100%'
    },
    TopConatiner: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        padding: '3%',
        alignItems: 'center',
        paddingHorizontal: '4%'
    },
    WriteContaier: { 
        backgroundColor: '#DADADA', 
        height: '87%', 
        borderRadius: 10, 
        margin: '4%'
    },
    WriteTitleView: { 
        fontSize: 22, 
        borderBottomWidth: 1, 
        borderBottomColor: '#979797',
        padding: '2%', 
        margin: '2%' 
    }, 
    WriteContentView: { 
        textAlignVertical: 'top', 
        padding: '3%', 
        margin: '1%', 
        height: '50%',
    },
    BackBtn: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerText: {
        flex: 1,
        alignItems: 'center'
    },
    RegisterBtn: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});