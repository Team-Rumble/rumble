import React, { FC, useState, useEffect } from "react";
import { Text, Alert, ScrollView, Modal, View } from "react-native";
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

// we will probably want to use FlatList to render the rival list, because it could be a very long list
// possibility of putting filtering menu buttom at bottom of screen not top? (icon down instead of up)

const dummyUser = {
  username: "classroom24",
  imageUrl:
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
};

const HomePageScreen: FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [art, filterArt] = useState(false);
  const [cooking, filterCooking] = useState(false);
  const [gaming, filterGaming] = useState(false);
  const [math, filterMath] = useState(false);
  const [sports, filterSports] = useState(false);

  const rivals = [
    dummyUser,
    dummyUser,
    dummyUser,
    dummyUser,
    dummyUser,
    dummyUser,
    dummyUser,
    dummyUser,
    dummyUser,
    dummyUser,
  ];

  // filter list of rivals by state filter settings
  return (
    <View>
      <HeaderBox>
        <Header>Filter for Rivals</Header>
        <FilterArrow onPress={() => setFiltersVisible(true)}>
          <MaterialCommunityIcons
            name="arrow-down-drop-circle-outline"
            size={40}
            color="#510A32"
          />
        </FilterArrow>
      </HeaderBox>
      <ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={filtersVisible}
        >
          <View>
            <MenuView>
              <FilterHeader>Find rivals in:</FilterHeader>
              <FilterBody>
                <View>
                  <Checkbox name="Art" checked={art} onChange={filterArt} />
                  <Checkbox
                    name="Cooking"
                    checked={cooking}
                    onChange={filterCooking}
                  />
                </View>
                <View>
                  <Checkbox
                    name="Gaming"
                    checked={gaming}
                    onChange={filterGaming}
                  />
                  <Checkbox name="Math" checked={math} onChange={filterMath} />
                </View>
                <View>
                  <Checkbox
                    name="Sports"
                    checked={sports}
                    onChange={filterSports}
                  />
                </View>
              </FilterBody>
              <FilterX onPress={() => setFiltersVisible(false)}>
                <MaterialCommunityIcons
                  name="close-box"
                  size={30}
                  color="#510A32"
                />
              </FilterX>
            </MenuView>
          </View>
        </Modal>
        {rivals.map((rival, idx) => (
          <SingleUser key={idx} user={rival} />
        ))}
      </ScrollView>
    </View>
  );
};

// single user for scrollable list

interface SingleUserProps {
  user: {
    username: string;
    imageUrl: string;
    bio: string;
    interests: object;
    age: number;
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
              uri: user.imageUrl,
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
                uri: user.imageUrl,
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
