import React, { FC } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import LogIn from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomePageScreen from "../screens/HomePageScreen";
import { RootStackParamList } from "../../App";

const Stack = createNativeStackNavigator<RootStackParamList>();

interface Props {}

export const NavigationScreens: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomePage" component={HomePageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
