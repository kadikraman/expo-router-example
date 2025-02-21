import { View } from "react-native";
import { router } from "expo-router";
import { useAppState } from "@/utils/state";
import { Button } from "@/components/Button";

export default function LoginScreen() {
  const [, setAppState] = useAppState();

  const handleLogin = () => {
    setAppState({ isLoggedIn: true });
    router.replace("/");
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
