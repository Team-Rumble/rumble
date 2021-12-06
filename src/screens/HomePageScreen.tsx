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
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const HomePageScreen: FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [art, filterArt] = useState(false);
  const [cooking, filterCooking] = useState(false);
  const [gaming, filterGaming] = useState(false);
  const [math, filterMath] = useState(false);
  const [sports, filterSports] = useState(false);
  // TypeScript would prefer these [] to be something a little more
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const auth = getAuth();

  // once we figure out exactly what all the fields in the user doc will be
  // we should make an interface for that object to use when defining all these users arrays

  const fetchAllUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const usersSnap = await getDocs(usersCollectionRef);
    const users = [];
    const loggedInUser = auth.currentUser;
    usersSnap.forEach((doc) => {
      // allUsers doesn't include the currently logged in user
      if (doc.id !== loggedInUser!.uid) {
        users.push({ id: doc.id, ...doc.data() });
      }
    });
    setAllUsers(users);
  };

  useEffect(() => {
    const loadUsers = async () => {
      await fetchAllUsers();
      setUsers(allUsers);
    };
    loadUsers();
    // initial render doesn't load DB users, only rivals placeholder
    // but once you start filtering, it shows the real DB
    // this is because useEffect doesn't inherently rerender the view
    // rerenders only happen when state changes - i.e. the setUsers(allUsers) in applyFilters function
  }, []); // if I pass allUsers as the dependecy array, I lose filtering ability

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
          renderItem={({ item }) => <SingleUser key={item.id} user={item} />}
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
        <RumbleBtn onPress={() => Alert.alert(`Rumbled ${user.username}!`)}>
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

const requestRival = async (rivalId: string, currentId: string) => {
  // query to rivalry collection to see if a doc between these two users already exists
  const rivalriesRef = collection(db, "rivalries");
  let relationship = {};
  const rivalry = query(
    rivalriesRef,
    // rivlary ID could be rivalId_currentId OR currentId_rivalId
    where("id", "in", [`${rivalId}_${currentId}`, `${currentId}_${rivalId}`])
  );
  // if doc exists, update to active
  if (rivalry) {
    const snapshot = await getDocs(rivalry);
    snapshot.forEach((doc) => {
      relationship = doc.data();
    });
    // update goes here
  } else {
    // if doc doesn't exist, create doc only marked active from currentId
  }
};

export default HomePageScreen;
