import React, { FC, useState, useEffect } from "react";
import { Text, View, Alert, Image, ScrollView, StyleSheet } from "react-native";
import { RumbleBtn, RumbleTxt } from "../components/Stylesheet";

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
  imageUrl: 'https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg',
  bio: "I hate zoom, I hate providing information and I especially hate answering questions. I love being vague and mysterious."
}

//Can move this later, this is just for experimenting:
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

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
      {/* <Image
        source={{
          uri: "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        }}
      /> */}
      <View>
      <Text>{dummyUser.username}</Text>
      <Image style={styles.tinyLogo}
        source={{uri:'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'}}/>
      <Text>{dummyUser.bio}</Text>
      </View>
      
      <RumbleBtn onPress={() => Alert.alert("Rumbled!")}>
        <RumbleTxt>Rumble</RumbleTxt>
      </RumbleBtn>
    </View>
  );
};

export default HomePageScreen;
