import { AppText } from "@/components/AppText";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const proverbs = [
  {
    id: "1",
    proverb: "The journey of a thousand miles begins with a single step.",
    source: "Lao Tzu",
  },
  {
    id: "2",
    proverb: "Fall seven times, stand up eight.",
    source: "Japanese Proverb",
  },
  {
    id: "3",
    proverb: "Where there is a will, there is a way.",
    source: "English Proverb",
  },
  {
    id: "4",
    proverb:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    source: "Chinese Proverb",
  },
  {
    id: "5",
    proverb: "A smooth sea never made a skilled sailor.",
    source: "African Proverb",
  },
  {
    id: "6",
    proverb: "The harder you work, the luckier you get.",
    source: "South African Proverb",
  },
  {
    id: "7",
    proverb: "Little by little, one walks far.",
    source: "Peruvian Proverb",
  },
  {
    id: "8",
    proverb: "The only way to do great work is to love what you do.",
    source: "Ancient Greek Proverb",
  },
  {
    id: "9",
    proverb: "After darkness comes the dawn.",
    source: "Arabic Proverb",
  },
  {
    id: "10",
    proverb: "The best view comes after the hardest climb.",
    source: "Tibetan Proverb",
  },
];

export default function ProverbScreen() {
  const params = useLocalSearchParams<{ id: string }>();

  const proverb = proverbs.find((p) => p.id === params.id);

  if (!proverb) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText size="heading">Not found</AppText>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Stack.Screen options={{ title: proverb.source }} />
      <AppText size="large" bold center>
        "{proverb.proverb}"
      </AppText>
      <AppText>- {proverb.source}</AppText>
    </View>
  );
}
