// import { View, Text, Image, TouchableOpacity } from "react-native";
// import React, { useState } from "react";
// import { icons } from "../constants";
// import { ResizeMode, Video } from "expo-av";
// import { useGlobalContext } from "../context/GlobalProvider";

// const VideoCard = ({ item }) => {
//   const [play, setPlay] = useState(false);
//   const { user } = useGlobalContext();

//   return (
//     <View className="flex-col items-center px-4 mb-14">
//       <View className="flex-row gap-3 items-start">
//         <View className="justify-center items-center flex-row flex-1">
//           <View className="w-[46px] h-[46px] bg-blue-200 rounded-lg border border-secondary justify-center items-center p-0.5">
//             <Text className="text-5xl font-semibold">
//               {user.username.charAt(0)}
//             </Text>
//           </View>

//           <View className="justify-center flex-1 ml-3 gap-y-1">
//             <Text
//               className="text-white font-psemibold text-sm"
//               numberOfLines={1}
//             >
//               {item.title}
//             </Text>

//             <Text
//               className="text-xs text-gray-100 font-pregular"
//               numberOfLines={1}
//             >
//               {item.prompt}
//             </Text>
//           </View>
//         </View>

//         <View className="pt-2 ">
//           <Image source={icons.menu} className="h-5 w-5" resizeMode="contain" />
//         </View>
//       </View>

//       {play ? (
//         <Video
//           source={{ uri: item.videoUrl }}
//           className="w-full h-60 rounded-xl mt-3"
//           resizeMode={ResizeMode.CONTAIN}
//           useNativeControls
//           shouldPlay
//           onPlaybackStatusUpdate={(status) => {
//             if (status.didJustFinish) {
//               setPlay(false);
//             }
//           }}
//         />
//       ) : (
//         <TouchableOpacity
//           className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
//           activeOpacity={0.7}
//           onPress={() => setPlay(true)}
//         >
//           <Image
//             source={{ uri: item.thumbnail }}
//             className="w-full h-full rounded-xl mt-3"
//             resizeMode="cover"
//           />

//           <Image
//             source={icons.play}
//             className="w-12 h-12 absolute"
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default VideoCard;

import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";
import { useGlobalContext } from "../context/GlobalProvider";

const VideoCard = ({ item }) => {
  const [play, setPlay] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { user } = useGlobalContext();

  const handleBookmark = () => {
    setMenuVisible(false);
    Alert.alert("Bookmark Video", "Do you want to bookmark the video", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] bg-blue-200 rounded-lg border border-secondary justify-center items-center p-0.5">
            <Text className="text-5xl font-semibold">
              {user.username.charAt(0)}
            </Text>
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {item.prompt}
            </Text>
          </View>
        </View>

        <View className="pt-2 relative">
          <TouchableOpacity onPress={() => handleBookmark()}>
            <Image
              source={icons.menu}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: item.videoUrl }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
