import {
  addDoc,
  collection,
  collectionGroup,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
  doc,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import React, {
  FC,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import { Text, View, Image, ScrollView, Pressable, Alert } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import db, { auth } from "../../config/firebase";

import {
  RivalChatPreview,
  MenuView,
  RumbleBtn,
  RumbleTxt,
  SingleRivalBox,
  RivalPFP,
  RivalName,
  ClickableRival,
  Header,
  HeaderBox,
  FilterArrow,
  FilterHeader,
  FilterBody,
  FilterX,
  RivalBio,
  RivalBioPFP,
  RivalBioName,
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

  // console.log("PERSON =>>>>", rivals);
  

  async function getUserInfo(user) {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    return docSnap;
  };

  async function getRivals() {
    const arr = []
    rivalsID.forEach(async(rival) => {
      const userRiv = doc(db, "users", rival)
      const userRivDoc = await getDoc(userRiv);
      const RivalUser = userRivDoc.data();
      RivalUser["uid"] = rival; 
      // console.log("RIVAL USER ", RivalUser);
      
      arr.push(RivalUser)
    })
    setRivals(arr)
  };

  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        userSnap["user"] = await getUserInfo(user);
        setPerson(userSnap.user.data());
        setRivalsID(userSnap.user.data().rivals)
      }
    });
    return unsubscribe;
  }, [person]);

  useEffect(() => { // UseEffect will only work if the rivalsId array is not empty && the rivals array is empty.
    // setRivalsID(userProps.rivals)
    if(rivalsID && !rivals.length) getRivals()
  }, [rivalsID]);

  return (
    <ScrollView>
      <View style={{height: 1000}} >
      {(!rivals) ? (<View>
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

//   const [messages, setMessages] = useState<IMessage[]>([]);
//   // can we return two rivals?
//   useLayoutEffect(() => {
//     const collectionRef = collection(db, 'chats');
//     const q = query(collectionRef, orderBy('createdAt', 'desc'));

//     const unsubscribe = onSnapshot(q, QuerySnapshot => {
//         setMessages(
//             QuerySnapshot.docs.map(doc => ({
//                 _id: doc.data()._id,
//                 createdAt: doc.data().createdAt.toDate(),
//                 text: doc.data().text,
//                 user: doc.data().user
//             }))
//         );
//     });
    
//     return unsubscribe;
// }, []); // empty array or an array with props that the effect requires


// const onSend = useCallback((messages = []) => {
//   setMessages(previousMessages =>
//       GiftedChat.append(previousMessages, messages)
//       );
//       const { _id, createdAt, text, user } = messages[0];
//       addDoc(collection(db, 'chats'), {
//           _id,
//           createdAt,
//           text,
//           user
//       });
// }, []);

// ============================================
// Gifted Chat commented code
// <GiftedChat
// messages={messages}
// showAvatarForEveryMessage={true}
// onSend={messages => onSend(messages)}
// user={{
//     _id: auth?.currentUser?.email!,
//     avatar: 'https://i.pravatar.cc/300'
// }}
// />