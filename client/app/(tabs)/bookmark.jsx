import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";

const Bookmark = () => {
  const { user, isLoggedIn } = useGlobalContext();
  return (
    <SafeAreaView className="h-full bg-primary items-center justify-center">
      <EmptyState
        title="No bookmark videos Found"
        subtitle="Bookmark videos first"
        path="/home"
        buttonTitle="Bookmark videos"
      />
    </SafeAreaView>
  );
};

export default Bookmark;
