import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQ[] = [
  // Application Process
  {
    id: 1,
    category: "Application Process",
    question: "How long does the application process take?",
    answer:
      "The application typically takes 5-10 minutes to complete. After submission, we'll review your application and run background checks, which usually takes 1-3 business days. Once approved, you can start earning immediately!",
  },
  {
    id: 2,
    category: "Application Process",
    question: "What documents do I need to provide?",
    answer:
      "You'll need: A valid driver's license, vehicle registration, current auto insurance policy, a recent profile photo, and a clear photo of your vehicle. All documents should be current and clearly readable.",
  },
  {
    id: 3,
    category: "Application Process",
    question:
      "Can I apply if I have a clean driving record but a minor traffic violation?",
    answer:
      "We review each application individually. Minor traffic violations like parking tickets typically won't disqualify you. However, serious violations like DUI, reckless driving, or multiple moving violations may affect your eligibility.",
  },

  // Earnings
  {
    id: 4,
    category: "Earnings",
    question: "How much can I earn as a driver?",
    answer:
      "Earnings vary by location, time of day, and demand. On average, drivers earn $15-25 per hour, including tips. During peak times (lunch, dinner, weekends), you can earn even more. Top drivers earn $500+ per week.",
  },
  {
    id: 5,
    category: "Earnings",
    question: "When and how do I get paid?",
    answer:
      "You get paid weekly on Tuesdays via direct deposit. You can also cash out instantly (for a small fee) up to 5 times per day. Tips are included in your earnings and paid out with your weekly payment.",
  },
  {
    id: 6,
    category: "Earnings",
    question: "Do I keep 100% of tips?",
    answer:
      "Yes! You keep 100% of all tips. Tips are shown separately in the app and are added to your total earnings. Customers can tip through the app or in cash.",
  },

  // Vehicle Requirements
  {
    id: 7,
    category: "Vehicle Requirements",
    question: "What vehicles are acceptable?",
    answer:
      "Most cars, trucks, SUVs, and motorcycles in good condition are acceptable. Vehicles must be 2010 or newer, pass a basic safety inspection, and have current registration and insurance.",
  },
  {
    id: 8,
    category: "Vehicle Requirements",
    question: "Can I use a rental car or someone else's vehicle?",
    answer:
      "Yes, you can use a rental car as long as you're listed as an authorized driver on the rental agreement. For someone else's vehicle, you must be listed on their insurance policy as an authorized driver.",
  },
  {
    id: 9,
    category: "Vehicle Requirements",
    question: "Do I need a commercial license or special permits?",
    answer:
      "No commercial license is required for delivery driving. Your regular driver's license is sufficient. Some cities may require additional permits - we'll let you know if this applies to your area.",
  },

  // Working as a Driver
  {
    id: 10,
    category: "Working as a Driver",
    question: "Can I choose my own hours?",
    answer:
      "Absolutely! You have complete flexibility to work when you want. You can go online and offline anytime through the driver app. Many drivers work part-time around their other commitments.",
  },
  {
    id: 11,
    category: "Working as a Driver",
    question: "How do I receive delivery requests?",
    answer:
      "When you're online in the driver app, you'll receive delivery requests with pickup and drop-off locations, estimated time, and earnings. You can accept or decline requests - there's no penalty for declining.",
  },
  {
    id: 12,
    category: "Working as a Driver",
    question: "What happens if I get in an accident while driving?",
    answer:
      "Safety is our top priority. We provide additional insurance coverage while you're actively delivering. If you're in an accident, contact emergency services first, then report it through the driver app immediately.",
  },

  // Support & Safety
  {
    id: 13,
    category: "Support & Safety",
    question: "Is there 24/7 support for drivers?",
    answer:
      "Yes! We provide 24/7 support through the driver app. You can chat with support, call our driver hotline, or access our help center anytime. We're here to help with any issues or questions.",
  },
  {
    id: 14,
    category: "Support & Safety",
    question: "What safety measures are in place?",
    answer:
      "We conduct background checks, verify all documents, provide GPS tracking for all deliveries, offer in-app emergency assistance, and have a rating system for both drivers and customers. Your safety is our priority.",
  },
  {
    id: 15,
    category: "Support & Safety",
    question:
      "Can I see customer ratings and delivery details before accepting?",
    answer:
      "Yes! Before accepting a delivery, you'll see the pickup location, drop-off location, estimated distance and time, customer rating, and your estimated earnings including tips.",
  },
];

const categories = [
  "All",
  "Application Process",
  "Earnings",
  "Vehicle Requirements",
  "Working as a Driver",
  "Support & Safety",
];

const DriverFAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const filteredFAQs =
    selectedCategory === "All"
      ? faqData
      : faqData.filter((faq) => faq.category === selectedCategory);

  const toggleExpanded = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Driver FAQ</Text>
        <View className="w-6" />
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-5 py-3 border-b border-gray-100"
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
                  selectedCategory === category ? "text-white" : "text-gray-700"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Search Results Header */}
        <View className="px-5 py-3">
          <Text className="text-gray-600">
            {filteredFAQs.length}{" "}
            {filteredFAQs.length === 1 ? "question" : "questions"}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </Text>
        </View>

        {/* FAQ Items */}
        <View className="px-5">
          {filteredFAQs.map((faq) => (
            <View key={faq.id} className="mb-3">
              <TouchableOpacity
                className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-4"
                onPress={() => toggleExpanded(faq.id)}
              >
                <View className="flex flex-row items-start justify-between">
                  <View className="flex-1 mr-3">
                    <Text className="text-sm text-blue-600 font-JakartaSemiBold mb-1">
                      {faq.category}
                    </Text>
                    <Text className="text-lg font-JakartaSemiBold text-gray-800">
                      {faq.question}
                    </Text>
                  </View>
                  <View
                    className={`transform ${expandedItems.includes(faq.id) ? "rotate-180" : "rotate-0"}`}
                  >
                    <Image
                      source={icons.arrowDown}
                      className="w-5 h-5"
                      tintColor="#666"
                    />
                  </View>
                </View>

                {expandedItems.includes(faq.id) && (
                  <View className="mt-4 pt-4 border-t border-gray-100">
                    <Text className="text-gray-700 leading-6">
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Contact Support Section */}
        <View className="mx-5 mt-8 mb-10 p-5 bg-blue-50 rounded-xl">
          <Text className="text-lg font-JakartaSemiBold text-blue-800 mb-2">
            Still have questions?
          </Text>
          <Text className="text-blue-700 mb-4">
            Our support team is available 24/7 to help you get started as a
            driver.
          </Text>

          <View className="flex flex-row space-x-3">
            <TouchableOpacity className="flex-1 bg-blue-500 py-3 rounded-lg items-center">
              <Text className="text-white font-JakartaSemiBold">
                Chat with Support
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-white border border-blue-500 py-3 rounded-lg items-center">
              <Text className="text-blue-500 font-JakartaSemiBold">
                Call Support
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverFAQ;
