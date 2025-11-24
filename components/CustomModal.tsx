import { useAuth } from "@/contexts/authContext";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  initialValue?: string;
}

export default function CustomModal({
  visible,
  onClose,
  onSave,
  initialValue = "",
}: CustomModalProps) {
  const [username, setUsername] = useState<string>(initialValue);
  const {
    updateUser,
  }: { updateUser: (username?: string, profileUrl?: string) => Promise<void> } =
    useAuth();

  const handleSave = (): void => {
    onSave(username.trim());
    updateUser(username.trim());
    onClose();
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Update Username</Text>

          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter new username"
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelBtn: {
    padding: 10,
  },
  cancelText: {
    color: "#555",
  },
  saveBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
