import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import axios from 'axios';
import { UserContext } from '../AuthContext/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppText from '../Components/AppText';
import CustomInput from '../Components/CustomInput';
import AlertModal from '../Components/AlertModal';
import CustomStatusBar from '../Components/CustomStatusBar';
import SERVER_ADDRESS from '../Components/ServerAddress';
//함수형 컴포넌트
function LoginPage( { navigation } ){

  const { login } = useContext(UserContext);

  const [ id, setId ] = useState('');
  const [ pw, setPw ] = useState('');
  const [rememberUser, setRememberUser] = useState(false);
  const [ saveId, setSaveId ] = useState(false);
  const resetUserData = () => [ setId(''), setPw('') ];
  const [ nullVisibled, setNullVisibled ] = useState(false);
  const [ failVisibled, setFailVisibled ] = useState(false);
 
  const rememberUserBox = () => {
    setRememberUser(!rememberUser);
  }

  const SaveIdBox = () => {
    setSaveId(!saveId);
  }

  const Login = async () => {
    try {
      const response = await axios.post(`${SERVER_ADDRESS}/userdb/login`, { id, pw });

      const userData = response.data;
      console.log(userData)
      if(userData.id == id && userData.pw == pw) {
        await AsyncStorage.setItem("user", JSON.stringify(userData));
        login(userData);
        resetUserData();
        navigation.navigate('Home');
      } else if (id === "" || pw === ""){
        setNullVisibled(true);
      } else {
        setFailVisibled(true);
      }
    } catch (error) {
        console.log('에러', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style = {{ flex: 1, width: '100%' }}
    >
      <View style={ styles.container }>
        <CustomStatusBar />
        <AppText bold style = { styles.Title } allowFontScaling = { false }>Plant-I</AppText>
        {/* 아이디, 비밀번호 입력 */}
        <View style = { styles.InputForm }>
          <CustomInput
            style = { styles.input } 
            value = { id } 
            onChangeText = { (text) => setId(text) } 
            placeholder='아이디' 
            inputMode = 'text'
            placeholderTextColor = 'black'
          />  

          <CustomInput
            style = { styles.input } 
            secureTextEntry={ true } 
            value = { pw } 
            onChangeText = { (text) => setPw(text) }
            placeholder='비밀번호'
            inputMode = 'text'
            placeholderTextColor = 'black'
          />
        </View>

        {/* 체크 박스 (로그인 상태 유지, 아이디 저장) */}
        <View style = {styles.CheckBox}>
          <Checkbox status = {rememberUser ? 'checked' : 'unchecked'} onPress = { rememberUserBox } />
          <AppText bold style = {{ fontSize: 15 }} allowFontScaling = { false }>로그인 상태 유지</AppText>

          <Checkbox status = {saveId ? 'checked' : 'unchecked'} onPress = { SaveIdBox } />
          <AppText bold style = {{ fontSize: 15 }} allowFontScaling = { false }>아이디 저장</AppText>
        </View>

        {/* 로그인 및 회원가입 버튼 */}
        <View style = { styles.Btn }>
          <TouchableOpacity style = { styles.SignInBtn } onPress = { Login }>
            <AppText bold style = {{ fontSize: 20 }} allowFontScaling = { false }>로그인</AppText>
          </TouchableOpacity>
                
          <TouchableOpacity style = { styles.SignupBtn } onPress = { () => { navigation.navigate("SignUp") }}>
            <AppText bold style = {{ fontSize: 20 }} allowFontScaling = { false }>회원가입</AppText>
          </TouchableOpacity>
        </View>
        
        {/* 아이디 찾기, 비밀번호 찾기 버튼*/}
        <View style = { styles.Form }>
          <TouchableOpacity activeOpacity={ 0.8 }  onPress={() => navigation.navigate("FindingId")}>
            <AppText bold style = {{ fontSize: 15 }} allowFontScaling = { false }>아이디 찾기</AppText>
          </TouchableOpacity>

          <AppText style = {{ fontWeight: 'bold', fontSize: 15 }}> / </AppText>

          <TouchableOpacity activeOpacity={ 0.8 } onPress={() => navigation.navigate("FindingPw")}>
            <AppText bold style = {{ fontSize: 15 }} allowFontScaling = { false }>비밀번호 찾기</AppText>
          </TouchableOpacity>
        </View>
        <AlertModal 
          visible = {failVisibled}
          onRequestClose = {() => setFailVisibled(false)}
          title = "존재하지 않는 회원 정보입니다."
          onPress = {() => setFailVisibled(false)}
          BtnText = "확인"
          showBtn = {true}
        />
        
        <AlertModal 
          visible = {nullVisibled}
          onRequestClose = {() => setNullVisibled(false)}
          title = "회원 정보를 입력해 주세요."
          onPress = {() => setNullVisibled(false)}
          BtnText = "확인"
          showBtn = {true}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
export default LoginPage;

//#region 스타일
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
    bottom: '7%',
  },
  InputForm: {
    width: '100%',
    alignItems: 'center'
  },
  input: {
    marginVertical: '3%',
    padding: 10,
    fontSize: 17,
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(205, 208, 203, 1)',
  },
  CheckBox: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    bottom: '2%',
    marginBottom: '2%',
    marginRight: '15%'
  },
  Btn: {
    width: '100%',
    alignItems: 'center'
  },
  SignInBtn: {
    backgroundColor: '#CBDDB4',
    width: '52%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '3%',
    height: 45
  },
  SignupBtn: {
    backgroundColor: '#CDD0CB',
    width: '52%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45
  },
  Form: {
    marginTop: '4%',
    flexDirection: 'row',
  },
});
//#endregion