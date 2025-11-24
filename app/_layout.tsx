import { AuthContextProvider, useAuth } from "@/contexts/authContext";
import "@/global.css";
import { Router, Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";

type Segments =
  | ["_sitemap"]
  | ["home"]
  | ["(app)", "home"]
  | ["chatRoom"]
  | ["(app)", "chatRoom"]
  | ["profile"]
  | ["(app)", "profile"]
  | ["signin"]
  | ["(auth)", "signin"]
  | ["signup"]
  | ["(auth)", "signup"];

const MainLayout: () => React.JSX.Element = () => {
  const { isAuthenticated }: { isAuthenticated: boolean | undefined } =
    useAuth();
  const segments: Segments = useSegments();
  const router: Router = useRouter();

  useEffect(() => {
    // check if user is authenticated
    if (typeof isAuthenticated === "undefined") return;
    const inApp: boolean = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      // redirect to home
      router.replace("/(app)/home");
    } else if (isAuthenticated === false) {
      // redirect to signIn
      router.replace("/(auth)/signin");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <StatusBar style="dark" translucent={true} />
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
