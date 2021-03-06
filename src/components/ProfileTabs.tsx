import React, { FC, useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  Alert,
  ScrollView,
  Modal,
  Button,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import Checkbox from "./Checkbox";
import { BioInput, SignUpInput } from "./Stylesheet";
import { useNavigation } from "@react-navigation/native";
import {
  MenuView,
  RumbleBtn,
  RumbleTxt,
  SingleRivalBox,
  RivalPFP,
  RivalName,
  ClickableRival,
  FilterX,
  RivalBio,
  RivalBioPFP,
  RivalBioName,
} from "../components/HomePage.style";
import {
  ProfileImageContainer,
  ProfileImage,
  MenuText,
  ProfileMenu,
  ProfileMenuText,
  LogOutBtn,
  LogOutText,
} from "../components/Stylesheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import db, { auth } from "../../config/firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { StatusBar } from "expo-status-bar";

type profileStack = NativeStackNavigationProp<
  RootStackParamList,
  "UserProfile"
>;

interface SingleUserProps {
  person: {
    id: string;
    username: string;
    profileUrl: string;
    bio: string;
    interests: {
      art: boolean;
      cooking: boolean;
      gaming: boolean;
      math: boolean;
      sports: boolean;
    };
    age: number;
    email: string;
    rivals: string[];
  };
}
/**
 *
 * @param Rivals - Renders a list of rivals from current User.
 * @param rivalsList - Fetches the current user list of rival's Id;
 * @param getRivals - Fetches the rival's information by its rival's uid.
 *
 */

// ----------------- RIVALS ------------------------------//
export const Rivals: FC<SingleUserProps> = (props) => {
  //try mapping directly, instead of rivals.map, props.rivals.map/ rivals.length -> props.rivals.length
  return (
      <View style={{ height: 1000 }}>
        {(props.rivals.length < 1) ? (
          <View>
            <Text>No Rivals Yet</Text>
          </View>
        ) : (
          props.rivals.map((rival, i) => (
            <SingleRivalBox key={i}>
              <RivalPFP source={{ uri: rival.profileUrl }} />
              <RivalName>{rival.username}</RivalName>
            </SingleRivalBox>
          ))
        )}
      </View>
  );
};
// ----------------- END OF RIVALS -----------------------//

// ----------------- INTERESTS ------------------------------//

export const Interests: FC<SingleUserProps> = (props) => {
  const [art, setArt] = useState(false);
  const [cooking, setCooking] = useState(false);
  const [gaming, setGaming] = useState(false);
  const [math, setMath] = useState(false);
  const [sports, setSports] = useState(false);

  const userInterest = props.person;
  const userAuth = auth.currentUser;

  useEffect(() => {
    setArt(userInterest.interests.art);
    setCooking(userInterest.interests.cooking);
    setGaming(userInterest.interests.gaming);
    setMath(userInterest.interests.math);
    setSports(userInterest.interests.sports);
  }, []);

  async function handleInterestUpdate() {
    try {
      const interestsRef = doc(db, "users", userAuth.uid);
      await updateDoc(interestsRef, {
        "interests.art": art,
        "interests.cooking": cooking,
        "interests.gaming": gaming,
        "interests.math": math,
        "interests.sports": sports,
      });
    } catch (error: any) {
      console.log(error.message, "This is the error from handleInterestUpdate");
    }
  }

  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          marginTop: 10,
          marginLeft: 10,
        }}
      >
        Interests
      </Text>
      <FilterBody style={{ flexWrap: "wrap" }}>
        <Checkbox name="Art" checked={art} onChange={setArt} />
        <Checkbox name="Cooking" checked={cooking} onChange={setCooking} />
        <Checkbox name="Gaming" checked={gaming} onChange={setGaming} />
        <Checkbox name="Math" checked={math} onChange={setMath} />
        <Checkbox name="Sports" checked={sports} onChange={setSports} />
      </FilterBody>
      <LogOutBtn onPress={handleInterestUpdate}>
        <LogOutText>Set Interests</LogOutText>
      </LogOutBtn>
    </View>
  );
};
// ----------------- END OF INTERESTS ------------------------------//

