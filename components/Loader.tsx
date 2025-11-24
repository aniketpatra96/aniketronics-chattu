import LoaderSource from "@/assets/json/loading.json";
import LottieView, { AnimationObject } from "lottie-react-native";
import React, { FC } from "react";
import { View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface LoaderProps {
  size?: number;
  src?: string | AnimationObject | { uri: string } | undefined;
}

const Loader: FC<LoaderProps> = ({ size, src }) => {
  return (
    <View style={{ height: size ? size : hp(10), aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={src ? src : LoaderSource}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loader;
