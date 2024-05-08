import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { UserContext } from "../AuthContext/AuthContext";
import AppText from '../Components/AppText';
import PlaceModal from '../Components/PlaceModal';
import CustomInput from '../Components/CustomInput';
import CalendarsModal from '../Components/CalendarsModal';
import AlertModal from '../Components/AlertModal';
import ImageSelectModal from '../Components/ImageSelectModal';
import SERVER_ADDRESS from "../Components/ServerAddress";

const PlantRegister2 = ({ navigation, route }) => {

    const [ PlantDate, setPlantDate ] = useState("");
    const [ PNname, setPNname ] = useState("");
    const [ PlantPlace, setPlantPlace ] = useState("");
    const [ image, setImage ] = useState(null);
    const { login, user } = useContext(UserContext);
    const { selectData } = route.params;
    const [ isVisibled, setIsVisibled ] = useState(false);
    const [ AlertVisibled, setAlertVisibled ] = useState(false);
    const [ PlaceVisibled, setPlaceVisibled ] = useState(false);
    const [ failPlantDate, setFailPlantDate ] = useState(false);
    const [ failPlace, setFailPlace ] = useState(false);
    const [ failPNname, setFailPNname ] = useState(false);
    const [ imageVisibled, setImageVisibled ] = useState(false);

    const onDayPress = (day) => {
        setPlantDate(day.dateString);
        setIsVisibled(false);
    }

    const PlacePress = (selectPlace) => {
        setPlantPlace(selectPlace);
        setPlaceVisibled(false)
    }
    
    const InsertData = () => {
        if(PlantDate === "") {
            setFailPlantDate(true);
        }
        else if (PlantPlace === "") {
            setFailPlace(true);
        }
        else if (PNname === "") {
            setFailPNname(true);
        } else {
            axios.post(`${SERVER_ADDRESS}/userplantdb/insert`, {
                Id: user.id,
                Pname: selectData.Pname,
                PNname: PNname,
                Plant_Date: PlantDate,
                Place: PlantPlace,
                Image: image
            })
            .then(response => {
                setAlertVisibled(true);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }


    return (
        <View style = { styles.container }>
            <View style = { styles.TopBtnContainer }>
                <View style = { styles.BackBtnContainer }>
                    <TouchableOpacity 
                        style = { styles.BackBtn }
                        onPress = {() => navigation.pop()}
                    >
                        <FontAwesome name = "angle-left" size={ 40 } color = "#757575" />
                        <AppText bold style = {{ fontSize: 18, marginLeft: 5, color: '#757575' }}>뒤로</AppText>
                    </TouchableOpacity>
                </View>

                <View style = { styles.CancelBtnContainer }>
                    <TouchableOpacity 
                        stlye = { styles.CancelBtn }
                        onPress = {() => navigation.navigate("Home")}
                    >
                        <AppText bold style = {{ fontSize: 18, color: '#757575' }}>취소</AppText>
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {{ flex: 1, height: '100%' }}>
                <View style = { styles.PlantName }>
                    <AppText bold style = {{ fontSize: 15 }}>{ selectData.Pname }</AppText>
                </View>


                <KeyboardAvoidingView>
                    <View style = { styles.ImageContainer }>
                        <TouchableOpacity 
                            style = { styles.ImgbtnStyle }
                            onPress = {() => setImageVisibled(true)}
                        >
                            <Image 
                                style = {{ width: '100%', height: '100%', borderRadius: 5 }}
                                source = {{uri: image}}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style = { styles.UserPlantInfoStyle }>
                        <View style = { styles.InfoStyle }>
                            <AppText bold style = { styles.infoText } allowFontScaling = { false }>키우기 시작한 날</AppText>
                            <TouchableOpacity 
                                style = { styles.RegStyle }
                                onPress = {() => setIsVisibled(true)}
                            >
                                <AppText bold style = {styles.DataStyles} allowFontScaling = { false }>{ PlantDate }</AppText>
                            </TouchableOpacity>
                        </View>

                        <View style = { styles.InfoStyle }>
                            <AppText bold style = { styles.infoText } allowFontScaling = { false }>키우는 곳</AppText>
                            <TouchableOpacity
                                style = {styles.RegStyle}
                                onPress = {() => setPlaceVisibled(true)}
                            >
                                <AppText bold style = {styles.DataStyles} allowFontScaling = { false }>{PlantPlace}</AppText>
                            </TouchableOpacity>
                        </View>

                        <View style = { styles.InfoStyle }> 
                            <AppText bold style = { styles.infoText } allowFontScaling = { false }>식물 별명</AppText>
                            <CustomInput 
                                style = { styles.RegStyle }
                                textAlign = 'center'
                                value = { PNname }
                                onChangeText = { setPNname }
                            />
                        </View>
                    </View>

                    <View style = { styles.CompleteContainer }>
                        <TouchableOpacity 
                            style = { styles.CompleteBtn }
                            onPress = { InsertData }
                        >
                            <AppText bold style = {{ fontSize: 15 }}>완료</AppText>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
            <AlertModal 
                visible = {AlertVisibled}
                onRequestClose = {() => setAlertVisibled(false)}
                title = "등록이 완료되었습니다."
                BtnText = "확인"
                onPress = {() => { setAlertVisibled(false); navigation.navigate("Home") }}
                showBtn = {true}
            />
            <AlertModal 
                visible = {failPlantDate}
                onRequestClose = {() => setFailPlantDate(false)}
                title = {"키우기 시작한 날을 \n 입력해 주세요."}
                BtnText = "확인"
                onPress = {() => setFailPlantDate(false)}
                showBtn = {true}
            />
            <AlertModal 
                visible = {failPlace}
                onRequestClose = {() => setFailPlace(false)}
                title = "키우는 장소를 입력해 주세요."
                BtnText = "확인"
                onPress = {() => setFailPlace(false)}
                showBtn = {true}
            />
            <AlertModal 
                visible = {failPNname}
                onRequestClose = {() => setFailPNname(false)}
                title = "식물 별명을 입력해 주세요."
                BtnText = "확인"
                onPress = {() => setFailPNname(false)}
                showBtn = {true}
            />
            <CalendarsModal 
                visible = {isVisibled}
                onSelect = {onDayPress}
                onRequestClose = {() => setIsVisibled(false)}
            />
            <PlaceModal 
                visible = {PlaceVisibled}
                onRequestClose = {() => setPlaceVisibled(false)}
                onPress = {PlacePress}
            />
            <ImageSelectModal 
                visible = {imageVisibled}
                onCloseRequest = {() => setImageVisibled(false)}
                onCancel = {() => setImageVisibled(false)}
                ImageData={setImage}
                {...image && <Image source = {{ uri: image }} />}
            />
        </View>
    )
}

export default PlantRegister2; 


const styles = StyleSheet.create({
    container: {  // 전체 View 구성
        flex: 1,
        backgroundColor: 'white',
        width: '100%'
    },
    TopBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginTop: '2%'
    },
    BackBtnContainer: {
        width: '18%'
    },
    BackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width: 'auto',
        padding: '2%',
        height: 42,
        borderRadius: 8,
        marginTop: '3%',
        top: '2%'
    },
    UserPlantInfoStyle: {
        marginBottom: '12%',
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
    DataStyles: {
        fontSize: 15, 
        alignSelf: 'center',
        color: '#608C27'
    },
    RegStyle: {
        borderWidth: 1,
        borderColor: "#CDD0CB",
        width: '55%',
        height: 45,
        fontSize: 15,
        marginVertical: '5%',
        borderRadius: 5,
        color: "#608C27",
        justifyContent: 'center'
    },
    ImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        height: '45%'
    },
    ImgbtnStyle: {
        borderWidth: 2,
        borderColor: "#CDD0CB",
        width: '70%',
        height: '80%',
        marginVertical: '5%',
        borderRadius: 5,
        alignSelf: 'center',
        top: '5%'
    },
    CompleteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        bottom: '1%'
    },
    CompleteBtn: {
        width: '60%',
        height: 50,
        backgroundColor: '#ECEDEB',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})