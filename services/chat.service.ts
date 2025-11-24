import { db } from "@/firebaseConfig";
import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    DocumentData,
    DocumentReference,
    setDoc,
    Timestamp
} from "firebase/firestore";

class ChatService {
  async createChatRoom(roomId: string): Promise<void> {
    try {
      await setDoc(doc(db, "rooms", roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error(error);
    }
  }

  async sendMessage(
    roomId: string,
    user: any,
    message: string
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const docRef: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        "rooms",
        roomId
      );
      const messagesRef: CollectionReference<DocumentData, DocumentData> =
        collection(docRef, "messages");
      await addDoc(messagesRef, {
        userId: user?.uid,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  }
}

export default new ChatService();
