import { View } from "react-native";
import { router } from "expo-router";
import { useAppState } from "@/utils/state";
import { Button } from "@/components/Button";
import { AppText } from "@/components/AppText";

export default function LoginScreen() {
  const [appState, setAppState] = useAppState();

  const handleLogin = () => {
    setAppState({ ...appState, isLoggedIn: true });
    router.replace("/");
  };

  return (
    <View className="flex-1 items-center justify-center">
      <AppText size="heading" center bold>
        Login
      </AppText>
      <AppText center className="mb-8">
        "Log in" to your account to continue.
      </AppText>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
