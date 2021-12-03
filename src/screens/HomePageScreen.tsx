import React, { FC, useState, useEffect } from "react";
import {
  Text,
  Alert,
  ScrollView,
  Modal,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
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
} from "../components/HomePage.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const dummyUser = {
  username: "classroom24",
  imageUrl:
    "https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg",
  bio: "I hate zoom, I hate providing information and I especially hate answering questions. I love being vague and mysterious.",
};

const HomePageScreen: FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <View>
      <HeaderBox>
        <Header>Filter for Rivals</Header>
        <FilterArrow onPress={() => setFiltersVisible(true)}>
          <MaterialCommunityIcons
            name="menu-down-outline"
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
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setFiltersVisible(!filtersVisible);
          }}
        >
          <View>
            <MenuView>
              <FilterHeader>Find rivals by:</FilterHeader>
              <FilterBody>
                <View>
                  <Text>Art</Text>
                  <Text>Cooking</Text>
                  <Text>Gaming</Text>
                  <Text>Math</Text>
                  <Text>Sports</Text>
                </View>
                <FilterX onPress={() => setFiltersVisible(false)}>
                  <MaterialCommunityIcons
                    name="close-box"
                    size={40}
                    color="#510A32"
                  />
                </FilterX>
              </FilterBody>
            </MenuView>
          </View>
        </Modal>
        <SingleUser />
        <SingleUser />
        <SingleUser />
        <SingleUser />
        <SingleUser />
        <SingleUser />
        <SingleUser />
        <SingleUser />
        <SingleUser />
        <SingleUser />
      </ScrollView>
    </View>
  );
};

// single user for scrollable list
// take props with user info (TS props formatting?)
const SingleUser: FC = () => {
  return (
    <SingleRivalBox>
      <ClickableRival onPress={() => Alert.alert(dummyUser.bio)}>
        <RivalPFP
          source={{
            uri: "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
          }}
        />
        <RivalName>{dummyUser.username}</RivalName>
      </ClickableRival>

      <RumbleBtn onPress={() => Alert.alert("Rumbled!")}>
        <RumbleTxt>Rumble</RumbleTxt>
      </RumbleBtn>
    </SingleRivalBox>
  );
};

export default HomePageScreen;
