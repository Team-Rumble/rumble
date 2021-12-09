import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { ReactElement } from "react";
import { View, ImageBackground } from "react-native";
import {
  AreYouText,
  ReadyButton,
  ReadyButtonText,
  RumBleText,
} from "../components/Stylesheet";
import { RootStackParamList } from "../navigation";

type loadingStack = NativeStackNavigationProp<RootStackParamList, "Loading">;

function LoadingScreen(): ReactElement {
  const navigation = useNavigation<loadingStack>();
  //      <Image style={{width: 80, height: 80}} source={require("../../assets/backgroundImage.png")}/>
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        style={{ flex: 1, justifyContent: "center" }}
        source={require("../../assets/backgroundImage.png")}
      >
        <View
          style={{
            marginTop: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AreYouText>are you ready to</AreYouText>
          <RumBleText>RUMBLE?</RumBleText>
        </View>
        <View
          style={{
            marginTop: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ReadyButton onPress={() => navigation.navigate("LogIn")}>
            <ReadyButtonText>READY!</ReadyButtonText>
          </ReadyButton>
        </View>
      </ImageBackground>
    </View>
  );
}

export default LoadingScreen;
