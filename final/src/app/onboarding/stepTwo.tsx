import { View } from "react-native";
import { Button } from "@/components/Button";
import { AppText } from "@/components/AppText";
import { useRouter } from "expo-router";

export default function OnboardingStepTwoScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center m-4">
      <AppText size="heading" center bold>
        Step 2
      </AppText>
      <AppText center className="mb-8">
        This is the middle step, one more to go!
      </AppText>
      <Button
        title="Next"
        onPress={() => router.push("/onboarding/stepThree")}
      />
    </View>
  );
}
