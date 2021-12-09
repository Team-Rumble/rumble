import { addDoc, collection, collectionGroup, onSnapshot, orderBy, query } from "firebase/firestore";
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

interface ChatScreenProps {
  rivalUID: string;
}
const ChatScreen: FC<ChatScreenProps> = ({navigation, route}) => {
  
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { rivalUID, profileUrl }  = route.params;
  
  const currentUser = auth.currentUser;
  console.log("Route: ", route.params);
    /**
     * will retrieve old messages from the firestore database.
     */
     useLayoutEffect(() => {

      const collectionRef = collection(db, "individualChats", `${roomName}`, "chatlog");
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
      
      return () => unsubscribe();
  }, []); // empty array or an array with props that the effect requires
  /**
   * Will send a message to the firestore
   */
  const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
          );
          const { _id, createdAt, text, user } = messages[0];
        // addDoc(collection(database, 'individualChats'), {
          addDoc(collection(db, "individualChats", `${roomName}`, "chatlog"), {
              _id,
              createdAt,
              text,
              user
          }
          );
  }, [roomName]);

  let roomName = 'chat_' + (currentUser!.uid < rivalUID ? currentUser!.uid +'_'+ rivalUID : rivalUID +'_'+ currentUser!.uid);
  return (
    <GiftedChat
    messages={messages}
    showAvatarForEveryMessage={true}
    onSend={messages => onSend(messages)}
    user={{
        _id: auth?.currentUser?.email!,
        avatar: profileUrl
    }}
    />
  );
};

export default ChatScreen;