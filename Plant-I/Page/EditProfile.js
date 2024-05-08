import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { FontAwesome, Octicons } from '@expo/vector-icons';
import axios from "axios";
import AppText from "../Components/AppText";
import AlertModal from "../Components/AlertModal";
import CustomInput from '../Components/CustomInput';
import SERVER_ADDRESS from "../Components/ServerAddress";

const EditProfile = ({ navigation, route }) => {
     
    const { id, Nname } = route.params;
    const [ NickName, setNickName ] = useState("");
    const [ SuccessVisibled, setSuccessVisibled ] = useState(false);
    const [ FailVisibled, setFailVisibled ] = useState(false);

    const UpdateData = () => {
        axios.post(`${SERVER_ADDRESS}/userdb/update`, {
            id: id,
            Nname: NickName
        })
        .then(response => {
            console.log(response.data);
            setSuccessVisibled(false)
            navigation.pop();
        })
        .catch (error =>  {
            console.log(error)
        })
    };

    const CheckNname = () => {
        axios.post(`${SERVER_ADDRESS}/userdb/CheckNickname`, {
            Nname: NickName
        })
        .then(response => {
            const data = response.data
            if(data.message === "이미 사용 중인 닉네임입니다." || data.message === "닉네임을 입력해 주세요.") {
                setFailVisibled(true);
            } else if (data.message === "사용 가능한 닉네임입니다.") {
                setSuccessVisibled(true);
            }
        })
        .catch (error => {
          console.log(error);
        })
    }

    useEffect(() => {
        setNickName(route.params?.Nname);
    }, [route.params?.Nname]);

    return(
        <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
      >
        <View style={styles.container}>
            <View style = { styles.TopContainer }>
                <TouchableOpacity 
                    style = {{ flex: 1, alignItems: 'flex-start' }}
                    onPress = {() => navigation.pop()}
                >
                    <FontAwesome name = "angle-left" size={ 35 } color = "black" />
                </TouchableOpacity>

                <AppText bold style = {styles.Title} allowFontScaling = { false }>닉네임 변경</AppText>
                <View style = {{ flex: 1 }} />
            </View>

            <View style = { styles.FontContainer }>
                <AppText bold style = {{ fontSize: 22 }} allowFontScaling = { false }>닉네임을 입력해 주세요.</AppText>
                <AppText
                    style = {{ fontSize: 17, color: '#595858', marginTop: '3%' }}
                    allowFontScaling = { false }
                >
                    한글, 영어, 숫자 조합의 1-15자{'\n'}길이의 닉네임으로 설정해 주세요.
                </AppText>
            </View>

            <View style = { styles.TextInputContainer }>
                <AppText bold style = {{ fontSize: 18 }} allowFontScaling = { false }>닉네임</AppText>
                <View>
                    <CustomInput
                        bold
                        style={ styles.TextinputStyle }
                        placeholderTextColor = 'black'
                        value = { NickName }
                        onChangeText = { setNickName }
                    />
                    <Octicons name="pencil" style = { styles.IconStyle } />
                </View>
            </View>

            <View style = { styles.BtnContainer }>
                <TouchableOpacity 
                    style = { styles.BtnStyle }
                    onPress = { CheckNname }
                >
                    <AppText bold style = {{ fontSize: 20 }} allowFontScaling = { false }>저장</AppText>
                </TouchableOpacity>
            </View>

            <AlertModal 
                visible = {SuccessVisibled}
                onRequestClose = {() => setSuccessVisibled(false)}
                title = "닉네임이 변경되었습니다."
                onPress = {() => UpdateData()}
                BtnText = "확인"
                showBtn = {true}
            />

            <AlertModal 
                visible = {FailVisibled}
                onRequestClose = {() => setFailVisibled(false)}
                title = "이미 사용 중인 닉네임입니다."
                onPress = {() => setFailVisibled(false)}
                BtnText = "확인"
                showBtn = {true}
            />
        </View>
        </KeyboardAvoidingView>
    )
}
export default EditProfile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    TopContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: '3%',
        alignItems: 'center'
    },
    Title: {
        fontSize: 22,
        textAlign: 'center'
    },
    FontContainer: {
        marginTop: '5%',
        marginLeft: '5%'
    },
    TextInputContainer: {
        marginTop: '6%',
        marginLeft: '5%'
    },
    TextinputStyle: {
        width: '94%',
        height: 50,
        padding: 8, 
        borderBottomWidth: 1,
        borderColor: '#979797',
        fontSize: 18,
        color: '#595858',
        textAlignVertical: 'bottom'
    },
    IconStyle: {
        fontSize: 24,
        color: '#595858',
        bottom: '45%',
        left: '86%'
    },
    BtnContainer: {
        alignSelf: 'center',
        width: '65%',
        height: '15%',
        justifyContent: 'center',
        top: "40%"
    },
    BtnStyle: {
        backgroundColor: '#DADADA',
        width: '100%',
        height: '50%',
        borderRadius: 18,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
  });