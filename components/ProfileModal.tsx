import { useAuth } from "@/contexts/authContext";
import profileService, { ResponseProps } from "@/services/profile.service";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (imageUrl: string) => void;
  initialImage?: string | null;
}

export default function ProfileImageModal({
  visible,
  onClose,
  onSave,
  initialImage,
}: Props) {
  const [image, setImage] = useState<string | null>(initialImage ?? null);
  const {
    updateUser,
  }: { updateUser: (username?: string, profileUrl?: string) => Promise<void> } =
    useAuth();

  const pickImage = async (): Promise<void> => {
    try {
      // request permission if needed
      if (Platform.OS !== "web") {
        const { status }: { status: ImagePicker.PermissionStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Sorry, we need camera roll permissions to upload an image!"
          );
          return;
        }
      }

      // launch image library
      const result: ImagePicker.ImagePickerResult =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "images",
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
          base64: true,
        });
      if (!result.canceled) {
        const uriParts: any = result.assets[0].uri.split(".");
        const fileType: any = uriParts[uriParts.length - 1];
        const imageType: string = fileType
          ? `image/${fileType.toLowerCase()}`
          : "image/jpeg";
        const imageDataUrl: string = `data:${imageType};base64,${result.assets[0].base64}`;
        const response: ResponseProps = await profileService.uploadImage(
          imageDataUrl
        );
        if (response.success) {
          setImage(response.data.imageURl);
        } else {
          const message: string =
            response?.error || "An error occurred while uploading the image.";
          Alert.alert("Error", message);
        }
      }
    } catch (error) {
      console.error("Error in picking image: ", error);
      Alert.alert("Error", "An error occurred while picking the image.");
    } finally {
    }
  };

  const handleSave = () => {
    if (image) {
      onSave(image);
      updateUser(undefined, image);
    }
    onClose();
  };

  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Change Profile Picture</Text>

          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri:
                  image ||
                  "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png",
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <Text style={styles.info}>Tap image to choose from gallery</Text>

          <View style={styles.btnRow}>
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
    borderRadius: 18,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  info: {
    fontSize: 12,
    color: "#666",
    marginBottom: 20,
  },
  btnRow: {
    flexDirection: "row",
    gap: 15,
  },
  cancelBtn: {
    padding: 10,
  },
  cancelText: {
    color: "#555",
  },
  saveBtn: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
