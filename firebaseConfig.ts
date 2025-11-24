// Import the functions you need from the SDKs you need
import AsyncStorage, {
    AsyncStorageStatic,
} from "@react-native-async-storage/async-storage";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import {
    collection,
    CollectionReference,
    DocumentData,
    Firestore,
    getFirestore,
} from "firebase/firestore";

interface ConfigProps {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: ConfigProps = {
  apiKey: "AIzaSyBZF_lO6J7m7ikN5MrffckZ2p_lYjz8LsY",
  authDomain: "aniketronics-chat.firebaseapp.com",
  projectId: "aniketronics-chat",
  storageBucket: "aniketronics-chat.firebasestorage.app",
  messagingSenderId: "500907154983",
  appId: "1:500907154983:web:2a4e9f8b7a3ff0ed6f7802",
  measurementId: "G-NTJXLTS177",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

const storage: AsyncStorageStatic = AsyncStorage;

export const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(storage),
});

export const db: Firestore = getFirestore(app);

export const usersRef: CollectionReference<DocumentData, DocumentData> =
  collection(db, "users");
export const roomRef: CollectionReference<DocumentData, DocumentData> =
  collection(db, "rooms");
