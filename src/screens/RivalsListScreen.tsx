import { addDoc, collection, collectionGroup, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import React, { FC, useState, useLayoutEffect, useCallback, useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import db from '../../config/firebase';


const RivalsListScreen: FC = () => {
  // Lets store a list of the users rivals in state for printout
  const [rivals, setRivals] = useState<Array<object>>([]);

  // Lets utilize useEffect and onSnapshot to continuously listen for new matches.
  useEffect(() => {
    // Define the specific collection
    const collectionReference = collection(db, 'rivalries');
    // Form a specific query on that collection - if active - then two rivals have matched
    // note: modify this query to only return the current user's active rivals
    const q = query(collectionReference, where("active", "==", true));

    // form an snapshot listener in the form of a function to return so that the useEffect
    // is properly closed
    const unsubscribe = onSnapshot(q, QuerySnapshot => {
      // set the results to our local state
      setRivals(
        QuerySnapshot.docs.map(doc => ({
          userOneID: doc.data().userOneID,
          userTwoID: doc.data().userTwoID
        }))
      );
    });

    // return the function to close out this current useEffect.
    return unsubscribe;

  }, []); // pass an empty array to prevent uncontrolled queries to firestore

  return (
    /** Print out a touchable list of the rival chats available. Pass the id's as props to create the chat. */
    <ScrollView>
      {rivals.map( rival => {
        return <Text>{rival.userOneID}</Text>
      })}
      
    </ScrollView>
  );
};

// props, share a styled component for pfp with homepage?
// nav to ChatScreen
const SingleRival: FC = () => {
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
    setMessages((previousMessages: any) =>
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

export default RivalsListScreen;
