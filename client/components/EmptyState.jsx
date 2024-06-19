import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle, path, buttonTitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <View>
        <Text className="text-xl text-center mt-2 font-psemibold text-white">
          {title}
        </Text>
        <Text className="font-pmedium text-sm text-center text-gray-100">
          {subtitle}
        </Text>

        <CustomButton
          title={buttonTitle}
          handlePress={() => router.push(path)}
          containerStyle=" my-5"
        />
      </View>
    </View>
  );
};

export default EmptyState;
