import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link } from "expo-router";
import { Button } from "@/components/Button";

export default function ModalWithStackScreen() {
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center>Modal With Stack Screen</AppText>
      <Link href="/modal-with-stack/nested" push asChild>
        <Button title="Push to /modal-with-stack/nested" theme="secondary" />
      </Link>
    </View>
  );
}
