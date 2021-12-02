import styled from "styled-components/native";

// color scheme variables (lightest to darkest)

const COLORS = {
  lightRed: "#EE4540",
  red: "#C72C41", // loading screen BG, sign-up BG
  crimson: "#801336",
  plum: "#510A32", // header navbar, log-in BG, sign-up btn
  purple: "#2D142C", // log-in btn, rumble btn
};

// input resuable styling?
// maybe multipe navbar stylings depending on what screen you're on

// Home Page (rival filtering)
export const RumbleBtn = styled.TouchableOpacity`
  background-color: ${COLORS.purple};
  border-radius: 10px;
  padding: 10px;
  margin: auto;
`;
export const RumbleTxt = styled.Text`
  color: white;
  font-family: 'Roboto';
  font-weight: bold;
  text-align: center;
`;

// filtering options drop-down menu

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
  font-size: 25px;
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
  width: 150px;
`;
export const StyledButton = styled.TouchableOpacity`
  background: green;
  padding: 10px;
  margin: 5px;
  width: 150px;
  border: none;
  border-radius: 10px;
`;

export const StyledButtonText = styled.Text`
  color: white;
`;
