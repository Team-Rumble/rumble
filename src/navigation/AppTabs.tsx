import React, {FC} from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import LogIn from "../screens/LogInScreen";
import SignUpScreen from '../screens/SignUpScreen';
import HomePageScreen from '../screens/HomePageScreen';
import ChatScreen from '../screens/ChatScreen'
import UserProfileScreen from '../screens/UserProfileScreen';
import RivalsListScreen from '../screens/RivalsListScreen';
import { Ionicons } from '@expo/vector-icons'; //chat icon and home icon
import { TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { RootStackParamList } from '.';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export const AppTabs: FC = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          swipeEnabled:false
        })}>
        <Tab.Screen name="LogIn" component={LogIn} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
        <Tab.Screen name="HomePage" component={HomePageScreen} />
        {/* This will become a nested screen <Tab.Screen name="Chat" component={ChatScreen} /> */}
        <Tab.Screen name="UserProfile" component={UserProfileScreen} />
        <Tab.Screen name="RivalsList" component={RivalsListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
};