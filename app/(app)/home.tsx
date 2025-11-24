import WaveLoader from "@/assets/json/Material-wave-loading.json";
import ChatList from "@/components/ChatList";
import Loader from "@/components/Loader";
import { useAuth } from "@/contexts/authContext";
import userService from "@/services/user.service";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Home = () => {
  const { user }: { user: any } = useAuth();
  const [users, setUsers] = useState<any>([]);

  const getUsers: () => Promise<void> = async () => {
    if (user) {
      const users: any[] | null = await userService.fetchUsers(user);
      setUsers(users);
    }
  };

  useEffect(() => {
    if (user?.uid) getUsers();
  }, [user]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      {users.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loader size={hp(10)} src={WaveLoader} />
        </View>
      )}
    </View>
  );
};

export default Home;
