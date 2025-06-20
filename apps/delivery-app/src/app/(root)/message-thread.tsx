import { router, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

// Extended dummy message thread data
const dummyMessageThreads = {
  "1": {
    id: "1",
    name: "James Wilson",
    avatar:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/400x400/",
    isDriver: true,
    status: "online",
    messages: [
      {
        id: "1",
        text: "Hi! I'm on my way to pick you up",
        timestamp: "2:25 PM",
        sender: "driver",
        type: "text",
      },
      {
        id: "2",
        text: "Great! I'll be waiting outside",
        timestamp: "2:26 PM",
        sender: "user",
        type: "text",
      },
      {
        id: "3",
        text: "I'm in a blue Toyota Camry, license plate ABC-123",
        timestamp: "2:27 PM",
        sender: "driver",
        type: "text",
      },
      {
        id: "4",
        text: "Perfect, I can see you now!",
        timestamp: "2:28 PM",
        sender: "user",
        type: "text",
      },
      {
        id: "5",
        text: "Thanks for the ride! Have a great day!",
        timestamp: "2:55 PM",
        sender: "user",
        type: "text",
      },
      {
        id: "6",
        text: "You're welcome! Safe travels ✈️",
        timestamp: "2:56 PM",
        sender: "driver",
        type: "text",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Support Team",
    avatar:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/400x400/",
    isDriver: false,
    status: "online",
    messages: [
      {
        id: "1",
        text: "Hello! How can we help you today?",
        timestamp: "1:00 PM",
        sender: "support",
        type: "text",
      },
      {
        id: "2",
        text: "I had an issue with my last ride payment",
        timestamp: "1:02 PM",
        sender: "user",
        type: "text",
      },
      {
        id: "3",
        text: "I understand your concern. Can you please provide your ride ID?",
        timestamp: "1:03 PM",
        sender: "support",
        type: "text",
      },
      {
        id: "4",
        text: "Sure, it's #12345",
        timestamp: "1:04 PM",
        sender: "user",
        type: "text",
      },
      {
        id: "5",
        text: "Thank you! I've located your ride. I can see the payment was processed correctly. You should see the charge within 24-48 hours.",
        timestamp: "1:06 PM",
        sender: "support",
        type: "text",
      },
      {
        id: "6",
        text: "Got it, thanks for clarifying!",
        timestamp: "1:07 PM",
        sender: "user",
        type: "text",
      },
    ],
  },
  "3": {
    id: "3",
    name: "David Brown",
    avatar:
      "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/400x400/",
    isDriver: true,
    status: "offline",
    messages: [
      {
        id: "1",
        text: "Good morning! I'm your driver for today's ride",
        timestamp: "Yesterday 8:00 AM",
        sender: "driver",
        type: "text",
      },
      {
        id: "2",
        text: "Good morning! What time will you arrive?",
        timestamp: "Yesterday 8:01 AM",
        sender: "user",
        type: "text",
      },
      {
        id: "3",
        text: "I'm about 5 minutes away. I'm in a white Honda Accord",
        timestamp: "Yesterday 8:05 AM",
        sender: "driver",
        type: "text",
      },
      {
        id: "4",
        text: "I'm on my way to pick you up",
        timestamp: "Yesterday 8:10 AM",
        sender: "driver",
        type: "text",
      },
      {
        id: "5",
        text: "Thank you for choosing our service!",
        timestamp: "Yesterday 8:45 AM",
        sender: "driver",
        type: "text",
      },
    ],
  },
};

const MessageBubble = ({
  message,
  isUser,
}: {
  message: any;
  isUser: boolean;
}) => (
  <View
    className={`flex flex-row ${isUser ? "justify-end" : "justify-start"} mb-3`}
  >
    <View
      className={`max-w-[80%] px-4 py-2 rounded-2xl ${
        isUser ? "bg-blue-500 rounded-br-md" : "bg-gray-100 rounded-bl-md"
      }`}
    >
      <Text className={`text-base ${isUser ? "text-white" : "text-gray-800"}`}>
        {message.text}
      </Text>
      <Text
        className={`text-xs mt-1 ${isUser ? "text-blue-100" : "text-gray-500"}`}
      >
        {message.timestamp}
      </Text>
    </View>
  </View>
);

const MessageThread = () => {
  const { id } = useLocalSearchParams();
  const threadData =
    dummyMessageThreads[id as keyof typeof dummyMessageThreads];

  if (!threadData) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl font-JakartaSemiBold">Chat not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center px-5 py-3 border-b border-gray-100 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>

        <View className="relative mr-3">
          <Image
            source={{ uri: threadData.avatar }}
            className="w-10 h-10 rounded-full"
          />
          {threadData.isDriver && (
            <View className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white" />
          )}
        </View>

        <View className="flex-1">
          <Text className="text-lg font-JakartaSemiBold">
            {threadData.name}
          </Text>
          <Text className="text-sm text-gray-500">
            {threadData.status === "online"
              ? "Active now"
              : "Last seen recently"}
          </Text>
        </View>

        <TouchableOpacity className="p-2">
          <Image source={icons.chat} className="w-5 h-5" tintColor="#666" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        data={threadData.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble message={item} isUser={item.sender === "user"} />
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Message Input */}
      <View className="flex flex-row items-center px-4 py-3 border-t border-gray-100 bg-white">
        <View className="flex-1 flex flex-row items-center bg-gray-100 rounded-full px-4 py-2 mr-3">
          <TextInput
            placeholder="Type a message..."
            className="flex-1 text-base"
            multiline
            maxLength={500}
          />
          <TouchableOpacity className="ml-2">
            <Image source={icons.chat} className="w-5 h-5" tintColor="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="bg-blue-500 w-10 h-10 rounded-full justify-center items-center">
          <Image source={icons.arrowUp} className="w-5 h-5" tintColor="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MessageThread;
