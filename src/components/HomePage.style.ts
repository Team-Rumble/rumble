import styled from "styled-components/native";

// color scheme variables (lightest to darkest)
export const COLORS = {
  lightRed: "#EE4540",
  red: "#C72C41",
  crimson: "#801336",
  plum: "#510A32",
  purple: "#2D142C",
};

export const Header = styled.Text`
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin: 20px;
`;

export const HeaderBox = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: auto;
  padding-bottom: 10px;
  background-color: ${COLORS.plum};
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
  margin: auto;
`;

export const FilterBody = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const FilterX = styled.TouchableOpacity`
  margin: auto;
  margin-right: 5px;
`;

export const MenuView = styled.View`
  margin: 20px;
  margin-top: 300px;
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
  margin-right: 30px;
`;

export const RumbleTxt = styled.Text`
  color: white;
  font-weight: bold;
  text-align: center;
`;

export const SingleRivalBox = styled.View`
  flex-direction: row;
  margin: 5px 10px 5px 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const RivalPFP = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border-color: ${COLORS.plum};
  border-width: 3px;
  margin-left: 30px;
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
  margin: 5px;
`;

export const InterestText = styled.Text`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  margin-left: 2px;
  color: ${COLORS.crimson};
`;

export const RivalBio = styled.Text`
  color: ${COLORS.crimson};
`;

export const RivalBioPFP = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-color: ${COLORS.plum};
  border-width: 5px;
`;

export const RivalBioName = styled.Text`
  font-weight: bold;
  font-size: 24px;
  align-self: center;
  padding: 10px;
  color: ${COLORS.purple};
`;
