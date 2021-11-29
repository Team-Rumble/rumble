import { StatusBar } from "expo-status-bar";
import { registerRootComponent } from "expo";
import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import db from "./config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

async function testDB() {
  const promptsRef = collection(db, "prompts");
  const prompts = await getDocs(promptsRef);
  console.log(prompts.docs);
}

export default function App() {
  testDB();
  return (
    <View style={styles.container}>
      <Text>Hello friends!</Text>
      <Button title="Fetch!" onPress={() => Alert.alert(`Fetching...`)} />
      <StatusBar style="auto" />
    </View>
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
