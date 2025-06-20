import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
import Map from "@/components/Map";
import { icons } from "@/constants";

interface DeliveryStatus {
  id: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  isCompleted: boolean;
}

const deliveryStatuses: DeliveryStatus[] = [
  {
    id: "requested",
    title: "Request Submitted",
    description: "Your delivery request has been submitted",
    icon: "📝",
    isActive: true,
    isCompleted: true,
  },
  {
    id: "searching",
    title: "Finding Driver",
    description: "We are looking for available drivers nearby",
    icon: "🔍",
    isActive: true,
    isCompleted: false,
  },
  {
    id: "accepted",
    title: "Driver Found",
    description: "A driver has accepted your delivery request",
    icon: "👤",
    isActive: false,
    isCompleted: false,
  },
  {
    id: "pickup",
    title: "En Route to Pickup",
    description: "Driver is heading to pickup location",
    icon: "🚗",
    isActive: false,
    isCompleted: false,
  },
  {
    id: "delivery",
    title: "Out for Delivery",
    description: "Package is on the way to destination",
    icon: "📦",
    isActive: false,
    isCompleted: false,
  },
];

const DeliveryRequest = () => {
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

  const [currentStatus, setCurrentStatus] = useState(0);
  const [searchTime, setSearchTime] = useState(0);
  const [driverFound, setDriverFound] = useState(false);
  const [driverInfo, setDriverInfo] = useState<any>(null);

  // Simulate driver search process
  useEffect(() => {
    const timer = setInterval(() => {
      setSearchTime((prev) => prev + 1);

      // Simulate finding a driver after 15-30 seconds
      if (searchTime >= 15 && !driverFound && Math.random() > 0.7) {
        setDriverFound(true);
        setCurrentStatus(2); // Driver found
        setDriverInfo({
          name: "Michael Johnson",
          rating: 4.8,
          vehicle: "Honda Civic",
          licensePlate: "ABC-123",
          estimatedArrival: "8 minutes",
          photo:
            "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/400x400/",
        });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [searchTime, driverFound]);

  const handleCancelRequest = () => {
    Alert.alert(
      "Cancel Delivery Request",
      "Are you sure you want to cancel this delivery request?",
      [
        { text: "No, Keep Request", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => router.replace("/(root)/(tabs)/home"),
        },
      ],
    );
  };

  const handleContactDriver = () => {
    if (driverInfo) {
      router.push(
        `/(root)/message-thread?id=${driverInfo.name.replace(" ", "_").toLowerCase()}&isDelivery=true`,
      );
    }
  };

  const getStatusColor = (index: number) => {
    if (index < currentStatus) return "bg-green-500";
    if (index === currentStatus) return "bg-blue-500";
    return "bg-gray-300";
  };

  const getStatusTextColor = (index: number) => {
    if (index <= currentStatus) return "text-gray-800";
    return "text-gray-500";
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/home")}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Delivery Status</Text>
        <TouchableOpacity onPress={handleCancelRequest}>
          <Text className="text-red-500 font-JakartaSemiBold">Cancel</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Map Section */}
        <View className="h-64 bg-gray-100">
          <Map />

          {/* Status Overlay */}
          <View className="absolute top-4 left-4 right-4 bg-white rounded-xl p-3 shadow-lg">
            <Text className="font-JakartaSemiBold text-lg">
              {deliveryStatuses[currentStatus]?.title}
            </Text>
            <Text className="text-gray-600 text-sm">
              {deliveryStatuses[currentStatus]?.description}
            </Text>
            {currentStatus === 1 && (
              <Text className="text-blue-600 text-sm mt-1">
                Searching for {searchTime} seconds...
              </Text>
            )}
          </View>
        </View>

        <View className="px-5 py-6">
          {/* Driver Information */}
          {driverFound && driverInfo && (
            <View className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
              <Text className="font-JakartaSemiBold text-green-800 mb-3">
                Driver Found!
              </Text>
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: driverInfo.photo }}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <View className="flex-1">
                  <Text className="text-lg font-JakartaSemiBold">
                    {driverInfo.name}
                  </Text>
                  <Text className="text-gray-600">
                    {driverInfo.vehicle} • {driverInfo.licensePlate}
                  </Text>
                  <View className="flex flex-row items-center mt-1">
                    <Text className="text-yellow-500">★</Text>
                    <Text className="text-sm text-gray-600 ml-1">
                      {driverInfo.rating}
                    </Text>
                    <Text className="text-sm text-gray-600 ml-3">
                      ETA: {driverInfo.estimatedArrival}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="flex flex-row space-x-3 mt-4">
                <CustomButton
                  title="Contact Driver"
                  onPress={handleContactDriver}
                  className="flex-1 bg-green-600"
                />
                <TouchableOpacity className="bg-green-100 px-4 py-3 rounded-lg">
                  <Text className="text-green-800 font-JakartaSemiBold">
                    Call
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Delivery Progress */}
          <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-6">
            <Text className="text-lg font-JakartaSemiBold mb-4">
              Delivery Progress
            </Text>

            {deliveryStatuses.map((status, index) => (
              <View
                key={status.id}
                className="flex flex-row items-center mb-4 last:mb-0"
              >
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center mr-4 ${getStatusColor(index)}`}
                >
                  {index < currentStatus ? (
                    <Text className="text-white text-sm">✓</Text>
                  ) : index === currentStatus ? (
                    <Text className="text-white text-lg">•</Text>
                  ) : (
                    <Text className="text-gray-500 text-lg">•</Text>
                  )}
                </View>
                <View className="flex-1">
                  <Text
                    className={`font-JakartaSemiBold ${getStatusTextColor(index)}`}
                  >
                    {status.title}
                  </Text>
                  <Text
                    className={`text-sm ${index <= currentStatus ? "text-gray-600" : "text-gray-400"}`}
                  >
                    {status.description}
                  </Text>
                </View>
                <Text className="text-2xl opacity-50">{status.icon}</Text>
              </View>
            ))}
          </View>

          {/* Package Details */}
          <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-6">
            <Text className="text-lg font-JakartaSemiBold mb-4">
              Package Details
            </Text>

            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-gray-600">Package Type</Text>
              <Text className="font-JakartaSemiBold capitalize">{type}ing</Text>
            </View>

            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-gray-600">Size</Text>
              <Text className="font-JakartaSemiBold capitalize">{size}</Text>
            </View>

            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-gray-600">Vehicle</Text>
              <Text className="font-JakartaSemiBold capitalize">{vehicle}</Text>
            </View>

            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-gray-600">Distance</Text>
              <Text className="font-JakartaSemiBold">{distance} miles</Text>
            </View>

            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-gray-600">Total Cost</Text>
              <Text className="font-JakartaBold text-green-600">${price}</Text>
            </View>

            <View className="border-t border-gray-100 pt-3 mt-3">
              <Text className="text-gray-600 mb-2">Description</Text>
              <Text className="text-gray-800">{description}</Text>
            </View>

            {specialInstructions && (
              <View className="border-t border-gray-100 pt-3 mt-3">
                <Text className="text-gray-600 mb-2">Special Instructions</Text>
                <Text className="text-gray-800">{specialInstructions}</Text>
              </View>
            )}
          </View>

          {/* Route Information */}
          <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-6">
            <Text className="text-lg font-JakartaSemiBold mb-4">
              Delivery Route
            </Text>

            <View className="flex flex-row items-center mb-3">
              <View className="w-4 h-4 bg-green-500 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="text-sm text-gray-500">Pickup Location</Text>
                <Text className="font-JakartaSemiBold">
                  {decodeURIComponent(pickup as string)}
                </Text>
              </View>
            </View>

            <View className="flex flex-row items-center">
              <View className="w-4 h-4 bg-red-500 rounded-full mr-3" />
              <View className="flex-1">
                <Text className="text-sm text-gray-500">Delivery Location</Text>
                <Text className="font-JakartaSemiBold">
                  {decodeURIComponent(delivery as string)}
                </Text>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          {(recipientName || senderName) && (
            <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-6">
              <Text className="text-lg font-JakartaSemiBold mb-4">
                Contact Information
              </Text>

              {type === "send" && recipientName && (
                <View className="mb-3">
                  <Text className="text-gray-600 mb-1">Recipient</Text>
                  <Text className="font-JakartaSemiBold">{recipientName}</Text>
                </View>
              )}

              {type === "receive" && senderName && (
                <View className="mb-3">
                  <Text className="text-gray-600 mb-1">Sender</Text>
                  <Text className="font-JakartaSemiBold">{senderName}</Text>
                </View>
              )}
            </View>
          )}

          {/* Cancel Request Button */}
          {!driverFound && (
            <View className="mt-6 mb-10">
              <TouchableOpacity
                onPress={handleCancelRequest}
                className="bg-red-50 border border-red-200 py-3 rounded-lg items-center"
              >
                <Text className="text-red-700 font-JakartaSemiBold">
                  Cancel Request
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryRequest;
