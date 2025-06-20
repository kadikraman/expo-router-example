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
import { icons } from "@/constants";

interface PaymentMethod {
  id: string;
  type: "credit" | "debit" | "paypal" | "apple_pay" | "google_pay";
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
  name: string;
}

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "credit",
      last4: "4242",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true,
      name: "Personal Card",
    },
    {
      id: "2",
      type: "credit",
      last4: "5555",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
      name: "Business Card",
    },
    {
      id: "3",
      type: "paypal",
      last4: "",
      brand: "PayPal",
      expiryMonth: 0,
      expiryYear: 0,
      isDefault: false,
      name: "john.doe@example.com",
    },
  ]);

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
    Alert.alert("Success", "Default payment method updated.");
  };

  const removePaymentMethod = (id: string) => {
    const method = paymentMethods.find((m) => m.id === id);
    if (method?.isDefault) {
      Alert.alert(
        "Error",
        "Cannot remove default payment method. Please set another method as default first.",
      );
      return;
    }

    Alert.alert(
      "Remove Payment Method",
      "Are you sure you want to remove this payment method?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setPaymentMethods((prev) =>
              prev.filter((method) => method.id !== id),
            );
          },
        },
      ],
    );
  };

  const getCardIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return "💳";
      case "mastercard":
        return "💳";
      case "amex":
        return "💳";
      case "discover":
        return "💳";
      case "paypal":
        return "🅿️";
      case "apple_pay":
        return "🍎";
      case "google_pay":
        return "🅶";
      default:
        return "💳";
    }
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <View
      key={method.id}
      className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-4 mb-3"
    >
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center flex-1">
          <Text className="text-2xl mr-3">{getCardIcon(method.brand)}</Text>
          <View className="flex-1">
            <Text className="text-lg font-JakartaSemiBold">
              {method.brand}{" "}
              {method.last4 ? `•••• ${method.last4}` : method.name}
            </Text>
            {method.last4 && (
              <Text className="text-gray-600">
                Expires {method.expiryMonth.toString().padStart(2, "0")}/
                {method.expiryYear}
              </Text>
            )}
            {method.isDefault && (
              <View className="bg-blue-100 self-start px-2 py-1 rounded-full mt-1">
                <Text className="text-blue-800 text-xs font-bold">DEFAULT</Text>
              </View>
            )}
          </View>
        </View>

        <View className="flex flex-row space-x-2">
          {!method.isDefault && (
            <TouchableOpacity
              onPress={() => setDefaultPaymentMethod(method.id)}
              className="bg-blue-500 px-3 py-2 rounded-lg"
            >
              <Text className="text-white text-sm font-JakartaSemiBold">
                Set Default
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => removePaymentMethod(method.id)}
            className="bg-red-500 px-3 py-2 rounded-lg"
          >
            <Text className="text-white text-sm font-JakartaSemiBold">
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Payment Methods</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Current Payment Methods */}
        <View className="px-5 py-6">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Your Payment Methods
          </Text>

          {paymentMethods.map(renderPaymentMethod)}

          {paymentMethods.length === 0 && (
            <View className="bg-gray-50 rounded-xl p-8 items-center">
              <Text className="text-4xl mb-4">💳</Text>
              <Text className="text-lg font-JakartaSemiBold mb-2">
                No Payment Methods
              </Text>
              <Text className="text-gray-600 text-center">
                Add a payment method to start booking rides
              </Text>
            </View>
          )}
        </View>

        {/* Add Payment Method */}
        <View className="px-5 mb-5">
          <CustomButton
            title="Add Payment Method"
            onPress={() =>
              Alert.alert(
                "Add Payment",
                "This would open payment method selection",
              )
            }
            className="mb-3"
          />
        </View>

        {/* Payment Preferences */}
        <View className="mx-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Payment Preferences
          </Text>

          <TouchableOpacity className="flex flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex flex-row items-center">
              <Text className="text-xl mr-3">🧾</Text>
              <View>
                <Text className="text-lg font-JakartaMedium">Auto-pay</Text>
                <Text className="text-gray-600 text-sm">
                  Automatically pay after rides
                </Text>
              </View>
            </View>
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-green-800 text-xs font-bold">ON</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex flex-row items-center">
              <Text className="text-xl mr-3">📧</Text>
              <Text className="text-lg font-JakartaMedium">Email Receipts</Text>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center justify-between py-3">
            <View className="flex flex-row items-center">
              <Text className="text-xl mr-3">💰</Text>
              <Text className="text-lg font-JakartaMedium">Tip Settings</Text>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>
        </View>

        {/* Supported Payment Methods */}
        <View className="mx-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Accepted Payment Methods
          </Text>

          <View className="flex flex-row flex-wrap">
            {[
              { name: "Visa", icon: "💳" },
              { name: "Mastercard", icon: "💳" },
              { name: "American Express", icon: "💳" },
              { name: "Discover", icon: "💳" },
              { name: "PayPal", icon: "🅿️" },
              { name: "Apple Pay", icon: "🍎" },
              { name: "Google Pay", icon: "🅶" },
            ].map((method, index) => (
              <View
                key={index}
                className="flex flex-row items-center mr-4 mb-2"
              >
                <Text className="text-lg mr-2">{method.icon}</Text>
                <Text className="text-gray-700">{method.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Billing History */}
        <View className="mx-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-5">
          <View className="flex flex-row items-center justify-between mb-4">
            <Text className="text-lg font-JakartaSemiBold">
              Recent Transactions
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-JakartaSemiBold">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {[
            {
              date: "Jan 15, 2024",
              amount: "$15.50",
              description: "Ride to Airport",
              status: "Completed",
            },
            {
              date: "Jan 12, 2024",
              amount: "$12.75",
              description: "Ride to Downtown",
              status: "Completed",
            },
            {
              date: "Jan 10, 2024",
              amount: "$22.00",
              description: "Ride to Mall",
              status: "Completed",
            },
          ].map((transaction, index) => (
            <View
              key={index}
              className="flex flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
            >
              <View>
                <Text className="font-JakartaSemiBold">
                  {transaction.description}
                </Text>
                <Text className="text-gray-600 text-sm">
                  {transaction.date}
                </Text>
              </View>
              <View className="items-end">
                <Text className="font-JakartaSemiBold">
                  {transaction.amount}
                </Text>
                <Text className="text-green-600 text-sm">
                  {transaction.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Security Notice */}
        <View className="mx-5 mb-10 bg-blue-50 p-4 rounded-xl">
          <Text className="text-blue-800 font-JakartaSemiBold mb-2">
            🔒 Security
          </Text>
          <Text className="text-blue-700 text-sm">
            Your payment information is encrypted and stored securely. We never
            store your full card details.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethods;
