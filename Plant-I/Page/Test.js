import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AppText from "../Components/AppText";
import axios from "axios";
import { UserContext } from "../AuthContext/AuthContext";
import SERVER_ADDRESS from "../Components/ServerAddress";

const Test = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(new Array(12).fill(""));
  const [questions, setQuestions] = useState([]);
  const [showTestButton, setShowTestButton] = useState(true); // 테스트 버튼을 보여줄지 여부
  const [ending, setEnding] = useState(false);
  const [userData, setUserData] = useState([]); // userData 상태 추가
  const { login, user } = useContext(UserContext); // 결과 화면 표시 여부

  useEffect(() => {
    // JSON 파일에서 질문들을 가져와서 상태에 설정
    fetchQuestions();
  }, []);

  const SelectUser = async () => {
    try {
      const response = await axios.get(`${SERVER_ADDRESS}/userdb/userId`, {
        params: {
          id: user.id,
        },
      });
      const data = response.data;
      console.log("User data:", data); // 가져온 사용자 데이터 확인
      setUserData(data); // userData 상태 업데이트
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      SelectUser();
    }, [user])
  );

  const fetchQuestions = async () => {
    try {
      const data = require("../JSONData/question.json");
      setQuestions(data);
    } catch (error) {
      console.log("Error fetching questions:", error);
    }
  };

  const handleEnd = () => {
    setEnding(true); // 결과 화면 표시
    setShowTestButton(false); // 테스트 버튼 감추기
  };

  const handleAnswer = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = answer;
    setAnswers(updatedAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      handleEnd(); // 결과 화면으로 이동
    }
  };

  const handleStartTest = () => {
    setShowTestButton(false); // 테스트 버튼 감추기
    setQuestionIndex(0); // 첫 번째 질문으로 초기화
  };

  return (
    <View style={styles.container}>
      {showTestButton ? (
        <>
          <View style={styles.treeimage}>
            <Image
              source={require("../Images/tree1.png")}
            />
          </View>
          <AppText bold style={styles.TestMessage} allowFontScaling = { false }>나에게 맞는 식물은 뭘까?{'\n'}내 성향에 맞는 식물 찾기</AppText>
          <TouchableOpacity
            style={styles.startTestBut}
            onPress={handleStartTest}
          >
            <AppText bold style={styles.startTest} allowFontScaling = { false }>테스트 하러가기</AppText>
          </TouchableOpacity>
        </>
      ) : ending ? (
        // 결과 화면을 표시하는 컴포넌트 렌더링
        <ResultScreen userData={userData} /> // userData props 전달
      ) : (
        <View style = {{ flex: 1, justifyContent: 'center', width: '100%' }}>
          <View style={styles.QuestionContainer}>
            <AppText bold style={styles.question} allowFontScaling = { false }>{questions[questionIndex]}</AppText>
          </View>
          <View style={styles.answerContainer}>
              <TouchableOpacity
                style={styles.answerBut}
                onPress={() => handleAnswer("답변 1")}
              >
                <AppText bold style={styles.startTest} allowFontScaling = { false }>답변1</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.answerBut}
                onPress={() => handleAnswer("답변 2")}
              >
                <AppText bold style={styles.startTest} allowFontScaling = { false }>답변2</AppText>
              </TouchableOpacity>
            </View>
        </View>
      )}
    </View>
  );
};

const ResultScreen = ({ userData }) => {
  // userData props로 전달받음
  return (
    <View style={styles.resultContainer}>
      <View style = {{ justifyContent: 'center', bottom: '4%' }}>
        <Image source={require("../Images/blossom.png")} />
      </View>

      <View style = {{ justifyContent: 'center' }}>
        <AppText
          bold
          style={styles.resultText}
          allowFontScaling = { false }
        >
          {userData[0]?.Nname} 님은 _ _ _와
        </AppText>

        <AppText
          bold 
          style={styles.resultText}
          allowFontScaling = { false }
        >
          비슷한 성향을 가지셨네요!
        </AppText>
        {/* 여기에 결과를 표시하는 로직을 추가하세요 */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    color: "#608C27",
    fontSize: 25,
    textAlign: 'center'
  },
  startTestBut: {
    backgroundColor: "#CDD0CB",
    width: '80%',
    height: 65,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: '3%',
  },
  startTest: {
    fontSize: 22,
    color: "black",
  },
  treeimage: {
    width: '50%',
    height: '30%',
  },
  QuestionContainer: {
    alignItems: 'center',
    width: '100%',
  },
  TestMessage: {
    color: "#608C27",
    fontSize: 25,
    alignSelf: 'center',
    bottom: '1%'
  },
  answerBut: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CDD0CB",
    width: '85%',
    height: 60,
    borderRadius: 20,
    margin: '2%',
  },
  answerContainer: {
    justifyContent: "center",
    alignItems: "center",
    top: '2%',
    width: '100%'
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 25,
    color: "#608C27",
    alignSelf: 'center'
  },
});

export default Test;