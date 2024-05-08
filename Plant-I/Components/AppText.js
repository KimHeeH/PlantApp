import React from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";

const AppText = (props) => {
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
        <Text
            {...props}
            style = {{
                ...props.style,
                fontFamily: fontFamily,
            }}
        >
            {props.children}
        </Text>
    );
};

export default AppText;