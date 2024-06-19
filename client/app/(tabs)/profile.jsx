import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import icons from "../../constants/icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import ProfileVideoCard from "../../components/ProfileVideoCard";
import EmptyState from "../../components/EmptyState";

const Profile = () => {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({
      username: "",
      email: "",
    });
    router.replace("/sign-in");
    Toast.show({
      type: "success",
      text1: "Logout",
      text2: "Successfully logout 👋",
    });
  };

  const getAllVideos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://192.168.8.122:4000/user/${user.id}`);
      const jsonVideos = await response.json();
      setVideos(jsonVideos.videos);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error occurred while getting videos in frontend:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getAllVideos();
    setRefreshing(false);
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  const RenderHeader = () => (
    <View>
      <TouchableOpacity className="items-end gap-1 p-5" onPress={handleLogout}>
        <Image source={icons.logout} className="h-8 w-8" />
        <Text className="text-sm font-semibold text-gray-100">Logout</Text>
      </TouchableOpacity>

      <View className="my-3 ">
        <View className=" items-center">
          <View className="bg-blue-200 h-14 w-14 justify-center items-center  rounded-lg border border-secondary-100">
            <Text className="text-5xl font-semibold">
              {user.username.charAt(0)}
            </Text>
          </View>
          <Text className="text-gray-100 my-2 font-pregular text-xl font-semibold">
            {user.username}
          </Text>
        </View>

        <View className="items-center flex-row justify-center mt-3 space-x-10">
          <View className="justify-center items-center">
            <Text className="text-gray-100 font-bold text-lg">
              {videos?.length}
            </Text>
            <Text className="text-gray-100 font-bold text-md">Posts</Text>
          </View>
          <View className="justify-center items-center">
            <Text className="text-gray-100 font-bold text-lg">
              {videos.length === 0 ? "0" : "1.2k"}
            </Text>
            <Text className="text-gray-100 font-bold text-md">Views</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <ProfileVideoCard item={item} user={user} key={item._id} />
  );

  return (
    <SafeAreaView className="h-full bg-primary">
      <RenderHeader />
      {!videos || videos.length === 0 ? (
        <EmptyState
          title="No videos Found"
          subtitle="Be the first one to upload the video"
          path="/create"
          buttonTitle="Create Video"
        />
      ) : (
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          // ListHeaderComponent={renderHeader}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : null
          }
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
