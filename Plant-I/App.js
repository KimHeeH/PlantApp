import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import 'react-native-gesture-handler';
import { Octicons, Entypo, FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';

import UserProvider from './AuthContext/AuthContext';
import SignUp from './Page/SignUp';
import LoginPage from './Page/Login';
import Home from './Page/Home';
import MyCalendar from './Page/MyCalendar';
import Favorite from './Page/Favorite';
import Search from './Page/Search';
import MyPage from './Page/MyPage';
import PlantRegister1 from './Page/PlantRegister1';
import PlantRegister2 from './Page/PlantRegister2';
import UserPlantInfo from './Page/UserPlantInfo';
import EditProfile from './Page/EditProfile';
import EditPlantInfo from './Page/EditPlantInfo';
import NotifySettings from './Page/NotifySettings';
import PlantDetail from './Page/PlantDetail';
import Weather from './Page/Weather';
import NotifyPage from './Page/NotifyPage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//#region 바텀 네비게이션 구성
const TabNavigator = () => (
    <Tab.Navigator
        screenOptions = {{ 
            tabBarStyle: { height: 60, backgroundColor: '#a4c47a',}, 
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', position: 'relative', bottom: 2 },
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: 'black',
            tabBarItemStyle: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
            tabBarIconStyle: { justifyContent: 'center', alignItems: 'center', alignContent: 'center', }
    }}>
        <Tab.Screen name = "홈" component = { Home } 
            options = {{ 
                headerShown: false, 
                tabBarIcon: ({ color, size, focused, marginTop }) => 
                (<HomeCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop }/>)
            }} 
        />
        <Tab.Screen name = "캘린더" component = { MyCalendar } 
            options = {{ 
                headerShown: false,
                tabBarIcon: ({ color, size, focused, marginTop }) => 
                (<MyCalendarCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />), 
            }} 
        />
        <Tab.Screen name = "검색" component = { Search } 
            options = {{ 
                headerShown: false,
                tabBarIcon: ({ color, size, focused, marginTop }) => 
                (<SearchCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />),
            }} 
        />
        <Tab.Screen name = "즐겨찾기" component = { Favorite } 
            options = {{ 
                headerShown: false,
                tabBarIcon: ({ color, size, focused, marginTop }) => 
                (<FavoriteCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />), 
            }} 
        />
        <Tab.Screen name = "마이페이지" component = { MyPage }
            options = {{ 
                headerShown: false,
                tabBarIcon: ({ color, size, focused, marginTop }) => 
                (<MyPageCustom foused = { focused } color = { color }  size = { size } marginTop = { marginTop } />),
            }} 
        />
    </Tab.Navigator>
);
//#endregion

