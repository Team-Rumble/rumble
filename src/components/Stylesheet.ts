import styled from "styled-components/native";

// color scheme variables (lightest to darkest)
const lightRed = "#EE4540";
const vibrantRed = "#C72C41"; // loading screen BG, sign-up BG
const wine = "#801336";
const medPlum = "#510A32"; // header navbar, log-in BG, sign-up btn
const darkPurple = "#2D142C"; // log-in btn, rumble btn

export const RumbleBtn = styled.Button`
  background-color: darkPurple;
  color: white;
  font-family: Verdana, sans-serif;
`;

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
  height: 300px;
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
export const StyledButton = styled.Button`
  background: green;
  color: #fff;
  padding: 10px;
  margin: 5px;
  width: 150px;
  border: none;
  border-radius: 10px;
`;
