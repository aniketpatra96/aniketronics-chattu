import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileHeader = () => {
  const { top }: { top: number } = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: Platform.OS === "ios" ? top : top + 10 }}
      className="flex-row px-5 pb-6 bg-indigo-400 shadow"
    >
      <TouchableOpacity onPress={() => router.back()} className="pe-5">
        <Entypo name="chevron-left" size={hp(4)} color="white" />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          My Profile
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
