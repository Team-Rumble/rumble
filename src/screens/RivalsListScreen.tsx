import {
  doc,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import React, {
  FC,
  useState,
  useEffect,
} from "react";
import { Text, View, Image, ScrollView, Pressable, Alert } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import db, { auth } from "../../config/firebase";

import {
  RumbleBtn,
  RumbleTxt,
  SingleRivalBox,
  RivalPFP,
  RivalName,

} from "../components/HomePage.style";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/index";

type ChatStack = NativeStackNavigationProp<RootStackParamList, "RivalsList">;

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
    uid: string;
  };
}

// const user = auth.currentUser;
const userSnap: any = {};


const RivalsListScreen: FC<SingleUserProps> = () => {
  const [person, setPerson] = useState({});
  const [rivalsLength, setRivalsLength] = useState(0);
  const [rivalsID, setRivalsID] = useState([]);
  const [rivals, setRivals] = useState<Array<object>>([]);
  const navigation = useNavigation<ChatStack>();
  
  useEffect(() => {
    async function getUserInfo() {
      const currentUser = auth.currentUser;
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);
      // console.log("User Information", docSnap.data());
      
      const userInfo = docSnap.data();
      
      // console.log("Users Rivals ", userInfo.rivals);
      const rivalsArrayy = [];
      const resultFor = userInfo.rivals.forEach( async (rival) => {
         const rivalRef = doc(db, "users", rival);
        const docSnap = await getDoc(rivalRef);
        
        const rivalsInfo = docSnap.data();
        rivalsInfo["uid"] = rival;
        rivalsArrayy.push(rivalsInfo);
        setRivals([...rivalsArrayy])
        // console.log("Every Rivals=>>", rivalsArrayy);
      })
      // console.log("Result =>>", rivalsArrayy);
      return rivalsArrayy;
    };
    const result = getUserInfo()
    console.log("RIVALS =>>>", rivals);
    
  },[])

  console.log("RIVALS OUTSIDE=>>>", rivals);
  

  return (
    <ScrollView>
      <View style={{height: 1000}} >
      {(rivals.length < 1) ? (<View>
        <Text>No Rivals Yet</Text>
        </View>) : 
        rivals.map((rival, i) => (
          <SingleRivalBox key={i} >
            <RivalPFP source={{uri: rival.profileUrl}}/>
            <RivalName>{rival.username}</RivalName>
            <RumbleBtn onPress={() => navigation.navigate("Chat", rival.uid)}>
          <RumbleTxt>Chat</RumbleTxt>
        </RumbleBtn>
          </SingleRivalBox>
        ))}
      </View>
    </ScrollView>
  );
};



export default RivalsListScreen;
