import React, {FC} from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import LogIn from "../screens/LogInScreen";
import SignUpScreen from '../screens/SignUpScreen';
import HomePageScreen from '../screens/HomePageScreen';
import ChatScreen from '../screens/ChatScreen'
import UserProfileScreen from '../screens/UserProfileScreen';


/**
 * @param RootStackParamList - Object type that contains mappings for route names to the params of the route
 * This is used to type check route names and params. Specifying @param undefined means the route has no params
 * with params: Profile: {userId: string }; Feed: { sort: 'latest' | 'top' } | undefined;
 * Must be passed to createStackNavigator<...> to use. In: src/navigation/index.tsx
 */
 export type RootStackParamList = {
 // Navigation: undefined;
  LogIn: undefined;
  SignUp: undefined;
  HomePage: undefined;
  Chat: undefined;
  UserProfile: undefined
}

/**
 * @param Stack - Tells the navigator to use the defined 
 * route: params mappings from @param RootStackParamList 
 * 
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

 
 export const NavigationScreens: FC = () => {
   return (
     /**
      * @param Stack.Navigator - Stack.Navigator defines the container: optional @param initialRouteName="Home/etc"
      * @param Stack.Screen - Links 
      */
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomePage" component={HomePageScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
