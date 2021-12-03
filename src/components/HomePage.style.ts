import styled from "styled-components/native";

// color scheme variables (lightest to darkest)
const COLORS = {
  lightRed: "#EE4540",
  red: "#C72C41",
  crimson: "#801336",
  plum: "#510A32",
  purple: "#2D142C",
};

export const Header = styled.Text`
  text-align: center;
  color: ${COLORS.plum};
  font-weight: bold;
  font-size: 30px;
  margin: 20px;
`;

export const HeaderBox = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const FilterArrow = styled.TouchableOpacity`
  margin-top: auto;
  margin-bottom: auto;
`;

export const FilterHeader = styled.Text`
  text-align: center;
  font-weight: bold;
  color: ${COLORS.plum};
  font-size: 20px;
  margin-bottom: 10px;
`;

export const FilterBody = styled.View`
  flex-direction: row;
`;

export const FilterX = styled.TouchableOpacity`
  margin: auto;
  margin-left: 40px;
`;

export const MenuView = styled.View`
  margin: 20px;
  margin-top: 200px;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  align-items: center;
  box-shadow: 0px 2px 2px ${COLORS.plum};
`;

export const RumbleBtn = styled.TouchableOpacity`
  background-color: ${COLORS.purple};
  border-radius: 10px;
  padding: 10px;
  margin: auto;
`;

export const RumbleTxt = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

export const SingleRivalBox = styled.View`
  flex-direction: row;
  margin: 10px;
`;

export const RivalPFP = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border-color: ${COLORS.plum};
  border-width: 3px;
`;

export const RivalName = styled.Text`
  font-weight: bold;
  font-size: 18px;
  align-self: center;
  padding: 10px;
  color: ${COLORS.purple};
`;

// wraps rival's profile picture and username
export const ClickableRival = styled.TouchableOpacity`
  flex-direction: row;
`;

export const Interest = styled.View`
  flex-direction: row;
`;
