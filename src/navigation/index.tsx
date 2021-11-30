import React, {FC} from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import SignIn from '../screens/SignInScreen';
import HomePageScreen from '../screens/HomePageScreen'
import { RootStackParamList } from '../../App';




const Stack = createNativeStackNavigator<RootStackParamList>();

 interface Props {
   
 }
 
 export const NavigationScreens: FC = () => {
   return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="HomePage" component={HomePageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
   )
 }
 
