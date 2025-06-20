import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";

// Dummy location data
const dummyLocations = [
  {
    address: "123 Main Street, San Francisco, CA 94102",
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    address: "456 Broadway, Oakland, CA 94607",
    latitude: 37.8044,
    longitude: -122.2712,
  },
  {
    address: "789 Market Street, San Francisco, CA 94103",
    latitude: 37.7849,
    longitude: -122.4094,
  },
  {
    address: "321 Pine Street, Berkeley, CA 94705",
    latitude: 37.8715,
    longitude: -122.2730,
  },
  {
    address: "555 Oak Avenue, Palo Alto, CA 94301",
    latitude: 37.4419,
    longitude: -122.1430,
  },
];

const DeliveryLocations = () => {
  const { type } = useLocalSearchParams(); // 'send' or 'receive'
  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const [pickupLocation, setPickupLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  const [deliveryLocation, setDeliveryLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const handlePickupLocationSet = () => {
    // Use dummy data for now
    const randomLocation = dummyLocations[Math.floor(Math.random() * dummyLocations.length)];
    const location = pickupAddress ? {
      ...randomLocation,
      address: pickupAddress
    } : randomLocation;

    setPickupLocation(location);
    setUserLocation(location);
    if (!pickupAddress) {
      setPickupAddress(location.address);
    }
  };

  const handleDeliveryLocationSet = () => {
    // Use dummy data for now
    const randomLocation = dummyLocations[Math.floor(Math.random() * dummyLocations.length)];
    const location = deliveryAddress ? {
      ...randomLocation,
      address: deliveryAddress
    } : randomLocation;

    setDeliveryLocation(location);
    setDestinationLocation(location);
    if (!deliveryAddress) {
      setDeliveryAddress(location.address);
    }
  };

  const handleContinue = () => {
    if (pickupLocation && deliveryLocation) {
      // Pass the delivery type and locations to the next screen
      router.push(
        `/(root)/delivery-type?type=${type}&pickup=${encodeURIComponent(pickupLocation.address)}&delivery=${encodeURIComponent(deliveryLocation.address)}`,
      );
    }
  };

  const canContinue = pickupLocation && deliveryLocation;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">
          {type === "send"
            ? "Send Package"
            : type === "receive"
              ? "Receive Package"
              : "Package Delivery"}
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-5 py-6" showsVerticalScrollIndicator={false}>
        {/* Header Info */}
        <View className="bg-blue-50 rounded-xl p-4 mb-6">
          <View className="flex flex-row items-center">
            <Text className="text-3xl mr-3">
              {type === "send" ? "📤" : type === "receive" ? "📥" : "📦"}
            </Text>
            <View className="flex-1">
              <Text className="text-lg font-JakartaSemiBold text-blue-800">
                {type === "send"
                  ? "Send a Package"
                  : type === "receive"
                    ? "Receive a Package"
                    : "Package Delivery"}
              </Text>
              <Text className="text-blue-600 text-sm">
                {type === "send"
                  ? "Get your package picked up and delivered"
                  : type === "receive"
                    ? "Have someone deliver a package to you"
                    : "Select pickup and delivery locations"}
              </Text>
            </View>
          </View>
        </View>

        {/* Pickup Location */}
        <View className="mb-6">
          <View className="flex flex-row items-center mb-3">
            <View className="w-4 h-4 bg-green-500 rounded-full mr-3" />
            <Text className="text-lg font-JakartaSemiBold">
              {type === "send" ? "Pickup Location" : "Package Location"}
            </Text>
          </View>

          <InputField
            label=""
            placeholder={
              type === "send"
                ? "Enter pickup address..."
                : "Enter package location..."
            }
            value={pickupAddress}
            onChangeText={setPickupAddress}
            icon={icons.target}
            containerStyle="mb-3"
          />

          <TouchableOpacity
            onPress={handlePickupLocationSet}
            className="bg-green-500 py-3 px-4 rounded-lg mb-2"
          >
            <Text className="text-white font-JakartaSemiBold text-center">
              {pickupLocation ? "Update Pickup Location" : "Set Pickup Location"}
            </Text>
          </TouchableOpacity>

          {pickupLocation && (
            <View className="p-3 bg-green-50 rounded-lg">
              <Text className="text-green-800 text-sm">
                ✓ {pickupLocation.address}
              </Text>
            </View>
          )}
        </View>

        {/* Delivery Location */}
        <View className="mb-6">
          <View className="flex flex-row items-center mb-3">
            <View className="w-4 h-4 bg-red-500 rounded-full mr-3" />
            <Text className="text-lg font-JakartaSemiBold">
              {type === "send" ? "Delivery Location" : "Your Location"}
            </Text>
          </View>

          <InputField
            label=""
            placeholder={
              type === "send"
                ? "Enter delivery address..."
                : "Enter your address..."
            }
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            icon={icons.point}
            containerStyle="mb-3"
          />

          <TouchableOpacity
            onPress={handleDeliveryLocationSet}
            className="bg-red-500 py-3 px-4 rounded-lg mb-2"
          >
            <Text className="text-white font-JakartaSemiBold text-center">
              {deliveryLocation ? "Update Delivery Location" : "Set Delivery Location"}
            </Text>
          </TouchableOpacity>

          {deliveryLocation && (
            <View className="p-3 bg-red-50 rounded-lg">
              <Text className="text-red-800 text-sm">
                ✓ {deliveryLocation.address}
              </Text>
            </View>
          )}
        </View>

        {/* Distance Info */}
        {pickupLocation && deliveryLocation && (
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-gray-600">Estimated Distance</Text>
              <Text className="font-JakartaSemiBold">~5.2 miles</Text>
            </View>
            <View className="flex flex-row items-center justify-between mt-2">
              <Text className="text-gray-600">Estimated Time</Text>
              <Text className="font-JakartaSemiBold">15-25 minutes</Text>
            </View>
          </View>
        )}

        {/* Dummy Data Notice */}
        <View className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <View className="flex flex-row items-center">
            <Text className="text-2xl mr-3">ℹ️</Text>
            <View className="flex-1">
              <Text className="font-JakartaSemiBold text-yellow-800 mb-1">
                Using Demo Locations
              </Text>
              <Text className="text-yellow-700 text-sm">
                Enter any address and click the set location button.
                Real Google Maps integration will be added later.
              </Text>
            </View>
          </View>
        </View>

        {/* Continue Button */}
        <View className="mt-auto">
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            className={canContinue ? "bg-blue-500" : "bg-gray-300"}
            disabled={!canContinue}
          />

          {!canContinue && (
            <Text className="text-gray-500 text-center mt-2 text-sm">
              Please set both pickup and delivery locations
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryLocations;
