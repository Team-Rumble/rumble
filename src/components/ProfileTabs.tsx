import React, {FC, useState, useEffect} from "react";
import { Text, Alert, ScrollView, Modal, Button, View, TouchableOpacity, Image, TextInput} from "react-native";
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
import { doc, getDoc } from "firebase/firestore";
import db, { auth } from "../../config/firebase";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";



const dummyUser = {
  username: "classroom24",
  age: 27,
  email: 'test@gmail.com',
  profileUrl:
    "https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg",
  bio: "I hate zoom, I hate providing information and I especially hate answering questions. I love being vague and mysterious.",
  interests: {
    art: false,
    cooking: true,
    gaming: true,
    math: true,
    sports: true
  },
  rivals: []

};

type profileStack = NativeStackNavigationProp<
  RootStackParamList,
  "UserProfile"
>;

// const interest = Object.keys(dummyUser.interests).map(function(key, index) { 
//   if(dummyUser.interests[key]) return key;
// }
//   ).filter(int => int !== undefined)

interface SingleUserProps {
  person: {
    id: string;
    username: string;
    profileUrl: string;
    bio: string;
    interests: object;
    age: number;
    email: string;
    rivals: string[];
  };
}
const rivalsT: any = {};

export const Rivals: FC<SingleUserProps> = (props) => {
  // const [user, setUser] = useState({})
  // const rivalArr = user;  ///ERROR =>> MAPPING NEEDEDrivals
  // const [rivals, setRivals] = useState([])
  console.log('====================================');
  // console.log("RIvals ARR=>> ", rivals);
  console.log('====================================');
  const arrayOfRivals = [];
  async function getUser() {
    const user = auth.currentUser;
    const rivalsArr = [];
    const userRef = doc(db, "users", user!.uid);
    // Getting a user's rival list with rival's ID.
    const userSnap = await getDoc(userRef)
    userSnap.data()!.rivals.forEach(rival => {
      rivalsArr.push(rival)
    }
      )

    // getting an array with all rivals information in it as an object
    
    rivalsArr.forEach(async(rival) => {
      const userRival = doc(db, "users", rival);
      const rivalSnap = await getDoc(userRival);
      arrayOfRivals.push(rivalSnap.data())
      console.log('====================================');
      console.log("RivalsSNAP =>>", arrayOfRivals);
      console.log('====================================');
    })
    // setRivals(arrayOfRivals);
  }

  useEffect(() => {
    getUser();
  }, [])
  

  return(
    <View>
      {(!arrayOfRivals) ? (<View>
        <Text>No Rivals Yet</Text>
      </View>) : (<View>
        {arrayOfRivals.map(rival => (
          <View>
            <Text>{rival.username}</Text>
          </View>
        ))}
    </View>) }
    </View>
  )
}

export const Interests: FC<SingleUserProps> = (props) => {
  // const [filtersVisible, setFiltersVisible] = useState(false);
  const [art, setArt] = useState(false);
  const [cooking, setCooking] = useState(false);
  const [gaming, setGaming] = useState(false);
  const [math, setMath] = useState(false);
  const [sports, setSports] = useState(false);

  const userInterest = props.person;

  useEffect(() => {
    // fetch for firestore interests
    // Set the state according to the interests in firestore.

  }, [])
  
  // Add a button that will "Set Interests" to set them all at once instead of one by one.
   
  return(
  <View>
      <Text style={{fontWeight: "bold", fontSize: 25, marginTop: 10, marginLeft: 10}} >Interests</Text>
      <FilterBody style={{flexWrap: "wrap"}} >
        {/* {interest.map(int => (
          <Text style={{margin: 20, fontSize: 15, fontWeight: 'bold'}} >{int?.toUpperCase()}</Text>
        ))} */}
        <Checkbox
          name="Art"
          checked={art}
          onChange={setArt}
        />
        <Checkbox
          name="Cooking"
          checked={cooking}
          onChange={setCooking}
        />
        <Checkbox
          name="Gaming"
          checked={gaming}
          onChange={setGaming}
        />
        <Checkbox
          name="Math"
          checked={math}
          onChange={setMath}
        />
        <Checkbox
          name="Sports"
          checked={sports}
          onChange={setSports}
        />
      </FilterBody>
      <LogOutBtn onPress={() => alert("Setting Interests") }>
        <LogOutText>Set Interests</LogOutText>
      </LogOutBtn>
  </View>
  )
}

export const Settings: FC<SingleUserProps> = (props) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileUrl, setProfileUrl] = useState("")
  const user = props.person;
  // console.log('====================================');
  // console.log("Props on Settings", user);
  // console.log('====================================');
  
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

  return(
    <View>
      <ScrollView>
      <Text style={{fontWeight: "bold", fontSize: 25, textAlign: "center", marginTop: 10, marginLeft: 10}} >Settings</Text>
      <View style={{flexDirection: "row", marginTop: 30}} >
      <EditInput
      clearButtonMode="while-editing"
      autoCapitalize="none"
      keyboardType="email-address"
      placeholder={user.username}
      placeholderTextColor="black"
      value={username}
      onChangeText={(text) => setUsername(text)}
      >
      </EditInput>
      <TouchableOpacity style={{backgroundColor: "#2D142C", width: 40, borderRadius: 5,height: 30, paddingHorizontal: 5, alignItems: "center", paddingTop: 5}} onPress={() => alert("Editing")} >
        <Text style={{color: "white"}} >Edit</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      <EditInput
      keyboardType="twitter"
      multiline={true}
      maxLength={280}
      style={{ marginLeft: 10 ,textAlignVertical: "top", height: 100}}
      clearButtonMode="while-editing"
      autoCapitalize="none"
      placeholder="Edit the bio"
      placeholderTextColor="black"
      value={bio}
      onChangeText={(text) => setBio(text)}
      ></EditInput>
      <TouchableOpacity style={{backgroundColor: "#2D142C", width: 40, borderRadius: 5,height: 30, paddingHorizontal: 5, alignItems: "center", paddingTop: 5}} onPress={() => alert("Editing")} >
        <Text style={{color: "white"}} >Edit</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row"}}>
      </View>
      <LogOutBtn onPress={handleSignOut}>
        <LogOutText>Log Out</LogOutText>
      </LogOutBtn>
      </ScrollView>
    </View>
  )
}


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

// ---------END OF PROFILE TABs---------