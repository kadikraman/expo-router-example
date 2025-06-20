import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

const ContactSupport = () => {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [form, setForm] = useState({
    subject: "",
    description: "",
    email: "john.doe@example.com", // Pre-filled from user profile
  });

  const issueTypes = [
    {
      id: "ride",
      title: "Ride Issues",
      description: "Problems with booking, cancellation, or during ride",
      icon: "🚗",
    },
    {
      id: "payment",
      title: "Payment & Billing",
      description: "Charges, refunds, or payment method issues",
      icon: "💳",
    },
    {
      id: "account",
      title: "Account & Login",
      description: "Password reset, profile updates, or access issues",
      icon: "👤",
    },
    {
      id: "safety",
      title: "Safety Concerns",
      description: "Report safety incidents or concerns",
      icon: "🚨",
    },
    {
      id: "driver",
      title: "Driver Related",
      description: "Driver behavior, vehicle, or service quality",
      icon: "👨‍💼",
    },
    {
      id: "app",
      title: "App Issues",
      description: "Technical problems or app functionality",
      icon: "📱",
    },
    {
      id: "other",
      title: "Other",
      description: "General questions or other concerns",
      icon: "❓",
    },
  ];

  const contactMethods = [
    {
      id: "chat",
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: "💬",
      status: "Available now",
      statusColor: "text-green-600",
      action: () => Alert.alert("Live Chat", "Starting chat session..."),
    },
    {
      id: "call",
      title: "Phone Support",
      description: "Speak directly with a support representative",
      icon: "📞",
      status: "24/7 Available",
      statusColor: "text-blue-600",
      action: () => Alert.alert("Phone Support", "Calling (555) 123-4567..."),
    },
    {
      id: "email",
      title: "Email Support",
      description: "Send detailed information about your issue",
      icon: "📧",
      status: "Response within 24h",
      statusColor: "text-orange-600",
      action: () => setSelectedIssue("email"),
    },
    {
      id: "emergency",
      title: "Emergency Line",
      description: "For urgent safety concerns during rides",
      icon: "🚨",
      status: "Emergency Only",
      statusColor: "text-red-600",
      action: () => Alert.alert("Emergency", "Calling emergency line..."),
    },
  ];

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = () => {
    if (!selectedIssue || !form.subject || !form.description) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    Alert.alert(
      "Support Request Submitted",
      "Thank you for contacting us. We'll respond to your inquiry within 24 hours.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  if (selectedIssue === "email") {
    return (
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={() => setSelectedIssue("")}>
            <Image source={icons.backArrow} className="w-6 h-6" />
          </TouchableOpacity>
          <Text className="text-xl font-JakartaSemiBold">Email Support</Text>
          <View className="w-6" />
        </View>

        <ScrollView
          className="flex-1 px-5 py-6"
          showsVerticalScrollIndicator={false}
        >
          {/* Issue Type Selection */}
          <Text className="text-lg font-JakartaSemiBold mb-4">
            What can we help you with?
          </Text>

          {issueTypes.map((issue) => (
            <TouchableOpacity
              key={issue.id}
              className={`p-4 rounded-xl mb-3 border-2 ${selectedIssue === issue.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"}`}
              onPress={() => setSelectedIssue(issue.id)}
            >
              <View className="flex flex-row items-center">
                <Text className="text-2xl mr-3">{issue.icon}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-JakartaSemiBold">
                    {issue.title}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {issue.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Contact Form */}
          <View className="mt-6">
            <InputField
              label="Email Address"
              placeholder="Your email"
              value={form.email}
              onChangeText={(value) => updateForm("email", value)}
              keyboardType="email-address"
              editable={false}
            />

            <InputField
              label="Subject"
              placeholder="Brief description of your issue"
              value={form.subject}
              onChangeText={(value) => updateForm("subject", value)}
            />

            <InputField
              label="Description"
              placeholder="Please provide detailed information about your issue..."
              value={form.description}
              onChangeText={(value) => updateForm("description", value)}
              inputStyle="h-32"
              multiline={true}
              textAlignVertical="top"
            />
          </View>

          <CustomButton
            title="Submit Request"
            onPress={submitForm}
            className="mt-6 mb-10"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Contact Support</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="items-center px-5 py-8 bg-gradient-to-b from-blue-50 to-white">
          <Text className="text-6xl mb-4">🤝</Text>
          <Text className="text-2xl font-JakartaBold text-center mb-2">
            How can we help?
          </Text>
          <Text className="text-gray-600 text-center">
            We're here to assist you 24/7 with any questions or concerns
          </Text>
        </View>

        {/* Contact Methods */}
        <View className="px-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Choose how you'd like to contact us
          </Text>

          {contactMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-4 mb-3"
              onPress={method.action}
            >
              <View className="flex flex-row items-center">
                <Text className="text-3xl mr-4">{method.icon}</Text>
                <View className="flex-1">
                  <Text className="text-lg font-JakartaSemiBold">
                    {method.title}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-1">
                    {method.description}
                  </Text>
                  <Text
                    className={`text-sm font-JakartaSemiBold ${method.statusColor}`}
                  >
                    {method.status}
                  </Text>
                </View>
                <Text className="text-gray-400 text-lg">›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQ Section */}
        <View className="px-5 mt-8">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Common Questions
          </Text>

          {[
            {
              question: "How do I cancel a ride?",
              answer:
                "You can cancel through the app up to 2 minutes after booking.",
            },
            {
              question: "When will I be charged?",
              answer:
                "Payment is processed automatically after your ride is completed.",
            },
            {
              question: "How do I report a lost item?",
              answer: "Use the 'Lost Items' feature in your ride history.",
            },
            {
              question: "What if my driver doesn't arrive?",
              answer:
                "Contact support immediately and we'll help resolve the issue.",
            },
          ].map((faq, index) => (
            <TouchableOpacity
              key={index}
              className="py-4 border-b border-gray-100"
            >
              <Text className="font-JakartaSemiBold mb-1">{faq.question}</Text>
              <Text className="text-gray-600 text-sm">{faq.answer}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            className="py-4"
            onPress={() => router.push("/(root)/settings/help")}
          >
            <Text className="text-blue-500 font-JakartaSemiBold">
              View all FAQ →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Response Times */}
        <View className="mx-5 mt-8 mb-10 bg-gray-50 p-4 rounded-xl">
          <Text className="text-lg font-JakartaSemiBold mb-3">
            Expected Response Times
          </Text>

          <View className="flex flex-row justify-between items-center py-2">
            <Text className="text-gray-700">Live Chat</Text>
            <Text className="font-JakartaSemiBold text-green-600">
              &lt; 1 minute
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center py-2">
            <Text className="text-gray-700">Phone Support</Text>
            <Text className="font-JakartaSemiBold text-blue-600">
              &lt; 5 minutes
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center py-2">
            <Text className="text-gray-700">Email Support</Text>
            <Text className="font-JakartaSemiBold text-orange-600">
              &lt; 24 hours
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactSupport;
