import React, { useState, useContext, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../AuthContext/AuthContext";
import { AntDesign } from '@expo/vector-icons';
import AppText from "../Components/AppText";
import axios from 'axios';
import CustomStatusBar from "../Components/CustomStatusBar";
import SERVER_ADDRESS from "../Components/ServerAddress";

const Home = ({ navigation }) => {

    const [userPlantData, setUserPlantData] = useState([]);
    const { login, user } = useContext(UserContext);

    const getPlantData = async () => {
        try {
            if(user && user.id) {
                const response = await axios.get(`${SERVER_ADDRESS}/userplantdb/select`,{ 
                    params: {
                        id: user.id
                    }
                });
            const data = response.data;
            setUserPlantData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getPlantData();
        }, [user])
    );

    return (
       <View style = { styles.container }>
        <CustomStatusBar />

            { login && userPlantData.length > 0 ? (
                <View style = { styles.DataContainer }>
                    <View style = {styles.BtnView}>
                        <TouchableOpacity style = {styles.TestBtnStyle}>
                            <AppText
                                bold
                                style = {{ fontSize: 17, color: 'white' }}
                            >
                                테스트 하러 가기
                            </AppText>
                        </TouchableOpacity>
                    </View>
                    <View style = {{ height: '80%', width: "100%" }}>
                        {/* 나의 식물 */}
                        <AppText bold 
                            style = {{ fontSize: 22, left: "5%", top: '3%' }} 
                            allowFontScaling = { false }
                        >
                            나의 식물
                        </AppText>

                        {/* 등록한 식물 */}
                        <View style = { styles.ScrollContainer }>
                            <ScrollView 
                                horizontal = {true}
                                showsHorizontalScrollIndicator = {true}
                                removeClippedSubviews = {true}
                                contentContainerStyle = { styles.ListStyle }
                            > 
                                {userPlantData.map((data, index) => (
                                <View key = { index } style = { styles.ScrollData }>
                                    <TouchableOpacity 
                                        style = {{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }} 
                                        onPress = { () => {
                                            navigation.navigate('UserPlantInfo', {
                                                No: data.No,
                                                Pname: data.Pname,
                                                PNname: data.PNname,
                                                Plant_Date: data.Plant_Date,
                                                Place: data.Place,
                                                image: data.Image
                                            });
                                            }
                                        }
                                    >
                                        <Image
                                            style = {{ width: '100%', height: '100%', borderRadius: 5 }}
                                            source={{uri: data.Image}}
                                        />
                                    </TouchableOpacity>
                                    <AppText bold 
                                        style = {{ alignSelf: 'center' }} 
                                        allowFontScaling = { false }
                                    >
                                        { data.PNname }
                                    </AppText>
                                </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>

                    {/* 식물 등록 버튼 */}
                    <View style = { styles.AddBtn }>
                        <TouchableOpacity style = { styles.FABbtn } onPress = { () => { navigation.navigate('PlantRegister1') }}>
                            <AppText bold 
                                style = {{ fontSize: 17, color: 'white' }} 
                                allowFontScaling = { false }
                            >
                                식물 추가하기
                            </AppText>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : ( 
                <>
                <View>
                    <View>
                        <Image source = {require('../Images/plant.jpg')} style = {{ alignSelf: 'center' }} />
                        <AppText
                            bold
                            style = {{ 
                                color: '#1C4723', 
                                fontSize: 22, 
                                marginTop: '6%',
                                textAlign: 'center'
                            }}
                            allowFontScaling = { false }
                        >
                            나의 첫 번째 식물을 {"\n"}등록해 보세요!
                        </AppText>
                        <View style = {styles.RegBtnView}>
                            <TouchableOpacity style = { styles.RegBtn } onPress = { () => {navigation.navigate('PlantRegister1')}}>
                                <AppText bold style = {{ fontSize: 17, color: 'white' }} allowFontScaling = { false }>
                                    식물 등록하기
                                </AppText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </>
            )}
       </View>
    );
};

export default Home;


//#region 스타일
const styles = StyleSheet.create({
    container: { // 전체 뷰
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    BtnView: { // 추천 및 테스트 버튼 배치
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    TestBtnStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1C4723',
        width: '70%',
        height: 45,
        borderRadius: 30
    },
    FABbtn: { 
        backgroundColor: '#1C4723',
        borderRadius: 20,
        width: '50%',
        height: 45,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    RegBtnView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: '6%'
    },
    RegBtn: {
        backgroundColor: '#1C4723',
        width: '50%',
        height: 45,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    DataContainer: {
        alignItems: 'center',
        top: '1%'
    },
    ScrollContainer: {
        flex: 1,
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '95%',
    },
    ScrollData: {
        width: 165,
        height: 165,
        marginLeft: 5,
        alignSelf: 'center',
        marginHorizontal: 15,
        marginVertical: 28,
        borderRadius: 0
    },
    ListStyle: {         
        flexDirection: 'columns',
        flexWrap: 'wrap'
    },
    AddBtn: { 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        height: '11%'
    }
});
//#endregion