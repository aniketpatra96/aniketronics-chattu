import React, { FC, ReactElement } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

interface CustomKeyboardViewProps {
  children: ReactElement;
  inChat?: boolean;
}

const CustomKeyboardView: FC<CustomKeyboardViewProps> = ({
  children,
  inChat,
}) => {
  let kavConfig: {
    keyboardVerticalOffset?: number;
  } = {};
  let scrollViewConfig: {
    contentContainerStyle?: { flex: number };
  } = {};
  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 90 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      {...kavConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardView;
