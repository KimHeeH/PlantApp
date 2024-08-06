import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AppText from "../Components/AppText";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../AuthContext/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SERVER_ADDRESS from "../Components/ServerAddress";
import PlantDetail from "./PlantDetail";

const Question = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(12).fill(""));
  const [questions, setQuestions] = useState([]);
  const [showTestButton, setShowTestButton] = useState(true);
  const [ending, setEnding] = useState(false);
  const [mbtiE, setMbtiE] = useState(0); // E/I 카테고리의 개수
  const [mbtiI, setMbtiI] = useState(0);
  const [mbtiP, setMbtiP] = useState(0); // P/J 카테고리의 개수
  const [mbtiJ, setMbtiJ] = useState(0);
  const [type, setType] = useState([]);
  const [total, setTotal] = useState([]);
  const [userData, setUserData] = useState([]);
  const [plantList, setPlantList] = useState([]);
  const [mainPlant, setMainPlant] = useState(null); // 메인으로 선택된 식물
  const [otherPlants, setOtherPlants] = useState([]); // 다른 식물 목록
  const [down, setDown] = useState(true);
  const [plantDetail, setPlantDetail] = useState([]);
  const [typeDes, setTypeDes] = useState([]);
  const [selectedType, setSelectedType] = useState("유형 소개");
  const [isLiked, setIsLiked] = useState(false);
  const [checkLike, setCheckLike] = useState("");
  const { login, user } = useContext(UserContext);

  const navigation = useNavigation();
  useEffect(() => {
    fetchQuestions();
  }, []);
  const handleStartTest = () => {
    setShowTestButton(false); // 테스트 버튼 감추기
    setQuestionIndex(0); // 첫 번째 질문으로 초기화
  };

  const SelectUser = async () => {
    try {
      const response = await axios.post(`${SERVER_ADDRESS}/userdb/userId`, {
        id: user.id,
      });
      const data = response.data;
      setUserData(data);
      console.log("User data:", data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      SelectUser();
    }, [user])
  );
  const fetchPlantDetail = async () => {
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/plantdb/test/Pname`, {
        params: {
          name: mainPlant.Pname,
        },
      });

      setPlantDetail(response.data);
      setDown(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlantDescription = async () => {
    await fetchPlantDetail(); // fetchPlantDetail 함수 실행
  };
  const fetchQuestions = async () => {
    try {
      const data = require("../JSONData/question.json");
      const iEQuestions = data.iEquestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const jPQuestions = data.jPquestions
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const mergedQuestions = iEQuestions
        .concat(jPQuestions)
        .sort(() => Math.random() - 0.5);
      setQuestions(mergedQuestions);
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  };
  const handleDown = async (selectedType) => {
    setDown(true);
    setSelectedType(selectedType); // 클릭된 유형으로 상태 변경
  };
  const handlePlantClick = (selectedPlant) => {
    setSelectedType("유형 소개");
    setMainPlant(selectedPlant);
    // 선택된 식물로 mainPlant를 변경합니다.
  };

  const handleAnswer = (selectedAnswer) => {
    const selectedMBTI = selectedAnswer.mbti; // 답변에 포함된 MBTI 유형 가져오기
    if (selectedMBTI === "E") {
      setMbtiE(mbtiE + 1);
    } else if (selectedMBTI === "I") {
      setMbtiI(mbtiI + 1);
    } else if (selectedMBTI === "P") {
      setMbtiP(mbtiP + 1);
    } else if (selectedMBTI === "J") {
      setMbtiJ(mbtiJ + 1);
    }

    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      handleEnd();
    }
  };
  const insertLike = () => {
    axios
      .post(`${SERVER_ADDRESS}/userfavoritedb/like`, {
        Id: user.id,
        Pname: mainPlant.Pname,
      })
      .then((response) => {
        setIsLiked(true);
      })
      .catch((error) => {
        console.log(error, "즐겨찾기 활성화 에러");
      });
  };

  const deleteLike = () => {
    axios
      .post(`${SERVER_ADDRESS}/userfavoritedb/unlike`, {
        Id: user.id,
        Pname: mainPlant.Pname,
      })
      .then((response) => {
        setIsLiked(false);
      })
      .catch((error) => {
        console.log(error, "즐겨찾기 비활성화 에러");
      });
  };

  const handleLiked = () => {
    if (!isLiked) {
      insertLike();
    } else {
      deleteLike();
    }
  };
  const handleEnd = async () => {
    const totalEI = mbtiE > mbtiI ? "E" : "I";
    const totalPJ = mbtiP > mbtiJ ? "P" : "J";
    const total = totalEI + totalPJ;
    setTotal(total);
    if (total === "EP") {
      setType("해바라기형");
    } else if (total === "EJ") {
      setType("아카시아형");
    } else if (total === "IP") {
      setType("물망초형");
    } else if (total === "IJ") {
      setType("흑장미형");
    }
    if (total === "EP") {
      setTypeDes(
        "이 유형은 사용자가 식물에게 물을 자주 주지 않아도 되는 식물으로 햇빛을 많이 받아야하는 양지 식물을 추천합니다."
      );
    } else if (total === "EJ") {
      setTypeDes(
        "이 유형은 사용자가 식물에게 물을 자주 줘야하는 식물으로 햇빛을 적게 받아도 되는 음지 식물을 추천합니다."
      );
    } else if (total === "IP") {
      setTypeDes(
        "이 유형은 사용자가 식물에게 물을 자주 주지 않아도 되는 식물으로 햇빛을 적게 받아도 되는 음지 식물을 추천합니다."
      );
    } else if (total === "IJ") {
      setTypeDes(
        "이 유형은 사용자가 식물에게 물을 자주 주지 않아도 되는 식물으로 햇빛을 많이 받아야하는 양지 식물을 추천합니다."
      );
    }
    console.log(total);

    try {
      const response = await axios.post(`${SERVER_ADDRESS}/plantdb/test`, {
        mbti: total,
      });
      const allPlants = response.data.recommendedPlants; // 서버에서 반환된 모든 식물 목록
      // 메인으로 보여줄 식물 선택
      const randomIndex = Math.floor(Math.random() * allPlants.length);
      const mainPlant = allPlants[randomIndex];
      setMainPlant(mainPlant);
      console.log(allPlants);
      console.log(mainPlant);
      // 선택한 메인 식물을 제외한 나머지 식물 목록 설정
      const otherPlants = allPlants.filter(
        (plant, index) => index !== randomIndex
      );
      setOtherPlants(otherPlants);
    } catch (error) {
      console.log("Error fetching plant list:", error);
    }
    setShowTestButton(false); // 결과 화면 표시
    setEnding(true);
  };

  return (
    <View style={styles.container}>
      {showTestButton ? (
        <>
          <View style={styles.treeimage}>
            <Image
              source={require("C:/plant6/main/Plant-I/assets/Ellipse4.png")}
            />
          </View>
          <AppText bold style={styles.TestMessage}>
            나에게 맞는 식물은 뭘까?
          </AppText>
          <AppText bold style={styles.TestMessage}>
            내 성향에 맞는 식물 찾기
          </AppText>
          <TouchableOpacity
            style={styles.startTestBut}
            onPress={handleStartTest}
          >
            <AppText bold style={styles.startTest}>
              테스트 시작하기
            </AppText>
          </TouchableOpacity>
        </>
      ) : ending ? (
        <ResultScreen
          userData={userData}
          mainPlant={mainPlant}
          otherPlants={otherPlants}
          type={type}
          handleDown={handleDown}
          total={total}
          down={down}
          typeDes={typeDes}
          selectedType={selectedType}
          handlePlantDescription={handlePlantDescription}
          plantDetail={plantDetail}
          handlePlantClick={handlePlantClick}
          fetchPlantDetail={fetchPlantDetail}
          isLiked={isLiked}
          insertLike={insertLike}
          deleteLike={deleteLike}
        />
      ) : (
        <View style={styles.Container}>
          <AppText bold Text style={styles.question}>
            {questions[questionIndex].question}
          </AppText>
          <View style={styles.answerContainer}>
            {questions[questionIndex].answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.answerBut}
                onPress={() => handleAnswer(answer)}
              >
                <AppText bold style={styles.answerText}>
                  {answer.text}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const ResultScreen = ({
  userData,
  mainPlant,
  otherPlants,
  type,
  handleDown,
  down,
  total,
  typeDes,
  selectedType,
  handlePlantDescription,
  plantDetail,
  handlePlantClick,
  fetchPlantDetail,
  isLiked,
  insertLike,
  deleteLike,
}) => {
  useEffect(() => {
    if (mainPlant) {
      fetchPlantDetail(); // mainPlant가 변경될 때마다 fetchPlantDetail 함수 호출
    }
  }, [mainPlant]);
  return (
    <ScrollView>
      <View style={styles.resultContainer}>
        {/* 메인 식물 */}
        <View style={styles.mainPlantContainer}>
          <TouchableOpacity
            style={styles.mainresultItem}
            // onPress={() => navigation.navigate("Testplant", mainPlant.Pname)}
          >
            <Image
              style={styles.image}
              source={require("C:/plant6/main/Plant-I/assets/result3.png")}
            />
            <View style={styles.row}>
              <AppText style={styles.ItemName}>{mainPlant.Pname}</AppText>
              <View style={styles.heart}>
                <TouchableOpacity onPress={isLiked ? deleteLike : insertLike}>
                  <AntDesign
                    name={isLiked ? "heart" : "hearto"}
                    size={28}
                    color={isLiked ? "#EF4747" : "black"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 2,
              borderBottomColor: "grey",
            }}
          >
            <TouchableOpacity
              onPress={() => handleDown("유형 소개")} // 선택된 유형을 전달
              style={[
                styles.typeDescription,
                selectedType === "유형 소개" && styles.selectedType, // 선택된 유형일 때 추가 스타일 적용
              ]}
            >
              <Text
                style={[
                  styles.typeText,
                  selectedType === "유형 소개" && styles.selectedTypeText, // 선택된 유형일 때 추가 스타일 적용
                ]}
              >
                유형 소개
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleDown("식물 소개"); // 선택된 유형을 전달
                handlePlantDescription(); // fetchPlantDetail 함수 실행
              }}
              style={[
                styles.typeDescription,
                selectedType === "식물 소개" && styles.selectedType, // 선택된 유형일 때 추가 스타일 적용
              ]}
            >
              <Text
                style={[
                  styles.typeText,
                  selectedType === "식물 소개" && styles.selectedTypeText, // 선택된 유형일 때 추가 스타일 적용
                ]}
              >
                식물 소개
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {down ? (
              <View style={{ marginTop: 10 }}>
                <AppText style={styles.TextDes}>
                  {userData[0]?.Nname}님은 {type} 입니다.
                </AppText>
                <AppText style={styles.TextDes}>
                  {typeDes}
                  {type}의 다른 식물이 궁금하다면 아래로 스크롤하여 구경하세요.
                </AppText>
              </View>
            ) : (
              <View style={{ marginTop: 10 }}>
                <View style={{ marginBottom: 10 }}>
                  <AppText style={styles.TextDes}>
                    {plantDetail[0]?.PlantCharacter}
                  </AppText>
                </View>

                <View style={styles.DesView}>
                  <View style={styles.DesViewStyle}>
                    <Ionicons name="flower-outline" size={24} color="black" />
                    <AppText style={styles.TextDes}>
                      {plantDetail[0]?.PlantType}
                    </AppText>
                  </View>

                  <View style={styles.DesViewStyle}>
                    <Feather name="sun" size={24} color="black" />
                    <AppText style={styles.TextDes}>
                      {plantDetail[0]?.Sunshine}
                    </AppText>
                  </View>

                  <View style={styles.DesViewStyle}>
                    <Ionicons name="water-outline" size={24} color="black" />
                    <AppText style={styles.TextDes}>
                      적정 습도 : {plantDetail[0]?.Humidity}
                    </AppText>
                  </View>
                  <View style={styles.DesViewStyle}>
                    <MaterialCommunityIcons
                      name="temperature-celsius"
                      size={24}
                      color="black"
                    />
                    <AppText style={styles.TextDes}>
                      적정 온도 : {plantDetail[0]?.Temperature}
                    </AppText>
                  </View>
                  <View style={styles.DesViewStyle}>
                    <MaterialCommunityIcons
                      name="watering-can-outline"
                      size={24}
                      color="black"
                    />
                    <AppText style={styles.TextDes}>
                      {plantDetail[0]?.water_Period}
                    </AppText>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={{ width: "100%", marginTop: 20 }}>
          <View
            style={{
              marginBottom: 5,
              borderTopWidth: 2,
              borderColor: "grey",
            }}
          >
            <AppText
              Text
              style={{
                fontSize: 17,
              }}
            >
              다른 식물들
            </AppText>
          </View>
          <FlatList
            data={otherPlants} // 다른 식물 목록 데이터 바인딩
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handlePlantClick(item)}
                ></TouchableOpacity>
                <AppText style={styles.otherPlantName}>{item.Pname}</AppText>
              </View>
            )}
            horizontal={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  questionContainer: {},
  question: {
    color: "#000000",
    fontSize: 23,
  },
  startTestBut: {
    backgroundColor: "#1C4723",
    width: 250,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  selectedType: {
    borderBottomColor: "black", // 선택된 유형의 borderBottom 색상 변경
    borderBottomWidth: 2,
  },
  startTest: {
    fontSize: 20,
    color: "white",
    align: "center",
  },
  treeimage: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  TestMessage: {
    color: "#1C4723",
    fontSize: 25,
  },
  typeDescription: {
    marginRight: 15,
  },
  typeTitle: {
    fontSize: 20,
  },

  typeText: {
    fontSize: 20,
    color: "grey", // 기본 텍스트
  },
  selectedTypeText: {
    color: "black",
  },
  TextDes: {
    fontSize: 17,
    marginLeft: 5,
  },
  mainresultItem: {
    borderRadius: 10, // 테두리 모서리
    marginBottom: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  mainPlantContainer: {},
  image: {
    width: 300,
    height: 350,
    borderRadius: 10,
  },
  resultItem: {
    width: 130,
    height: 130,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 10, // 테두리 모서리
    borderWidth: 1, // 테두리 너비
    borderColor: "grey", // 테두리 색상
  },
  DesView: {
    backgroundColor: "#ECEEE9",
    width: 400,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D4D5D2",
  },
  DesViewStyle: {
    flexDirection: "row",
  },
  answerBut: {
    borderColor: "#1C4723",
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderRadius: 10,
    marginTop: 30,
  },
  answerText: { fontSize: 20, margin: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  resultText: {
    fontSize: 20,
    color: "#000000",
  },
  ItemName: {
    color: "#000000",
    fontSize: 22,
    marginRight: 10,
    marginLeft: 30,
  },
  otherPlantName: {
    fontSize: 15,
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Question;
