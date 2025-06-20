import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { useDriverModeStore } from "@/store";

// Delivery status options
const DELIVERY_STATUSES = [
  {
    id: "picked_up",
    label: "Picked Up",
    icon: "✅",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "on_way",
    label: "On the Way",
    icon: "🚗",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "arrived",
    label: "Arrived",
    icon: "📍",
    color: "bg-orange-100 text-orange-800",
  },
  {
    id: "delivered",
    label: "Delivered",
    icon: "🎉",
    color: "bg-purple-100 text-purple-800",
  },
];

// Cancellation reasons
const CANCELLATION_REASONS = [
  {
    id: "customer_unavailable",
    label: "Customer Unavailable",
    description: "Customer not responding or not at location",
  },
  {
    id: "wrong_address",
    label: "Wrong Address",
    description: "Address is incorrect or doesn't exist",
  },
  {
    id: "order_issues",
    label: "Order Issues",
    description: "Restaurant missing items or order problems",
  },
  {
    id: "customer_cancelled",
    label: "Customer Cancelled",
    description: "Customer requested to cancel the order",
  },
  {
    id: "vehicle_issues",
    label: "Vehicle Issues",
    description: "Car trouble or other transportation problems",
  },
  {
    id: "safety_concerns",
    label: "Safety Concerns",
    description: "Unsafe location or situation",
  },
  { id: "other", label: "Other", description: "Other issues not listed above" },
];

