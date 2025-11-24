import React, { FC, Ref } from "react";
import { ScrollView } from "react-native";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: any[];
  currentUser: any;
  scrollViewRef: Ref<ScrollView> | null;
}

const MessageList: FC<MessageListProps> = ({ messages, currentUser, scrollViewRef }) => {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages.map((message: any, index: number) => (
        <MessageItem message={message} key={index} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
};

export default MessageList;
