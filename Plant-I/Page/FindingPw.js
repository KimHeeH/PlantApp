import React, { useState } from "react";
import { View, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from "react-native";
import AppText from "../Components/AppText";
import axios from "axios";
import AlertModal from "../Components/AlertModal";
import CustomInput from '../Components/CustomInput';
import SERVER_ADDRESS from "../Components/ServerAddress";

const FindingPw = ({ navigation }) => {

    const FindingUser = () => {
      axios.post(`${SERVER_ADDRESS}/userdb/FindingPw`, {
        id: id,
        name: name,
        Phone: Phone,
      })
      .then(response => {
        const data = response.data;

        if(id === "" || name === "" || Phone === "") {
            setNullVisibled(true);
        } else if(data && data.length > 0) {
            if(data === "") {
                setFailVisibled(true);
            } else {
                setUserData(data);
                navigation.navigate("EditPassword", {
                    id: data[0].id,
                    pw: data[0].pw
                })
            }
        } else {
            setFailVisibled(true);
        }
      })
      .catch(error => {
        if(error) {
          console.log(error);
        }
      })
    }

    const [name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [id, setId] = useState("");
    const [userData, setUserData] = useState("");
    const [FailVisibled, setFailVisibled] = useState(false);
    const [NullVisibled, setNullVisibled] = useState(false);

    return (
      <KeyboardAvoidingView
        style = {{ flex: 1, width: '100%' }}
      >
        <View style={ styles.container }>
          <AppText bold style = { styles.Title } allowFontScaling = { false }>Plant-I</AppText>

          <AppText bold style = {{ fontSize: 20, bottom: '4%' }} allowFontScaling = { false }>비밀번호 찾기</AppText>
          {/* 아이디, 비밀번호 입력 */}
          <View style = { styles.InputForm }>
            <CustomInput 
              style = { styles.input } 
              placeholder='아이디' 
              inputMode = 'text'
              placeholderTextColor = 'black'
              value = {id}
              onChangeText = {setId}
            />  

            <CustomInput 
              style = { styles.input } 
              placeholder='이름' 
              inputMode = 'text'
              placeholderTextColor = 'black'
              value = {name}
              onChangeText = {setName}
            />  
    
            <CustomInput 
              style = { styles.input } 
              placeholder='전화번호'
              inputMode = 'text'
              maxLength = {11}
              placeholderTextColor = 'black'
              value = {Phone}
              onChangeText = {setPhone}
            />
          </View>

          {/* 로그인 및 회원가입 버튼 */}
          <View style = { styles.Btn }>
            <TouchableOpacity 
              style = { styles.ConfirmBtn }
              onPress = { FindingUser }
            >
              <AppText bold style = {{ fontSize: 20 }} allowFontScaling = { false }>확인</AppText>
            </TouchableOpacity>
                  
            <TouchableOpacity 
              style = { styles.CancelBtn }
              onPress = {() => navigation.pop()}
            >
              <AppText bold style = {{ fontSize: 20 }} allowFontScaling = { false }>취소</AppText>
            </TouchableOpacity>
          </View>
          <AlertModal 
            visible = {FailVisibled}
            onRequestClose = {() => setFailVisibled(false)}
            title = "가입되지 않은 회원입니다."
            BtnText = "확인"
            onPress = {() => setFailVisibled(false)}
            showBtn={true}
          />
          <AlertModal 
            visible = {NullVisibled}
            onRequestClose = {() => setNullVisibled(false)}
            title = "정보를 입력해 주세요."
            BtnText = "확인"
            onPress = {() => setNullVisibled(false)}
            showBtn={true}
          />
        </View>
      </KeyboardAvoidingView>
    )
}

export default FindingPw;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    Title: {
      marginTop: '8%',
      fontSize: 50,
      bottom: '8%',
    },
    InputForm: {
      width: '100%',
      alignItems: 'center'
    },
    input: {
      marginVertical: '4%',
      padding: 10,
      fontSize: 17,
      width: '80%',
      height: 45,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'rgba(205, 208, 203, 1)'
    },
    Btn: {
      marginTop: '6%',
      width: '100%',
      alignItems: 'center'
    },
    ConfirmBtn: {
      backgroundColor: '#CBDDB4',
      width: '52%',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '3%',
      height: 45
    },
    CancelBtn: {
      backgroundColor: '#CDD0CB',
      width: '52%',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2%',
      height: 45
    },
  });