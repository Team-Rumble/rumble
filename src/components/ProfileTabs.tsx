import React, {useState} from "react";
import { Text, Alert, ScrollView, Modal, Button, View, TouchableOpacity, Image, TextInput} from "react-native";
import styled from "styled-components/native";
import { BioInput, SignUpInput } from "./Stylesheet";


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
  }

};

const interest = Object.keys(dummyUser.interests).map(function(key, index) { 
  if(dummyUser.interests[key]) return key;
}
  ).filter(int => int !== undefined)

// console.log('====================================');
// // console.log('Interests', interest);
// console.log('====================================');

export function Interests() {
  return(
  <View>
      <Text style={{fontWeight: "bold", fontSize: 25, marginTop: 10, marginLeft: 10}} >Interests</Text>
      <View style={{marginTop: 20}} >
        {interest.map(int => (
          <Text style={{margin: 20, fontSize: 15, fontWeight: 'bold'}} >{int?.toUpperCase()}</Text>
        ))}
      </View>
  </View>
  )
}

export function Settings(){
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profileUrl, setProfileUrl] = useState("")

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