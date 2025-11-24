import { db } from "@/firebaseConfig";
import { blurhash } from "@/utils/BlurHash";
import { formatDate } from "@/utils/DateFormatter";
import { getRoomId } from "@/utils/RoomId";
import { Image } from "expo-image";
import { Router } from "expo-router";
import { Unsubscribe } from "firebase/auth";
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  orderBy,
  query,
  Query,
} from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface ChatItemProps {
  item: any;
  index: number;
  noBorder?: boolean;
  router: Router;
  currentUser: any;
}

const ChatItem: FC<ChatItemProps> = ({
  item,
  index,
  noBorder,
  router,
  currentUser,
}) => {
  const openChatRoom: () => void = () => {
    router.push({
      pathname: "/chatRoom",
      params: item,
    });
  };

  const [lastMessage, setLastMessage] = useState<
    DocumentData | null | undefined
  >(undefined);

  useEffect(() => {
    const roomId: string = getRoomId(currentUser?.uid, String(item?.uid));
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "rooms",
      roomId
    );
    const messagesRef: CollectionReference<DocumentData, DocumentData> =
      collection(docRef, "messages");
    const q: Query<DocumentData, DocumentData> = query(
      messagesRef,
      orderBy("createdAt", "desc")
    );
    const unsub: Unsubscribe = onSnapshot(q, (snapshot) => {
      let allMessages: DocumentData[] = snapshot.docs.map((doc) => doc.data());
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });
    return unsub;
  }, []);

  const renderTime: () => string | undefined = () => {
    if (lastMessage) {
      const date = lastMessage?.createdAt;
      return formatDate(new Date(date?.seconds * 1000));
    }
  };

  const renderLastMessage: () => string = () => {
    if (typeof lastMessage === "undefined") return "Loading...";
    if (lastMessage) {
      if (currentUser?.userId === lastMessage?.userId) {
        return "You: " + lastMessage?.text;
      } else {
        return lastMessage?.text;
      }
    } else {
      return "Say Hi 👋";
    }
  };

  return (
    <TouchableOpacity
      onPress={openChatRoom}
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${noBorder ? "" : "border-b border-b-neutral-200"}`}
    >
      <View
        className="rounded-full overflow-hidden"
        style={{ height: hp(6), aspectRatio: 1 }}
      >
        <Image
          source={{ uri: item?.profileUrl }}
          style={{ height: "100%", width: "100%" }}
          contentFit="cover"
          placeholder={blurhash}
          transition={500}
        />
      </View>
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            style={{ fontSize: hp(1.8) }}
            className="font-semibold text-neutral-800"
          >
            {item?.username}
          </Text>
          <Text
            style={{ fontSize: hp(1.6) }}
            className="font-semibold text-neutral-500"
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.6) }}
          className="font-medium text-neutral-500"
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
