import React from "react";
import { TextInput } from "react-native";
import { useFonts } from "expo-font";

const CustomInput = (props) => {
    const [fontsLoaded] = useFonts({
        Binggrae: require("../assets/fonts/Binggrae.ttf"),
        BinggraeBold: require("../assets/fonts/Binggrae-Bold.ttf"),
    });

    if(!fontsLoaded) {
        return null;
    }
    
    let fontFamily = "Binggrae";
    
    if (props.bold) {
        fontFamily = "BinggraeBold";
    }

    return (
        <TextInput
            {...props}
            style = {{
                ...props.style,
                fontFamily: fontFamily,
            }}
        />
    );
};

export default CustomInput;