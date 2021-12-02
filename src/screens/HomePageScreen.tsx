import React, { FC, useState, useEffect } from "react";
import { Text, View, Alert, Image, ScrollView } from "react-native";
import { RumbleBtn, RumbleTxt } from "../components/Stylesheet";

/*
NavBar
Filtering options dropdown menu
Scrollable view of potentials rivals
- Profile picture (clickable to show profile)
- Username
- Rumble button
*/

const HomePageScreen: FC = () => {
  return (
    <ScrollView>
      <Text>HOME</Text>
      <SingleUser />
      <SingleUser />
    </ScrollView>
  );
};

// dropdown menu - could maybe live in its own file?
// Does it come down from the Navbar component?
const Filters: FC = () => {
  // checkbox community package?
  return <Text>Placeholder</Text>;
};

// single user for scrollable list
// take props with user info (TS props formatting?)
const SingleUser: FC = () => {
  return (
    <View>
      <Image
        source={{
          uri: "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        }}
      />
      <Text>User Name</Text>
      <RumbleBtn onPress={() => Alert.alert("Rumbled!")}>
        <RumbleTxt>Rumble</RumbleTxt>
      </RumbleBtn>
    </View>
  );
};

export default HomePageScreen;
