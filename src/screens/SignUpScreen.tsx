import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  ScrollView,
  Platform
} from "react-native";
import styled from "styled-components/native";
import db, {auth, userRef} from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/index';

type signUpStack = NativeStackNavigationProp<RootStackParamList, "SignUp">;

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;
      console.log("Registered with: ", user);
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        password: password,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  }
  return (
    <Container behavior={Platform.OS === "ios" ? "padding": "height"}>
      <View>
        <Signup>
          <ScrollView>
            <SignupText>Get Ready!</SignupText>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></Input>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            ></Input>
            <StyledButton
              title="Register"
              onPress={handleSignUp}
            ></StyledButton>
            <View>
              <Input
                placeholder="Age"
                value={age}
                onChangeText={(num) => {
                  Number(num) >= 18
                    ? setAge(num)
                    : Alert.alert("You still crawling.....GET OUT OF HERE!");
                }}
              />
              <Input
                placeholder="Enter Image Url"
                value={profileUrl}
                onChangeText={(text) => setProfileUrl(text)}
              />
              <BioInput
                multiline={true}
                style={{ textAlignVertical: "top" }}
                placeholder="Enter a brief bio"
                value={bio}
                onChangeText={(text) => setBio(text)}
              />
            </View>
          </ScrollView>
        </Signup>
      </View>
    </Container>
  );
}

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
const StyledButton = styled.Button`
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
