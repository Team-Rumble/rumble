import styled from "styled-components/native";

// color scheme variables (lightest to darkest)

export const COLORS = {
  lightRed: "#EE4540",
  red: "#C72C41", // loading screen BG, sign-up BG
  crimson: "#801336",
  plum: "#510A32", // header navbar, log-in BG, sign-up btn
  purple: "#2D142C", // log-in btn, rumble btn
  white: "#FFFFFF",
};

// input resuable styling?
// maybe multipe navbar stylings depending on what screen you're on

// navbar

// users profile picture and name

// SignUp
export const Container = styled.KeyboardAvoidingView`
  background-color: #581845;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
export const LoginText = styled.Text`
  font-size: 35px;
  font-weight: bold;
  margin: 10px;
`;
export const Login = styled.View`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 300px;
  height: 400px;
  margin: 0 auto;
  border: 2px solid #000;
  border-radius: 20px;
  background: #eee;
`;
export const Input = styled.TextInput`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 10px;
  width: 250px;
`;
export const StyledButton = styled.TouchableOpacity`
  background: ${COLORS.crimson};
  padding: 10px;
  margin: 10px;
  width: 150px;
  border: none;
  border-radius: 10px;
`;

export const StyledButtonText = styled.Text`
  color: white;
  font-size: 20px;
  text-align: center;
`;

/* --------- SIGN UP ---------------*/
export const SignUpContainer = styled.KeyboardAvoidingView`
  margin-top: 50px;
  background-color: #eee;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SignupText = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
  color: #581845;
`;
export const Signup = styled.View`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 350px;
  border: 2px solid #000;
  border-radius: 20px;
  /* background-color: ${COLORS.purple}; */
`;
export const SignUpInput = styled.TextInput`
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 20px 10px;
  width: 250px;
  background-color: ${COLORS.white};
`;

export const RumbleSignUpButton = styled.TouchableOpacity`
  background-color: ${COLORS.white};
  border-radius: 10px;
  border: 1px solid #581845;
  padding: 10px;
  margin: auto;
  width: 130px;
`;

export const RumbleSignUpTxt = styled.Text`
  color: ${COLORS.purple};
  font-weight: bold;
  text-align: center;
  font-size: 30px;
  flex-wrap: wrap;
`;

export const BioInput = styled.TextInput`
  width: 280px;
  height: 200px;
  border: 1px solid #581845;
  border-radius: 10px;
  background-color: ${COLORS.white};
`;

// export const images = {
//   duck: '../../assets/ducky.jpeg',
//   gloves: '../../assets/boxingheart.jpeg',
//   cat: '../../assets/cat.jpeg'
// } 

export const images = {
  // DEFAULT IMAGES FOR DISPLAY
  duck:
    "https://firebasestorage.googleapis.com/v0/b/rumble-ff538.appspot.com/o/ducky.jpg?alt=media&token=84fe9eb6-8352-418e-b838-c49fbdced0aa",
  gloves:
    "https://firebasestorage.googleapis.com/v0/b/rumble-ff538.appspot.com/o/boxingheart.jpg?alt=media&token=5c16a386-0c29-4ae6-93e0-2865aa5278e6",
  cat:
    "https://firebasestorage.googleapis.com/v0/b/rumble-ff538.appspot.com/o/cat.jpg?alt=media&token=44840fb9-ff81-4f3c-9e2b-f09b82c1e2b3",
};
/* --------- END SIGN UP ---------------*/

/* --------- PROFILE SCREEN ---------------*/

export const ProfileImageContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const ProfileImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  border-width: 3px;
  border-color: ${COLORS.purple};
`;

export const ProfileMenu = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${COLORS.purple};
  margin-top: 20px;
`;

export const ProfileMenuText = styled.TouchableOpacity`
  border: 2px solid ${COLORS.white};
  padding: 8px 25px;
`;

export const MenuText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.white};
`;

export const LogOutBtn = styled.TouchableOpacity`
  background-color: ${COLORS.purple};
  border-radius: 10px;
  padding: 10px;
  margin: auto;
  margin-top: 20px;
`;

export const LogOutText = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

/* --------- END PROFILE ---------------*/

export const ReadyButton = styled.TouchableOpacity`
  background: ${COLORS.crimson};
  padding: 10px;
  width: 170px;
  border: none;
  border-radius: 30px;
  margin-top: 20px
`;

export const ReadyButtonText = styled.Text`
  color: white;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
`;

export const AreYouText = styled.Text`
  color: white;
  font-size: 40px;

`;

export const RumBleText = styled.Text`
  color: white;
  font-size: 75px;
  font-weight: bold;
`;