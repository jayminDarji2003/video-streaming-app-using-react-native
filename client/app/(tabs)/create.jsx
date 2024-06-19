import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormFields from "../../components/FormFields";
import CustomButton from "../../components/CustomButton";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const [uploading, setUploading] = useState(false);
  const { user } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
    user: "",
  });

  const openPicker = async (selectType) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: selectType === "image" ? "image/*" : "video/*",
      });

      if (!result.canceled) {
        if (selectType === "image") {
          setForm({ ...form, thumbnail: result.assets[0] });
        }
        if (selectType === "video") {
          setForm({ ...form, video: result.assets[0] });
        }
      }
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  const submit = async () => {
    if (!form.title || !form.thumbnail || !form.video || !form.prompt) {
      return Alert.alert("Fields required", "Please fill all the fields");
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("prompt", form.prompt);
      formData.append("video", {
        uri: form.video.uri,
        type: "video/mp4", // Ensure the MIME type matches the actual file type
        name: form.video.name,
      });
      formData.append("imageFile", {
        uri: form.thumbnail.uri,
        type: "image/jpeg", // Ensure the MIME type matches the actual file type
        name: form.thumbnail.name,
      });
      formData.append("user", user.id);

      const result = await axios.post(
        "http://192.168.8.122:4000/video-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload success: ", result);

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      console.error("Error occurred while creating video: ", error);
      Alert.alert("Upload failed", "There was an error uploading your video.");
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload video</Text>

        <FormFields
          title="Video title"
          value={form.title}
          placeholder="Get your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-5"}
        />

        <View className="mt-5 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-12 h-12"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormFields
          title="AI prompt"
          value={form.prompt}
          placeholder="The prompt you use to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}
        />

        <CustomButton
          title={uploading ? "uploading..." : "Submit & publish"}
          handlePress={submit}
          containerStyle={"mt-7"}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
