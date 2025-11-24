// @ts-ignore
import SignUpImage from "@/assets/images/register.png";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import Loader from "@/components/Loader";
import { AuthResponseProps, useAuth } from "@/contexts/authContext";
import profileService, { ResponseProps } from "@/services/profile.service";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Router, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Platform,
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

const SignUp = () => {
  const router: Router = useRouter();
  const emailRef: React.RefObject<string> = useRef<string>("");
  const passwordRef: React.RefObject<string> = useRef<string>("");
  const usernameRef: React.RefObject<string> = useRef<string>("");
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [imageBase64, setImageBase64] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const {
    register,
  }: {
    register: (
      email: string,
      password: string,
      username: string,
      profileUrl: string
    ) => Promise<AuthResponseProps>;
  } = useAuth();

  const handleSignUp: () => Promise<void> = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert("Sign Up", "Please fill all the fields !!");
      return;
    }
    setLoading(true);
    const response: AuthResponseProps = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileUrl
    );
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign Up", response?.error);
    }
  };

  const pickImage = async (): Promise<void> => {
    try {
      // request permission if needed
      if (Platform.OS !== "web") {
        const { status }: { status: ImagePicker.PermissionStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Sorry, we need camera roll permissions to upload an image!"
          );
          return;
        }
      }

      // launch image library
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64: true,
        });
      if (!result.canceled) {
        const uriParts: any = result.assets[0].uri.split(".");
        const fileType: any = uriParts[uriParts.length - 1];
        const imageType: string = fileType
          ? `image/${fileType.toLowerCase()}`
          : "image/jpeg";
        const imageDataUrl: string = `data:${imageType};base64,${result.assets[0].base64}`;
        setProfileLoading(true);
        const response: ResponseProps =
          await profileService.uploadImage(imageDataUrl);
        if (response.success) {
          setProfileUrl(response.data.imageURl);
        } else {
          const message: string =
            response?.error || "An error occurred while uploading the image.";
          Alert.alert("Error", message);
        }
      }
    } catch (error) {
      console.error("Error in picking image: ", error);
      Alert.alert("Error", "An error occurred while picking the image.");
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <CustomKeyboardView>
      <View className="flex-1">
        <View className="flex-1 gap-12">
          {/* Sign In Image */}
          <View
            style={{ paddingTop: hp(5), paddingHorizontal: wp(5) }}
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
              source={SignUpImage}
              cachePolicy={"memory-disk"}
              alt="sign in image"
            />
          </View>
          <View className="gap-10">
            <Text
              style={{ fontSize: hp(4) }}
              className="font-extrabold tracking-wider text-center text-neutral-800"
            >
              Sign Up
            </Text>
            {/* inputs */}
            <View className="gap-4 mx-5">
              {/* username */}
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4  px-4 bg-neutral-200 items-center rounded-2xl"
              >
                <Feather name="user" size={hp(2.7)} color="gray" />
                <TextInput
                  style={{ fontSize: hp(2) }}
                  className="flex-1 font-semibold text-neutral-700"
                  placeholder="Username"
                  placeholderTextColor={"gray"}
                  keyboardType="default"
                  onChangeText={(value) => (usernameRef.current = value)}
                />
              </View>
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
              {/* profile Url */}
              {profileLoading ? (
                <View className="flex-row justify-center">
                  <Loader size={hp(10)} />
                </View>
              ) : (
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-1  px-4 bg-neutral-200 items-center rounded-2xl"
                >
                  <Feather name="image" size={hp(2.7)} color="gray" />
                  <TouchableOpacity onPress={pickImage}>
                    <Text
                      style={{ fontSize: hp(2), paddingTop: hp(2) }}
                      className="flex-1 font-semibold text-neutral-700"
                      numberOfLines={1}
                      ellipsizeMode="clip"
                      selectable={false}
                      accessibilityRole="text"
                    >
                      {profileUrl || "Profile Url"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
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
                    onPress={handleSignUp}
                  >
                    <Text
                      style={{ fontSize: hp(2.7) }}
                      className="text-white font-extrabold tracking-wider"
                    >
                      Sign Up
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
                  Already have an account?{" "}
                </Text>
                <Pressable onPress={() => router.push("/(auth)/signin")}>
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-bold text-indigo-500"
                  >
                    Sign In
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

export default SignUp;
