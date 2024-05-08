import React, { useState } from "react";
import { View, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from "react-native";
import AppText from "../Components/AppText";
import axios from "axios";
import AlertModal from "../Components/AlertModal";
import CustomInput from '../Components/CustomInput';
import SERVER_ADDRESS from "../Components/ServerAddress";

const EditPassword = ({ navigation, route }) => {

    const { id, pw } = route.params; 
    const [Editpw, setEditPw] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [SuccessVisibled, setSuccessVisibled] = useState(false);
    const [NullVisibled, setNullVisibled] = useState(false);
    const [checkpw, setCheckPw] = useState(false);
    const [checkConfirmPw, setCheckConfirmPw] = useState(false);
    const [isPwFocused, setIsPwFocused] = useState(false);
    const [successChange, setSuccessChange] = useState(false);

    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleEditPwBlur = () => {
      setIsPwFocused(false)
    }

    const validatePassword = (input) => {
      if(input === "") {
        setPasswordError("");
        setCheckPw(false);
      } else {
        const isVaild = isPasswordValid(input);
        if (!isVaild) {
          setPasswordError("숫자, 영문자, 특수문자를 포함하여 8자리 이상 20자리 이하");
          setCheckPw(false);
        } 
        else if (pw === input) {
            setPasswordError("현재 사용 중인 비밀번호입니다.");
            setCheckPw(false);
        } 
        else {
          setPasswordError("사용 가능한 비밀번호입니다.");
          setCheckPw(true);
        }
      }
    };

    const isPasswordValid = (input) => {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(input);
    };

    const validateConfirmPassword = (input) => {
      if(input === "") {
        setConfirmPasswordError("");
        setCheckConfirmPw(false)
      } else {
        if(Editpw !== input) {
          setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
          setCheckConfirmPw(false);
        } else if (Editpw === input){
          setConfirmPasswordError("비밀번호가 일치합니다.");
          setCheckConfirmPw(true);
        }
      }
    };

    const SuccessPw = passwordError === '사용 가능한 비밀번호입니다.' ? styles.successText : {};
    const SuccessConfirmPw = confirmPasswordError === '비밀번호가 일치합니다.' ? styles.successText : {};
    
    const EditUserPw = () => {
        axios.post(`${SERVER_ADDRESS}/userdb/EditPw`, {
            id: id,
            pw: Editpw
        })
        .then(response => {
          setSuccessVisibled(true);
        })
        .catch(error => {
          console.log(error);
        })
    }

    const handleEditPw = () => {
      if(checkpw && checkConfirmPw === true) {
        EditUserPw();
      } else {
        setNullVisibled(true);
      }
    }

    return (
      <KeyboardAvoidingView
        style = {{ flex: 1, width: '100%'}}
      >
        <View style={ styles.container }>
        <AppText bold style = { styles.Title } allowFontScaling = { false }>Plant-I</AppText>

        <AppText bold style = {{ fontSize: 20, bottom: '4%' }} allowFontScaling = { false }>비밀번호 재설정</AppText>
        {/* 아이디, 비밀번호 입력 */}
          <View style = { styles.InputForm }>
            <CustomInput 
              style = {{...styles.input, marginVertical: 15}} 
              placeholder='비밀번호' 
              inputMode = 'text'
              placeholderTextColor = 'black'
              secureTextEntry = {true}
              maxLength = {20}
              value = {Editpw}
              onChangeText = {(text) => {
                setEditPw(text);
                validatePassword(text);
              }}
              onBlur={handleEditPwBlur}
            />  

            {passwordError !== "" && (
              <AppText style={{ ...styles.errorText, ...SuccessPw }} allowFontScaling = { false }>{passwordError}</AppText>
            )}
    
            <CustomInput 
              style = {{...styles.input, marginVertical: 15}} 
              placeholder='비밀번호 확인'
              inputMode = 'text'
              placeholderTextColor = 'black'
              secureTextEntry = {true}
              maxLength = {20}
              value = {confirmPassword}
              onChangeText = {(text) => {
                setConfirmPassword(text);
                validateConfirmPassword(text);
              }}
            />

            {confirmPasswordError !== "" && (
              <AppText style = {{ ...styles.errorText, ...SuccessConfirmPw }} allowFontScaling = { false }>{confirmPasswordError}</AppText>
            )}
          </View>

          {/* 로그인 및 회원가입 버튼 */}
          <View style = { styles.Btn }>
            <TouchableOpacity 
              style = { styles.ConfirmBtn }
              onPress = { handleEditPw }
            >
              <AppText bold style = {{ fontSize: 20 }} allowFontScaling = { false }>확인</AppText>
            </TouchableOpacity>
          </View>
          <AlertModal 
            visible = {SuccessVisibled}
            onRequestClose = {() => setSuccessVisibled(false)}
            title = "비밀번호가 재설정되었습니다."
            BtnText = "확인"
            onPress = {() => {
              setSuccessVisibled(false);
              navigation.navigate("LoginPage");
            }}
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

export default EditPassword;

const styles = StyleSheet.create({
    container: {  // 전체 View 구성
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      backgroundColor: 'white',
      width: '100%'
    },
    Title: {  // 타이틀
      marginTop: '8%',
      fontSize: 50,
      bottom: '8%',
    },
    InputForm: {
      width: '100%',
      flexDirection: 'column'
    },  
    input: {  // TextInput 구성
      alignSelf: 'center',
      marginVertical: 12,
      padding: 10,
      fontSize: 17,
      width: '80%',
      height: 'auto',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'rgba(205, 208, 203, 1)',
    },
    Btn: {
      marginTop: '6%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      top: '1%'
    },
    ConfirmBtn: { 
      backgroundColor: '#CBDDB4',
      width: '52%',
      height: 45,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '2%',
    },
    errorText: {
        color: "#ff2727",
        fontSize: 12,
        marginTop: 2,
        left: '10%',
        bottom: '5%'
      },
      successText: {
        color: "green",
        fontSize: 12,
        marginTop: 2,
        left: '10%',
        bottom: '5%'
    }
  });