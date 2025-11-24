// @ts-ignore
import CustomModal from "@/components/CustomModal";
import ProfileImageModal from "@/components/ProfileModal";
import { useAuth } from "@/contexts/authContext";
import { formatCreatedDate } from "@/utils/DateFormatter";
import { Image, ImageBackground, ImageStyle } from "expo-image";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const Profile = () => {
  const { user }: { user: any } = useAuth();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(user?.username);
  const [visible, setVisible] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(user?.profileUrl);

  return (
    <View>
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={styles.header}
        contentFit="cover"
      >
        <View style={styles.headerContent as ViewStyle}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name as TextStyle}>Welcome</Text>
            <Text style={styles.userInfo as TextStyle}>{user?.username}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Image
                style={styles.avatar as ImageStyle}
                source={{ uri: image || "" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body as ViewStyle}>
        <Pressable style={styles.RectangleShapeView as ViewStyle}>
          <Text style={styles.headText as TextStyle}>Email Address</Text>
          <Text style={styles.SubjectText as TextStyle}>{user?.email}</Text>
        </Pressable>
        <Pressable style={styles.RectangleShapeView as ViewStyle}>
          <Text style={styles.headText as TextStyle}>Date Joined</Text>
          <Text style={styles.SubjectText as TextStyle}>
            {formatCreatedDate(new Date(Number(user?.metadata?.createdAt)))}
          </Text>
        </Pressable>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.btn as ViewStyle} className="bg-indigo-500">
            <Text style={styles.text as TextStyle}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={setUsername}
          initialValue={username}
        />
        <ProfileImageModal
          visible={visible}
          onClose={() => setVisible(false)}
          onSave={(img) => setImage(img)}
          initialImage={image}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    height: 300,
  },

  headerContent: {
    padding: 30,
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  location: {
    borderColor: "white",
    width: 10,
    height: 10,
    alignSelf: "flex-start",
  },
  hamburger: {
    borderColor: "white",
    width: 10,
    height: 10,
    alignSelf: "flex-end",
  },
  name: {
    fontSize: 32,
    color: "black",
    fontWeight: "600",
    fontFamily: "Helvetica",
  },
  headText: {
    fontFamily: "Helvetica",
    color: "grey",
    fontWeight: "600",
    marginLeft: 20,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  SubjectText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Helvetica",
    marginLeft: 20,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  userInfo: {
    fontSize: 28,
    color: "indigo",
    fontWeight: "900",
  },
  btn: {
    marginTop: 20,
    borderRadius: 10,
    width: 200,
    height: 50,
    alignItems: "center",
    padding: 6,
    elevation: 3,
  },
  body: {
    backgroundColor: "white",
    height: 500,
    alignItems: "center",
  },
  text: {
    color: "white",
    margin: 10,
  },
  RectangleShapeView: {
    marginTop: 20,
    width: "80%",
    height: 80,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    elevation: 3,
  },
});
