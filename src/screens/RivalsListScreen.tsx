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

const RivalsListScreen: FC = () => {
  const navigation = useNavigation<ChatStack>();

  const [messages, setMessages] = useState<IMessage[]>([]);
  // can we return two rivals?
  useLayoutEffect(() => {
    const collectionRef = collection(db, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
        setMessages(
            QuerySnapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
            }))
        );
    });
    
    return unsubscribe;
}, []); // empty array or an array with props that the effect requires


const onSend = useCallback((messages = []) => {
  setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
      );
      const { _id, createdAt, text, user } = messages[0];
      addDoc(collection(db, 'chats'), {
          _id,
          createdAt,
          text,
          user
      });
}, []);

return (
  
  <GiftedChat
  messages={messages}
  showAvatarForEveryMessage={true}
  onSend={messages => onSend(messages)}
  user={{
      _id: auth?.currentUser?.email!,
      avatar: 'https://i.pravatar.cc/300'
  }}
  />
);



};



export default RivalsListScreen;
