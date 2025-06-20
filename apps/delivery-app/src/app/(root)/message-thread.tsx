import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

// Extended dummy message thread data - mapping driver IDs to chat threads
const dummyMessageThreads = {
  // Driver ID 1 - James Wilson
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
        text: "Hi! I'm on my way to pick you up for your ride to 456 Broadway",
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
  // Driver ID 2 - David Brown
  "2": {
    id: "2",
    name: "David Brown",
    avatar:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/400x400/",
    isDriver: true,
    status: "offline",
    messages: [
      {
        id: "1",
        text: "Good morning! I'm your driver for today's ride to 321 Pine St",
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
  // Dynamic customer chats for active deliveries
  customer_req_1: {
    id: "customer_req_1",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=400",
    isDriver: false,
    status: "online",
    messages: [
      {
        id: "1",
        text: "Hi! I'm your delivery driver. I've picked up your order from McDonald's",
        timestamp: "Just now",
        sender: "driver",
        type: "text",
      },
      {
        id: "2",
        text: "Great! How long until you arrive?",
        timestamp: "Just now",
        sender: "customer",
        type: "text",
      },
      {
        id: "3",
        text: "I'm about 8 minutes away. I'll text you when I'm outside",
        timestamp: "Just now",
        sender: "driver",
        type: "text",
      },
    ],
  },
  customer_req_2: {
    id: "customer_req_2",
    name: "Mike Chen",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    isDriver: false,
    status: "online",
    messages: [
      {
        id: "1",
        text: "Hello! I'm delivering your pizza from Pizza Palace",
        timestamp: "5 mins ago",
        sender: "driver",
        type: "text",
      },
      {
        id: "2",
        text: "Perfect! I'm in apartment 2B, second floor",
        timestamp: "4 mins ago",
        sender: "customer",
        type: "text",
      },
      {
        id: "3",
        text: "Got it! I'm pulling up to your building now",
        timestamp: "2 mins ago",
        sender: "driver",
        type: "text",
      },
      {
        id: "4",
        text: "I'm here! Should I come up or meet you downstairs?",
        timestamp: "1 min ago",
        sender: "driver",
        type: "text",
      },
      {
        id: "5",
        text: "I'll come down in 30 seconds!",
        timestamp: "Just now",
        sender: "customer",
        type: "text",
      },
    ],
  },
  // Support Team (keeping existing for backward compatibility)
  support: {
    id: "support",
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
};

// Ride-specific context mapping
const rideContexts = {
  "1": {
    rideId: "1",
    origin: "123 Main St, New York, NY",
    destination: "456 Broadway, New York, NY",
    date: "15 January 2024",
    time: "2:30 PM",
  },
  "2": {
    rideId: "2",
    origin: "789 Oak Ave, New York, NY",
    destination: "321 Pine St, New York, NY",
    date: "12 January 2024",
    time: "9:15 AM",
  },
};

// Delivery-specific context mapping
const deliveryContexts = {
  req_1: {
    deliveryId: "req_1",
    pickup: "McDonald's, 789 Main St",
    delivery: "456 Oak Ave, Apt 2B",
    customerName: "Sarah Johnson",
    items: "Big Mac meal, Fries, Coke",
    status: "On the way",
  },
  req_2: {
    deliveryId: "req_2",
    pickup: "Pizza Palace, 123 Broadway",
    delivery: "789 Elm Street",
    customerName: "Mike Chen",
    items: "Large Pepperoni Pizza, Garlic Bread",
    status: "Arriving soon",
  },
};

// Function to generate dynamic customer chat based on delivery ID
const generateCustomerChat = (deliveryId: string, deliveryContext: any) => {
  if (!deliveryContext) return null;

  return {
    id: `customer_${deliveryId}`,
    name: deliveryContext.customerName,
    avatar: `https://images.unsplash.com/photo-${deliveryId === "req_1" ? "1494790108755-2616b612b5bb" : "1472099645785-5658abf4ff4e"}?w=400`,
    isDriver: false,
    status: "online",
    messages: [
      {
        id: "1",
        text: `Hi! I'm your delivery driver. I've picked up your order from ${deliveryContext.pickup}`,
        timestamp: "Just now",
        sender: "driver",
        type: "text",
      },
      {
        id: "2",
        text: "Great! How long until you arrive?",
        timestamp: "Just now",
        sender: "customer",
        type: "text",
      },
      {
        id: "3",
        text: "I'm about 8 minutes away. I'll text you when I'm outside",
        timestamp: "Just now",
        sender: "driver",
        type: "text",
      },
      {
        id: "4",
        text: "Perfect! I'll be waiting. Do you need my apartment number?",
        timestamp: "Just now",
        sender: "customer",
        type: "text",
      },
      {
        id: "5",
        text: "Yes please, that would be helpful!",
        timestamp: "Just now",
        sender: "driver",
        type: "text",
      },
    ],
  };
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
    const { id, rideId, deliveryId, isDelivery } = useLocalSearchParams();
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [threadData, setThreadData] = useState<any | null>(null);
    const flatListRef = useRef<FlatList>(null);
    const [isTyping, setIsTyping] = useState(false);

    // Initialize thread data and messages
    useEffect(() => {
        let initialThreadData =
            dummyMessageThreads[id as keyof typeof dummyMessageThreads];

      // If no existing thread and it's a customer chat, generate dynamic data
      if (
          !initialThreadData &&
          id.toString().startsWith("customer_") &&
          deliveryId
      ) {
          const deliveryContext =
              deliveryContexts[deliveryId as keyof typeof deliveryContexts];
          initialThreadData = generateCustomerChat(
              deliveryId as string,
              deliveryContext,
          );
      }

      // Handle driver communication from delivery requests
      if (!initialThreadData && isDelivery === "true") {
          // Create a new delivery-specific chat
          initialThreadData = {
              id: id.toString(),
              name: id
                  .toString()
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase()),
              avatar:
                  "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/400x400/",
              isDriver: true,
              status: "online",
              messages: [
                  {
                      id: "1",
                      text: "Hi! I'm your delivery driver. I've accepted your delivery request and I'm heading to the pickup location now.",
                      timestamp: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                      }),
                      sender: "driver",
                      type: "text",
                  },
              ],
          };
      }

      if (initialThreadData) {
          setThreadData(initialThreadData);
          setMessages(initialThreadData.messages || []);
      }
  }, [id, deliveryId, isDelivery]);

  const rideContext = rideId
    ? rideContexts[rideId as keyof typeof rideContexts]
    : null;
  const deliveryContext = deliveryId
    ? deliveryContexts[deliveryId as keyof typeof deliveryContexts]
    : null;

  if (!threadData) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl font-JakartaSemiBold">Chat not found</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="mt-4 bg-blue-500 px-6 py-2 rounded-lg"
                >
                    <Text className="text-white font-JakartaSemiBold">Go Back</Text>
                </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

    const sendMessage = () => {
        if (!messageText.trim() || !threadData) return;

        const newMessage = {
            id: (messages.length + 1).toString(),
            text: messageText.trim(),
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            sender: isDelivery === "true" ? "driver" : "user",
            type: "text",
        };

        setMessages((prev) => [...prev, newMessage]);
        setMessageText("");

        // Scroll to bottom
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);

        // Simulate response from the other party
        simulateResponse(newMessage.text);
    };

    const simulateResponse = (userMessage: string) => {
        if (!threadData) return;

        setIsTyping(true);

        setTimeout(
            () => {
                const responses = getSmartResponse(
                    userMessage,
                    threadData.isDriver,
                    isDelivery === "true",
                );
                const response =
                    responses[Math.floor(Math.random() * responses.length)];

                const responseMessage = {
                    id: (messages.length + 2).toString(),
                    text: response,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    sender:
                        isDelivery === "true"
                            ? "customer"
                            : threadData.isDriver
                                ? "driver"
                                : "support",
                    type: "text",
                };

                setMessages((prev) => [...prev, responseMessage]);
                setIsTyping(false);

                setTimeout(() => {
                    flatListRef.current?.scrollToEnd({ animated: true });
                }, 100);
            },
            1000 + Math.random() * 2000,
        ); // Random delay between 1-3 seconds
    };

    const getSmartResponse = (
        userMessage: string,
        isDriverThread: boolean,
        isDeliveryChat: boolean,
    ) => {
        const message = userMessage.toLowerCase();

        if (isDeliveryChat) {
            // Delivery-specific responses
            if (message.includes("where") || message.includes("location")) {
                return [
                    "I'm currently 5 minutes away from your location",
                    "I'm en route to the pickup location now",
                    "Just picked up your order, heading your way!",
                ];
            }
            if (message.includes("time") || message.includes("long")) {
                return [
                    "I'll be there in about 8 minutes",
                    "Running slightly behind, should be there in 10 minutes",
                    "Almost there! 3 minutes away",
                ];
            }
            if (message.includes("outside") || message.includes("here")) {
                return [
                    "Perfect! I'll be right there",
                    "Great, I can see the building. Coming up now",
                    "On my way up!",
                ];
            }
            return [
                "Thanks for the message! I'll keep you updated",
                "Got it, thanks for letting me know",
                "Sounds good! Almost there",
                "Perfect, see you soon!",
            ];
        }

        if (isDriverThread) {
            // Driver responses
            if (message.includes("thank") || message.includes("thanks")) {
                return [
                    "You're welcome! Have a great day!",
                    "My pleasure! Safe travels!",
                    "Glad I could help! Take care!",
                ];
            }
            if (message.includes("where") || message.includes("location")) {
                return [
                    "I'm about 5 minutes away",
                    "Just turned onto your street",
                    "I'm in the blue Toyota, pulling up now",
                ];
            }
            return [
                "Perfect! See you soon",
                "Got it, thanks!",
                "Sounds good!",
                "On my way!",
            ];
        }

        // Support responses
        return [
            "Thanks for reaching out! How else can I help?",
            "Is there anything else you need assistance with?",
            "Perfect! Let me know if you have any other questions",
            "Glad I could help! Have a great day!",
        ];
    };

    const isDriverChat =
        id.toString().startsWith("customer_") || isDelivery === "true";

    // Quick action responses
    const quickResponses =
        isDelivery === "true"
            ? ["I'm on my way", "5 minutes away", "Just arrived", "Thank you!"]
            : ["Thanks!", "On my way", "See you soon", "Perfect!"];

  return (
      <KeyboardAvoidingView
          className="flex-1 bg-white"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          <SafeAreaView className="flex-1">
              {/* Header */}
              <View className="flex flex-col border-b border-gray-100 bg-white">
                  <View className="flex flex-row items-center px-5 py-3">
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
                          {!threadData.isDriver && isDriverChat && (
                              <View className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white" />
                          )}
                      </View>

                      <View className="flex-1">
                          <Text className="text-lg font-JakartaSemiBold">
                              {threadData.name}
                          </Text>
                          <Text className="text-sm text-gray-500">
                              {isTyping
                                  ? "Typing..."
                                  : threadData.status === "online"
                                      ? "Active now"
                                      : "Last seen recently"}
                              {isDriverChat && " • Delivery"}
                          </Text>
                      </View>

                      <View className="flex flex-row space-x-2">
                          <TouchableOpacity
                              className="p-2"
                              onPress={() =>
                                  Alert.alert("Call", `Calling ${threadData.name}...`)
                              }
                          >
                              <Image
                                  source={icons.star}
                                  className="w-5 h-5"
                                  tintColor="#666"
                              />
                          </TouchableOpacity>
                      </View>
                  </View>

                  {/* Context Banners */}
                  {rideContext && (
                      <View className="px-5 py-3 bg-blue-50 border-t border-blue-100">
                          <Text className="text-sm font-JakartaSemiBold text-blue-800 mb-1">
                              Ride on {rideContext.date} at {rideContext.time}
                          </Text>
                          <View className="flex flex-row items-center">
                              <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                              <Text
                                  className="text-xs text-blue-700 flex-1"
                                  numberOfLines={1}
                              >
                                  From: {rideContext.origin}
                              </Text>
                          </View>
                          <View className="flex flex-row items-center mt-1">
                              <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                              <Text
                                  className="text-xs text-blue-700 flex-1"
                                  numberOfLines={1}
                              >
                                  To: {rideContext.destination}
                              </Text>
                          </View>
                      </View>
                  )}

                  {deliveryContext && (
                      <View className="px-5 py-3 bg-green-50 border-t border-green-100">
                          <Text className="text-sm font-JakartaSemiBold text-green-800 mb-1">
                              Active Delivery • {deliveryContext.status}
                          </Text>
                          <View className="flex flex-row items-center">
                              <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                              <Text
                                  className="text-xs text-green-700 flex-1"
                                  numberOfLines={1}
                              >
                                  Pickup: {deliveryContext.pickup}
                              </Text>
                          </View>
                          <View className="flex flex-row items-center mt-1">
                              <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                              <Text
                                  className="text-xs text-green-700 flex-1"
                                  numberOfLines={1}
                              >
                                  Delivery: {deliveryContext.delivery}
                              </Text>
                          </View>
                          <Text className="text-xs text-green-600 mt-1">
                              Items: {deliveryContext.items}
                          </Text>
                      </View>
                  )}
              </View>

              {/* Messages */}
              <FlatList
                  ref={flatListRef}
                  data={messages}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                      <MessageBubble
                          message={item}
                          isUser={
                              isDriverChat ? item.sender === "driver" : item.sender === "user"
                          }
                      />
                  )}
                  contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
                  showsVerticalScrollIndicator={false}
                  onContentSizeChange={() =>
                      flatListRef.current?.scrollToEnd({ animated: true })
                  }
              />

              {/* Typing Indicator */}
              {isTyping && (
                  <View className="px-4 pb-2">
                      <View className="flex flex-row justify-start">
                          <View className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                              <Text className="text-gray-500">Typing...</Text>
                          </View>
                      </View>
                  </View>
              )}

              {/* Quick Responses */}
              <View className="px-4 py-2">
                  <Text className="text-sm text-gray-500 mb-2">Quick responses:</Text>
                  <View className="flex flex-row flex-wrap">
                      {quickResponses.map((response, index) => (
                          <TouchableOpacity
                              key={index}
                              onPress={() => {
                                  setMessageText(response);
                              }}
                              className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2"
                          >
                              <Text className="text-sm text-gray-700">{response}</Text>
                          </TouchableOpacity>
                      ))}
                  </View>
              </View>

              {/* Message Input */}
              <View className="flex flex-row items-end px-4 py-3 border-t border-gray-100 bg-white">
                  <View className="flex-1 flex flex-row items-end bg-gray-100 rounded-full px-4 py-2 mr-3 max-h-24">
                      <TextInput
                          value={messageText}
                          onChangeText={setMessageText}
                          placeholder={
                              isDriverChat ? "Message customer..." : "Type a message..."
                          }
                          className="flex-1 text-base py-1"
                          multiline
                          maxLength={500}
                          style={{ maxHeight: 60 }}
                      />
                  </View>

                  <TouchableOpacity
                      onPress={sendMessage}
                      className={`w-10 h-10 rounded-full justify-center items-center ${messageText.trim() ? "bg-blue-500" : "bg-gray-300"
                          }`}
                      disabled={!messageText.trim()}
                  >
                      <Image
                          source={icons.arrowUp}
                          className="w-5 h-5"
                          tintColor="white"
                      />
                  </TouchableOpacity>
              </View>
          </SafeAreaView>
      </KeyboardAvoidingView>
  );
};

export default MessageThread;
