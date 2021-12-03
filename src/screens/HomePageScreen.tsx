import React, { FC, useState, useEffect } from "react";
import { Text, Alert, ScrollView, Modal, View, Pressable } from "react-native";
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
  Interest,
  InterestText,
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
  const [art, filterArt] = useState(false);
  const [cooking, filterCooking] = useState(false);
  const [gaming, filterGaming] = useState(false);
  const [math, filterMath] = useState(false);
  const [sports, filterSports] = useState(false);

  // filter list of rivals by state filter settings
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
        >
          <View>
            <MenuView>
              <FilterHeader>Find rivals in:</FilterHeader>
              <FilterBody>
                <View>
                  <CheckBox name="Art" checked={art} onChange={filterArt} />
                  <CheckBox
                    name="Cooking"
                    checked={cooking}
                    onChange={filterCooking}
                  />
                </View>
                <View>
                  <CheckBox
                    name="Gaming"
                    checked={gaming}
                    onChange={filterGaming}
                  />
                  <CheckBox name="Math" checked={math} onChange={filterMath} />
                </View>
                <View>
                  <CheckBox
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

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (arg0: boolean) => void;
}

const CheckBox: FC<CheckboxProps> = (props) => {
  return (
    <Interest>
      <Pressable onPress={() => props.onChange(!props.checked)}>
        {props.checked ? (
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={25}
            color="#801336"
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={25}
            color="#801336"
          />
        )}
      </Pressable>
      <Pressable onPress={() => props.onChange(!props.checked)}>
        <InterestText>{props.name}</InterestText>
      </Pressable>
    </Interest>
  );
};