// ----------------- SETTINGS ------------------------------//
export const Settings: FC<SingleUserProps> = (props) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const user = props.person;
  const userAuth = auth.currentUser;

  const navigation = useNavigation<profileStack>();

  async function handleSubmit() {
    try {
      const settingsRef = doc(db, "users", userAuth!.uid);
      await updateDoc(settingsRef, {
        username: username,
        bio: bio,
      });
    } catch (error: any) {
      console.log(error.message, "This error is coming from handleSubmit");
    }
  }

  async function handleSignOut() {
    try {
      const user = await auth.signOut();
      if (!user) {
        navigation.navigate("LogIn");
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  useEffect(() => {
    setBio(user.bio);
    setUsername(user.username);
  }, []);

  return (
      <View
        style={{ justifyContent: "center", alignItems: "center", height: 800 }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            textAlign: "center",
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          Settings
        </Text>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Edit Username:
          </Text>
          <EditInput
            clearButtonMode="while-editing"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder={username}
            placeholderTextColor="black"
            value={username}
            onChangeText={(text) => setUsername(text)}
          ></EditInput>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Edit Bio:
          </Text>
          <EditInput
            keyboardType="twitter"
            multiline={true}
            maxLength={280}
            style={{ marginLeft: 10, textAlignVertical: "top", height: 100 }}
            clearButtonMode="while-editing"
            autoCapitalize="none"
            placeholder="Edit the bio"
            placeholderTextColor="black"
            value={bio}
            onChangeText={(text) => setBio(text)}
          ></EditInput>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <LogOutBtn onPress={handleSubmit}>
            <LogOutText>Submit</LogOutText>
          </LogOutBtn>
        </View>
        <LogOutBtn onPress={handleSignOut}>
          <LogOutText>Log Out</LogOutText>
        </LogOutBtn>
      </View>
  );
};
// ----------------- END OF SETTINGS ------------------------------//

// ---- PROFILE TABS COMPONENTS ------
const EditInput = styled.TextInput`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 10px;
  width: 250px;
`;

const FilterBody = styled.View`
  flex-direction: row;
  margin-top: 20px;
  margin: 20px;
`;

// ---------END OF PROFILE TABs---------//

// async function getUser() {
//   try {
//     const user = auth.currentUser; // getting current user = petra
//     const rivalsArr = [];
//     const userRef = doc(db, "users", user!.uid); // getting userReference
//     // Getting a user's rival list with rival's ID.
//     const userSnap = await getDoc(userRef) // use the userReference to get the document
//     userSnap.data()!.rivals.forEach(rival => {
//       rivalsArr.push(rival)
//     });
//     setRivalsID(rivalsArr)

//     const arr = []
//     // const collectionRef = collection(db, "users");
//     rivalsArr.forEach(async(rival) => {
//       const userRiv = doc(db, "users", rival)
//       const userRivDoc = await getDoc(userRiv);
//       // console.log("UserRivDoc", userRivDoc.data());
//       arr.push(userRivDoc.data())
//     })

//     setRivals(arr)

//   } catch(e) {console.log(e);}
// }

/// RIVALS =>>>>>>>>>>
// const rivals = props.rivals
// const user = auth.currentUser;
// console.log('====================================');
// // console.log("User from Auth => ", user);

// console.log("List of rivals ID=>> ", rivalsID);
// // console.log('====================================');
// console.log("Rivals List =>>>", rivals);

// GET RIVAL LIST OF IDs ----- //
// async function rivalsList(){
//   const userRef = doc(db, "users", user!.uid);
//   const userSnap = await getDoc(userRef);
//   setRivalsID(userSnap.data()!.rivals)
// }

// GET RIVALS INFORMATION ->>> //
// async function getRivals() {
//     const arr = []
//     rivalsID.forEach(async(rival) => {
//       const userRiv = doc(db, "users", rival)
//       const userRivDoc = await getDoc(userRiv);
//       arr.push(userRivDoc.data())
//     })
//     setRivals(arr)
// }

// useEffect(() => {  // UseEffect to get rivals list of IDs
//   // if(!rivalsID.length) rivalsList()
//   if(!rivalsID.length) setRivalsID(userProps.rivals)
// }, [])

// useEffect(() => { // UseEffect will only work if the rivalsId array is not empty && the rivals array is empty.
//   setRivalsID(userProps.rivals)
//   if(rivalsID && !rivals.length) getRivals()
// }, [rivalsID])
