import React, { FC, useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity, Text, Alert } from 'react-native';
import styled from "styled-components/native";
import db, {auth, userRef} from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';


type signUpStack = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUpScreen () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [bio, setBio] = useState('');
    const [profileUrl, setProfileUrl] = useState( '' || 'https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg');

    const navigation = useNavigation<signUpStack>();
  // console.log(auth);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("HomePage")
      }
    })
    return unsubscribe
  }, [])

    async function handleSignUp() {
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(email, password);

           const user = userCredential.user;
          console.log('Registered with: ', user);
          await setDoc(doc(db, "users", user.uid), {
              email: email,
              password: password
          });
        } catch (error: any) {
              Alert.alert(error.message);
        }
    };
  return (
    <Container>
      <View>
        <Signup>
          <SignupText>Get Ready!</SignupText>
          <Input placeholder='Email' value={email} onChangeText={text => setEmail(text)} ></Input>
          <Input placeholder='Password' value={password} onChangeText={text => setPassword(text)} secureTextEntry ></Input>

          <StyledButton title='Register' onPress={handleSignUp} ></StyledButton>
        </Signup>
      </View>
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView`
  background-color: #581845;
  flex: 1;
  align-Items: center;
  justify-Content: center;
`

const SignupText = styled.Text`
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
`
const Signup = styled.View`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: 2px solid #000;
  border-radius: 20px;
  background: #eee;
`
const Input = styled.TextInput`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 10px;
  width: 150px;
`
const StyledButton = styled.Button`
  background: green;
  color: #fff;
  padding: 10px;
  margin: 5px;
  width: 150px;
  border: none;
  border-radius: 10px;
`