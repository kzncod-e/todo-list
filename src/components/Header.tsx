/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text } from "react-native";
 
import { LinearGradient } from "expo-linear-gradient";
import{Bot} from "lucide-react-native";

const Header = () => {
  return (
    <LinearGradient
      colors={["#2b1055", "#7597de"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="border-b border-primary px-4 py-4"
    >
      <View className="flex-row  items-center justify-between">
        <View className="flex-row justify-center items-center gap-2">
          <Bot color="#FF4DD2" size={28} />
          <Text className="text-[0.7rem] mt-2 font-[PressStart2P] text-white glow-text">
            RetroTasksr
          </Text>
        </View>
        <Text className="text-[0.6rem] mt-2 text-secondary font-[PressStart2P] glow-text">
          v1.0 [80s Edition]
        </Text>
      </View>
    </LinearGradient>
  );
};

export default Header;
