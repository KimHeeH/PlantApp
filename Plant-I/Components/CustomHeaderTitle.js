import React from 'react';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';

const CustomHeaderTitle = ({ title, style }) => {
  const [fontsLoaded] = useFonts({
    BinggraeBold: require("../assets/fonts/Binggrae-Bold.ttf"),
});

if(!fontsLoaded) {
    return null;
}

let fontFamily = "BinggraeBold";

  return (
    <Text style = {{
        fontFamily: fontFamily, ...style}}>{title}</Text>
  );
};

export default CustomHeaderTitle;