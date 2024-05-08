import React, { useState, useContext, useEffect } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image } from  'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { UserContext } from '../AuthContext/AuthContext';
import axios from 'axios';
import AppText from '../Components/AppText';
import AlertModal from '../Components/AlertModal';
import PlaceModal from '../Components/PlaceModal';
import CustomInput from '../Components/CustomInput';
import CalendarsModal from '../Components/CalendarsModal';

const EditPlantInfo = ({ route, navigation }) => {

    const [ isVisibled, setIsVisibled ] = useState(false);
    const [ successVisibled, setSuccessVisibled ] = useState(false);
    const [ PlaceVisibled, setPlaceVisibled ] = useState(false);
    const { login, user } = useContext(UserContext);
    const { No, Pname, PNname, Plant_Date, Place, image } = route.params;
    const [ PlantDate, setPlantDate ] = useState("");
    const [ PlantNname, setPlantNname ] = useState("");
    const [ place, setPlace ] = useState("");

    useEffect(() => {
        setPlantNname(route.params?.PNname);
        setPlace(route.params?.Place);
        setPlantDate(route.params?.Plant_Date);
    }, [route.params?.PNname, route.params?.Place, route.params?.Plant_Date, route.params?.image]);

    
    const onDayPress = (day) => {
        setPlantDate(day.dateString);
        setIsVisibled(false);
    }

    const PlacePress = (selectPlace) => {
        setPlace(selectPlace);
        setPlaceVisibled(false)
    }

    const UpdateData = () => {
        axios.put(`${SERVER_ADDRESS}/userplantdb/update`, {
            No: No,
            Id: user.id,
            pname: Pname,
            pnname: PlantNname,
            Plant_Date: PlantDate,
            Place: place,
            Image: image
        })
        .then(response => {
            setSuccessVisibled(true);
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <View style = {styles.container}>
            <View style = { styles.TopBtnContainer }>
                <View style = { styles.BackBtnContainer }>
                    <TouchableOpacity 
                        style = { styles.BackBtn }
                        onPress = {() => navigation.pop()}
                    >
                        <FontAwesome name = "angle-left" size={ 40 } color = "#757575" />
                        <AppText bold style = {{ fontSize: 18, marginLeft: 5, color: '#757575' }} allowFontScaling = { false }>뒤로</AppText>
                    </TouchableOpacity>
                </View>

                <View style = { styles.CancelBtnContainer }>
                    <TouchableOpacity 
                        stlye = { styles.CancelBtn }
                        onPress = {() => navigation.navigate("Home")}
                    >
                        <AppText bold style = {{ fontSize: 18, color: '#757575' }} allowFontScaling = { false }>취소</AppText>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <View style = { styles.PlantName }>
                    <AppText bold style = {{ fontSize: 18 }} allowFontScaling = { false }>{ Pname }</AppText>
                </View>

                <KeyboardAvoidingView>
                        <View style = { styles.UserPlantInfoStyle }>
                            <View style = { styles.InfoStyle }>
                                <AppText bold style = { styles.infoText }>키우기 시작한 날</AppText>
                                <TouchableOpacity 
                                    style = { styles.TextInputStyle }
                                    onPress = {() => setIsVisibled(!isVisibled)}
                                >
                                    <AppText style = {styles.DataStyles} allowFontScaling = { false }>{ PlantDate }</AppText>
                                </TouchableOpacity>
                            </View>

                            <View style = { styles.InfoStyle }> 
                                <AppText bold style = { styles.infoText } allowFontScaling = { false }>식물 별명</AppText>
                                <CustomInput 
                                    style = { styles.TextInputStyle }   
                                    textAlign = 'center'
                                    value = { PlantNname }
                                    onChangeText = { setPlantNname }
                                />
                            </View>

                            <View style = { styles.InfoStyle }>
                                <AppText bold style = { styles.infoText } allowFontScaling = { false }>키우는 곳</AppText>
                                 <TouchableOpacity
                                    style = {styles.TextInputStyle}
                                    onPress = {() => setPlaceVisibled(true)}
                                >
                                   <AppText style = {styles.DataStyles} allowFontScaling = { false }>{ place }</AppText>
                                </TouchableOpacity>
                            </View>

                            <View style = { styles.InfoStyle }>
                                <AppText bold style = {{ fontSize: 16, alignSelf: 'center'}} allowFontScaling = { false }>식물 사진</AppText>
                                <TouchableOpacity style = { styles.ImgbtnStyle }>
                                    <Image
                                        style = {{ width: '100%', height: '100%', borderRadius: 7 }}
                                        source={{uri: image}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                </KeyboardAvoidingView>
            </View>

            <View style = { styles.UpdateContainer }>
                <TouchableOpacity 
                    style = { styles.UpdateBtn }
                    onPress = { UpdateData }
                >
                    <AppText bold allowFontScaling = { false }>완료</AppText>
                </TouchableOpacity>
            </View>

            <AlertModal 
                visible = { successVisibled }
                onRequestClose = {() => setSuccessVisibled(false)}
                title = "식물 정보가 수정되었습니다."
                showBtn = { true }
                BtnText = "확인"
                onPress = {() => {setSuccessVisibled(false); navigation.pop(); navigation.pop();}}
            />

            <CalendarsModal 
                visible = { isVisibled }
                onRequestClose = {() => setIsVisibled(false)}
                onSelect = { onDayPress }
            />

            <PlaceModal 
                visible = { PlaceVisibled }
                onRequestClose = {() => setPlaceVisibled(false)}
                onPress={PlacePress} 
            />
        </View>
    );
};

export default EditPlantInfo;

const styles = StyleSheet.create({
    container: {  // 전체 View 구성
        flex: 1,
        backgroundColor: 'white'
    },
    TopBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: '2%',
    },
    BackBtnContainer: {
        width: '18%'
    },
    BackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '15%'
    }, 
    CancelBtnContainer: {
        width: '18%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CancelBtn: {
        alignItems: 'center',
    },
    PlantName: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#CBDDB4',
        borderRadius: 5,
        width: '62%',
        height: 42,
        borderRadius: 8,
        marginTop: '5%',
    },
    UserPlantInfoStyle: {
        marginTop: '6%'
    },
    InfoStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: '6%'
    },
    infoText: {
        fontSize: 16,
    },
    TextInputStyle: {
        borderWidth: 1,
        borderColor: "#CDD0CB",
        width: '55%',
        height: 45,
        fontSize: 15,
        marginVertical: '5%',
        padding: 10,
        borderRadius: 5,
        color: "#608C27"
    },
    DataStyles: {
        fontSize: 15, 
        alignSelf: 'center',
        color: '#608C27'
    },
    ImgbtnStyle: {
        borderWidth: 1,
        borderColor: "#CDD0CB",
        width: '55%',
        height: 175,
        marginVertical: 18,
        borderRadius: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    UpdateContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    UpdateBtn: {
        width: '60%',
        height: 50,
        backgroundColor: '#ECEDEB',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8%'
    }
})