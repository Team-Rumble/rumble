import React, { FC, useState, useEffect } from "react";
import {
  View,
  Alert,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import db, { auth } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/index";
import {SignUpContainer, SignUpInput, Signup, SignupText, RumbleSignUpButton, RumbleSignUpTxt, BioInput, images} from "../components/Stylesheet"

type signUpStack = NativeStackNavigationProp<RootStackParamList, "SignUp">;

// interface UserProps {
//   email: string;
//   password: string;
//   // user: undefined;
//   age?: string;
// }

const SignUpScreen: FC = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // space replace & capital first letter
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
        Alert.alert(
          "Alert Title",
          "I acknowledge I will not discriminate based on the grounds of race, religion, sexual orientation, political beliefs, age, and gender. If I break this rule, I understand that I will be banned from the app permanently. Rumble is about having a good clean fight.",
          [
            {
              text: "Cancel",
              onPress: () =>
                Alert.alert(
                  "If you don't agree, can't Rumble my friend!"
                ),
              style: "cancel",
            },
            { text: "I Accept", onPress: async () => {
              const userCredential = await auth.createUserWithEmailAndPassword(
                email,
                password
              );
      
              const user = userCredential.user;
              console.log("Registered with: ", user);
              await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                // password: password, // Try to sent user without password
                age: Number(age), //Sending age as a number type
                bio: bio,
                profileUrl: profileUrl,
              });
            }},
          ]
        )
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
    <SignUpContainer {...(Platform.OS === "ios" ? { behavior: "padding" } : null)}>
      <View>
        {/* <Signup> */}
          <ScrollView>
            <SignupText>Get Ready!</SignupText>
            <SignUpInput
              clearButtonMode="while-editing"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            ></SignUpInput>
            <SignUpInput
              clearButtonMode="while-editing"
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></SignUpInput>
            <SignUpInput
              clearButtonMode="while-editing"
              autoCapitalize="none"
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            ></SignUpInput>
            <View>
              <SignUpInput
                clearButtonMode="while-editing"
                keyboardType="number-pad"
                maxLength={2}
                placeholder="Age"
                value={age}
                onChangeText={(age) => setAge(age)}
              />
  
              {/* Displaying (3) default profile images */}
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
                  onPress={() => setProfileUrl(images.angryBaby)}
                >
                  <Image
                    style={{ width: 80, height: 80, borderRadius: 20 }}
                    source={{ uri: images.angryBaby }}
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
              {/* --------- END profile images ------------------ */}

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
            <RumbleSignUpButton
              style={{ marginTop: 20, marginBottom: 50 }}
              onPress={handleSignUp}
            >
              <RumbleSignUpTxt>Let's Rumble</RumbleSignUpTxt>
            </RumbleSignUpButton>
          </ScrollView>
        {/* </Signup> */}
      </View>
    </SignUpContainer>
  );
};

export default SignUpScreen;


