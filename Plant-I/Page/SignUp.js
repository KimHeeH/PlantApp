import axios from "axios";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import AppText from "../Components/AppText";
import AlertModal from "../Components/AlertModal";
import CustomInput from '../Components/CustomInput';
import SERVER_ADDRESS from "../Components/ServerAddress";

export default function SignUp({ navigation }) {

  const [ id, setId ] = useState("");
  const [ pw, setPw ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ Nname, setNname ] = useState("");
  const [ name, setName ] = useState("");
  const [ Phone, setPhone ] = useState("");

  const [confirmIdError, setConfirmIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmNnameError, setConfirmNnameError] = useState("");
  const [confirmPhoneError, setConfirmPhoneError] = useState("");

  const [checkId, setCheckId] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkNname, setCheckNname] = useState(false);

  const [successVisibled, setSuccessVisibled] = useState(false);
  const [CancelVisibled, setCancelVisibled] = useState(false);
  const [failVisibled, setFailVisibled] = useState(false);

  const [isPwFocused, setIsPwFocused] = useState(false);

  const handlePwBlur = () => {
    setIsPwFocused(false)
  }

  const CheckNname = () => {
    axios.post(`${SERVER_ADDRESS}/userdb/Checknickname`, {
        Nname: Nname
    })
    .then(response => {
      const data = response.data;
      setConfirmNnameError(data.message);
      if(data.message === "닉네임을 입력해 주세요." || data.message === "이미 사용 중인 닉네임입니다.") {
        setCheckNname(false);
      } else if (data.message === "사용 가능한 닉네임입니다.") {
        setCheckNname(true);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  const CheckId = () => {
    axios.post(`${SERVER_ADDRESS}/userdb/CheckuserId`, {
      id: id
    })
    .then(response => {
      const data = response.data;
      setConfirmIdError(data.message);
      if(data.message === "아이디를 입력해 주세요." || data.message === "이미 사용 중인 아이디입니다.") {
        setCheckId(false);
      } else if(data.message === "사용 가능한 아이디입니다."){
        setCheckId(true);
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  const validatePassword = (input) => {
    if (input === "") {
      setPasswordError("");
      setCheckPw(false);
    } else {
      const isVaild = isPasswordValid(input);
      if (!isVaild) {
        setPasswordError("숫자, 영문자, 특수문자를 포함하여 8자리 이상 20자리 이하");
        setCheckPw(false);
      } else {
        setPasswordError("사용 가능한 비밀번호입니다.");
        setCheckPw(true);
      }
    }
  };

  const CancelPress = () => {
    navigation.pop();
  };

  const isPasswordValid = (input) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(input);
  };

  const isFormValid = () => {
    const isNameValid = /^[a-zA-Z가-힣]+$/;
    return (
      isPasswordValid(pw) && pw === confirmPassword && isNameValid.test(Nname)
    );
  };

  const validateConfirmPassword = (input) => {
    if(input === "") {
      setConfirmPasswordError("");
    } else {
      if (pw !== input) {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.");
      } else {
        setConfirmPasswordError("비밀번호가 일치합니다.");
      }
    } 
  };

  const SuccessId = confirmIdError === '사용 가능한 아이디입니다.' ? styles.successText : {};
  const SuccessPw = passwordError === '사용 가능한 비밀번호입니다.' ? styles.successText : {};
  const SuccessConfirmPw = confirmPasswordError === '비밀번호가 일치합니다.' ? styles.successText : {};
  const SucessNname = confirmNnameError === '사용 가능한 닉네임입니다.' ? styles.successText : {};

  const SignUpPress = () => {
    axios.post(`${SERVER_ADDRESS}/userdb/insert`, {
        id: id,
        pw: pw,
        name: name,
        Phone, Phone,
        Nname: Nname,
      })
      .then((response => {
      }))
      // 회원가입 성공 시 처리
      .catch((error) => {
        console.log(error);
      });
  };

  const CheckSignup = () => {
    if (checkId && checkPw && checkNname === true && name && Phone !== "") {
      setSuccessVisibled(true);
    } else {
      setFailVisibled(true);
    }
  }

  return (
    <KeyboardAvoidingView
      style = {{ flex: 1, width: '100%'}}
    >
    <View style={styles.container}>
      <ScrollView>
        <View style = { styles.ScrollViewStyle }>
          <AppText bold style={styles.Title} allowFontScaling = { false }>Plant-I</AppText>

          <View style={styles.InputForm}>
              <CustomInput
                style = { styles.input }
                value = { name }
                onChangeText = { setName } 
                placeholder = "이름"
                placeholderTextColor = 'black'
              />

              <CustomInput
                style = { styles.input }
                value = { Phone }
                onChangeText = { setPhone } 
                placeholder = "전화번호"
                placeholderTextColor = 'black'
                maxLength={ 11 }
                keyboardType = "decimal-pad"
              />

              <CustomInput  
                style={styles.input}
                value={ id }
                onChangeText={ setId }
                placeholder = "아이디"
                placeholderTextColor = 'black'
                autoCapitalize = "none"
              />

              <TouchableOpacity 
                style = {styles.CheckBtn}
                onPress={ CheckId }
              >
                <AppText allowFontScaling = { false }>아이디 중복 확인</AppText>
              </TouchableOpacity>

              {confirmIdError !== "" &&(
                <AppText style = {{...styles.errorText, ...SuccessId}} allowFontScaling = { false }>{ confirmIdError }</AppText>
              )}

              <CustomInput
                style={styles.input}
                secureTextEntry={true}
                value={pw}
                onChangeText={(text) => {
                  setPw(text);
                  validatePassword(text);
                }}
                onBlur={handlePwBlur}
                placeholder = "비밀번호"
                placeholderTextColor = 'black'
              />

              {passwordError !== "" && (
                <AppText style={{ ...styles.errorText, ...SuccessPw }} allowFontScaling = { false }>{passwordError}</AppText>
              )}
              
              <CustomInput
                style={styles.input}     
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  validateConfirmPassword(text);
                }}
                placeholder = "비밀번호 확인"
                placeholderTextColor = 'black'
              />
              {confirmPasswordError !== "" && (
                <AppText style = {{ ...styles.errorText, ...SuccessConfirmPw }} allowFontScaling = { false }>{confirmPasswordError}</AppText>
              )}

              <CustomInput
                style={styles.input}
                value={Nname}
                onChangeText={(text) => setNname(text)}
                placeholder = "닉네임"
                placeholderTextColor = 'black'
              />
                
              <TouchableOpacity 
                style = {styles.CheckBtn}
                onPress={CheckNname}
              >
                <AppText allowFontScaling = { false }>닉네임 중복 확인</AppText>
              </TouchableOpacity>

              {confirmNnameError !== "" && (
                <AppText style = {{ ...styles.errorText, ...SucessNname }} allowFontScaling = { false }>{confirmNnameError}</AppText>
              )}
          </View>

          <View style = { styles.Btn }>
            <TouchableOpacity
              style={[styles.SignupBtn]}
              onPress={() => CheckSignup()}
            >
              <AppText bold style={{ fontSize: 20 }} allowFontScaling = { false }>
                회원가입
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.CancelBtn} onPress={() => setCancelVisibled(true)}>
              <AppText bold style={{ fontSize: 20 }} allowFontScaling = { false }>
                취소
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <AlertModal 
        visible = {CancelVisibled}
        onRequestClose={() => setCancelVisibled(false)}
        title = "회원가입을 취소하시겠습니까?"
        BtnText = "네"
        CancelBtnText = "아니오"
        onCancel = {() => setCancelVisibled(false)}
        onPress = {CancelPress} 
        showBtn = {true}
      />

      <AlertModal 
        visible = {successVisibled}
        onRequestClose = {() => setSuccessVisibled(false)}
        title = "회원가입이 완료되었습니다."
        showBtn = {true}
        BtnText = "확인"
        onPress = {() => {
          SignUpPress();
          setSuccessVisibled(false); 
          navigation.pop();
        }}
      />

      <AlertModal 
        visible = {failVisibled}
        onRequestClose = {() => setFailVisibled(false)}
        title = "회원 정보를 모두 입력해 주세요."
        showBtn = {true}
        BtnText = "확인"
        onPress = {() => {
          setFailVisibled(false); 
        }}
      />
    </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ScrollViewStyle: { 
    alignItems: 'center', 
    justifyContent: 'center', 
    alignContent: 'center'
  },
  Title: {
    fontSize: 45,
    marginTop: '10%',
  },
  InputForm: {
    width: '100%',
    top: '2%',
    marginTop: '2%'
  },
  input: {
    alignSelf: 'center',
    marginVertical: '3%',
    padding: 10,
    fontSize: 17,
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(205, 208, 203, 1)',
  },
  Btn: {
    marginTop: '6%',
    width: '100%',
    height: 180,
    alignItems: 'center',
    top: '3%',
  },
  SignupBtn: {
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
  CheckBtn: {
    left: '10%',
    bottom: '1%'
  },
  errorText: {
    color: "#ff2727",
    fontSize: 12,
    marginTop: 1,
    left: '10%',
    bottom: '1%'
  },
  successText: {
    color: "green",
    fontSize: 12,
    marginTop: 1,
    left: '10%',
    bottom: '1%'
  }
});