import { AuthResponseProps, useAuth } from "@/contexts/authContext";
import { blurhash } from "@/utils/BlurHash";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Alert, Platform, Text, View } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuItem from "./CustomMenuItems";
import Divider from "./Divider";

const ios: boolean = Platform.OS === "ios";

const HomeHeader = () => {
  const { top }: { top: number } = useSafeAreaInsets();
  const {
    user,
    logout,
  }: { user: any; logout: () => Promise<AuthResponseProps> } = useAuth();
  const handleProfile: () => void = () => {
    router.push("/profile");
  };
  const handleLogout: () => Promise<void> = async () => {
    const response: AuthResponseProps = await logout();
    if (response.success) {
      Alert.alert("Log Out", "logout successful !");
    } else {
      console.error("logout failed");
    }
  };
  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-5 pb-6 bg-indigo-400 rounded-b-3xl shadow"
    >
      <View>
        <Text style={{ fontSize: hp(3) }} className="font-medium text-white">
          Chats
        </Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={{ uri: user?.profileUrl }}
              placeholder={blurhash}
              contentFit="cover"
              transition={1000}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 40,
                marginLeft: -5,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 10,
                elevation: 10,
                padding: 10,
                width: 160,
              },
            }}
          >
            <MenuItem
              text="My Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default HomeHeader;
