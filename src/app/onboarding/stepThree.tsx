import { View } from "react-native";
import { Button } from "@/components/Button";
import { AppText } from "@/components/AppText";
import { useRouter } from "expo-router";
import { useAppState } from "@/utils/state";

export default function OnboardingStepThreeScreen() {
  const [appState, setAppState] = useAppState();
  const router = useRouter();

  const handleCompleteOnboarding = () => {
    setAppState({ ...appState, hasCompletedOnboarding: true });
    router.replace("/login");
  };

  return (
    <View className="flex-1 items-center justify-center m-4">
      <AppText size="xlarge" center bold>
        Final step
      </AppText>
      <AppText center className="mb-8">
        This is the final step, you're all set!
      </AppText>
      <Button title="Complete Onboarding" onPress={handleCompleteOnboarding} />
    </View>
  );
}
