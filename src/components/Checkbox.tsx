import React, { FC } from "react";
import { Pressable } from "react-native";
import { Interest, InterestText } from "../components/HomePage.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CheckboxProps {
  name: string;
  checked: boolean;
  onChange: (arg0: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  return (
    <Interest>
      <Pressable onPress={() => props.onChange(!props.checked)}>
        {props.checked ? (
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={25}
            color="#801336"
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-outline"
            size={25}
            color="#801336"
          />
        )}
      </Pressable>
      <Pressable onPress={() => props.onChange(!props.checked)}>
        <InterestText>{props.name}</InterestText>
      </Pressable>
    </Interest>
  );
};

export default Checkbox;
