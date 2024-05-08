import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { UserContext } from "../AuthContext/AuthContext";
import AppText from "../Components/AppText";
import AlertModal from "../Components/AlertModal";
import CustomInput from '../Components/CustomInput';
import SERVER_ADDRESS from "../Components/ServerAddress";

const WriteBoard = ({ navigation, route }) => {

    const { login, user } = useContext(UserContext);
    const [ userData, setUserData ] = useState([]);
    const [ Title, setTitle ] = useState("");
    const [ Content, setContent ] = useState("");
    const [ SuccessVisibled, setSuccessVisibled ] = useState(false);
    const [ NullVisibled, setNullVisibled ] = useState(false);
    const { selectedCategory } = route.params;

    useEffect(() => {
        const SelectUser = () => {
            axios.post(`${SERVER_ADDRESS}/userdb/userId`,{ 
                id: user.id,
            })
            .then(response => {
                const data = response.data;
                setUserData(data);
            })
            .catch(error => {
                console.log(error);
            })
        };
        SelectUser();
    }, [user])

    const InsertBoard = () => {
        axios.post(`${SERVER_ADDRESS}/Postdb/insert`, {
            Id: user.id,
            Writer: userData.Nname,
            Title: Title,
            Content, Content,
            Category: selectedCategory
        })
        .then(response => {
            console.log("작성 성공")
        }) 
        .catch ((error) => {
            console.log(error);
        })
    }

    const handleInsertBoard = () => {
        if (Title === "" || Content === "") {
            setNullVisibled(true);
        } else {
            InsertBoard();
            setSuccessVisibled(true)
        }
    }
    
    return (
        <View style = { styles.container }>
            <View style = { styles.TopConatiner }>
                <TouchableOpacity 
                    style = { styles.BackBtn }
                    onPress = {() => navigation.pop()}
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
                    onPress={ handleInsertBoard }
                >
                    <AppText bold style = {{ fontSize: 15, color: '#757575' }} allowFontScaling = { false }>등록</AppText>
                </TouchableOpacity>
            </View>

            <View style = { styles.WriteContaier }>
                <CustomInput 
                    style = { styles.WriteTitleView }
                    placeholder="제목을 입력해 주세요."
                    placeholderTextColor = "#979797"
                    value = { Title }
                    onChangeText = { setTitle }
                />
                <CustomInput 
                    style = { styles.WriteContentView }
                    multiline = {true}
                    numberOfLines = {10}
                    placeholder = "자유롭게 글을 작성해 주세요."
                    placeholderTextColor = "#979797"
                    value = { Content }
                    onChangeText = { setContent }
                />  
            </View>
            <AlertModal 
                visible = { SuccessVisibled }
                onRequestClose = {() => setSuccessVisibled(false)}
                showBtn = { true }
                title = "글이 작성되었습니다."
                BtnText = "확인"
                onPress= {() => {setSuccessVisibled(false); navigation.pop();}}
            />
            <AlertModal 
                visible = { NullVisibled }
                onRequestClose = {() => setNullVisibled(false)}
                showBtn = { true }
                title = "제목 혹은 내용을 작성해 주세요."
                BtnText = "확인"
                onPress = {() => setNullVisibled(false)}
            />
        </View>
    )
}

export default WriteBoard;

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
        fontSize: 18, 
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