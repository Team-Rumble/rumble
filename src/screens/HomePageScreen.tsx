import React, { FC, useState, useEffect } from "react";
import { Text, Alert, Modal, View, FlatList } from "react-native";
import {
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "../components/Checkbox";
import db from "../../config/firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const HomePageScreen: FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [art, filterArt] = useState(false);
  const [cooking, filterCooking] = useState(false);
  const [gaming, filterGaming] = useState(false);
  const [math, filterMath] = useState(false);
  const [sports, filterSports] = useState(false);
  const [users, setUsers] = useState<Array<object>>([]);
  const [allUsers, setAllUsers] = useState<Array<object>>([]);
  const [nondisplayed, setNondisplayed] = useState<Array<string>>([]);
  const [fullbucket, setFullbucket] = useState<Array<object>>([]);

  const auth = getAuth();
  const loggedInUser = auth.currentUser;

  // query Firestore for all users
  const fetchAllUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const usersSnap = await getDocs(usersCollectionRef);
    const userRef = doc(db, "users", loggedInUser!.uid);
    const userSnap = await getDoc(userRef);
    const nondisplays = [loggedInUser!.uid];
    userSnap
      .data()!
      .rivals.forEach((userId: string) => nondisplays.push(userId));
    userSnap
      .data()!
      .pending.forEach((userId: string) => nondisplays.push(userId));
    setNondisplayed(nondisplays);
    const users = [];
    usersSnap.forEach((doc) => {
      // allUsers doesn't include the currently logged in user or users previously challenged
      if (!nondisplayed.includes(doc.id)) {
        users.push({ id: doc.id, ...doc.data() });
      } // initial render showing all users, upon saving it cuts out the nondisplayed
    });
    setFullbucket(users);
  };

  // fetches all users from Firestore
  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const users = [];
    fullbucket.forEach((user) => {
      if (!nondisplayed.includes(user.id)) {
        users.push(user);
      }
    });
    setAllUsers(users);
  }, [fullbucket]);

  // updates allUsers state whenever the user challenges someone new
  useEffect(() => {
    const visibleUsers = [];
    allUsers.forEach((user) => {
      if (!nondisplayed.includes(user.id)) {
        visibleUsers.push(user);
      }
    });
    setAllUsers(visibleUsers);
  }, [nondisplayed]);

  // sets users to allUsers after Firestore fetch
  useEffect(() => {
    setUsers(allUsers);
  }, [allUsers]);

  // hides filter modal and applies the selected filters to displayed rivals
  const applyFilters = () => {
    const filters = { art, cooking, gaming, math, sports };
    setFiltersVisible(false);

    setUsers(allUsers); // reset full rivals list

    // if any filters are selected
    if (art || cooking || gaming || math || sports) {
      setUsers(
        allUsers.filter((user) => {
          for (let filter in filters) {
            // TS config? this isn't a code-breaking error but a warning
            if (filters[filter] && user.interests[filter]) return user;
          }
        })
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          style={{ flexGrow: 0, marginBottom: 85 }}
          data={users}
          renderItem={({ item }) => (
            <SingleUser
              key={item.id}
              user={item}
              loggedInUser={loggedInUser}
              setNons={setNondisplayed}
              rivalsAndPending={nondisplayed}
            />
          )}
        />
      </View>
      <HeaderBox>
        <Header>Filter for Rivals</Header>
        <FilterArrow onPress={() => setFiltersVisible(true)}>
          <MaterialCommunityIcons
            name="arrow-up-drop-circle-outline"
            size={40}
            color="white"
          />
        </FilterArrow>
      </HeaderBox>
      <Modal animationType="slide" transparent={true} visible={filtersVisible}>
        <View>
          <MenuView>
            <FilterHeader>Find rivals in:</FilterHeader>
            <FilterBody>
              <View>
                <Checkbox
                  name="Art"
                  checked={art}
                  onChange={filterArt}
                  reset={() => setUsers(allUsers)}
                />
                <Checkbox
                  name="Cooking"
                  checked={cooking}
                  onChange={filterCooking}
                  reset={() => setUsers(allUsers)}
                />
              </View>
              <View>
                <Checkbox
                  name="Gaming"
                  checked={gaming}
                  onChange={filterGaming}
                  reset={() => setUsers(allUsers)}
                />
                <Checkbox
                  name="Math"
                  checked={math}
                  onChange={filterMath}
                  reset={() => setUsers(allUsers)}
                />
              </View>
              <View>
                <Checkbox
                  name="Sports"
                  checked={sports}
                  onChange={filterSports}
                  reset={() => setUsers(allUsers)}
                />
              </View>
            </FilterBody>
            <FilterX onPress={applyFilters}>
              <MaterialCommunityIcons
                name="close-box"
                size={30}
                color="#510A32"
              />
            </FilterX>
          </MenuView>
        </View>
      </Modal>
    </View>
  );
};

// single user for scrollable list
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
  loggedInUser: any;
  setNons: (arg0: any) => void;
  rivalsAndPending: Array<object>;
}

