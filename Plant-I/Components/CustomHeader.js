import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5, Octicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

const CustomHeader = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
        <FontAwesome5 name="cloud-sun" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('NotifyPage')}>
        <Octicons name="bell-fill" size={25} color="white" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomHeader;
