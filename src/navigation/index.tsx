import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogIn from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomePageScreen from "../screens/HomePageScreen";
import ChatScreen from "../screens/ChatScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import RivalsListScreen from "../screens/RivalsListScreen";
import { Ionicons } from "@expo/vector-icons"; //chat icon and home icon
import { TouchableOpacity } from "react-native";
import LoadingScreen from "../screens/LoadingScreen";

/**
 * @param RootStackParamList - Object type that contains mappings for route names to the params of the route
 * This is used to type check route names and params. Specifying @param undefined means the route has no params
 * with params: Profile: {userId: string }; Feed: { sort: 'latest' | 'top' } | undefined;
 * Must be passed to createStackNavigator<...> to use. In: src/navigation/index.tsx
 */
export type RootStackParamList = {
  Navigation: undefined;
  LogIn: undefined;
  SignUp: undefined;
  HomePage: undefined;
  Chat: any; // ideally this would be string, but that's causing an error over in RivalsList
  UserProfile: undefined;
  RivalsList: undefined;
  AppTabs: undefined;
  Loading: undefined;
};

/**
 * @param Stack - Tells the navigator to use the defined
 * route: params mappings from @param RootStackParamList
 *
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export const NavigationScreens: FC = ({}) => {
  return (
    /**
     * @param Stack.Navigator - Stack.Navigator defines the container: optional @param initialRouteName="Home/etc"
     * @param Stack.Screen - Links
     */

    //NavigationContainer functions like Provider in React
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("UserProfile")}
            >
              <Ionicons name="person-circle-outline" size={35} color="white" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("RivalsList")}>
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={35}
                color="white"
              />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
              <Ionicons name="home-outline" size={35} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#2D142C",
          },
          headerTintColor: "white",
        })}
      >
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="HomePage" component={HomePageScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="RivalsList" component={RivalsListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
