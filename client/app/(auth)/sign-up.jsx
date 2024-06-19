import { View, Text, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFields from "../../components/FormFields";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import axios from "axios";
import { useGlobalContext } from "../../context/GlobalProvider";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);

  // using the context
  const { setIsLoggedIn, setUser } = useGlobalContext();

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const submit = async () => {
    if (!form.username || !form.password || !form.email) {
      Alert.alert("Error 😭", "Please fill all required fields");
    }

    setIsSubmiting(true);

    if (!validateEmail(form.email)) {
      Alert.alert("Error 😭", "Please enter a valid email address");
      return;
    }

    try {
      const result = await axios.post("http://192.168.8.122:4000/signup", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      //console.log("RESULT OF CREATING USER => ", result);

      const id = result?.data?.user?._id;

      //set it to global state.....
      // it is done by context
      setIsLoggedIn(true);
      setUser({
        username: form.username,
        email: form.email,
        id: id,
      });

      router.replace("/home");

      Toast.show({
        type: "success",
        text1: "Register",
        text2: "Successfully register 👋",
      });
    } catch (error) {
      Alert.alert("Error 😭", error?.response?.data?.message);
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />

          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <FormFields
            title="Username"
            value={form.username}
            handleChangeText={(e) => {
              setForm({ ...form, username: e });
            }}
            otherStyles="mt-10"
            placeholder="enter username"
          />
          <FormFields
            title="Email"
            value={form.email}
            handleChangeText={(e) => {
              setForm({ ...form, email: e });
            }}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="enter email"
          />

          <FormFields
            title="Password"
            value={form.password}
            handleChangeText={(e) => {
              setForm({ ...form, password: e });
            }}
            otherStyles="mt-7"
            placeholder="enter password"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyle="mt-7"
            isLoading={isSubmiting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>

          {/* <Link href="/home" className="text-white">
            Go to home
          </Link> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
