import ChatRoomHeader from "@/components/ChatRoomHeader";
import CustomKeyboardView from "@/components/CustomKeyboardView";
import MessageList from "@/components/MessageList";
import { useAuth } from "@/contexts/authContext";
import { db } from "@/firebaseConfig";
import chatService from "@/services/chat.service";
import { getRoomId } from "@/utils/RoomId";
import { Feather } from "@expo/vector-icons";
import {
  Router,
  UnknownOutputParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
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
import React, { RefObject, useEffect, useRef, useState } from "react";
import {
  Alert,
  EmitterSubscription,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const ChatRoom = () => {
  const item: UnknownOutputParams = useLocalSearchParams(); // Chatting User
  const { user }: { user: any } = useAuth(); // Logged in User
  const router: Router = useRouter();
  const [messages, setMessages] = useState<any>([]);
  const textRef: RefObject<string> = useRef<string>("");
  const inputRef: RefObject<TextInput | null> = useRef<TextInput | null>(null);
  const scrollViewRef: RefObject<ScrollView | null> = useRef<ScrollView>(null);

  const updateScrollView: () => void = () => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef?.current?.scrollToEnd({ animated: true });
      }
    }, 100);
  };

  useEffect(() => {
    createRoomIfNotExists();
    const roomId: string = getRoomId(user?.uid, String(item?.uid));
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(
      db,
      "rooms",
      roomId
    );
    const messagesRef: CollectionReference<DocumentData, DocumentData> =
      collection(docRef, "messages");
    const q: Query<DocumentData, DocumentData> = query(
      messagesRef,
      orderBy("createdAt", "asc")
    );
    const unsub: Unsubscribe = onSnapshot(q, (snapshot) => {
      let allMessages: DocumentData[] = snapshot.docs.map((doc) => doc.data());
      setMessages([...allMessages]);
    });
    const keyboardDidShowListener: EmitterSubscription = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );
    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const createRoomIfNotExists: () => Promise<void> = async () => {
    // room Id
    const roomId: string = getRoomId(user?.uid, String(item?.uid));
    await chatService.createChatRoom(roomId);
  };

  const handleSendMessage: () => Promise<void> = async () => {
    const message: string = textRef.current.trim();
    if (!message) return;
    textRef.current = "";
    if (inputRef) inputRef?.current?.clear();
    const response: {
      success: boolean;
      error?: string | undefined;
    } = await chatService.sendMessage(
      getRoomId(user?.uid, String(item?.uid)),
      user,
      message
    );
    if (!response.success) {
      Alert.alert("Chattu", `Error in sending message: ${response?.error}`);
    }
  };

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-3 border-b border-neutral-300" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View style={{ marginBottom: hp(2.7) }} className="pt-2">
            <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                ref={inputRef}
                onChangeText={(text: string) => (textRef.current = text)}
                placeholder="Type message ..."
                className="flex-1 mr-2"
                style={{ fontSize: hp(2) }}
                placeholderTextColor={"#737373"}
              />
              <TouchableOpacity
                onPress={handleSendMessage}
                className="bg-green-600 p-2 m-[1px] rounded-full"
              >
                <Feather name="send" size={hp(2.7)} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default ChatRoom;
