import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import db, { auth, userRef } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/index";
import { RumbleBtn, RumbleTxt } from "../components/HomePage.style";

const images = {
  angryGirl:
    "https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg",
  angryMsn:
    "http://1.bp.blogspot.com/-1-yZXyA3oY8/VoK8n89SVOI/AAAAAAAAR2Q/tz5kFjjkQDU/s1600/brewing-anger.png",
  angryBird:
    "https://d21tktytfo9riy.cloudfront.net/wp-content/uploads/2019/01/23140919/dream_blast_icon.jpg",
};

type signUpStack = NativeStackNavigationProp<RootStackParamList, "SignUp">;

interface UserProps {
  email: string;
  password: string;
  user: undefined;
  age?: string;
}

const SignUpScreen: FC<UserProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // space replace& capital first letter
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [profileUrl, setProfileUrl] = useState(
    "" ||
      "https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg"
  );

  const navigation = useNavigation<signUpStack>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("HomePage");
      }
    });
    return unsubscribe;
  }, []);

  async function handleSignUp() {
    try {
      // Replacing spaces in typescript like in JS by using string.replace().
      email.replace(/\s/g, "");
      password.replace(/\s/g, "");
      if (handleAge()) {
        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        const user = userCredential.user;
        console.log("Registered with: ", user);
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          // password: password, // Try to sent user without password
          age: Number(age), //Sending age as a number type
          bio: bio,
          profileUrl: profileUrl,
        });
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  // handleNumber() will validate if the user is 18 or older to then be able to sign up.
  function handleAge() {
    return Number(age) >= 18
      ? true
      : Alert.alert("You still Crawling....Get out of here");
  }

  return (
    <Container {...(Platform.OS === "ios" ? { behavior: "padding" } : null)}>
      <View>
        <Signup>
          <ScrollView>
            <SignupText>Get Ready!</SignupText>
            <Input
              clearButtonMode="while-editing"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></Input>
            <Input
              clearButtonMode="while-editing"
              autoCapitalize="none"
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            ></Input>
            <View>
              <Input
                clearButtonMode="while-editing"
                keyboardType="number-pad"
                maxLength={2}
                // textContentType="oneTimeCode"
                placeholder="Age"
                value={age}
                onChangeText={(age) => setAge(age)}
              />
              <View
                style={{
                  paddingVertical: 20,
                  flex: 3,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setProfileUrl(images.angryGirl)}
                >
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 20 }}
                    source={{ uri: images.angryGirl }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setProfileUrl(images.angryMsn)}
                >
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 20 }}
                    source={{ uri: images.angryMsn }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setProfileUrl(images.angryBird)}
                >
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 20 }}
                    source={{ uri: images.angryBird }}
                  />
                </TouchableOpacity>
              </View>
              {/* <Input
                placeholder="Enter Image Url"
                value={profileUrl}
                onChangeText={(text) => setProfileUrl(text)}
              /> */}
              <BioInput
                keyboardType="twitter"
                multiline={true}
                maxLength={280}
                style={{ textAlignVertical: "top" }}
                placeholder="Enter a brief bio"
                value={bio}
                onChangeText={(text) => setBio(text)}
              />
            </View>
            <RumbleBtn
              style={{ marginTop: 20, marginBottom: 50 }}
              onPress={() =>
                Alert.alert(
                  "Alert Title",
                  "I acknowledge I will not discriminate based on the grounds of race, religion, sexual orientation, political beliefs, age, and gender. If I break this rule, I understand that I will be banned from the app permanently. Rumble is about having a good clean fight.",
                  [
                    {
                      text: "Cancel",
                      onPress: () =>
                        console.log(
                          "If you don't agree, can't Rumble my friend!"
                        ),
                      style: "cancel",
                    },
                    { text: "I Accept", onPress: handleSignUp },
                  ]
                )
              }
            >
              <RumbleTxt>Let's Rumble</RumbleTxt>
            </RumbleBtn>
          </ScrollView>
        </Signup>
      </View>
    </Container>
  );
};

export default SignUpScreen;

const Container = styled.KeyboardAvoidingView`
  background-color: #581845;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SignupText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
`;
const Signup = styled.View`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 350px;
  /* height: 350px; */
  /* margin: 0 auto; */
  border: 2px solid #000;
  border-radius: 20px;
  background: #eee;
`;
const Input = styled.TextInput`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 10px;
  width: 250px;
`;
const StyledButton = styled.TouchableOpacity`
  background: green;
  color: #fff;
  padding: 10px;
  margin: 5px;
  width: 150px;
  border: none;
  border-radius: 10px;
`;

const BioInput = styled.TextInput`
  width: 280px;
  height: 200px;
  border: 1px solid #000;
`;
