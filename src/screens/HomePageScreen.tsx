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
                  <CheckBox name="Art" checked={false} />
                  <CheckBox name="Cooking" checked={false} />
                  <CheckBox name="Gaming" checked={false} />
                  <CheckBox name="Math" checked={false} />
                  <CheckBox name="Sports" checked={false} />
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

interface CheckboxProps {
  name: string;
  checked: boolean;
}

const CheckBox: FC<CheckboxProps> = (props) => {
  const [checked, onChange] = useState(props.checked);

  return (
    <Interest>
      <Pressable onPress={() => onChange(!checked)}>
        {checked ? (
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={24}
            color="#801336"
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={24}
            color="#801336"
          />
        )}
      </Pressable>
      <Text>{props.name}</Text>
    </Interest>
  );
};
