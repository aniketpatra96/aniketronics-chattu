import { Router, useRouter } from "expo-router";
import React, { FC } from "react";
import { FlatList, View } from "react-native";
import ChatItem from "./ChatItem";

interface ChatListProps {
  users: any[];
  currentUser: any;
}

const ChatList: FC<ChatListProps> = ({ users, currentUser }) => {
  const router: Router = useRouter();

  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => String(Math.random())}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <ChatItem
            item={item}
            index={index}
            noBorder={index + 1 === users.length}
            router={router}
            currentUser={currentUser}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
