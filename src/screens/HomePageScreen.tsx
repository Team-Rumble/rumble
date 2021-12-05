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
import { collection, getDocs } from "firebase/firestore";

const dummyUser24 = {
  id: "id",
  username: "classroom24",
  profileUrl:
    "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
  bio: "I hate zoom, I hate providing information and I especially hate answering questions. I love being vague and mysterious.",
  interests: {
    art: false,
    cooking: true,
    gaming: false,
    math: false,
    sports: true,
  },
  age: 25,
  email: "test@email.com",
};

const dummyUserShort = {
  id: "unique",
  username: "Shortstack",
  profileUrl:
    "data:image/jpeg;base64,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",
  bio: "I'm short which means all my rage is CONCENTRATED!",
  interests: {
    art: true,
    cooking: true,
    gaming: false,
    math: true,
    sports: false,
  },
  age: 25,
  email: "email@site.com",
};

const rivals = [dummyUser24, dummyUserShort];

const HomePageScreen: FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [art, filterArt] = useState(false);
  const [cooking, filterCooking] = useState(false);
  const [gaming, filterGaming] = useState(false);
  const [math, filterMath] = useState(false);
  const [sports, filterSports] = useState(false);
  const [users, setUsers] = useState([]);
  // let allUsers: Array<{
  //   id: string;
  //   username: string;
  //   profileUrl: string;
  //   bio: string;
  //   interests: object;
  //   age: number;
  //   email: string;
  // }>;
  const allUsers = [];

  const fetchAllUsers = async () => {
    const usersCollectionRef = collection(db, "users");
    const usersSnap = await getDocs(usersCollectionRef);
    usersSnap.forEach((doc) => {
      allUsers.push({ id: doc.id, ...doc.data() });
    });
  };

  // ADD INTERESTS TO ALL USERS IN DB

  useEffect(() => {
    const loadUsers = async () => {
      await fetchAllUsers();
      setUsers(allUsers);
    };
    loadUsers();
  }, []);

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
        <RumbleBtn onPress={() => Alert.alert("Rumbled!")}>
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

export default HomePageScreen;
