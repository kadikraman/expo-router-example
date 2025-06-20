import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import Map from "@/components/Map";
import { icons } from "@/constants";

interface VehicleType {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  pricePerMile: number;
  estimatedTime: string;
  capacity: string;
}

const vehicleTypes: VehicleType[] = [
  {
    id: "bike",
    name: "Bike",
    description: "Quick delivery for small packages",
    icon: "🚴‍♂️",
    basePrice: 5.0,
    pricePerMile: 1.5,
    estimatedTime: "15-25 mins",
    capacity: "Up to 10 lbs",
  },
  {
    id: "car",
    name: "Car",
    description: "Standard delivery for most packages",
    icon: "🚗",
    basePrice: 8.0,
    pricePerMile: 2.0,
    estimatedTime: "20-30 mins",
    capacity: "Up to 50 lbs",
  },
  {
    id: "van",
    name: "Van",
    description: "Large packages and multiple items",
    icon: "🚐",
    basePrice: 15.0,
    pricePerMile: 3.5,
    estimatedTime: "25-35 mins",
    capacity: "Up to 200 lbs",
  },
  {
    id: "truck",
    name: "Truck",
    description: "Heavy items and furniture",
    icon: "🚛",
    basePrice: 25.0,
    pricePerMile: 5.0,
    estimatedTime: "30-45 mins",
    capacity: "Up to 500 lbs",
  },
];

