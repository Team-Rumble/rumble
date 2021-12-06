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
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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

/**
 * 
 * @param Rivals - Renders a list of rivals from current User.
 * @param getUser - Fetches the current user list of rival's Id and then fetches the information of each rival from that list, adding them to @param arrayOfRivals.
 * 
 */

export const Rivals: FC<SingleUserProps> = (props) => {
  const [rivalsID, setRivalsID] = useState([])
  // const rivalArr = user;  ///ERROR =>> MAPPING NEEDEDrivals
  const [rivals, setRivals] = useState<Array<object>>([])

  console.log('====================================');
  console.log("List of rivals ID=>> ", rivalsID);
  console.log('====================================');
  console.log("Rivals List =>>>", rivals);

  async function getUser() {
    try {
      const user = auth.currentUser; // getting current user = petra
      const rivalsArr = [];
      const userRef = doc(db, "users", user!.uid); // getting userReference
      // Getting a user's rival list with rival's ID.
      const userSnap = await getDoc(userRef) // use the userReference to get the document 
      userSnap.data()!.rivals.forEach(rival => { 
        rivalsArr.push(rival)
      });
      setRivalsID(rivalsArr)

      const arr = []
      // const collectionRef = collection(db, "users");
      rivalsArr.forEach(async(rival) => {
        const userRiv = doc(db, "users", rival)
        const userRivDoc = await getDoc(userRiv);
        // console.log("UserRivDoc", userRivDoc.data());
        arr.push(userRivDoc.data())
      })

      setRivals(arr)

    } catch(e) {console.log(e);}
  }

  useEffect(() => {
    getUser()
    // console.log("Rivals =>>>", rivals );
    
  }, [])

  return(
    <View>
      {(!rivals) ? (<View>
        <Text>No Rivals Yet</Text>
      </View>) : 
        rivals.map((rival) => (
          <View>
            <Text>{rival.username}</Text>
          </View>
        ))}
        <Text>RIVAL HERE!!</Text>
    </View>
  )
}

export const Interests: FC = () => {
  // const [filtersVisible, setFiltersVisible] = useState(false);
  const [art, setArt] = useState(false);
  const [cooking, setCooking] = useState(false);
  const [gaming, setGaming] = useState(false);
  const [math, setMath] = useState(false);
  const [sports, setSports] = useState(false);

  // const userInterest = props.person;

  // useEffect(() => {
  //   // fetch for firestore interests
  //   // Set the state according to the interests in firestore.

  // }, [])
  
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