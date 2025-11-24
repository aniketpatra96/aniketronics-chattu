import HomeHeader from "@/components/HomeHeader";
import ProfileHeader from "@/components/ProfileHeader";
import { Stack } from "expo-router";
import React from "react";

const AppLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
      <Stack.Screen name="chatRoom" />
      <Stack.Screen
        name="profile"
        options={{
          header: () => <ProfileHeader />,
        }}
      />
    </Stack>
  );
};

export default AppLayout;
