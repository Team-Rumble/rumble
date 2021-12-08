import { addDoc, collection, collectionGroup, onSnapshot, query } from "firebase/firestore";
import React, { FC, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { Text, Alert, ScrollView, Modal, Button, View } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import {
  RumbleBtn,
  RumbleTxt,
  SingleRivalBox,
  RivalPFP,
  RivalName,
  ClickableRival,
} from "../components/Stylesheet";
import db, {auth} from '../../config/firebase';
// props, share a styled component for pfp with homepage?
// nav to ChatScreen
const ChatScreen: FC = () => {
  //const [messages, setMessages] = useState<Array<object>>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  // can we return two rivals?
  useLayoutEffect(() => {
    const collectionRef = collection(db, 'rivalries');
    const q = query(collectionGroup(db, 'chatlog'));

    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      setMessages(
        QuerySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          text: doc.data().text,
          createdAt: doc.data().createdAt.toDate(),
          user: doc.data().user
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages: IMessage[]) => // changed from any
        GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, 'chatlog'), {
            _id,
            createdAt,
            text,
            user
        });
}, []);

  console.log(messages);
  return (
    <GiftedChat
      messages={messages}
    />
  );
};

export default ChatScreen;