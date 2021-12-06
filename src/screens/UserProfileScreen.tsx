import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useState, useEffect } from "react";
import {
  Text,
  Alert,
  ScrollView,
  Modal,
  Button,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import db, { auth } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { RootStackParamList } from "../navigation";
import {
  ProfileImageContainer,
  ProfileImage,
  MenuText,
  ProfileMenu,
  ProfileMenuText,
  LogOutBtn,
  LogOutText,
} from "../components/Stylesheet";
import { Interests, Rivals, Settings } from "../components/ProfileTabs";

type profileStack = NativeStackNavigationProp<
  RootStackParamList,
  "UserProfile"
>;

const userSnap: any = {};

const UserProfileScreen: FC = () => {
  const [person, setPerson] = useState({});
  const [currentView, setCurrentView] = useState("Rivals");
  // console.log('====================================');
  // console.log(person);
  // console.log('====================================');
  async function getUserInfo(user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    return docSnap;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        userSnap["user"] = await getUserInfo(user);
        setPerson(userSnap.user.data());
        // console.log('====================================');
        // console.log(userSnap.user.data());
        // console.log('====================================');
      }
    });
    return unsubscribe;
  }, []);

  const navigation = useNavigation<profileStack>();

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
  return (
    <View>
      <ProfileImageContainer>
        <ProfileImage source={{ uri: person.profileUrl }} />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
          {person.username}
        </Text>
      </ProfileImageContainer>
      <ProfileMenu>
        <ProfileMenuText onPress={() => setCurrentView("Rivals")}>
          <MenuText>RIVALS</MenuText>
        </ProfileMenuText>
        <ProfileMenuText onPress={() => setCurrentView("Interests")}>
          <MenuText>INTERESTS</MenuText>
        </ProfileMenuText>
        <ProfileMenuText onPress={() => setCurrentView("Settings")}>
          <MenuText>SETTINGS</MenuText>
        </ProfileMenuText>
      </ProfileMenu>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 15,
          textAlign: "center",
          marginTop: -2,
          paddingVertical: 10,
          marginHorizontal: -5,
          paddingHorizontal: 10,
          borderStyle: "solid",
          borderWidth: 3,
          borderBottomColor: "#2D142C",
        }}
      >
        {person.bio}
      </Text>
      {currentView === "Rivals" ? (
        <Rivals person={person} />
      ) : currentView === "Interests" ? (<Interests person={person}/>) : (<Settings person={person}/>)}
      <LogOutBtn onPress={handleSignOut}>
        <LogOutText>Log Out</LogOutText>
      </LogOutBtn>
    </View>
  );
};

export default UserProfileScreen;
