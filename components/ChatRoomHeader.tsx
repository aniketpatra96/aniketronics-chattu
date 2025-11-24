import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Router, Stack } from "expo-router";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface ChatRoomHeaderProps {
  user: any;
  router: Router;
}

const ChatRoomHeader: FC<ChatRoomHeaderProps> = ({ user, router }) => {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-3">
              <Image
                source={{ uri: user?.profileUrl }}
                style={{ height: hp(4.5), aspectRatio: 1, borderRadius: 100 }}
              />
              <Text
                style={{ fontSize: hp(2.5) }}
                className="text-neutral-700 font-medium"
              >
                {user?.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-8">
            <TouchableOpacity>
              <Ionicons name="call" size={hp(2.8)} color="#737373" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="videocam" size={hp(2.8)} color="#737373" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
};

export default ChatRoomHeader;
