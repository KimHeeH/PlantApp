import React, { useContext, useEffect, useState, useCallback } from "react";
import { Image, View } from "react-native";
import axios from "axios";
import SERVER_ADDRESS from "../Components/ServerAddress";
import AppText from "../Components/AppText";
import LocationInfo from "../Components/Location";
import { UserContext } from "../AuthContext/AuthContext";
import { useFocusEffect } from "@react-navigation/native";

const Weather = ({ navigation }) => {

    const {login, user} = useContext(UserContext);
    const [userLocation, setUserLocation] = useState(null);

    const [weatherData, setWeatherData] = useState({
        temp: 0,
        temp_max: 0,
        temp_min: 0,
        humidity: 0,
        desc: '',
        icon: '',
        local_name: '서울'
    });

    const WeatherInfo = async (latitude, longitude) => {
        try {
            const response = await axios.get(`${SERVER_ADDRESS}/weather/weatherInfo`, {
                params: {
                    lat: latitude,
                    lon: longitude
                }
            })
            const data = response.data
            setWeatherData({
                name: data?.name,
                local_name: data.local_name,
                temp: data?.main?.temp,
                temp_max: data?.main?.temp_max,
                temp_min: data?.main?.temp_min,
                humidity: data?.main?.humidity,
                desc: data?.weather[0]?.description,
                icon: data?.weather[0]?.icon
            });
        }
        catch (error) {
            console.log(error);
        }
    } 

    const handleLocationChange = ({lat, lon}) => {
        setUserLocation({lat, lon})
    }

    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(1);

    }

    useFocusEffect(
        useCallback(() => {
            const userLocationInfo = async () => {
                try {
                    const response = await axios.post(`${SERVER_ADDRESS}/userlocationdb/select`, {
                        Id: user.id
                    });
                    const data = response.data;
                    if(data.length > 0) {
                        setUserLocation({lat: data[0]?.lat, lon: data[0]?.lon});
                    } else {
                        setUserLocation({ lat: "37.5683", lon: "126.9778" });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }
            userLocationInfo();
        }, [user.id])
    );

    useEffect(() => {
        if (userLocation) {
            WeatherInfo(userLocation.lat, userLocation.lon);
        }
        console.log(userLocation);
    }, [userLocation]);

    const weatherImg = `https://openweathermap.com/img/w/${weatherData.icon}.png`;

    return (
        <View>
            <AppText>{weatherData?.local_name}</AppText>
            <AppText>현재 온도: {kelvinToCelsius(weatherData?.temp)}°C</AppText>
            <AppText>최고 온도: {kelvinToCelsius(weatherData?.temp_max)}°C</AppText>
            <AppText>최저 온도: {kelvinToCelsius(weatherData?.temp_min)}°C</AppText>
            <AppText>습도: {weatherData?.humidity}%</AppText>
            <AppText>{weatherData?.desc}</AppText>
            <Image 
            style = {{ width: 50, height: 50 }}
            source={{uri: weatherImg}} />
            <LocationInfo onLocationChange={handleLocationChange} />
        </View>
    )
}

export default Weather;