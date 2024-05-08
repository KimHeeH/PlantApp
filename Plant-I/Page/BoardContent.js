import React, { useContext, useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome, Ionicons, Entypo, SimpleLineIcons } from '@expo/vector-icons';
import { UserContext } from "../AuthContext/AuthContext";
import AppText from "../Components/AppText";
import axios from "axios";
import AlertModal from "../Components/AlertModal";
import CustomInput from '../Components/CustomInput';
import SERVER_ADDRESS from "../Components/ServerAddress";

const BoardContent = ({ route, navigation }) => {

    const { login, user } = useContext(UserContext);
    const { No, Id, Writer, RegDate, Title, Content, Category } = route.params;
    const [checkUser, setCheckUser] = useState(false);
    const [userData, setUserData] = useState("");
    const [DeleteBoardVisibled, setDeleteBoardVisibled] = useState(false);
    const [nullCommentsVisibled, setNullCommentsVisibled] = useState(false);
    const [Comments, setComments] = useState("");
    const [CommentData, setCommentData] = useState([]);

    const Time = (time) => {
        return time.slice(0, 16);
    }

    useEffect(() => {
        const WriterUser = async () => {
            try {
                const response = await axios.post(`${SERVER_ADDRESS}/userdb/userNname`, {
                    Nname: Writer
                });
                const data = response.data;
                setUserData(data);
                if (data.length > 0 && data[0].id === user.id) {
                    setCheckUser(true);
                } else {
                    setCheckUser(false);
                }
            }
            catch (error) {
                console.log(error);
            }
        };
        WriterUser();
    }, [user]);

    const DeleteBoard = () => {
        axios.post(`${SERVER_ADDRESS}/Postdb/delete`, {
            Id: user.id,
            Writer: Writer,
            Title: Title,
            Content: Content
        })
            .then(response => {
                navigation.pop();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUpdateBoard = () => {
        navigation.navigate("EditBoardContent", {
            Id: Id,
            Writer: Writer,
            Title: Title,
            Content: Content,
            RegDate: RegDate
        });
    };

    const SelectComments = () => {
        axios.post(`${SERVER_ADDRESS}/Commentdb/select`, { Post_Id: No })
        .then(response => {
            const data = response.data;
            setCommentData(data);
        })
        .catch(error => {
            console.log(error);
        })
    };

    const InsertComments = useCallback(() => {
        if (Comments === "") {
            setNullCommentsVisibled(true);
        }
        else {
            axios.post(`${SERVER_ADDRESS}/Commentdb/insert`, {
                Post_Id: No,
                User_Id: user.id,
                Content: Comments
            }
            )
                .then(response => {
                })
                .catch(error => {

                    console.log(error);
                });
            setComments("");
        }
    }, [No, Comments, user.id])

    useFocusEffect(
        useCallback(() => {
            SelectComments();
        }, [SelectComments])
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <View style={styles.TopContainer}>
                    <TouchableOpacity
                        style={{ flex: 1, alignItems: 'flex-start' }}
                        onPress={() => navigation.pop()}
                    >
                        <FontAwesome name="angle-left" size={35} color="black" />
                    </TouchableOpacity>

                    <AppText bold style={{ fontSize: 22, textAlign: 'center' }} allowFontScaling={false}>{Category}</AppText>
                    <View style={{ flex: 1 }} />
                </View>

                <ScrollView style={{ flexGrow: 1 }}>
                    <View style={styles.WriteContaier}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name="person-circle" size={50} style={styles.IconStyle} />
                            <View style={styles.WriterView}>
                                <AppText bold style={{ fontSize: 18 }} allowFontScaling={false}>{Writer}</AppText>
                                <AppText bold style={{ color: '#979797' }} allowFontScaling={false}>{Time(RegDate)}</AppText>
                            </View>
                        </View>
                        <View style={styles.TitleView}>
                            <AppText bold style={{ fontSize: 20 }} allowFontScaling={false}>{Title}</AppText>
                        </View>
                        <View style={styles.ContentView}>
                            <AppText style={{ fontSize: 15 }} allowFontScaling={false}>{Content}</AppText>
                        </View>
                        {checkUser ? (
                            <View style={styles.BtnContainer}>
                                <TouchableOpacity
                                    style={[styles.BtnStyles, { right: '35%' }]}
                                    onPress={() => setDeleteBoardVisibled(true)}
                                >
                                    <Ionicons name="trash-outline" size={25} color="#757575" />
                                    <AppText bold style={styles.FontStyles} allowFontScaling={false}>삭제</AppText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.BtnStyles}
                                    onPress={handleUpdateBoard}
                                >
                                    <SimpleLineIcons name="pencil" size={25} color="#757575" />
                                    <AppText bold style={styles.FontStyles} allowFontScaling={false}>수정</AppText>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </View>

                    <View style={styles.line}></View>

                    <View>
                        {CommentData.map((data, index) => (
                            <View key={index} style={styles.CommentsView}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="person-circle" size={50} style={styles.IconStyle} />
                                    <View>
                                        <AppText bold style={{ fontSize: 16 }} allowFontScaling={false}>
                                            {Id === data.User_Id ? (<AppText bold style={{ color: '#608C27' }}>{data.User_Id} (작성자)</AppText>) : data.User_Id}
                                        </AppText>
                                        <AppText bold style={{ fontSize: 11, color: '#979797' }} allowFontScaling={false}>{data.RegDate}</AppText>
                                    </View>
                                </View>
                                <AppText style={styles.ContentData} allowFontScaling={false}>{data.Content}</AppText>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.TextInputContainer}>
                    <CustomInput
                        style={styles.TextInputStyle}
                        placeholder="댓글을 입력하세요."
                        value={Comments}
                        onChangeText={setComments}
                    />
                    <TouchableOpacity
                        style={styles.regBtnStyle}
                        onPress={InsertComments}
                    >
                        <Entypo name="forward" size={35} color="#979797" />
                    </TouchableOpacity>
                </View>

                <AlertModal
                    visible={DeleteBoardVisibled}
                    onRequestClose={() => setDeleteBoardVisibled(false)}
                    title="작성한 글을 삭제할까요?"
                    CancelBtnText="아니오"
                    BtnText="삭제하기"
                    onPress={DeleteBoard}
                    onCancel={() => setDeleteBoardVisibled(false)}
                    showBtn={true}
                />
                <AlertModal
                    visible={nullCommentsVisibled}
                    onRequestClose={() => setNullCommentsVisibled(false)}
                    title="댓글을 입력해 주세요."
                    BtnText="확인"
                    onPress={() => setNullCommentsVisibled(false)}
                    showBtn={true}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default BoardContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    TopContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: '3%',
        alignItems: 'center'
    },
    WriteContaier: {
        backgroundColor: '#DFDFDF',
        height: 'auto',
        borderRadius: 10,
        margin: '3%',
        padding: '3%',
    },
    WriterView: {
        padding: '2%'
    },
    TitleView: {
        margin: '1%'
    },
    ContentView: {
        padding: '2%'
    },
    line: {
        borderBottomWidth: 1.5,
        borderBottomColor: "#979797",
        marginTop: '2%',
        width: '95%',
        alignSelf: 'center'
    },
    BtnContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        right: 0,
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 15,
    },
    BtnStyles: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    FontStyles: {
        fontSize: 12,
        color: '#757575'
    },
    IconStyle: {
        color: '#9FD1FF',
        alignSelf: 'center'
    },
    TextInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    TextInputStyle: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#DFDFDF',
        fontSize: 13,
        borderRadius: 15,
        borderColor: '#DFDFDF',
        margin: '2%'
    },
    regBtnStyle: {
        padding: '2%',
        marginRight: '2%',
    },
    CommentsView: {
        padding: '3%',
        justifyContent: 'center',
    },
    ContentData: {
        marginLeft: '2%',
        fontSize: 15
    },
});