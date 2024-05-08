import React from "react";
import { StatusBar } from "react-native";

const CustomStatusBar = () => {
    return (
        <StatusBar 
            backgroundColor = "white"
            barStyle = "dark-content"
            animated = {true}
        />
    )
}
export default CustomStatusBar;