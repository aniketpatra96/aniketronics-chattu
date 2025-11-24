// @ts-ignore
import SignInImage from "@/assets/images/login.png";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import Loader from "@/components/Loader";
import { AuthResponseProps, useAuth } from "@/contexts/authContext";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import { Router, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const SignIn = () => {
  const router: Router = useRouter();
  const emailRef: React.RefObject<string> = useRef<string>("");
  const passwordRef: React.RefObject<string> = useRef<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    login,
  }: {
    login: (email: string, password: string) => Promise<AuthResponseProps>;
  } = useAuth();

  const handleLogin: () => Promise<void> = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the fields !!");
      return;
    }
    setLoading(true);
    try {
      const response: AuthResponseProps = await login(
        emailRef.current,
        passwordRef.current
      );
      if (response.success) {
        Alert.alert("Sign In", "Welcome to Aniketronics chattu !!");
      } else {
        Alert.alert("Sign In", response.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomKeyboardView>
      <View className="flex-1">
        <View className="flex-1 gap-12">
          {/* Sign In Image */}
          <View
            style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
            className="items-center"
          >
            <Text className="font-extrabold p-3 text-4xl text-blue-500">
              Aniketronics Chattu
            </Text>
            <Image
              style={{
                height: hp(25),
                width: wp(100),
              }}
              contentPosition={"top center"}
              contentFit="contain"
              onError={(e: any) =>
                console.log("Image load error:", e?.nativeEvent)
              }
              source={SignInImage}
              cachePolicy={"memory-disk"}
              alt="sign in image"
            />
          </View>
          <View className="gap-10">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-extrabold tracking-wider text-center text-neutral-800"
            >
              Sign In
            </Text>
            {/* inputs */}
            <View className="gap-4 mx-5">
              {/* email */}
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4  px-4 bg-neutral-200 items-center rounded-2xl"
              >
                <Octicons name="mail" size={hp(2.7)} color="gray" />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Email address"
                  placeholderTextColor={"gray"}
                  keyboardType="email-address"
                  onChangeText={(value) => (emailRef.current = value)}
                />
              </View>
              {/* password */}
              <View className="gap-3">
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4  px-4 bg-neutral-200 items-center rounded-2xl"
                >
                  <Octicons name="lock" size={hp(2.7)} color="gray" />
                  <TextInput
                    style={{ fontSize: hp(2) }}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                    secureTextEntry
                    onChangeText={(value) => (passwordRef.current = value)}
                  />
                </View>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-right text-neutral-500"
                >
                  Forgot Password ?
                </Text>
              </View>
              {/* sign in button */}
              <View>
                {loading ? (
                  <View className="flex-row justify-center">
                    <Loader size={hp(10)} />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{ height: hp(6.5) }}
                    className="bg-indigo-500 rounded-xl justify-center items-center"
                    onPress={handleLogin}
                  >
                    <Text
                      style={{ fontSize: hp(2.7) }}
                      className="text-white font-extrabold tracking-wider"
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {/* sign up text */}
              <View className="flex-row justify-center">
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-semibold text-neutral-500"
                >
                  Don&apos;t have an account?{" "}
                </Text>
                <Pressable onPress={() => router.push("/(auth)/signup")}>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-bold text-indigo-500"
                  >
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default SignIn;
