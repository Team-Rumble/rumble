import React, { FC, useState, useEffect } from 'react';
import { KeyboardAvoidingView, View, TouchableOpacity, Text } from 'react-native';
import styled from "styled-components/native";
import {auth} from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
// useContext

interface Props {
  
}

const SignIn: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Post")
      }
    })
    return unsubscribe
  }, [])

  async function handleSignUp(){
    auth.createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:', user);
    })
    .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', );
      })
      .catch(error => alert(error.message))
  }

  return (
    <Container>

    </Container>
  )
}

export default SignIn;

const Container = styled.KeyboardAvoidingView`
  background-color: #581845;
  flex: 1;
  align-Items: center;
  justify-Content: center;
`

// Registered with: Object {
//   "_redirectEventId": undefined,
//   "apiKey": "AIzaSyC0ZfqHW3ZrkREh_xwa8ugKExh8zn37UD4",
//   "appName": "[DEFAULT]",
//   "createdAt": "1638290661503",
//   "displayName": undefined,
//   "email": "hackingintoyursystem162618171@gmail.com",
//   "emailVerified": false,
//   "isAnonymous": false,
//   "lastLoginAt": "1638290661503",
//   "phoneNumber": undefined,
//   "photoURL": undefined,
//   "providerData": Array [
//     Object {
//       "displayName": null,
//       "email": "hackingintoyursystem162618171@gmail.com",
//       "phoneNumber": null,
//       "photoURL": null,
//       "providerId": "password",
//       "uid": "hackingintoyursystem162618171@gmail.com",
//     },
//   ],
//   "stsTokenManager": Object {
//     "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmlyLXRlbXAtYzBhYzciLCJhdWQiOiJmaXItdGVtcC1jMGFjNyIsImF1dGhfdGltZSI6MTYzODI5MDY2MSwidXNlcl9pZCI6InBGcjRzVVVvelZkQ21WV0lVSWliUkxjR3VvczIiLCJzdWIiOiJwRnI0c1VVb3pWZENtVldJVUlpYlJMY0d1b3MyIiwiaWF0IjoxNjM4MjkwNjYxLCJleHAiOjE2MzgyOTQyNjEsImVtYWlsIjoiaGFja2luZ2ludG95dXJzeXN0ZW0xNjI2MTgxNzFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhhY2tpbmdpbnRveXVyc3lzdGVtMTYyNjE4MTcxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.GBSkIcYACsJd3UKP3uKo-qJsitoXUlBN8zh0CeGJeTnUvj5kDSd1rL-Ljjv1iobhjNPvE1jY-A-s19di5YQzFBIIi6QMj0VdM3yE7sFiRdD6Vjtu2qa3Zv3cw-LNLEQHcFPNqstXQ1-n0vSvWDIkJlgCAfbQKOIueE20JI-JldA-oIGm0vCS2kMnHvQNYDOvMdbY9kuKW3XRKFJlejngulIN9WeDL2NKacpuE3SXDlw3zbsLaiFPaIiLeyU9eko42GcQKBgNui72ER8blDb3IqqNc78UvMfnIfHpTr4eyLOPcDs2vjN-J_HA281u8zFB7pmqiPyPT9WiWp7Xc11LrQ",
//     "expirationTime": 1638294262393,
//     "refreshToken": "AFxQ4_ryJQTnPx8KCL3DrWwdo7Bfv4a7Q0egoE1w365iD_og6_ld-RLZ4AtIQYypmJ4y-uQCFzNNbs7PAJAfpgcZNC6bJ8Lc6SXTsdDQHjKP6Hu2cQ1XT9_6gJ3Hue1QQyiGlctDTGKPDS_IQGQMdDU0FWXLysW2Tc_CsU_UlPf3njmyMyydDiloIp8r2hWRHGa-dyDEKRK0952AvUyrd8QSKt2b69y0I9Dgmn3DrOkhWSmbj2G5nyw",
//   },
//   "tenantId": undefined,
//   "uid": "pFr4sUUozVdCmVWIUIibRLcGuos2",
// }