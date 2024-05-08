import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import AppText from '../Components/AppText';
import CustomInput from '../Components/CustomInput';
import AlertModal from '../Components/AlertModal';
import SERVER_ADDRESS from "../Components/ServerAddress";

const PlantRegister1 = ({ navigation }) => {

    const [ Search, setSearch ] = useState("");
    const [ PlantList, setPlantList ] = useState([]);
    const [ selectData, setSelectData ] = useState("");
    const [ ClickDataColor, setClickDataColor ] = useState("");
    const [ disabled, setDisabled ] = useState(false);
    const [ failSelectData, setFailSelectData ] = useState(false);

    const handleDataSelect = (selected) => {
        setSelectData(selected);
        setClickDataColor(styles.ClickDataColors);
    }

    const handleNextPage = () => {
        if(selectData === "") {
            setFailSelectData(true);
        } else {
            setDisabled(true);
            navigation.navigate('PlantRegister2', { selectData: selectData });
            setSelectData("")
        }
    }

    useEffect(() => {
        const SearchData = async () => {
            try {
                const response = await axios.get(`${SERVER_ADDRESS}/plantdb/Pname`);
                const data = response.data;
                setPlantList(data);
            }
            catch (error) {
                console.log(error)
            }
        }
        SearchData();
    }, []); 
    

    return (
        <KeyboardAvoidingView
            style = {{ flex: 1 }}
        >
            <View style = { styles.container }>
                <View style = { styles.BackBtnContainer }>
                    <TouchableOpacity 
                        style = { styles.BackBtn }
                        onPress = {() => navigation.pop()}
                    >
                        <FontAwesome name = "angle-left" size={ 40 } color = "#757575" />
                        <AppText bold style = {{ fontSize: 18, marginLeft: 5, color: '#757575' }}>뒤로</AppText>
                    </TouchableOpacity>
                </View>
                <View>
                    <CustomInput 
                        style = { styles.SearchView }
                        placeholder = '키우는 식물을 검색해주세요.'
                        clearButtonMode='always'
                        blurOnSubmit = { false }
                        value = { Search }
                        onChangeText = { setSearch }
                    />
                </View>

                <View style = {{ height: '75%' }}>
                    <ScrollView>
                        {PlantList.filter(data => data.Pname.includes(Search)).map((data, index) => (
                            <View key = { index } style = { styles.ScrollContainer }>
                                <TouchableOpacity 
                                    style = {[ styles.PlantData, selectData == data ? styles.ClickDataColors : null ]}
                                    activeOpacity = { 0.5 }
                                    onPress = {() => { 
                                        handleDataSelect(data);
                                    }}
                                >
                                    <AppText bold style = {{ fontSize: 15 }} allowFontScaling = { false }>{ data.Pname }</AppText>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style = { styles.NextBtnContainer}>
                    <TouchableOpacity
                        style = {[ styles.NextBtn ]}
                        onPress = { handleNextPage }
                    >
                        <AppText bold style = {{ fontSize: 15 }} allowFontScaling = { false }>다음</AppText>
                    </TouchableOpacity>
                </View>

                <AlertModal 
                    visible = { failSelectData }
                    onRequestClose = {() => setFailSelectData(false)}
                    title = "식물을 선택해 주세요."
                    BtnText = "확인"
                    onPress = {() => setFailSelectData(false)}
                    showBtn= { true }
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default PlantRegister1; 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    BackBtnContainer: {
        width: '18%'
    },
    BackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '15%',
        marginTop: '6%',
    },  
    SearchView: {
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#979797",
        borderRadius: 10,
        width: '90%',
        height: 50,
        padding: 10,
        fontSize: 15,
        margin: '2%'
    },
    ScrollContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    PlantData: {
        width: '90%',
        height: 45,
        borderRadius: 8,
        backgroundColor: '#CBDDB4',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    NextBtnContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    NextBtn: {
        backgroundColor: '#DADADA',
        width: "60%",
        height: '80%',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: 'transparent'
    },
    ClickDataColors: {
        backgroundColor: '#AABB93'
    }
})