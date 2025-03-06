import { View } from "react-native";
import { AppText } from "@/components/AppText";

export default function IndexScreen() {
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center>
        Open up <AppText bold>app/index.tsx</AppText> to start working on your
        app!
      </AppText>
    </View>
  );
}
