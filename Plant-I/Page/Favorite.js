import React, { useState, useContext, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../AuthContext/AuthContext";
import AppText from "../Components/AppText";
import SERVER_ADDRESS from "../Components/ServerAddress";

const Favorite = () => {
  const [favoritePlants, setFavoritePlants] = useState([]);
  const navigation = useNavigation();
  const { login, user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedType, setSelectedType] = useState("전체");
  const [selectData, setSelectData] = useState(null);

  const userFavoritePlants = () => {
    axios.post(`${SERVER_ADDRESS}/userfavoritedb/select`, {
      Id: user.id
    })
    .then(response => {
      const data = response.data;
      setFavoritePlants(data);
    })
    .catch(error => {
      console.log(error);
    })
  };

  const deleteFavoritePlant = () => {
    axios.post(`${SERVER_ADDRESS}/userfavoritedb/unlike`, {
      Id: user.id,
      Pname: selectData
    })
    .then(response => {
      setFavoritePlants(prevFavoritePlants => prevFavoritePlants.filter(item => item.Pname !== selectData));
    })
    .catch(error => {
      console.log(error);
    })
  };

  const handleTypeSelect = async (type) => {
    setSelectedType(type); 
    fetchLikedPlantsByType(type); 
  };

  const fetchLikedPlantsByType = async (type) => {
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/userfavoritedb/liked`, {
        params: { Id: user.id, type: type },
      });
      const data = response.data.map(item => item)
      setFavoritePlants(data);
      console.log(type)
    } catch (error) {
      console.log(error);
    }
  };

  const selectPlant = (selected) => {
    setIsEditing(!isEditing);
    if(!isEditing) {
      if(selectData === selected) {
        setSelectData(null);
      } 
    } else {
      setIsEditing(false);
    }
  }

  const cancelEditing = () => {
    setSelectData(null);
    setIsEditing(false);
  };

  useFocusEffect(
    useCallback(() => {
      userFavoritePlants();
      setSelectedType("전체")
    }, [user])
  );


  const renderItem = ({ item }) => {
    const isSelected = selectData === item.Pname;

    return (
        <TouchableOpacity
          style={[
            styles.resultItem,
            isSelected ? {backgroundColor: '#DFDFDF'} : null,
            { width: item.Image ? '48%' : '48%' }
          ]}
          onPress={() => {
            if (isEditing) {
              setSelectData(item.Pname);
            } else {
                navigation.navigate("PlantDetail", {
                  Pname: item.Pname
              });
            }
          }}
        >
          <Image 
            source={{ uri: item.Image }}
            style = {styles.imageContainer}
          />
          <AntDesign
              name = "heart"
              size = {22}
              color = "#EF4747"
              style = {{ textAlign: 'right', marginRight: '4%', bottom: '15%' }}
          />
          <AppText bold style = {styles.PnameStyles}>{item.Pname}</AppText>
        </TouchableOpacity>
    );
  };

  const getButtonStyle = (type) => {
    return {
      backgroundColor: selectedType === type ? "#CBDDB4" : "#DFDFDF",
      width: 55,
      height: 28,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      marginTop: 40,
    };
  };

  // 버튼 텍스트 스타일에 선택된 타입에 따라 글자색을 다르게 설정하는 함수
  const getButtonTextStyle = (type) => {
    return {
      fontSize: 13,
      fontWeight: "bold",
      color: selectedType === type ? "#000000" : "#000000",
    };
  };

  // 타입 선택 시 호출되는 함수

  return (
    <View style={styles.container}>
      <View style = {{ width: '100%' }}>
        <ScrollView horizontal = { true }>
          <View style={styles.btnContainer}>
              <TouchableOpacity
                style={getButtonStyle("전체")}
                onPress={() => handleTypeSelect("전체")}
              >
                <AppText style={getButtonTextStyle("전체")}>전체</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("허브")}
                onPress={() => handleTypeSelect("허브")}
              >
                <AppText style={getButtonTextStyle("허브")}>허브</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("양치식물")}
                onPress={() => handleTypeSelect("양치식물")}
              >
                <AppText style={getButtonTextStyle("양치식물")}>양치식물</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("다육이")}
                onPress={() => handleTypeSelect("다육이")}
              >
                <AppText style={getButtonTextStyle("다육이")}>다육이</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("선인장")}
                onPress={() => handleTypeSelect("선인장")}
              >
                <AppText style={getButtonTextStyle("선인장")}>선인장</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("침엽수")}
                onPress={() => handleTypeSelect("침엽수")}
              >
                <AppText style={getButtonTextStyle("침엽수")}>침엽수</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("관엽식물")}
                onPress={() => handleTypeSelect("관엽식물")}
              >
                <AppText style={getButtonTextStyle("관엽식물")}>관엽식물</AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={getButtonStyle("관목식물")}
                onPress={() => handleTypeSelect("관목식물")}
              >
                <AppText style={getButtonTextStyle("관목식물")}>관목식물</AppText>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.EditbtnContainer}>
        <TouchableOpacity
          style={styles.fontStyle}
          onPress={isEditing ? cancelEditing : selectPlant}
        >
          <AppText style={styles.fontStyle}>
            {isEditing ? "취소" : "편집"}
          </AppText>
        </TouchableOpacity>
      </View>

      <View style = {{ flex: 1, marginBottom: '3%' }}>
        <FlatList
          data={favoritePlants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>

      {isEditing && (
        <View style={styles.editingButtonsContainer}>
          <View style = {styles.editingButtonsViewStyle}>
            <TouchableOpacity
              style={[styles.cancelButton, styles.editingButton]}
              onPress={cancelEditing}
            >
              <AppText style={styles.buttonText}>취소</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.deleteButton, styles.editingButton]}
              onPress={deleteFavoritePlant}
            >
              <AppText style={styles.buttonText}>삭제</AppText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: '3%'
  },
  btnContainer: {
    flexDirection: 'row',
    width: '80%'
  }, 
  EditbtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: '5%',
    marginRight: '4%',
    height: 25,
  },
  fontStyle: {
    fontSize: 13,
  },
  resultItem: {
    height: 185,
    marginTop: "2%",
    marginRight: "4%",
    borderColor: '#CDD0CB'
  },
  imageContainer: {
    alignSelf: 'center',
    height: 160,
    width: '100%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#CDD0CB'
  },
  PnameStyles: {
    textAlign: 'left',
    marginLeft: '8%',
    fontSize: 13,
    bottom: '10%'
  },
  editingButtonsContainer: {
    justifyContent:'center' ,
    borderTopWidth: 1,
    borderTopColor: "#DADADA",
    height: '13%',
  },
  editingButtonsViewStyle: {
    width: '100%', 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  editingButton: {
    borderRadius: 8,
    width: '42%',
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: "#CBDDB4",
    borderColor: "#DADADA",
  },
  cancelButton: {
    backgroundColor: "#DADADA",
    borderColor: "#DADADA",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default Favorite;