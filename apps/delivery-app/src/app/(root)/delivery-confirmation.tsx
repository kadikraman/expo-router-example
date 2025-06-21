import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

const DeliveryConfirmation = () => {
  const params = useLocalSearchParams();
  const {
    type,
    pickup,
    delivery,
    size,
    description,
    vehicle,
    price,
    distance,
    recipientName,
    senderName,
    specialInstructions,
  } = params;

  const [isBooking, setIsBooking] = useState(false);

  const handleConfirmBooking = async () => {
    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      // Navigate to the delivery request tracking screen
      router.push(
        `/(root)/delivery-request?${new URLSearchParams(Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)]))).toString()}`,
      );
    }, 2000);
  };

  const handleEditDetails = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Confirm Booking</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 py-6">
          {/* Booking Summary Header */}
          <View className="bg-blue-50 rounded-xl p-6 mb-6">
            <View className="items-center">
              <Text className="text-4xl mb-3">
                {type === "send" ? "📤" : "📥"}
              </Text>
              <Text className="text-2xl font-JakartaBold text-blue-800 mb-2">
                Ready to Book!
              </Text>
              <Text className="text-blue-600 text-center">
                Review your delivery details and confirm your booking.
              </Text>
            </View>
          </View>

          {/* Route Information */}
          <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-4">
            <Text className="text-lg font-JakartaSemiBold mb-4">
              Delivery Route
            </Text>

            <View className="flex flex-row items-start mb-4">
              <View className="w-4 h-4 bg-green-500 rounded-full mr-3 mt-1" />
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-1">
                  {type === "send" ? "Pickup Location" : "Package Location"}
                </Text>
                <Text className="font-JakartaSemiBold">
                  {decodeURIComponent(pickup as string)}
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-start">
              <View className="w-4 h-4 bg-red-500 rounded-full mr-3 mt-1" />
              <View className="flex-1">
                <Text className="text-sm text-gray-500 mb-1">
                  {type === "send" ? "Delivery Location" : "Your Location"}
                </Text>
                <Text className="font-JakartaSemiBold">
                  {decodeURIComponent(delivery as string)}
                </Text>
              </View>
            </View>
          </View>

          {/* Package Details */}
          <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-4">
            <Text className="text-lg font-JakartaSemiBold mb-4">
              Package Details
            </Text>

            <View className="space-y-3">
              <View className="flex flex-row justify-between">
                <Text className="text-gray-600">Package Type</Text>
                <Text className="font-JakartaSemiBold capitalize">
                  {type}ing
                </Text>
              </View>

              <View className="flex flex-row justify-between">
                <Text className="text-gray-600">Size</Text>
                <Text className="font-JakartaSemiBold capitalize">{size}</Text>
              </View>

              <View className="flex flex-row justify-between">
                <Text className="text-gray-600">Vehicle</Text>
                <Text className="font-JakartaSemiBold capitalize">
                  {vehicle}
                </Text>
              </View>

              <View className="flex flex-row justify-between">
                <Text className="text-gray-600">Distance</Text>
                <Text className="font-JakartaSemiBold">{distance} miles</Text>
              </View>

              <View className="border-t border-gray-100 pt-3">
                <Text className="text-gray-600 mb-2">Description</Text>
                <Text className="text-gray-800">{description}</Text>
              </View>

              {specialInstructions && (
                <View className="border-t border-gray-100 pt-3">
                  <Text className="text-gray-600 mb-2">
                    Special Instructions
                  </Text>
                  <Text className="text-gray-800">{specialInstructions}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Contact Information */}
          {(recipientName || senderName) && (
            <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-4">
              <Text className="text-lg font-JakartaSemiBold mb-4">
                Contact Information
              </Text>

              {type === "send" && recipientName && (
                <View>
                  <Text className="text-gray-600 mb-1">Recipient</Text>
                  <Text className="font-JakartaSemiBold">{recipientName}</Text>
                </View>
              )}

              {type === "receive" && senderName && (
                <View>
                  <Text className="text-gray-600 mb-1">Sender</Text>
                  <Text className="font-JakartaSemiBold">{senderName}</Text>
                </View>
              )}
            </View>
          )}

          {/* Pricing Summary */}
          <View className="bg-green-50 rounded-xl border border-green-200 p-5 mb-6">
            <Text className="text-lg font-JakartaSemiBold text-green-800 mb-4">
              Total Cost
            </Text>

            <View className="flex flex-row justify-between items-center">
              <Text className="text-green-700">Delivery Fee</Text>
              <Text className="text-2xl font-JakartaBold text-green-800">
                ${price}
              </Text>
            </View>

            <View className="border-t border-green-200 mt-4 pt-4">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-lg font-JakartaSemiBold text-green-800">
                  Total
                </Text>
                <Text className="text-2xl font-JakartaBold text-green-800">
                  ${price}
                </Text>
              </View>
            </View>
          </View>

          {/* Features Included */}
          <View className="bg-blue-50 rounded-xl p-5 mb-6">
            <Text className="text-lg font-JakartaSemiBold text-blue-800 mb-4">
              What's Included
            </Text>

            <View className="space-y-3">
              <View className="flex flex-row items-center">
                <Text className="text-blue-600 mr-3 text-lg">✓</Text>
                <Text className="text-blue-700">Real-time tracking</Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="text-blue-600 mr-3 text-lg">✓</Text>
                <Text className="text-blue-700">
                  Photo confirmation of delivery
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="text-blue-600 mr-3 text-lg">✓</Text>
                <Text className="text-blue-700">
                  Direct communication with driver
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <Text className="text-blue-600 mr-3 text-lg">✓</Text>
                <Text className="text-blue-700">
                  Package protection up to $100
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="space-y-3">
            <CustomButton
              title={isBooking ? "Booking..." : "Confirm & Book Delivery"}
              onPress={handleConfirmBooking}
              className={isBooking ? "bg-gray-400" : "bg-green-500"}
              disabled={isBooking}
            />

            <TouchableOpacity
              onPress={handleEditDetails}
              className="bg-gray-100 py-4 rounded-lg"
              disabled={isBooking}
            >
              <Text className="text-gray-700 font-JakartaSemiBold text-center">
                Edit Details
              </Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View className="mt-6 mb-10">
            <Text className="text-xs text-gray-500 text-center leading-5">
              By confirming your booking, you agree to our Terms of Service and
              Privacy Policy. Your payment will be processed securely once the
              delivery is completed.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryConfirmation;