//#region 상단바 구성
function App() {

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = 'LoginPage'>
          <Stack.Screen name = 'LoginPage' component = { LoginPage } options = {{ headerShown: false }} />
          <Stack.Screen name = 'SignUp' component = { SignUp } options = {{ headerShown: false }} />
          <Stack.Screen name = 'Home' 
            component={ TabNavigator } 
            options =  {({ navigation })  =>({ 
              headerTitle: 'Plant-I', 
              headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#a4c47a' },
              headerShadowVisible: false,
              headerLeft: () => (
                <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                  <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress = {() => navigation.navigate("NotifyPage")}>
                  <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                </TouchableOpacity>
              )
              })}
          />
          <Stack.Screen name = 'UserPlantInfo' component = { UserPlantInfo } 
            options =  {({ navigation })  =>({ 
              headerTitle: 'Plant-I', 
              headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: '#a4c47a' },
              headerShadowVisible: false,
              headerLeft: () => (
                <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                  <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity onPress = {() => navigation.navigate("NotifyPage")}>
                  <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                </TouchableOpacity>
              )
              })} 
            />
            <Stack.Screen name = 'PlantRegister1' component = { PlantRegister1 } 
              options =  {({ navigation })  =>({ 
                headerTitle: 'Plant-I', 
                headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#a4c47a' },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                    <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress = {() => navigation.navigate("NotifyPage")}>
                    <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                  </TouchableOpacity>
                )
              })}
            />
            <Stack.Screen name = 'PlantRegister2' component = { PlantRegister2 } 
              options =  {({ navigation })  =>({ 
                headerTitle: 'Plant-I', 
                headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#a4c47a' },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                    <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("NotifyPage") }>
                    <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                  </TouchableOpacity>
                )
              })}
            />
            <Stack.Screen name = 'EditProfile' component = { EditProfile } 
              options =  {({ navigation })  =>({ 
                headerTitle: 'Plant-I', 
                headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#a4c47a' },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress = {() => navigation.navigate("Weather")}>
                    <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress = {() => navigation.navigate("NotifyPage")}>
                    <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                  </TouchableOpacity>
                )
                })} 
            />
            <Stack.Screen name = 'EditPlantInfo' component = { EditPlantInfo } 
              options =  {({ navigation })  =>({ 
                headerTitle: 'Plant-I', 
                headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#a4c47a' },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                    <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("NotifyPage") }>
                    <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                  </TouchableOpacity>
                )
              })} 
            />
            <Stack.Screen name = 'NotifySettings' component = { NotifySettings } 
              options =  {({ navigation })  =>({ 
                headerTitle: 'Plant-I', 
                headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#a4c47a' },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                    <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("NotifyPage") }>
                    <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                  </TouchableOpacity>
                )
              })} 
            />
            <Stack.Screen name = 'PlantDetail' component = { PlantDetail } 
              options =  {({ navigation })  =>({ 
                headerTitle: 'Plant-I', 
                headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#a4c47a' },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                    <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("NotifyPage") }>
                    <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                  </TouchableOpacity>
                )
              })} 
            />
            <Stack.Screen name = 'Weather' component = { Weather } 
              options =  {({ navigation })  =>({ 
                headerTitle: 'Plant-I', 
                headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#a4c47a' },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                    <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("NotifyPage") }>
                    <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                  </TouchableOpacity>
                )
                })}
            />
            <Stack.Screen name = 'NotifyPage' component = { NotifyPage } 
              options =  {({ navigation })  =>({ 
                headerTitle: 'Plant-I', 
                headerTitleStyle: { fontSize: 35, fontWeight: 'bold', color: 'black'},
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#a4c47a' },
                headerShadowVisible: false,
                headerLeft: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("Weather")}>
                    <FontAwesome5 name="cloud-sun" size={ 25 } color="black" />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity onPress = { () => navigation.navigate("NotifyPage") }>
                    <Octicons name="bell-fill" size={ 25 } color="black" style = {{ marginRight: 10 }} />
                  </TouchableOpacity>
                )
                })}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
export default App;
//#endregion

//#region 아이콘 스타일
const HomeCustom = ({ color, size, foused }) => {  // 홈 아이콘
  const iConColor = foused ? 'black' : 'grey';

  return (<Entypo name = "home" size = { 30 } color = { iConColor }/>)
}

const MyCalendarCustom = ({ color, size, foused }) => {  // 달력 아이콘
  const iConColor = foused ? 'black' : 'grey';

  return <Entypo name = "calendar" size = { 30 } color = { iConColor }/>
}

const SearchCustom = ({ color, size, foused }) => {  // 검색 아이콘
  const iConColor = foused ? 'black' : 'grey';

  return <FontAwesome name = "search" size = { 30 } color = { iConColor }/>
}

const FavoriteCustom = ({ color, size, foused }) => {  // 즐겨찾기 아이콘
  const iConColor = foused ? 'black' : 'grey';

  return <AntDesign name = "heart" size={ 30 } color = { iConColor }/>
}

const MyPageCustom = ({ color, size, foused }) => {  // 마이페이지 아이콘
  const iConColor = foused ? 'black' : 'grey';  

  return <FontAwesome5 name = "user-alt" size = { 30 } color = { iConColor }/>
}
//#endregion
