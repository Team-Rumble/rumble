import React, {FC, useState} from "react";
import { Text, Alert, ScrollView, Modal, Button, View, TouchableOpacity, Image, TextInput} from "react-native";
import styled from "styled-components/native";
import Checkbox from "./Checkbox";
import { BioInput, SignUpInput } from "./Stylesheet";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import db from "../../config/firebase";



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

const interest = Object.keys(dummyUser.interests).map(function(key, index) { 
  if(dummyUser.interests[key]) return key;
}
  ).filter(int => int !== undefined)

// console.log('====================================');
// // console.log('Interests', interest);
// console.log('====================================');
interface SingleUserProps {
  user: {
    id: string;
    username: string;
    profileUrl: string;
    bio: string;
    interests: object;
    age: number;
    email: string;
  };
}

export const Rivals: FC<SingleUserProps> = (props) => {
  const user = props.person;
  const rivalsArr = props.person.rivals;
  const [rivals, setRivals] = useState([])
  console.log('====================================');
  console.log(rivalsArr);
  console.log('====================================');
  console.log('====================================');
  console.log(user);
  console.log('====================================');

  return(
    <View>
    </View>
  )
}

export const Interests: FC<SingleUserProps> = (props) => {
  // const [filtersVisible, setFiltersVisible] = useState(false);
  const [art, filterArt] = useState(false);
  const [cooking, filterCooking] = useState(false);
  const [gaming, filterGaming] = useState(false);
  const [math, filterMath] = useState(false);
  const [sports, filterSports] = useState(false);
  const userInterest = props.person;
  
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
          onChange={filterArt}
          reset={() => alert("Reseting")}
        />
        <Checkbox
          name="Cooking"
          checked={cooking}
          onChange={filterCooking}
          reset={() => alert("Reseting")}
        />
        <Checkbox
          name="Gaming"
          checked={gaming}
          onChange={filterGaming}
          reset={() => alert("Reseting")}
        />
        <Checkbox
          name="Math"
          checked={math}
          onChange={filterMath}
          reset={() => alert("Reseting")}
        />
        <Checkbox
          name="Sports"
          checked={sports}
          onChange={filterSports}
          reset={() => alert("Reseting")}
        />
      </FilterBody>
  </View>
  )
}

export const Settings: FC<SingleUserProps> = (props) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileUrl, setProfileUrl] = useState("")
  const user = props.person;
  console.log('====================================');
  console.log("Props on Settings", user);
  console.log('====================================');

  return(
    <View>
      <Text style={{fontWeight: "bold", fontSize: 25, textAlign: "center", marginTop: 10, marginLeft: 10}} >Settings</Text>
      <EditInput
      clearButtonMode="while-editing"
      autoCapitalize="none"
      keyboardType="email-address"
      placeholder="Username"
      placeholderTextColor="black"
      value={username}
      onChangeText={(text) => setUsername(text)}
      >
      </EditInput>
      <Button title="Edit" />
      <EditInput
      keyboardType="twitter"
      multiline={true}
      maxLength={280}
      style={{ marginLeft: 10 ,textAlignVertical: "top" }}
      clearButtonMode="while-editing"
      autoCapitalize="none"
      placeholder="Edit the bio"
      placeholderTextColor="black"
      value={bio}
      onChangeText={(text) => setBio(text)}
      ></EditInput>
      <EditInput 
          clearButtonMode="while-editing"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Edit profile picture"
          placeholderTextColor="black"
          value={profileUrl}
          onChangeText={(text) => setProfileUrl(text)}
       ></EditInput>
    </View>
  )
}


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