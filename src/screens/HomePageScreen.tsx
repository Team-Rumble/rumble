import React from "react";
import { Text, View, Alert } from "react-native";
import { RumbleBtn, RumbleTxt } from "../components/Stylesheet";

/*
NavBar
Filtering options dropdown menu
Scrollable view of potentials rivals
- Profile picture (clickable to show profile)
- Username
- Rumble button
*/

const HomePageScreen = () => {
  return (
    <View>
      <Text>THIS IS HOME PAGE Y'aLLL!!!</Text>
      <RumbleBtn onPress={() => Alert.alert("Rumbled!")}>
        <RumbleTxt>Rumble</RumbleTxt>
      </RumbleBtn>
    </View>
  );
};

export default HomePageScreen;
