import React, { FC, useState, useEffect } from "react";
import { Text, Alert, ScrollView, Modal, Button, View } from "react-native";
import {
  RumbleBtn,
  RumbleTxt,
  SingleRivalBox,
  RivalPFP,
  RivalName,
  ClickableRival,
} from "../components/Stylesheet";

/*
NavBar
Filtering options dropdown menu
Scrollable view of potentials rivals
- Profile picture (clickable to show profile)
- Username
- Rumble button
*/

const dummyUser = {
  username: "classroom24",
  imageUrl:
    "https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg",
  bio: "I hate zoom, I hate providing information and I especially hate answering questions. I love being vague and mysterious.",
};

const HomePageScreen: FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  return (
    <ScrollView>
      <Text>HOME</Text>
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
          <View
            style={{
              margin: 20,
              marginTop: 200,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text>Find rivals by:</Text>
            <Button title="Hide" onPress={() => setFiltersVisible(false)} />
          </View>
        </View>
      </Modal>
      <Button title="Filters" onPress={() => setFiltersVisible(true)} />
      <SingleUser />
      <SingleUser />
    </ScrollView>
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
