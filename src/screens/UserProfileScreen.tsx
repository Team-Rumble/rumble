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

interface SingleUserProps {
  person: {
    id: string;
    username: string;
    profileUrl: string;
    bio: string;
    interests: {
      art: boolean,
      cooking: boolean,
      gaming: boolean,
      math: boolean,
      sports: boolean
    };
    age: number;
    email: string;
    rivals: string[];
  };
}

const userSnap: any = {};

const UserProfileScreen: FC<SingleUserProps> = () => {
  const [person, setPerson] = useState({});
  const [currentView, setCurrentView] = useState("Rivals");
  // console.log('====================================');
  // console.log("User Profile", person);
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
      }
    });
    return unsubscribe;
  }, []);

  const navigation = useNavigation<profileStack>();

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
        <Rivals />
      ) : currentView === "Interests" ? (<Interests person={person}/>) : (<Settings person={person}/>)}
    </View>
  );
};

export default UserProfileScreen;