const DeliveryVehicle = () => {
  const params = useLocalSearchParams();
  const { type, pickup, delivery, size, description } = params;
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");

  // Simulate distance calculation (in a real app, this would use Google Maps API)
  const estimatedDistance = 5.2; // miles

  const calculatePrice = (vehicle: VehicleType) => {
    return vehicle.basePrice + vehicle.pricePerMile * estimatedDistance;
  };

  const getFilteredVehicles = () => {
    // Filter vehicles based on package size
    switch (size) {
      case "small":
        return vehicleTypes.filter((v) => ["bike", "car"].includes(v.id));
      case "medium":
        return vehicleTypes.filter((v) => ["car", "van"].includes(v.id));
      case "large":
        return vehicleTypes.filter((v) => ["van", "truck"].includes(v.id));
      case "extra_large":
        return vehicleTypes.filter((v) => v.id === "truck");
      default:
        return vehicleTypes;
    }
  };

  const handleContinue = () => {
    if (selectedVehicle) {
      const selectedVehicleData = vehicleTypes.find(
        (v) => v.id === selectedVehicle,
      );
      const finalPrice = selectedVehicleData
        ? calculatePrice(selectedVehicleData)
        : 0;

      const deliveryParams = new URLSearchParams({
        ...Object.fromEntries(
          Object.entries(params).map(([k, v]) => [k, String(v)]),
        ),
        vehicle: selectedVehicle,
        price: finalPrice.toFixed(2),
        distance: estimatedDistance.toString(),
      });

      router.push(`/(root)/delivery-confirmation?${deliveryParams.toString()}`);
    }
  };

  const filteredVehicles = getFilteredVehicles();
  const canContinue = selectedVehicle;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Choose Vehicle</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Map Section */}
        <View className="h-64 bg-gray-100">
          <Map />

          {/* Route Info Overlay */}
          <View className="absolute bottom-4 left-4 right-4 bg-white rounded-xl p-3 shadow-lg">
            <View className="flex flex-row items-center justify-between">
              <View>
                <Text className="font-JakartaSemiBold">Distance</Text>
                <Text className="text-gray-600">{estimatedDistance} miles</Text>
              </View>
              <View>
                <Text className="font-JakartaSemiBold">Package</Text>
                <Text className="text-gray-600 capitalize">{size} size</Text>
              </View>
              <View>
                <Text className="font-JakartaSemiBold">Type</Text>
                <Text className="text-gray-600 capitalize">{type}ing</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 py-6">
          {/* Package Summary */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="font-JakartaSemiBold mb-2">Package Summary</Text>
            <View className="flex flex-row items-center mb-2">
              <View className="w-3 h-3 bg-green-500 rounded-full mr-3" />
              <Text className="text-sm text-gray-700 flex-1" numberOfLines={1}>
                From: {decodeURIComponent(pickup as string)}
              </Text>
            </View>
            <View className="flex flex-row items-center mb-2">
              <View className="w-3 h-3 bg-red-500 rounded-full mr-3" />
              <Text className="text-sm text-gray-700 flex-1" numberOfLines={1}>
                To: {decodeURIComponent(delivery as string)}
              </Text>
            </View>
            <Text className="text-sm text-gray-600 mt-1">{description}</Text>
          </View>

          {/* Vehicle Selection */}
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Select Vehicle Type
          </Text>

          {filteredVehicles.map((vehicle) => {
            const price = calculatePrice(vehicle);
            const isSelected = selectedVehicle === vehicle.id;

            return (
              <TouchableOpacity
                key={vehicle.id}
                onPress={() => setSelectedVehicle(vehicle.id)}
                className={`p-4 rounded-xl mb-3 border-2 ${isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                  }`}
              >
                <View className="flex flex-row items-center">
                  <Text className="text-3xl mr-4">{vehicle.icon}</Text>
                  <View className="flex-1">
                    <View className="flex flex-row items-center justify-between mb-1">
                      <Text className="text-lg font-JakartaSemiBold">
                        {vehicle.name}
                      </Text>
                      <Text className="text-lg font-JakartaBold text-green-600">
                        ${price.toFixed(2)}
                      </Text>
                    </View>
                    <Text className="text-gray-600 text-sm mb-2">
                      {vehicle.description}
                    </Text>
                    <View className="flex flex-row justify-between">
                      <Text className="text-xs text-gray-500">
                        {vehicle.estimatedTime}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {vehicle.capacity}
                      </Text>
                    </View>
                  </View>
                  {isSelected && (
                    <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center ml-3">
                      <Text className="text-white text-xs">✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Pricing Breakdown */}
          {selectedVehicle && (
            <View className="bg-green-50 rounded-xl p-4 mb-6 mt-4">
              <Text className="font-JakartaSemiBold text-green-800 mb-3">
                Price Breakdown
              </Text>
              {(() => {
                const vehicle = vehicleTypes.find(
                  (v) => v.id === selectedVehicle,
                )!;
                return (
                  <>
                    <View className="flex flex-row justify-between mb-2">
                      <Text className="text-green-700">Base fare</Text>
                      <Text className="text-green-700">
                        ${vehicle.basePrice.toFixed(2)}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between mb-2">
                      <Text className="text-green-700">
                        Distance ({estimatedDistance} miles)
                      </Text>
                      <Text className="text-green-700">
                        ${(vehicle.pricePerMile * estimatedDistance).toFixed(2)}
                      </Text>
                    </View>
                    <View className="border-t border-green-200 pt-2">
                      <View className="flex flex-row justify-between">
                        <Text className="font-JakartaSemiBold text-green-800">
                          Total
                        </Text>
                        <Text className="font-JakartaBold text-green-800">
                          ${calculatePrice(vehicle).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  </>
                );
              })()}
            </View>
          )}

          {/* Features */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <Text className="font-JakartaSemiBold text-blue-800 mb-3">
              What&apos;s Included
            </Text>
            <View className="flex flex-row items-center mb-2">
              <Text className="text-blue-600 mr-2">✓</Text>
              <Text className="text-blue-700">Real-time tracking</Text>
            </View>
            <View className="flex flex-row items-center mb-2">
              <Text className="text-blue-600 mr-2">✓</Text>
              <Text className="text-blue-700">
                Photo confirmation of delivery
              </Text>
            </View>
            <View className="flex flex-row items-center mb-2">
              <Text className="text-blue-600 mr-2">✓</Text>
              <Text className="text-blue-700">
                Direct communication with driver
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <Text className="text-blue-600 mr-2">✓</Text>
              <Text className="text-blue-700">
                Package protection up to $100
              </Text>
            </View>
          </View>

          {/* Continue Button */}
          <View className="mt-6 mb-10">
            <CustomButton
              title="Request Delivery"
              onPress={handleContinue}
              className={canContinue ? "bg-green-500" : "bg-gray-300"}
              disabled={!canContinue}
            />

            {!canContinue && (
              <Text className="text-gray-500 text-center mt-2 text-sm">
                Please select a vehicle type
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryVehicle;
