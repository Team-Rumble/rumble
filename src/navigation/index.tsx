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
import { AppTabs } from './AppTabs';





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
  Chat: undefined;
  UserProfile: undefined;
  RivalsList: undefined
  AppTabs: undefined
}

/**
 * @param Stack - Tells the navigator to use the defined 
 * route: params mappings from @param RootStackParamList 
 * 
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

// const HomeIcon: FC = () => {
//   return (
//     <Ionicons name="home-outline" size={24} color="black" />
//   )
// };

// function ChatIcon():any{
//   return (
//     <Ionicons style={{paddingLeft:125}} name="chatbubble-ellipses-outline" size={24} color="black" onPress={() = alert("I pressed the button!")}/> 
//   )
// };

// //we can potentially replace this with the user icon they've selected once they're signed in
// function UserIcon(){
//   return(
//     <Ionicons name="person-circle-outline" size={24} color="black" />
//   )
// }

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

export const NavigationScreens: FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AppTabs" component={AppTabs}/>
        </Stack.Navigator>
    </NavigationContainer>
    
  );
};
 
//  export const NavigationScreens: FC = () => {
//    return (
//      /**
//       * @param Stack.Navigator - Stack.Navigator defines the container: optional @param initialRouteName="Home/etc"
//       * @param Stack.Screen - Links 
//       */
//     //NavigationContainer functions like Provider in React
//     <NavigationContainer> 
//       <Stack.Navigator>
//         <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false}} />
//         <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}} />
//         <Stack.Screen name="HomePage" component={HomePageScreen} />
//         <Stack.Screen name="Chat" component={ChatScreen} />
//         <Stack.Screen name="UserProfile" component={UserProfileScreen} />
//         <Stack.Screen name="RivalsList" component={RivalsListScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

 