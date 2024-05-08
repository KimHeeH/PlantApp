import React, { useContext, useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from "../AuthContext/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AppText from "../Components/AppText";
import AlertModal from "../Components/AlertModal";
import SERVER_ADDRESS from "../Components/ServerAddress";

const MyPage = ({ navigation }) => {

  const { login, user } = useContext(UserContext);
  const [ userData, setUserData ] = useState([]);
  const [ LogoutVisibled, setLogoutVisibled ] = useState(false);
  const [ DeleteUserVisibled, setDeleteUserVisibled ] = useState(false);

  const handleEditProfile = () => {
    navigation.navigate("EditProfile", {
      id: userData.id,
      Nname: userData.Nname
    });
  }

  const SelectUser = () => {
    axios.post(`${SERVER_ADDRESS}/userdb/userId`, { 
      id: user.id
    })
    .then(response => {
      const data = response.data;
      setUserData(data);
    })
    .catch(error => {
      console.log(error);
    })
  };

  useFocusEffect(
    useCallback(() => {
        SelectUser();
    }, [user])
  );

  const logout = async () => {
    try {
      AsyncStorage.clear();
      navigation.navigate("LoginPage");
    }
    catch (error) {
      console.log(error);
    }
  }

  const DeleteUser = () => {
      axios.post(`${SERVER_ADDRESS}/userdb/delete`, {
        id: user.id
      })
      .then (
        response => {
          navigation.navigate("LoginPage");
      })
      .catch (error => {
        console.log(error)
      })
  }

  const handleNotificationSettings = () => {
    navigation.navigate("NotifySettings");
  }


  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.iconContainer}>
          <Ionicons name="person-circle" size={ 60 } color="#9FD1FF" />
        </View>
        <View style={styles.textButtonContainer}>
          <AppText bold style={styles.profileName} allowFontScaling = { false }>{ userData.Nname } 님</AppText>
        </View>
      </View>

      <View style={styles.actionSection}>
        <TouchableOpacity
          onPress={() => handleNotificationSettings()}
          style={styles.actionItem}
        >
          <AppText bold style={styles.settingText} allowFontScaling = { false }>알림 설정</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleEditProfile()}
          style = { styles.actionItem }
        >
          <AppText bold style = { styles.settingText } allowFontScaling = { false }>닉네임 변경</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {() => setLogoutVisibled(true) }
          style = { styles.actionItem }
        >
          <AppText bold style = { styles.settingText } allowFontScaling = { false }>로그아웃</AppText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress = {() => setDeleteUserVisibled(true)}
          style={ styles.actionItem }
        >
          <AppText bold style = { styles.settingText } allowFontScaling = { false }>회원탈퇴</AppText>
        </TouchableOpacity>
      </View>
      <AlertModal 
        visible = {LogoutVisibled}
        onRequestClose = {() => setLogoutVisibled(false)}
        title = "로그아웃 하시겠습니까?"
        CancelBtnText = "아니오"
        BtnText = "네"
        onCancel = {() => setLogoutVisibled(false)}
        onPress = { logout }
        showBtn = {true}
      /> 

      <AlertModal 
        visible = { DeleteUserVisibled }
        onRequestClose = {() => setDeleteUserVisibled(false)}
        title = "회원탈퇴를 하시겠습니까?"
        CancelBtnText = "아니오"
        BtnText = "네"
        onCancel = {() => setDeleteUserVisibled(false)}
        onPress = { DeleteUser }
        showBtn = {true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: '6%',
    borderColor: "#757575",
    borderWidth: 2,
    borderRadius: 10,
    height: 89,
    marginTop: '5%'
  },
  iconContainer: {
    padding: 8,
  },
  profileName: {
    fontSize: 25,
    color: "black",
  },
  editProfileButton: {
    marginTop: 5,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "#ECEDEB",
    fontSize: 20,
    textAlign: "center",
  },
  textButtonContainer: {
    marginLeft: '2%', 
  },
  actionSection: {
    flexDirection: "column",
  },
  actionItem: {
    borderColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 2,
    width: "100%",
    height: 55,
    padding: 3,
    justifyContent: 'center'
  },
  settingText: {
    fontSize: 20,
    marginLeft: '2%', 
  },
});

export default MyPage;