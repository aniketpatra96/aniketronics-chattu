import { FC, ReactElement } from "react";
import { Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

interface MenuItemProps {
  text: string;
  action: (value: string | null) => void | Promise<void>;
  value: string | null;
  icon: ReactElement;
}

const MenuItem: FC<MenuItemProps> = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text
          style={{ fontSize: hp(1.7) }}
          className="font-semibold text-neutral-600 "
        >
          {text}
        </Text>
        {icon}
      </View>
    </MenuOption>
  );
};

export default MenuItem;
