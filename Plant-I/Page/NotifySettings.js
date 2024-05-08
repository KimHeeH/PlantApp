import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const NotifySettings = ({ navigation }) => {

    const [ isEnabled, setIsEnabled ] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style = { styles.container }>
            <View style = { styles.TopContainer }>
                <TouchableOpacity
                    onPress = { () => navigation.pop() }
                >
                    <FontAwesome name = "angle-left" size={ 45 } color = "black" style = {{ left: 15 }} />
                </TouchableOpacity>
                <View style = { styles.TitleContainer }>
                    <Text style = { styles.TitleStyle }>
                        알림 설정
                    </Text>
                </View>
            </View>

            <View style = { styles.SettingContainer }>
                <View style = { styles.SettingBox }>
                    <View style = { styles.SwitchContainer }>
                        <View style = {[styles.SwitchView, { borderBottomWidth: 1, borderBottomColor: '#757575' }]}>
                            <Text style = { styles.FontStyles }>팝업,소리,진동</Text>
                            <Switch 
                                trackColor={{false: '#767577', true: 'black'}}
                                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style = {{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginRight: 20 }}
                            />
                        </View>
                    
                        <View style = {[styles.SwitchView, { borderBottomWidth: 1, borderBottomColor: '#757575' }]}> 
                            <Text style = { styles.FontStyles }>이벤트, 혜택 알림</Text>
                            <Switch 
                                trackColor={{false: '#767577', true: 'black'}}
                                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style = {{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginRight: 20 }}
                            />
                        </View>

                        <View style = { styles.SwitchView }>
                            <Text style = { styles.FontStyles }>야간에도 알림 받기</Text>
                            <Switch 
                                trackColor={{false: '#767577', true: 'black'}}
                                thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style = {{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }], marginRight: 20 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default NotifySettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    TopContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 15
    },
    TitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleStyle: {
        fontSize: 22, 
        fontWeight: 'bold', 
    },
    SettingContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    },
    SettingBox: {
        width: 350,
        height: 200,
        padding: 5
    },
    SwitchContainer: {
        width: '100%',
        height: '100%',
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'cloumns',
        alignContent: 'center',
        alignItems: 'center',
    },
    SwitchView: {
        flexDirection: 'row', 
        width: '100%', 
        alignContent: 'center', 
        alignItems: 'center',
        padding: 7,
        justifyContent:'space-between'
    },
    FontStyles: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});