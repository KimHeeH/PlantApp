import React ,{ useContext, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import axios from "axios";
import AppText from "../Components/AppText";
import { UserContext } from "../AuthContext/AuthContext";
import SERVER_ADDRESS from "../Components/ServerAddress";

const PlantDetail = ({ route }) => {
  const { Pname } = route.params; 
  const {login, user} = useContext(UserContext);
  const [plantDetail, setPlantDetail] = useState([]);
  const [isLiked, setIsLiked] = useState(false); 
  const [checkLike, setCheckLike] = useState("");

  useEffect(() => {
    const fetchPlantDetail = async () => {
      try{
        const response = await axios.get(`${SERVER_ADDRESS}/plantdb/plantInfo`, {
          params: {
            Pname: Pname
          }
        });
        const data = response.data;
        setPlantDetail(data);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchPlantDetail();     
  }, [Pname]);  

  useEffect(() => {
  }, [plantDetail]);

  const insertLike = () => {  
    axios.post(`${SERVER_ADDRESS}/userfavoritedb/like`, {
      Id: user.id,
      Pname: plantDetail[0].Pname,
    })
    .then(response => {
      setIsLiked(true);
    })
    .catch(error => {
      console.log(error, "즐겨찾기 활성화 에러");
    })
  };

  const deleteLike = () => {
    axios.post(`${SERVER_ADDRESS}/userfavoritedb/unlike`, {
      Id: user.id,
      Pname: plantDetail[0].Pname,
    })
    .then(response => {
      setIsLiked(false);
    })
    .catch(error => {
      console.log(error, "즐겨찾기 비활성화 에러");
    })
  }

  const handleLiked = () => {
    if(!isLiked) {
      insertLike();
    } else {
      deleteLike();
    }
  }

  useEffect(() => {
    const checkLike = () => {
      axios.post(`${SERVER_ADDRESS}/userfavoritedb/checkLike`,
      {
        Id: user.id,
        Pname: Pname
      })
      .then(response => {
        const data = response.data;
        if(data.length > 0) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      })
      .catch(error => {
        console.log(error);
      })
    };
    checkLike();
  }, []);


  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={{flex: 1, width: '80%', height: 300 , justifyContent: 'center', alignItems: 'center'}}>
            <Image
            style= {{width: '100%', height: 250}} 
              source={{ uri: plantDetail[0]?.Image }}
            />
        </View>
      <View style={styles.row}>
        <View style={styles.NameinfoContainer}>
          <AppText bold style = {{ fontSize: 16 }}>{plantDetail[0]?.Pname}</AppText>
        </View>
        <View style={styles.heart}>
          <TouchableOpacity onPress={ isLiked ? deleteLike : insertLike }>
              <AntDesign
                name={isLiked ? "heart" : "hearto"} 
                size={28}
                color={isLiked ? "#EF4747" : "black"} 
              />
          </TouchableOpacity>
        </View>
      </View>

      <View style = {styles.infoContainer}>
        <View style={styles.infoView}>
          <AppText bold style={styles.infotext} allowFontScaling = { false }>식물 종류</AppText>
          <AppText style={styles.text} allowFontScaling = { false }>
            {plantDetail[0]?.PlantType}
          </AppText>
        </View>

        <View style={styles.infoView}>
          <AppText bold style={styles.infotext} allowFontScaling = { false }>물주기</AppText>
          <AppText style={styles.text} allowFontScaling = { false }>
            {plantDetail[0]?.Water_Period}
          </AppText>
        </View>

        <View style={styles.infoView}>
          <AppText bold style={styles.infotext} allowFontScaling = { false }>적정 온도</AppText>
          <AppText style={styles.text} allowFontScaling = { false }>
            {plantDetail[0]?.Temperature}
          </AppText>
        </View>

        <View style={styles.infoView}>
          <AppText bold style={styles.infotext} allowFontScaling = { false }>적정 습도</AppText>
          <AppText style={styles.text} allowFontScaling = { false }>
            {plantDetail[0]?.Humidity}
          </AppText>
        </View>

        <View style={styles.infoView}>
          <AppText bold style={styles.infotext} allowFontScaling = { false }>개화 시기</AppText>
          <AppText style={styles.text} allowFontScaling = { false }>
            {plantDetail[0]?.Flowering_Time}
          </AppText>
        </View>

        <View style={styles.infoView}>
          <AppText bold style={styles.infotext} allowFontScaling = { false }>적정 광도</AppText>
          <AppText style={styles.text} allowFontScaling = { false }>
            {plantDetail[0]?.Sunshine}
          </AppText>
        </View>

        <View style={styles.dot}>
        </View>
        <AppText style={styles.characterText} allowFontScaling = { false }>
            {plantDetail[0]?.PlantCharacter}
          </AppText>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: '4%',
    backgroundColor: 'white'
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center'
  },
  NameinfoContainer: {
    backgroundColor: "#CBDDB4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: '6%',
    borderRadius: 8,
    padding: '2%',
    width: 'auto',
  },
  heart: {
    position: "absolute",
    justifyContent: 'center',
    alignItems: 'center',
    top: '-1%',
    right: '-12%',
    padding: 6,
  },
  infoContainer: {
    marginBottom: '5%',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#ECEEE9',
    borderRadius: 15
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '15%',
    width: '80%',
    marginVertical: '3%'
  },
  infotext: {
    fontSize: 16,
    width: '45%',
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    width: '35%',
    textAlign: 'left'
  },
  dot: {
    borderTopWidth: 2.5,
    borderTopColor: "black",
    borderStyle: "dotted",
    width: '80%',
    alignSelf: 'center'
  },
  characterText: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 16,
    padding: '4%',
    width: '90%'
  },
});

export default PlantDetail;