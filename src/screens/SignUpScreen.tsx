import React, { FC, useState, useEffect } from "react";
import {
  View,
  Alert,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/index";
import {
  SignUpContainer,
  SignUpInput,
  SignupText,
  RumbleSignUpButton,
  RumbleSignUpTxt,
  BioInput,
  images,
  COLORS,
  BackBtn,
  BackTxt,
} from "../components/Stylesheet";
import { createUserWithEmailAndPassword } from "firebase/auth";

type signUpStack = NativeStackNavigationProp<RootStackParamList, "SignUp">;

const SignUpScreen: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // space replace & capital first letter
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [profileUrl, setProfileUrl] = useState("" || images.gloves);

  const navigation = useNavigation<signUpStack>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("UserProfile");
      }
    });
    return unsubscribe;
  }, []);

  async function handleSignUp() {
    try {
      // Replacing spaces in typescript like in JS by using string.replace().t
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
                Alert.alert("If you don't agree, can't Rumble my friend!"),
              style: "cancel",
            },
            {
              text: "I Accept",
              onPress: async () => {
                const userCredential =
                  await createUserWithEmailAndPassword(auth, email, password);

                const user = userCredential.user;
                console.log("Registered with: ", user);
                await setDoc(doc(db, "users", user.uid), {
                  username: username,
                  email: email,
                  // password: password, // Try to sent user without password
                  age: Number(age), //Sending age as a number type
                  bio: bio,
                  profileUrl: profileUrl,
                  interests: {
                    art: true,
                    cooking: true,
                    gaming: true,
                    math: true,
                    sports: true,
                  },
                  rivals: [],
                  pending: [],
                });
              },
            },
          ]
        );
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }

  // handleNumber() will validate if the user is 18 or older to then be able to sign up.
  function handleAge() {
    return Number(age) >= 18
      ? true
      : Alert.alert("You must be 18 years or older to use Rumble.");
  }

  return (
    <SignUpContainer
      {...(Platform.OS === "ios" ? { behavior: "padding" } : null)}
    >
      <ScrollView>
        <BackBtn onPress={() => navigation.navigate("LogIn")}>
          <BackTxt>Back to Login</BackTxt>
        </BackBtn>

        <View style={{ paddingHorizontal: 50 }}>
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 20,
                  backgroundColor: COLORS.purple,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, borderRadius: 20 }}
                  source={{ uri: profileUrl }}
                />
              </View>
            </View>
            {/* -------- Start of Images ---------- */}
            <View
              style={{
                marginTop: -30,
                paddingVertical: 20,
                flex: 3,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => setProfileUrl(images.duck)}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 20 }}
                  source={{ uri: images.duck }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setProfileUrl(images.gloves)}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 20 }}
                  source={{ uri: images.gloves }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setProfileUrl(images.cat)}>
                <Image
                  style={{ width: 70, height: 70, borderRadius: 20 }}
                  source={{ uri: images.cat }}
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
        </View>
      </ScrollView>
    </SignUpContainer>
  );
};

export default SignUpScreen;
