import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/Button";

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading" bold>
        Index Screen
      </AppText>
      <Link href="/second" push asChild>
        <Button title="Push to /second" />
      </Link>
      <Link
        href={{
          pathname: "/second",
          params: { name: "Kadi" },
        }}
        push
        asChild
      >
        <Button title="Greet Kadi on /second" theme="secondary" />
      </Link>
      <Button
        title="Greet Mary on /second"
        theme="secondary"
        onPress={() => {
          router.push({
            pathname: "/second",
            params: { name: "Mary" },
          });
        }}
      />
      <Link href="/proverbs/1" push asChild>
        <Button theme="tertiary" title="Push to /proverbs/1" />
      </Link>
      <Link
        href={{
          pathname: "/proverbs/[id]",
          params: { id: "2" },
        }}
        push
        asChild
      >
        <Button theme="tertiary" title="Push to /proverbs/2" />
      </Link>
      <Link href="/products/shoes/1234" push asChild>
        <Button theme="tertiary" title="Push to /products/shoes/1234" />
      </Link>
    </View>
  );
}
