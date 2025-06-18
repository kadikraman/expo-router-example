import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { useSegments } from "expo-router";
import { cn } from "@/utils/cn";

export default function DetailsScreen() {
  const segments = useSegments();

  return (
    <View
      className={cn(
        "justify-center flex-1 p-4",
        segments[1] === "(home)" && "bg-blue-200",
        segments[1] === "(second)" && "bg-pink-200",
      )}
    >
      <AppText center size="heading">
        Details Screen
      </AppText>
      <AppText center bold>
        Segments
      </AppText>
      {segments.map((segment, index) => (
        <AppText center key={segment}>
          {index}: {segment}
        </AppText>
      ))}
    </View>
  );
}
