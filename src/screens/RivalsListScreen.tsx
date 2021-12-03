import React, { FC, useState, useEffect } from "react";
import { Text, View, Image, ScrollView } from "react-native";

const RivalsListScreen: FC = () => {
  return (
    <ScrollView>
      <SingleRival />
      <SingleRival />
    </ScrollView>
  );
};

// props, share a styled component for pfp with homepage?
// nav to ChatScreen
const SingleRival: FC = () => {
  return (
    <View>
      <Image
        source={{
          uri: "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        }}
      />
      <Text>User Name</Text>
      <Text>Message preview text</Text>
    </View>
  );
};

export default RivalsListScreen;
