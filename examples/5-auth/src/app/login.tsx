import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { View } from "react-native";

export default function LoginScreen() {
  const authContext = useContext(AuthContext);

  return (
    <View className="flex-1 justify-center p-4">
      <AppText size="heading" center>
        Login Screen
      </AppText>
      <Button title="Log in!" onPress={authContext.logIn} />
    </View>
  );
}