const ActiveDelivery = () => {
  const { id } = useLocalSearchParams();
  const { activeDelivery, completeDelivery } = useDriverModeStore();
  const [currentStatus, setCurrentStatus] = useState("picked_up");
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [selectedCancellationReason, setSelectedCancellationReason] = useState<
    string | null
  >(null);

  if (!activeDelivery) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl font-JakartaSemiBold">
            No active delivery
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 bg-blue-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-JakartaSemiBold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleStatusUpdate = (statusId: string) => {
    setCurrentStatus(statusId);
    Alert.alert(
      "Status Updated",
      `Delivery status updated to: ${DELIVERY_STATUSES.find((s) => s.id === statusId)?.label}`,
    );
  };

  const handleCompleteDelivery = () => {
    Alert.alert(
      "Complete Delivery",
      "Are you sure you want to mark this delivery as completed?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Complete",
          onPress: () => {
            completeDelivery();
            router.replace("/(root)/(tabs)/home");
          },
        },
      ],
    );
  };

  const handleCancelDelivery = () => {
    if (!selectedCancellationReason) {
      Alert.alert("Select Reason", "Please select a cancellation reason.");
      return;
    }

    const reason = CANCELLATION_REASONS.find(
      (r) => r.id === selectedCancellationReason,
    );

    Alert.alert(
      "Cancel Delivery",
      `Are you sure you want to cancel this delivery?\n\nReason: ${reason?.label}`,
      [
        { text: "No, Continue Delivery", style: "cancel" },
        {
          text: "Yes, Cancel Delivery",
          style: "destructive",
          onPress: () => {
            // Add cancellation logic to store
            useDriverModeStore
              .getState()
              .cancelDelivery(selectedCancellationReason);
            setShowCancellationModal(false);
            Alert.alert(
              "Delivery Cancelled",
              "The delivery has been cancelled. You'll receive partial compensation based on progress made.",
              [
                {
                  text: "OK",
                  onPress: () => router.replace("/(root)/(tabs)/home"),
                },
              ],
            );
          },
        },
      ],
    );
  };

  const handleCallCustomer = () => {
    Alert.alert(
      "Calling Customer",
      `Calling ${activeDelivery.customerName} at ${activeDelivery.customerPhone}`,
    );
  };

  const handleMessageCustomer = () => {
    // Create proper customer chat ID based on delivery
    const customerChatId = `customer_${activeDelivery.id}`;
    router.push(
      `/(root)/message-thread?id=${customerChatId}&deliveryId=${activeDelivery.id}`,
    );
  };

  const handleNavigation = (destination: "pickup" | "delivery") => {
    const address =
      destination === "pickup"
        ? activeDelivery.pickupAddress
        : activeDelivery.deliveryAddress;
    Alert.alert("Navigation", `Opening navigation to: ${address}`);
  };

  const CancellationModal = () => (
    <Modal
      visible={showCancellationModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowCancellationModal(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl p-6 max-h-[80%]">
          <View className="flex flex-row items-center justify-between mb-6">
            <Text className="text-xl font-JakartaBold">Cancel Delivery</Text>
            <TouchableOpacity onPress={() => setShowCancellationModal(false)}>
              <Image
                source={icons.close}
                className="w-6 h-6"
                tintColor="#666"
              />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-600 mb-4">
            Select the reason for cancelling this delivery:
          </Text>

          <ScrollView className="max-h-80">
            {CANCELLATION_REASONS.map((reason) => (
              <TouchableOpacity
                key={reason.id}
                onPress={() => setSelectedCancellationReason(reason.id)}
                className={`p-4 rounded-xl mb-3 border-2 ${
                  selectedCancellationReason === reason.id
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <Text
                  className={`font-JakartaSemiBold text-lg ${
                    selectedCancellationReason === reason.id
                      ? "text-red-800"
                      : "text-gray-800"
                  }`}
                >
                  {reason.label}
                </Text>
                <Text
                  className={`text-sm mt-1 ${
                    selectedCancellationReason === reason.id
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {reason.description}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View className="flex flex-row space-x-3 mt-6">
            <TouchableOpacity
              onPress={() => setShowCancellationModal(false)}
              className="flex-1 bg-gray-200 py-3 rounded-lg"
            >
              <Text className="text-gray-700 font-JakartaSemiBold text-center">
                Continue Delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancelDelivery}
              className={`flex-1 py-3 rounded-lg ${
                selectedCancellationReason ? "bg-red-500" : "bg-gray-300"
              }`}
              disabled={!selectedCancellationReason}
            >
              <Text
                className={`font-JakartaSemiBold text-center ${
                  selectedCancellationReason ? "text-white" : "text-gray-500"
                }`}
              >
                Cancel Delivery
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Active Delivery</Text>
        <TouchableOpacity onPress={handleCompleteDelivery}>
          <Text className="text-green-600 font-JakartaSemiBold">Complete</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Delivery Status */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Delivery Status
          </Text>
          <View className="flex flex-row flex-wrap">
            {DELIVERY_STATUSES.map((status) => (
              <TouchableOpacity
                key={status.id}
                onPress={() => handleStatusUpdate(status.id)}
                className={`mr-3 mb-3 px-3 py-2 rounded-lg ${
                  currentStatus === status.id ? status.color : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-sm font-JakartaSemiBold ${
                    currentStatus === status.id ? "" : "text-gray-600"
                  }`}
                >
                  {status.icon} {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Details */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Order Details
          </Text>

          <View className="flex flex-row justify-between items-center mb-4">
            <View>
              <Text className="text-gray-500 text-sm">Order ID</Text>
              <Text className="font-JakartaSemiBold">#{activeDelivery.id}</Text>
            </View>
            <View>
              <Text className="text-gray-500 text-sm">Earnings</Text>
              <Text className="font-JakartaSemiBold text-green-600">
                ${activeDelivery.fare}
              </Text>
            </View>
          </View>

          <View className="bg-gray-50 p-3 rounded-lg">
            <Text className="font-JakartaSemiBold mb-2">Items:</Text>
            <Text className="text-gray-700">{activeDelivery.orderDetails}</Text>
          </View>
        </View>

        {/* Pickup Information */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Pickup Location
          </Text>

          <View className="flex flex-row items-start mb-4">
            <View className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3" />
            <View className="flex-1">
              <Text className="font-JakartaSemiBold">
                {activeDelivery.pickupAddress}
              </Text>
              <Text className="text-gray-600 text-sm">Restaurant/Store</Text>
            </View>
          </View>

          <View className="flex flex-row space-x-3">
            <CustomButton
              title="Navigate"
              onPress={() => handleNavigation("pickup")}
              className="flex-1 bg-green-500"
              IconLeft={() => (
                <Image
                  source={icons.map}
                  className="w-4 h-4 mr-2"
                  tintColor="white"
                />
              )}
            />
            <TouchableOpacity className="bg-green-100 px-4 py-3 rounded-lg">
              <Text className="text-green-800 font-JakartaSemiBold">
                Call Store
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Customer Information */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Customer Details
          </Text>

          <View className="flex flex-row items-center mb-4">
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Text className="text-blue-600 font-JakartaBold text-lg">
                {activeDelivery.customerName.charAt(0)}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="font-JakartaSemiBold">
                {activeDelivery.customerName}
              </Text>
              <Text className="text-gray-600 text-sm">
                {activeDelivery.customerPhone}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-start mb-4">
            <View className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-3" />
            <View className="flex-1">
              <Text className="font-JakartaSemiBold">
                {activeDelivery.deliveryAddress}
              </Text>
              <Text className="text-gray-600 text-sm">Delivery Location</Text>
            </View>
          </View>

          <View className="flex flex-row space-x-3">
            <CustomButton
              title="Navigate"
              onPress={() => handleNavigation("delivery")}
              className="flex-1 bg-blue-500"
              IconLeft={() => (
                <Image
                  source={icons.map}
                  className="w-4 h-4 mr-2"
                  tintColor="white"
                />
              )}
            />
            <TouchableOpacity
              onPress={handleCallCustomer}
              className="bg-blue-100 px-4 py-3 rounded-lg flex-row items-center"
            >
              <Image
                source={icons.star}
                className="w-4 h-4 mr-2"
                tintColor="#3B82F6"
              />
              <Text className="text-blue-800 font-JakartaSemiBold">Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleMessageCustomer}
              className="bg-blue-100 px-4 py-3 rounded-lg flex-row items-center"
            >
              <Image
                source={icons.chat}
                className="w-4 h-4 mr-2"
                tintColor="#3B82F6"
              />
              <Text className="text-blue-800 font-JakartaSemiBold">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Timeline */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Estimated Timeline
          </Text>

          <View className="flex flex-row justify-between items-center">
            <View className="items-center">
              <Text className="text-sm text-gray-500">Distance</Text>
              <Text className="font-JakartaSemiBold">
                {activeDelivery.distance}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-500">Est. Time</Text>
              <Text className="font-JakartaSemiBold">
                {activeDelivery.estimatedTime}
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-sm text-gray-500">Started</Text>
              <Text className="font-JakartaSemiBold">
                {activeDelivery.requestTime}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View className="mx-5 mt-5 mb-10">
          <CustomButton
            title="Mark as Delivered"
            onPress={handleCompleteDelivery}
            className="bg-green-500 mb-3"
          />

          <View className="flex flex-row space-x-3">
            <TouchableOpacity
              onPress={() => setShowCancellationModal(true)}
              className="flex-1 bg-red-100 py-3 rounded-lg items-center"
            >
              <Text className="text-red-800 font-JakartaSemiBold">
                Cancel Delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-100 py-3 rounded-lg items-center">
              <Text className="text-gray-700 font-JakartaSemiBold">
                Need Help
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CancellationModal />
    </SafeAreaView>
  );
};

export default ActiveDelivery;
