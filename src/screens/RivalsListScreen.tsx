import { addDoc, collection, collectionGroup, onSnapshot, query, QuerySnapshot, where } from "firebase/firestore";
import React, { FC, useState, useLayoutEffect, useCallback, useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import db, {auth} from '../../config/firebase';

import { RivalChatPreview,
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
const RivalsListScreen: FC = () => {
  // Lets store a list of the users rivals in state for printout
  const [rivals, setRivals] = useState<Array<object>>([]);

  // Lets utilize useEffect and onSnapshot to continuously listen for new matches.
  useEffect(() => {
    // Define the specific collection
    const collectionReference = collection(db, 'rivalries');
    // Form a specific query on that collection - if active - then two rivals have matched
    // note: modify this query to only return the current user's active rivals
    // Const user = auth.currentUser
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
        return <SingleRivalPreview key={rival.userOneID} userTwo={rival.userTwoID} />
      })}
      
    </ScrollView>
  );
};

/**
 * Display a preview of each rival chat. When clicked - will load SingleRival Chat
 * @param props contains userOneID and userTwoID
 * @returns a chat preview that when tapped will load a chat between user and specific rival
 */
const SingleRivalPreview: FC<RivalChatPreview> = (props) => {
  // could query and display last message here

  // 
  return (
    <View>
      <Text>{props.userTwo}</Text>
      <Text>{}</Text>
    </View>
    
  )
}

export default RivalsListScreen;
