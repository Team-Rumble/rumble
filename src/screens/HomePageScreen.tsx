import React, { FC, useState, useEffect } from "react";
import { Alert, Modal, View, FlatList } from "react-native";
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
  onSnapshot,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as SecureStore from "expo-secure-store";
/**
 * This is the HomePage component that automatically loads when a user logs in or signs up.
 * This is where a user can challenge and match with other users to become rivals.
 *
 * @returns a full render of the Home Page, including a list of other users and a modal screen that pops up
 * options to filter interests to view other users by
 */
const HomePageScreen: FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [art, filterArt] = useState(false);
  const [cooking, filterCooking] = useState(false);
  const [gaming, filterGaming] = useState(false);
  const [math, filterMath] = useState(false);
  const [sports, filterSports] = useState(false);
  const [users, setUsers] = useState<Array<object>>([]);
  const [allUsers, setAllUsers] = useState<Array<object>>([]); //all users minus current user and users you've challenged
  const [nondisplayed, setNondisplayed] = useState<Array<string>>([]);
  const [fullbucket, setFullbucket] = useState<Array<object>>([]); // lit all the users in the dictionary
  const [loggedUserId, setLoggedUserId] = useState<string>("")

  const auth = getAuth();
  // const loggedInUser = auth.currentUser;


  const getStorage = async () => {
    let result = await SecureStore.getItemAsync("userId") || "";
    setLoggedUserId(result);
  }
  /**
   * Queries the Firestore for all users as well as the logged-in user's list of other users they've challenged
   * Updates fullbucket and nondisplayed in local state in a useEffect that runs on mount
   */
  const fetchAllUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const usersSnap = await getDocs(usersCollectionRef);
    const userRef = doc(db, "users", loggedUserId);
    const userSnap = await getDoc(userRef);
    const nondisplays = [loggedUserId];
    userSnap
      .data()!
      .rivals.forEach((userId: string) => nondisplays.push(userId));
    userSnap
      .data()!
      .pending.forEach((userId: string) => nondisplays.push(userId));
    setNondisplayed(nondisplays);
    const users: Array<object> = [];
    usersSnap.forEach((doc) => {
      // allUsers doesn't include the currently logged in user or users previously challenged
      if (!nondisplayed.includes(doc.id)) {
        users.push({ id: doc.id, ...doc.data() });
      }
    });
    setFullbucket(users);

    // STORAGE ==========================
    
  };

  // fetches all users from Firestore
  useEffect(() => {
    getStorage();
    fetchAllUsers();
  }, []);

  // listens for new users being added to the user collection
  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersCollectionRef, (allUsers) => {
      const updatedUsers: Array<object> = [];
      allUsers.forEach((doc) => {
        if (!nondisplayed.includes(doc.id)) {
          updatedUsers.push({ id: doc.id, ...doc.data() });
        }
      });
      setFullbucket(updatedUsers);
    });
    return () => unsubscribe();
  }, []);

  // removes the users who shouldn't be displayed and sets to allUsers (essentially all viable users)
  useEffect(() => {
    const users: Array<object> = [];
    fullbucket.forEach((user) => {
      if (!nondisplayed.includes(user.id)) {
        users.push(user);
      }
    });
    setAllUsers(users);
  }, [fullbucket]);

  // updates allUsers state whenever the user challenges someone new
  useEffect(() => {
    const visibleUsers: Array<object> = [];
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
              loggedInUser={loggedUserId}
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

/**
 * SingleUser component to display possible users to match with in a scrollable list
 *
 * @param props - includes the user object representing the user to display with all of their information from Firestore,
 * and three props that are passed here only to be passed down to the requestRival function to allow for matching:
 * a loggedInUser object with info from Firebase Authentication for the logged-in user, a local state setter function, and
 * and the associated local state of users that shouldn't be displayed on the Home Page for the currently logged-in user
 * @returns a React component that renders the user's username and profile picture, clickable to pull up thier bio in
 * a modal screen and a "Rumble" button which lets the logged-in user challenge them (see below)
 */

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
  loggedInUser: string;
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
              props.loggedInUser,
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

/**
 * This function handles the challenging and matching capabilities between users, updating or creating rivalry documents in the Firestore as necessary
 * and updating local state to rerender the view when a new user is challenged for the first time
 *
 * @param rivalId - the unique name for the other user's document in Firestore
 * @param rivalName - the other user's username
 * @param currentId - the uid of the logged-in user from Firebase Authentication, which doubles as the unique name for their user document in Firestore
 * @param setNons - local state's setter function for the following param
 * @param rivalsAndPending - local state, holding the IDs of all the users not to be displayed for the logged-in user (i.e. themselves and anyone they'ved matched with or already challenged)
 */
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
