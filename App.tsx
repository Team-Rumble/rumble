import { StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Alert, SafeAreaView } from "react-native";
import db from "./config/firebase";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import {NavigationScreens} from './src/navigation/index';

export type RootStackParamList = {
  Navigation: undefined;
  SignIn: undefined;
  HomePage: undefined;
}


async function testDB(): Promise<string> {
  const promptsRef = collection(db, "prompts");
  //const prompts = await getDocs(promptsRef);
  const q = query(
    promptsRef
    //where("prompt", "==", "Which is better, Harry Potter or Lord of the Rings?")
  );
  const querySnapshot = await getDocs(q);
  const prompts: string[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    prompts.push(doc.data().prompt);
  });
  const randomNum = Math.floor(Math.random() * prompts.length);
  return prompts[randomNum];
}

export default function App() {

  let prompt: string;

  async function wrapper() {
    prompt = await testDB();
    console.log(prompt);
  }

  wrapper();

  return (
    <SafeAreaProvider>
      <NavigationScreens/>
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
