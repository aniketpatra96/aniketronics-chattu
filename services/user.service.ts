import { usersRef } from "@/firebaseConfig";
import {
    DocumentData,
    getDocs,
    Query,
    query,
    QuerySnapshot,
    where,
} from "firebase/firestore";

class UserService {
  async fetchUsers(user: any): Promise<any[] | null> {
    try {
      const q: Query<DocumentData, DocumentData> = query(
        usersRef,
        where("uid", "!=", user?.uid)
      );
      const querySnapshot: QuerySnapshot<DocumentData, DocumentData> =
        await getDocs(q);
      const users: any[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return null;
    }
  }
}

export default new UserService();
