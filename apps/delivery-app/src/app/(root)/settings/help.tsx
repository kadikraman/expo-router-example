import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const helpTopics: HelpTopic[] = [
  // Booking & Rides
  {
    id: "1",
    title: "How to book a ride",
    description: "Step-by-step guide to booking your first ride",
    category: "Booking & Rides",
    icon: "🚗",
  },
  {
    id: "2",
    title: "Canceling a ride",
    description: "Learn about cancellation policies and fees",
    category: "Booking & Rides",
    icon: "❌",
  },
  {
    id: "3",
    title: "Changing your destination",
    description: "How to modify your trip during the ride",
    category: "Booking & Rides",
    icon: "📍",
  },
  {
    id: "4",
    title: "Ride scheduling",
    description: "Book rides in advance for later",
    category: "Booking & Rides",
    icon: "⏰",
  },

  // Payments & Billing
  {
    id: "5",
    title: "Adding payment methods",
    description: "How to add and manage payment options",
    category: "Payments & Billing",
    icon: "💳",
  },
  {
    id: "6",
    title: "Understanding your bill",
    description: "Breakdown of ride costs and fees",
    category: "Payments & Billing",
    icon: "🧾",
  },
  {
    id: "7",
    title: "Refund requests",
    description: "How to request refunds for issues",
    category: "Payments & Billing",
    icon: "💰",
  },
  {
    id: "8",
    title: "Promotional codes",
    description: "How to apply and use promo codes",
    category: "Payments & Billing",
    icon: "🎫",
  },

  // Account & Safety
  {
    id: "9",
    title: "Account security",
    description: "Keep your account safe and secure",
    category: "Account & Safety",
    icon: "🔒",
  },
  {
    id: "10",
    title: "Reporting safety issues",
    description: "How to report problems during rides",
    category: "Account & Safety",
    icon: "🚨",
  },
  {
    id: "11",
    title: "Lost items",
    description: "What to do if you left something in a vehicle",
    category: "Account & Safety",
    icon: "🎒",
  },
  {
    id: "12",
    title: "Emergency assistance",
    description: "Getting help in emergency situations",
    category: "Account & Safety",
    icon: "🆘",
  },

  // Driver Information
  {
    id: "13",
    title: "Becoming a driver",
    description: "Requirements and process to start driving",
    category: "Driver Information",
    icon: "👨‍💼",
  },
  {
    id: "14",
    title: "Driver earnings",
    description: "How driver pay and bonuses work",
    category: "Driver Information",
    icon: "💵",
  },
  {
    id: "15",
    title: "Vehicle requirements",
    description: "What vehicles are eligible for driving",
    category: "Driver Information",
    icon: "🚙",
  },
];

const categories = [
  "All",
  "Booking & Rides",
  "Payments & Billing",
  "Account & Safety",
  "Driver Information",
];

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTopics = helpTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTopicPress = (topic: HelpTopic) => {
    // In a real app, this would navigate to detailed help article
    console.log("Opening help topic:", topic.title);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Help Center</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View className="px-5 py-4">
          <View className="flex flex-row items-center bg-gray-100 rounded-full px-4 py-3">
            <Image
              source={icons.search}
              className="w-5 h-5 mr-3"
              tintColor="#666"
            />
            <TextInput
              placeholder="Search help topics..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-base"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Quick Actions
          </Text>
          <View className="flex flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 bg-blue-500 p-4 rounded-xl items-center"
              onPress={() => router.push("/(root)/settings/contact")}
            >
              <Text className="text-3xl mb-2">💬</Text>
              <Text className="text-white font-JakartaSemiBold">
                Contact Support
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-green-500 p-4 rounded-xl items-center">
              <Text className="text-3xl mb-2">📞</Text>
              <Text className="text-white font-JakartaSemiBold">
                Call Support
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-5 mb-4"
        >
          <View className="flex flex-row space-x-3">
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category ? "bg-blue-500" : "bg-gray-200"
                }`}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  className={`font-JakartaSemiBold ${
                    selectedCategory === category
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Help Topics */}
        <View className="px-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            {filteredTopics.length}{" "}
            {filteredTopics.length === 1 ? "topic" : "topics"} found
          </Text>

          {filteredTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-4 mb-3"
              onPress={() => handleTopicPress(topic)}
            >
              <View className="flex flex-row items-start">
                <Text className="text-2xl mr-3">{topic.icon}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-JakartaSemiBold mb-1">
                    {topic.title}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-2">
                    {topic.description}
                  </Text>
                  <Text className="text-blue-600 text-xs font-JakartaSemiBold">
                    {topic.category}
                  </Text>
                </View>
                <Text className="text-gray-400 text-lg">›</Text>
              </View>
            </TouchableOpacity>
          ))}

          {filteredTopics.length === 0 && (
            <View className="bg-gray-50 rounded-xl p-8 items-center">
              <Text className="text-4xl mb-4">🔍</Text>
              <Text className="text-lg font-JakartaSemiBold mb-2">
                No results found
              </Text>
              <Text className="text-gray-600 text-center">
                Try adjusting your search terms or browse all categories
              </Text>
            </View>
          )}
        </View>

        {/* Popular Articles */}
        <View className="px-5 mt-8">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Popular Articles
          </Text>

          {[
            { title: "How to book a ride", views: "15.2k views" },
            { title: "Understanding surge pricing", views: "12.8k views" },
            { title: "Safety features and tips", views: "9.1k views" },
            { title: "Lost items recovery", views: "7.3k views" },
          ].map((article, index) => (
            <TouchableOpacity
              key={index}
              className="flex flex-row items-center justify-between py-3 border-b border-gray-100"
            >
              <View>
                <Text className="font-JakartaSemiBold">{article.title}</Text>
                <Text className="text-gray-600 text-sm">{article.views}</Text>
              </View>
              <Text className="text-gray-400 text-lg">›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Options */}
        <View className="mx-5 mt-8 mb-10 bg-blue-50 p-4 rounded-xl">
          <Text className="text-blue-800 font-JakartaSemiBold mb-2">
            Still need help?
          </Text>
          <Text className="text-blue-700 text-sm mb-4">
            Our support team is available 24/7 to assist you with any questions
            or issues.
          </Text>

          <View className="flex flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-3 rounded-lg items-center"
              onPress={() => router.push("/(root)/settings/contact")}
            >
              <Text className="text-white font-JakartaSemiBold">
                Get Support
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-white border border-blue-500 py-3 rounded-lg items-center">
              <Text className="text-blue-500 font-JakartaSemiBold">
                Call (555) 123-4567
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenter;
