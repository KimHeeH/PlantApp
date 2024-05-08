import React from "react";
import { View, StyleSheet, Modal } from 'react-native';
import { Calendar, LocaleConfig } from "react-native-calendars";
import { AntDesign } from '@expo/vector-icons';

LocaleConfig.locales['ko'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
  };
LocaleConfig.defaultLocale = 'ko';

const CalendarsModal = ({ visible, onRequestClose, onSelect }) => {
    return (
        <View>
            <Modal
            visible = { visible }
            animationType = 'slide'
            transparent = { true }
            onRequestClose = { onRequestClose }
            >
                <View style = { styles.ModalView }>
                    <Calendar 
                        style = { styles.CalendarStyle }
                        theme = {{ 
                            todayTextColor: '#CBDDB4',
                            textMonthFontSize: 18,
                            textDayFontSize: 14,
                            textDayHeaderFontSize: 14,
                            textMonthFontWeight : 'bold',
                            arrowColor: 'black',
                            weekVerticalMargin: 10
                        }}
                        renderArrow = {(direction) => direction === "left" ? (
                            <AntDesign name="left" size={ 18 } color="black" />
                        ) : (
                            <AntDesign name="right" size={ 18 } color="black" />
                        )}
                        onDayLongPress= { day => {
                            setSelected(day.dateString);
                        }}
                        monthFormat = {'yyyy년 M월'}
                        onDayPress = { onSelect }
                    />
                </View>
            </Modal>
        </View>
    )
}
export default CalendarsModal;

const styles = StyleSheet.create({
    ModalView: {
        backgroundColor: 'white',
        width: 320,
        height: 400,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#CBDDB4',
        marginTop: 200
    },
    CalendarStyle: {
        alignSelf: "center",
        width: '95%',
        height: '70%',
        padding: 1
    }
})