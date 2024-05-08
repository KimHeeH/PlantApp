import React, {useContext, useEffect} from "react"
import * as Location from 'expo-location';
import { UserContext } from "../AuthContext/AuthContext";
import axios from "axios";
import SERVER_ADDRESS from "./ServerAddress";

const LocationInfo = ({ onLocationChange }) => {
    const {login, user} = useContext(UserContext);

    useEffect(() => {
        const getLocation = async () => {
            try {
                const isLocationEnabled = await Location.hasServicesEnabledAsync();
                if(!isLocationEnabled) {
                    return;
                }

                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    return;
                }
                
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                onLocationChange({ lat: latitude, lon: longitude });
                await axios.post(`${SERVER_ADDRESS}/userlocationdb/locationInfo`, {
                    Id: user.id,
                    lat: latitude,
                    lon: longitude 
                });
            } catch (error) {
                console.error(error);
            }
        };
        getLocation();
    }, []);

    return null;
};

export default LocationInfo;