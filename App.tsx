import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
import db from "./config/firebase";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { collection, getDocs, query } from "firebase/firestore";
import { NavigationScreens } from "./src/navigation/index";
import { user } from './src/screens/LogInScreen';

// This is to disable a warning that will repeat many times while developing. Current research says 
// it's best to ignore the warning as there is no work-around
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  
  return (
    /**    
     * @SafeAreaProvider: Allows you to position your content appropriately around notches, status bars, home indicators
     * and other device or operating system specific interface elements. Provides SafeAreaView in place of View
    */
    <SafeAreaProvider>
      <NavigationScreens />
    </SafeAreaProvider>

    // <View style={styles.container}>
    //   <Text>Hello friends!</Text>
    //   <Button title="Fetch!" onPress={() => Alert.alert(prompt)} />
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

registerRootComponent(App);
