import React, { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity, FlatList } from  'react-native'
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import AppText from "../Components/AppText";
import SERVER_ADDRESS from "../Components/ServerAddress";

const Community = ({ navigation }) => {

    const [BoardData, setBoardDate] = useState([]);
    const [selectedCategory, setSelectCategory] = useState(1);
    const [focusedCategory, setFocusedCategory] = useState("");

    const handleFocusedCategory = () => {
        setFocusedCategory(styles.FocusCategory);
    }

    const Time = (time) => {
        return time.slice(0, 16);
    }
    
    const SelectBoard = async () => {
        try {
            const response = await axios.get(`${SERVER_ADDRESS}/Postdb/select`, {
                params: {
                    Category: selectedCategory
                }
            });
            const data = response.data;
            setBoardDate(data);
        }
        catch (error) {
            console.log(error);
        }
    };
    
    useFocusEffect(
        useCallback(() => {
            SelectBoard();
        }, [SelectBoard])
    );

    const renderBoardData = ({ item }) => (
        <TouchableOpacity 
            onPress = {() => navigation.navigate("BoardContent", {
                No: item.No,
                Id: item.Id,
                Writer: item.Writer,
                RegDate: item.RegDate,
                Title: item.Title,
                Content: item.Content,
                Category: categoryValue[item.Category]
            })}
        >
            <View style = { styles.BoardView }>
                <View style = {{ flexDirection: 'row' }}>
                    <Ionicons name="person-circle" size={ 40 } color="#9FD1FF" />
                    <View style = {{ marginLeft: 5 }}>
                        <AppText bold style = { styles.WriterStyle } allowFontScaling = { false }>{ item.Writer }</AppText>
                        <AppText bold style = { styles.RegDateStyle } allowFontScaling = { false }>{ Time(item.RegDate) }</AppText>
                    </View>
                </View>
                <AppText bold style = { styles.TitleStyle } allowFontScaling = { false }>{ item.Title }</AppText>
            </View>
        </TouchableOpacity>
    );

    const categoryValue = {
        1: '자유게시판',
        2: '질문게시판',
        3: '가드닝팁',
        4: '식물자랑',
        5: '플렌테리어'
    }

    return (
        <View style = {{ flex: 1, backgroundColor: 'white' }}>
            <View style = { styles.TopContainer }>
                <TouchableOpacity
                    onPress = {() => setSelectCategory(1)}
                    style = {[styles.CategoryStyles, selectedCategory === 1 ? styles.FocusCategory : null]}
                >
                    <AppText bold 
                        style = {{color: selectedCategory === 1 ? 'black' : '#979797'}}
                        allowFontScaling = { false }
                    >
                        자유게시판
                    </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {() => setSelectCategory(2)}
                    style = {[styles.CategoryStyles, selectedCategory === 2 ? styles.FocusCategory : null]}
                >
                    <AppText bold 
                        style = {{color: selectedCategory === 2 ? 'black' : '#979797'}}
                        allowFontScaling = { false }
                    >
                        질문게시판
                    </AppText>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress = {() => setSelectCategory(3)}
                    style = {[styles.CategoryStyles, selectedCategory === 3 ? styles.FocusCategory : null]}
                >
                    <AppText bold 
                        style = {{color: selectedCategory === 3 ? 'black' : '#979797'}}
                        allowFontScaling = { false }
                    >
                        가드닝팁
                    </AppText>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress = {() => setSelectCategory(4)}
                    style = {[styles.CategoryStyles, selectedCategory === 4 ? styles.FocusCategory : null]}
                >
                    <AppText bold 
                        style = {{color: selectedCategory === 4 ? 'black' : '#979797'}}
                        allowFontScaling = { false }
                    >
                        식물자랑
                    </AppText>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress = {() => setSelectCategory(5)}
                    style = {[styles.CategoryStyles, selectedCategory === 5 ? styles.FocusCategory : null]}
                >
                    <AppText bold 
                        style = {{color: selectedCategory === 5 ? 'black' : '#979797'}}
                        allowFontScaling = { false }
                    >
                        플렌테리어
                    </AppText>
                </TouchableOpacity>
            </View>

            <View style = {{ height: '81%' }}>
                <FlatList 
                    data = { BoardData }
                    renderItem = { renderBoardData }
                    keyExtractor = {(item, index) => index.toString()}
                />
            </View>

            <View style = {styles.WriteBtnContainer}>
                <TouchableOpacity 
                    style = {styles.WriteBtnStyle}
                    onPress = {() => navigation.navigate("WriteBoard", { selectedCategory: selectedCategory })}
                >
                    <AppText bold style = {{ fontSize: 18, justifyContent: 'center' }} allowFontScaling = { false }>글 쓰기</AppText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Community;

const styles = StyleSheet.create({ 
    TopContainer: {
        flexDirection: 'row',
        padding: '2%',
        marginBottom: '2%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: '1%',
        alignItems: 'center',
    },
    CategoryStyles: {
        padding: '2%',
        alignItems: 'center',
    },
    FocusCategory: {
        borderBottomWidth: 2,
    },
    BoardView: {
        borderBottomWidth: 1,
        borderBottomColor: '#CDD0CB',
        padding: '2.5%',
        backgroundColor: 'white'
    },
    WriterStyle: {
        fontSize: 20
    },
    RegDateStyle: {
        fontSize: 12,
        color: '#979797',
    },
    TitleStyle: {
        fontSize: 22,
        padding: '1%',
    },
    WriteBtnContainer: {
        position: 'absolute',
        bottom: '1%',
        right: '4%',
        width: '32%',
        height: '7%',
        zIndex: 1,
    },
    WriteBtnStyle: {
        backgroundColor: '#CBDDB4',
        alignItems: 'center',
        justifyContent: 'center', 
        height: "92%",
        borderRadius: 20
    }
});