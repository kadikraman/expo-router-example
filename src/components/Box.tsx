import { Text, Pressable } from "react-native";
import { cn } from "../utils/cn";

type BoxProps = {
  text: string;
  onPress?: () => void;
  color?: "gray" | "blue" | "pink" | "red" | "green";
  size?: "small" | "medium" | "large";
};

export function Box({
  text,
  onPress,
  color = "gray",
  size = "medium",
}: BoxProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "rounded-lg p-4 mb-4 justify-center items-center",
        color === "gray" && "bg-slate-500",
        color === "blue" && "bg-blue-400",
        color === "pink" && "bg-pink-400",
        color === "red" && "bg-red-400",
        color === "green" && "bg-green-400",
        size === "small" && "min-h-20",
        size === "medium" && "min-h-40",
        size === "large" && "min-h-60",
      )}
    >
      <Text className="text-2xl font-bold text-white">{text}</Text>
    </Pressable>
  );
}
