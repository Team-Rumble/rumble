import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, useState, useEffect } from "react";
import { Text, Alert, ScrollView, Modal, Button, View, TouchableOpacity} from "react-native";
import { auth } from "../../config/firebase";
import {
  RumbleBtn,
  RumbleTxt,
  SingleRivalBox,
  RivalPFP,
  RivalName,
  ClickableRival,
} from "../components/HomePage.style";
import { RootStackParamList } from "../navigation";

type profileStack = NativeStackNavigationProp<RootStackParamList, "UserProfile">


const dummyUser = {
  username: "classroom24",
  age: 27,
  email: 'test@gmail.com',
  imageUrl:
    "https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg",
  bio: "I hate zoom, I hate providing information and I especially hate answering questions. I love being vague and mysterious.",
};

const UserProfileScreen: FC = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // space replace & capital first letter
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  // const [profileUrl, setProfileUrl] = useState(
  //   "" ||
  //     "https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg"
  // );

  const navigation = useNavigation<profileStack>();

  async function handleSignOut(){
    try{
      const user = await auth.signOut();
      console.log("User logged out info", user);
      if(!user) {navigation.navigate("LogIn")}
      
    }catch(error: any){
      Alert.alert(error.message)
    }
  }

    return(
        <View>
        <View></View>
        <RumbleBtn onPress={handleSignOut}>
          <RumbleTxt>Log Out</RumbleTxt>
        </RumbleBtn>
    </View>
    )
}

export default UserProfileScreen