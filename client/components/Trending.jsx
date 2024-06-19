import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../constants";

const RenderItem = ({ item }) => {
  const [play, setPlay] = useState(false);

  return (
    <TouchableOpacity className="mx-5" onPress={() => setPlay(true)}>
      {play ? (
        <Video
          source={{ uri: item.videoUrl }}
          style={{
            width: 150,
            height: 200,
            borderRadius: 15,
            marginTop: 5,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
        />
      ) : (
        <ImageBackground
          source={{ uri: item.thumbnail }}
          style={{
            width: 150,
            height: 200,
            borderRadius: 15,
            overflow: "hidden",
            marginVertical: 5,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 6,
          }}
          resizeMode="cover"
        >
          <Image
            source={icons.play}
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              alignSelf: "center",
              marginTop: 80,
            }}
            resizeMode="contain"
          />
        </ImageBackground>
      )}
    </TouchableOpacity>
  );
};

const Trending = () => {
  const [latestVideos, setLatestVideos] = useState([]);
  const [isFetchingLatestVideos, setIsLoadingLatestVideos] = useState(false);

  const getLatestVideos = async () => {
    try {
      setIsLoadingLatestVideos(true);
      const response = await fetch("http://192.168.8.122:4000/latest-video");
      const data = await response.json();
      //console.log("DATA => ", data);

      if (data.success) {
        setLatestVideos(data.videos);
      } else {
        console.log("Failed to fetch videos");
      }

      setIsLoadingLatestVideos(false);
    } catch (error) {
      setIsLoadingLatestVideos(false);
      console.log("Error occurred while getting latest videos:", error);
    }
  };

  useEffect(() => {
    getLatestVideos();
  }, []);

  // console.log(latestVideos);

  return (
    <View>
      <FlatList
        data={latestVideos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <RenderItem item={item} key={item._id} />}
        // renderItem={<Text>Hii</Text>}
        horizontal
      />
    </View>
  );
};

export default Trending;
