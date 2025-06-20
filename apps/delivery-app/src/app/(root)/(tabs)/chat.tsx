import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";

// Dummy chat data
const dummyChats = [
  {
    id: "1",
    name: "James Wilson",
    lastMessage: "Thanks for the ride! Have a great day!",
    timestamp: "2 min ago",
    avatar: "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/400x400/",
    unreadCount: 0,
    isDriver: true,
  },
  {
    id: "2",
    name: "Support Team",
    lastMessage: "How can we help you today?",
    timestamp: "1 hour ago",
    avatar: "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/400x400/",
    unreadCount: 1,
    isDriver: false,
  },
  {
    id: "3",
    name: "David Brown",
    lastMessage: "I'm on my way to pick you up",
    timestamp: "Yesterday",
    avatar: "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/400x400/",
    unreadCount: 0,
    isDriver: true,
  },
  {
    id: "4",
    name: "Michael Johnson",
    lastMessage: "Ride completed successfully",
    timestamp: "2 days ago",
    avatar: "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/400x400/",
    unreadCount: 0,
    isDriver: true,
  },
];

const ChatItem = ({ item }: { item: typeof dummyChats[0] }) => (
  <TouchableOpacity
    className="flex flex-row items-center px-5 py-4 border-b border-gray-100"
    onPress={() => router.push(`/(root)/message-thread?id=${item.id}`)}
  >
    <View className="relative">
      <Image
        source={{ uri: item.avatar }}
        className="w-12 h-12 rounded-full"
        resizeMode="cover"
      />
      {item.isDriver && (
        <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
      )}
    </View>

    <View className="flex-1 ml-3">
      <View className="flex flex-row justify-between items-center">
        <Text className="text-lg font-JakartaSemiBold text-gray-800">
          {item.name}
        </Text>
        <Text className="text-sm text-gray-500">{item.timestamp}</Text>
      </View>

      <View className="flex flex-row justify-between items-center mt-1">
        <Text className="text-base text-gray-600 flex-1" numberOfLines={1}>
          {item.lastMessage}
        </Text>
        {item.unreadCount > 0 && (
          <View className="w-5 h-5 bg-blue-500 rounded-full justify-center items-center ml-2">
            <Text className="text-white text-xs font-bold">
              {item.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const Chat = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5 py-3 border-b border-gray-100">
        <Text className="text-2xl font-JakartaBold">Messages</Text>
      </View>

      <FlatList
        data={dummyChats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View className="flex-1 h-fit flex justify-center items-center py-20">
            <Image
              source={images.message}
              alt="message"
              className="w-full h-40"
              resizeMode="contain"
            />
            <Text className="text-3xl font-JakartaBold mt-3">
              No Messages Yet
            </Text>
            <Text className="text-base mt-2 text-center px-7">
              Start a conversation with your friends and family
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Chat;
