import { auth, db } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  Unsubscribe,
  User,
  UserCredential,
} from "firebase/auth";
import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: any;
  isAuthenticated: boolean | undefined;
  login: (email: string, password: string) => Promise<AuthResponseProps>;
  logout: () => Promise<AuthResponseProps>;
  register: (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ) => Promise<AuthResponseProps>;
  updateUser: (username?: string, profileUrl?: string) => Promise<void>;
}

export interface AuthResponseProps {
  success: boolean;
  data?: User | undefined;
  error?: string;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider: ({
  children,
}: {
  children: ReactNode;
}) => JSX.Element = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    const unsub: Unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        updateUserData(user?.uid);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });
    return unsub;
  }, [isAuthenticated]);

  const updateUserData: (userId: string) => Promise<void> = async (userId) => {
    try {
      const docRef: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        "users",
        userId
      );
      const docSnap: DocumentSnapshot<DocumentData, DocumentData> =
        await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser({
          ...user,
          username: userData.username,
          profileUrl: userData.profileUrl,
          userId: userData.uid,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (
    username?: string,
    profileUrl?: string
  ): Promise<void> => {
    try {
      const docRef: DocumentReference<DocumentData, DocumentData> = doc(
        db,
        "users",
        user?.uid
      );

      const updatePayload: any = {};
      if (username !== undefined) updatePayload.username = username;
      if (profileUrl !== undefined) updatePayload.profileUrl = profileUrl;

      await updateDoc(docRef, updatePayload);

      setUser({
        ...user,
        ...updatePayload,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponseProps> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email";
      }
      if (msg.includes("(auth/invalid-credential)")) {
        msg = "Invalid Credentials !!";
      }
      return { success: false, error: msg };
    }
  };

  const logout = async (): Promise<AuthResponseProps> => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const register = async (
    email: string,
    password: string,
    username: string,
    profileUrl: string
  ): Promise<AuthResponseProps> => {
    try {
      const response: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", response?.user?.uid), {
        uid: response?.user?.uid,
        username: username,
        email: email,
        profileUrl: profileUrl,
      });
      return { success: true, data: response?.user };
    } catch (error: any) {
      let msg = error.message;
      if (msg.includes("(auth/invalid-email)")) {
        msg = "Invalid email";
      }
      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "This Email is already in use";
      }
      return { success: false, error: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth: () => AuthContextProps = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