const SingleUser: FC<SingleUserProps> = (props) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const user = props.user;

  return (
    <View>
      <SingleRivalBox>
        <ClickableRival onPress={() => setProfileVisible(true)}>
          <RivalPFP
            source={{
              uri: user.profileUrl,
            }}
          />
          <RivalName>{user.username}</RivalName>
        </ClickableRival>
        <RumbleBtn
          onPress={() =>
            requestRival(
              user.id,
              user.username,
              props.loggedInUser.uid,
              props.setNons,
              props.rivalsAndPending
            )
          }
        >
          <RumbleTxt>Rumble</RumbleTxt>
        </RumbleBtn>
      </SingleRivalBox>
      <Modal animationType="fade" transparent={true} visible={profileVisible}>
        <View>
          <MenuView>
            <RivalBioPFP
              source={{
                uri: user.profileUrl,
              }}
            />
            <RivalBioName>{user.username}</RivalBioName>
            <RivalBio>{user.bio}</RivalBio>
            <FilterX onPress={() => setProfileVisible(false)}>
              <MaterialCommunityIcons
                name="close-box"
                size={30}
                color="#510A32"
              />
            </FilterX>
          </MenuView>
        </View>
      </Modal>
    </View>
  );
};

// matching
const requestRival = async (
  rivalId: string,
  rivalName: string,
  currentId: string,
  setNons: Function,
  rivalsAndPending: Array<object>
) => {
  // query to rivalry collection to see if a doc between these two users already exists
  // if the other user has challenged you, the doc will be ordered with their ID first
  const rivalry = doc(db, "rivalries", `${rivalId}_${currentId}`);
  const snapshot = await getDoc(rivalry);
  // if doc exists, update to active
  if (snapshot.exists()) {
    await updateDoc(doc(db, "rivalries", `${rivalId}_${currentId}`), {
      active: true,
      level: 1,
      userTwoMatch: true,
    });
    // update each user doc's rival list
    await updateDoc(doc(db, "users", rivalId), {
      rivals: arrayUnion(currentId),
      pending: arrayRemove(currentId),
    });
    await updateDoc(doc(db, "users", currentId), {
      rivals: arrayUnion(rivalId),
    });
    Alert.alert("It's a match. Let's rumble!");
  } else {
    // if doc doesn't exist, create doc only marked active from currentId
    await setDoc(doc(db, "rivalries", `${currentId}_${rivalId}`), {
      active: false,
      level: 0,
      userOneID: currentId,
      userOneMatch: true,
      userTwoID: rivalId,
      userTwoMatch: false,
    });
    // update user doc to add to list of pending
    await updateDoc(doc(db, "users", currentId), {
      pending: arrayUnion(rivalId),
    });
    Alert.alert(`You've challenged ${rivalName}`);
  }
  // update nondisplays state
  setNons([...rivalsAndPending, rivalId]); //
};

export default HomePageScreen;
