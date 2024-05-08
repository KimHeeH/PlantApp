import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import { Octicons, MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '../AuthContext/AuthContext';
import axios from 'axios';
import AppText from '../Components/AppText';
import AlertModal from '../Components/AlertModal';
import CustomInput from '../Components/CustomInput';
import SERVER_ADDRESS from "../Components/ServerAddress";

const UserPlantInfo = ({ route, navigation  }) => {

    const { login, user } = useContext(UserContext)
    const { No, Pname, PNname, Plant_Date, Place, image } = route.params;
    const [ DeleteVisibled, setDeleteVisibled ] = useState(false);

    const DeleteData = () => {
        axios.delete(`${SERVER_ADDRESS}/userplantdb/delete`, {
            data: {
                No: No,
                Id: user.id,
                pname: Pname,
                pnname: PNname,
                Plant_Date: Plant_Date,
                Place: Place,
                Image: image
            }
        })
        .then(response => {
            console.log("삭제 완료", response.data);
            navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <View style = { styles.container }> 
            <View style = { styles.PlantDataContainer }>
                <View style = { styles.imgInfo }>
                    <TouchableOpacity style = { styles.ImgbtnStyle }>
                        <Image 
                            style = {{ width: '100%', height: '100%', borderRadius: 7 }}
                            source={{ uri: route.params?.image }}
                        />
                    </TouchableOpacity>
                </View>   
                <View style = { styles.PlantName }>
                    <TouchableOpacity
                        style = {{ width: '100%', alignItems: 'center' }}
                        onPress={() => {navigation.navigate("PlantDetail",{Pname: Pname})}}
                    >
                        <AppText bold style = {{ fontSize: 18 }} allowFontScaling = { false }>{ route.params?.Pname }</AppText>
                    </TouchableOpacity>
                </View>

                <KeyboardAvoidingView>
                    <View style = { styles.UserPlantInfoStyle }>
                        <View style = { styles.InfoStyle }>
                            <AppText bold style = { styles.infoText } allowFontScaling = { false }>키우기 시작한 날</AppText>
                            <CustomInput 
                                style = { styles.InfoDataStyle }
                                value = { Plant_Date }
                                textAlign = 'center'
                                editable = { false }
                            />
                        </View>

                        <View style = { styles.InfoStyle }> 
                            <AppText bold style = { styles.infoText } allowFontScaling = { false }>식물 별명</AppText>
                            <CustomInput 
                                style = { styles.InfoDataStyle }
                                value = { PNname }
                                textAlign = 'center'
                                editable = { false }
                            />
                        </View>

                        <View style = { styles.InfoStyle }>
                            <AppText bold style = { styles.infoText } allowFontScaling = { false }>키우는 곳</AppText>
                            <CustomInput
                                style = { styles.InfoDataStyle }
                                value = { Place }
                                textAlign = 'center'
                                editable = { false }
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
            <View style = { styles.BtnStyle }>
                <TouchableOpacity 
                    style = { styles.DeleteBtn }
                    onPress={() => setDeleteVisibled(true)}
                >
                    <MaterialIcons name="delete" size = { 20 } color="#757575" />
                    <AppText bold style = {{ fontSize: 15 , color: '#757575', }} allowFontScaling = { false }>삭제</AppText>
                </TouchableOpacity>

                <TouchableOpacity
                    style = { styles.UpdateBtn }
                    onPress = {() => navigation.navigate("EditPlantInfo", {
                        No: No,
                        Pname: Pname,
                        PNname: PNname,
                        Plant_Date: Plant_Date,
                        Place: Place,
                        image: image
                      })}
                >
                    <Octicons name = "pencil" size = { 20 } color="#757575" />
                    <AppText bold style = {{ fontSize: 15 , color: '#757575' }} allowFontScaling = { false }>수정</AppText>
                </TouchableOpacity>
            </View>
            <AlertModal 
                visible = {DeleteVisibled}
                onRequestClose = {() => setDeleteVisibled(false)}
                title = "해당 식물을 삭제하겠습니까?"
                CancelBtnText = "아니오"
                BtnText = "네"
                onCancel = {() => setDeleteVisibled(false)}
                onPress = {DeleteData}
                showBtn = {true}
            />
        </View>
    );
};

export default UserPlantInfo; 

const styles = StyleSheet.create({
    container: {  // 전체 View 구성
        flex: 1,
        backgroundColor: 'white'
    }, 
    PlantDataContainer: {
        justifyContent: 'center',
        marginTop: '4%'
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
        marginTop: '5%'
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
    InfoDataStyle: {
        borderWidth: 1,
        borderColor: "#CDD0CB",
        width: '55%',
        height: 45,
        fontSize: 15,
        marginVertical: '6%',
        borderRadius: 8,
        color: '#608C27'
    },
    imgInfo: {
        marginTop: '7%'
    },
    ImgbtnStyle: {
        borderWidth: 1,
        borderColor: "#CDD0CB",
        width: '55%',
        height: 200,
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 18,
        borderRadius: 8,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    BtnStyle: {
        position: 'absolute',
        flexDirection: 'row',
        height: 40,
        justifyContent: 'space-between',
        bottom: '3%',
        right: '7%',
        left: '7%'
    },
    UpdateBtn: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    DeleteBtn: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
})