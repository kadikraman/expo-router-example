import { View } from "react-native";
import { Button } from "@/components/Button";
import { AppText } from "@/components/AppText";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center m-4">
      <AppText size="xlarge" center bold>
        This is the onboarding screen
      </AppText>
      <AppText center className="mb-8">
        You'll only see this once. When you go through all 3 steps and reopen
        the app, you won't see this again.
      </AppText>
      <Button title="Next" onPress={() => router.push("/onboarding/stepTwo")} />
    </View>
  );
}
