import styled from "styled-components/native";

// color scheme variables (lightest to darkest)

const COLORS = {
  lightRed: "#EE4540",
  red: "#C72C41", // loading screen BG, sign-up BG
  crimson: "#801336",
  plum: "#510A32", // header navbar, log-in BG, sign-up btn
  purple: "#2D142C", // log-in btn, rumble btn
  white: "#FFFFFF"
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
  background: green;
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

export const images = {  // DEFAULT IMAGES FOR DISPLAY
  angryGirl:
    "https://www.news.ucsb.edu/sites/default/files/images/2014/angry%20face.jpg",
  angryBaby:
    "https://i.pinimg.com/474x/d6/c3/fe/d6c3fef25a327db1b138dbca81d4771b.jpg",
  angryBird:
    "https://d21tktytfo9riy.cloudfront.net/wp-content/uploads/2019/01/23140919/dream_blast_icon.jpg",
};
/* --------- END SIGN UP ---------------*/
