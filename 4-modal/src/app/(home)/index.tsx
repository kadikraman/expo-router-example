import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/Button";

export default function IndexScreen() {
  const router = useRouter();
  const canGoBack = router.canGoBack();

  return (
    <View className="justify-center flex-1 p-4">
      <AppText center>Index Screen</AppText>
      <Link href="/home-nested" push asChild>
        <Button title="Push to /home-nested" />
      </Link>
      {canGoBack ? (
        <Button
          title="Back"
          theme="secondary"
          onPress={() => {
            router.back();
          }}
        />
      ) : null}
    </View>
  );
}
