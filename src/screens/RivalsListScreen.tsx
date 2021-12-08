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
  // Lets store a list of the users rivals in state for printout
  const [rivals, setRivals] = useState<Array<object>>([]);

  const navigation = useNavigation<ChatStack>();

  useEffect(() => {
    const fetchRivalries = async () => {
      // Define the specific collection
      const collectionReference = collection(db, "rivalries");
      // Form a specific query on that collection - if active - then two rivals have matched
      const user = auth.currentUser;
      const q1 = query(
        collectionReference,
        where("userOneID", "==", user!.uid),
        where("active", "==", true)
      );
      const q2 = query(
        collectionReference,
        where("userTwoID", "==", user!.uid),
        where("active", "==", true)
      );
      const rivalriesArr: Array<object> = [];
      // just to see if we can get it working without listening for updates on rivalries
      const rivalriesSnap1 = await getDocs(q1);
      const rivalriesSnap2 = await getDocs(q2);
      rivalriesSnap1.forEach((doc) => {
        const rivalryObj = {
          rivalID: doc.data().userTwoID, // other user's ID from rivalry doc
          rivarly: doc.data(), // all rivalry info
          rivalInfo: {}, // left open for when we query to users collection using rivalID
        };
        rivalriesArr.push(rivalryObj);
      });
      rivalriesSnap2.forEach((doc) => {
        const rivalryObj = {
          rivalID: doc.data().userOneID, // other user's ID from rivalry doc
          rivarly: doc.data(), // all rivalry info
          rivalInfo: {}, // left open for when we query to users collection using rivalID
        };
        rivalriesArr.push(rivalryObj);
      });
      rivalriesArr.forEach(async (rivalry) => {
        const rivalRef = doc(db, "users", rivalry.rivalID);
        const rivalSnap = await getDoc(rivalRef);
        rivalry.rivalInfo = rivalSnap.data();
      });
      setRivals(rivalriesArr);
    };

    return fetchRivalries;
    // Lets utilize useEffect and onSnapshot to continuously listen for new matches.
    // form an snapshot listener in the form of a function to return so that the useEffect
    // is properly closed
    // const unsubscribe = onSnapshot(q, querySnapshot => {
    //   // set the results to our local state
    //   setRivals(
    //     querySnapshot.docs.map(doc => ({
    //       userOneID: doc.data().userOneID,
    //       userTwoID: doc.data().userTwoID
    //     }))
    //   );
    // });
    // return the function to close out this current useEffect.
    //return unsubscribe;
  }, []); // pass an empty array to prevent uncontrolled queries to firestore

  return (
    /** Print out a touchable list of the rival chats available. Pass the id's as props to create the chat. */
    <View>
      {rivals.map((rival) => (
        <SingleRivalBox key={rival.rivalID}>
          <ClickableRival
            onPress={
              () =>
                navigation.navigate("Chat", {
                  rivalID: rival.rivalID,
                }) /* route.params.rivalID in ChatScreen*/
            }
          >
            <RivalPFP source={{ uri: rival.rivalInfo.profileUrl }} />
            <RivalName>{rival.rivalInfo.username}</RivalName>
            {/* <SingleRivalPreview key={rival.rivalID} rivalry={rival} /> */}
          </ClickableRival>
        </SingleRivalBox>
      ))}
    </View>
  );
};

/**
 * Display a preview of each rival chat. When clicked - will load SingleRival Chat
 * @param props contains userOneID and userTwoID
 * @returns a chat preview that when tapped will load a chat between user and specific rival
 */
interface PreviewProps {
  rivalry: {
    rivalID: string;
    rivalry: object;
    rivalInfo: object;
  };
}
// const SingleRivalPreview: FC<RivalChatPreview> = (props) => {
// could query and display last message here
const SingleRivalPreview: FC<PreviewProps> = (props) => {
  //
  return (
    <View>
      <Text>{props.rivalry.rivalInfo.username}</Text>
    </View>
  );
};

export default RivalsListScreen;
