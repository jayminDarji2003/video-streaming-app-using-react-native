import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import { searchPosts } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [searchPosts, setSearchPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSearchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://video-streaming-app-backend.onrender.com/search?q=${query}`
      );
      const jsonVideos = await response.json();
      setSearchPosts(jsonVideos.videos);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error occurred while getting search videos", error);
    }
  };

  useEffect(() => {
    getSearchVideos();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={searchPosts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard item={item} key={item._id} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No video found for this query."
            path="/create"
            buttonTitle="Create video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
