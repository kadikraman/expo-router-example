import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import Map from "@/components/Map";
import { icons } from "@/constants";

const { height: screenHeight } = Dimensions.get("window");

interface PackageSize {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxWeight: string;
  dimensions: string;
}

interface VehicleType {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  pricePerMile: number;
  estimatedTime: string;
  capacity: string;
  maxWeight: string;
}

const packageSizes: PackageSize[] = [
  {
    id: "small",
    name: "Small",
    description: "Envelope, documents, small items",
    icon: "📄",
    maxWeight: "Up to 2 lbs",
    dimensions: '12" x 9" x 2"',
  },
  {
    id: "medium",
    name: "Medium",
    description: "Boxes, electronics, clothing",
    icon: "📦",
    maxWeight: "Up to 20 lbs",
    dimensions: '18" x 14" x 8"',
  },
  {
    id: "large",
    name: "Large",
    description: "Furniture parts, large boxes",
    icon: "📋",
    maxWeight: "Up to 50 lbs",
    dimensions: '24" x 18" x 12"',
  },
  {
    id: "extra_large",
    name: "Extra Large",
    description: "Appliances, furniture",
    icon: "🛏️",
    maxWeight: "Up to 100 lbs",
    dimensions: '36" x 24" x 18"',
  },
];

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
    maxWeight: "10 lbs",
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
    maxWeight: "50 lbs",
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
    maxWeight: "200 lbs",
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
    maxWeight: "500 lbs",
  },
];

const DeliveryPackageVehicle = () => {
  const { type, pickup, delivery } = useLocalSearchParams();

  // Package details state
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [packageDetails, setPackageDetails] = useState({
    description: "",
    specialInstructions: "",
    recipientName: "",
    recipientPhone: "",
    senderName: "",
    senderPhone: "",
  });

  // Modal states
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedModalVehicle, setSelectedModalVehicle] =
    useState<VehicleType | null>(null);

  // Simulate distance calculation
  const estimatedDistance = 5.2; // miles

  const calculatePrice = (vehicle: VehicleType) => {
    return vehicle.basePrice + vehicle.pricePerMile * estimatedDistance;
  };

  const updatePackageDetails = (
    field: keyof typeof packageDetails,
    value: string,
  ) => {
    setPackageDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (selectedSize && selectedVehicle && packageDetails.description) {
      const selectedVehicleData = vehicleTypes.find(
        (v) => v.id === selectedVehicle,
      );
      const finalPrice = selectedVehicleData
        ? calculatePrice(selectedVehicleData)
        : 0;

      const deliveryParams = new URLSearchParams({
        type: type as string,
        pickup: pickup as string,
        delivery: delivery as string,
        size: selectedSize,
        description: packageDetails.description,
        specialInstructions: packageDetails.specialInstructions,
        recipientName: packageDetails.recipientName,
        recipientPhone: packageDetails.recipientPhone,
        senderName: packageDetails.senderName,
        senderPhone: packageDetails.senderPhone,
        vehicle: selectedVehicle,
        price: finalPrice.toFixed(2),
        distance: estimatedDistance.toString(),
      });

      router.push(`/(root)/delivery-confirmation?${deliveryParams.toString()}`);
    }
  };

  const canContinue =
    selectedSize && selectedVehicle && packageDetails.description;

  const selectedPackageSize = packageSizes.find((p) => p.id === selectedSize);
  const selectedVehicleData = vehicleTypes.find(
    (v) => v.id === selectedVehicle,
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Complete Delivery</Text>
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
                <Text className="font-JakartaSemiBold">Type</Text>
                <Text className="text-gray-600 capitalize">{type}ing</Text>
              </View>
              <View>
                <Text className="font-JakartaSemiBold">Route</Text>
                <Text className="text-gray-600">~20 mins</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 py-6">
          {/* Route Summary */}
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="font-JakartaSemiBold mb-2">Delivery Route</Text>
            <View className="flex flex-row items-center mb-2">
              <View className="w-3 h-3 bg-green-500 rounded-full mr-3" />
              <Text className="text-sm text-gray-700 flex-1" numberOfLines={1}>
                From: {decodeURIComponent(pickup as string)}
              </Text>
            </View>
            <View className="flex flex-row items-center">
              <View className="w-3 h-3 bg-red-500 rounded-full mr-3" />
              <Text className="text-sm text-gray-700 flex-1" numberOfLines={1}>
                To: {decodeURIComponent(delivery as string)}
              </Text>
            </View>
          </View>

          {/* Package Size Selection */}
          <View className="mb-6">
            <View className="flex flex-row items-center justify-between mb-4">
              <Text className="text-lg font-JakartaSemiBold">Package Size</Text>
              <TouchableOpacity
                onPress={() => setShowPackageModal(true)}
                className="bg-blue-100 px-3 py-1 rounded-full"
              >
                <Text className="text-blue-700 text-sm">See Details</Text>
              </TouchableOpacity>
            </View>

            <View className="flex flex-row flex-wrap gap-3">
              {packageSizes.map((size) => (
                <TouchableOpacity
                  key={size.id}
                  onPress={() => setSelectedSize(size.id)}
                  className={`flex-1 min-w-[45%] p-3 rounded-xl border-2 ${
                    selectedSize === size.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Text className="text-2xl text-center mb-2">{size.icon}</Text>
                  <Text className="text-center font-JakartaSemiBold">
                    {size.name}
                  </Text>
                  <Text className="text-center text-xs text-gray-600 mt-1">
                    {size.maxWeight}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedPackageSize && (
              <View className="mt-3 p-3 bg-blue-50 rounded-lg">
                <Text className="text-blue-800 text-sm">
                  ✓ {selectedPackageSize.name} -{" "}
                  {selectedPackageSize.description}
                </Text>
              </View>
            )}
          </View>

          {/* Vehicle Selection */}
          <View className="mb-6">
            <View className="flex flex-row items-center justify-between mb-4">
              <Text className="text-lg font-JakartaSemiBold">
                Choose Vehicle
              </Text>
              <Text className="text-sm text-gray-600">All types available</Text>
            </View>

            <View className="space-y-3">
              {vehicleTypes.map((vehicle) => {
                const price = calculatePrice(vehicle);
                const isSelected = selectedVehicle === vehicle.id;

                return (
                  <TouchableOpacity
                    key={vehicle.id}
                    onPress={() => setSelectedVehicle(vehicle.id)}
                    className={`flex flex-row items-center p-4 rounded-xl border-2 ${
                      isSelected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <Text className="text-3xl mr-4">{vehicle.icon}</Text>
                    <View className="flex-1">
                      <View className="flex flex-row items-center justify-between">
                        <Text className="text-lg font-JakartaSemiBold">
                          {vehicle.name}
                        </Text>
                        <Text className="text-lg font-JakartaBold text-green-600">
                          ${price.toFixed(2)}
                        </Text>
                      </View>
                      <Text className="text-gray-600 text-sm">
                        {vehicle.description}
                      </Text>
                      <View className="flex flex-row items-center justify-between mt-1">
                        <Text className="text-xs text-gray-500">
                          {vehicle.estimatedTime}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedModalVehicle(vehicle);
                            setShowVehicleModal(true);
                          }}
                          className="bg-gray-100 px-2 py-1 rounded"
                        >
                          <Text className="text-xs text-gray-700">Details</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {isSelected && (
                      <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center ml-3">
                        <Text className="text-white text-xs">✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Package Description */}
          <View className="mb-6">
            <InputField
              label="What are you sending? *"
              placeholder="Describe the package contents"
              value={packageDetails.description}
              onChangeText={(value) =>
                updatePackageDetails("description", value)
              }
              inputStyle="h-20"
              multiline={true}
              textAlignVertical="top"
            />
          </View>

          {/* Pricing Summary */}
          {selectedVehicleData && (
            <View className="bg-green-50 rounded-xl border border-green-200 p-4 mb-6">
              <Text className="font-JakartaSemiBold text-green-800 mb-3">
                Total Cost
              </Text>
              <View className="flex flex-row justify-between mb-2">
                <Text className="text-green-700">Base fare</Text>
                <Text className="text-green-700">
                  ${selectedVehicleData.basePrice.toFixed(2)}
                </Text>
              </View>
              <View className="flex flex-row justify-between mb-2">
                <Text className="text-green-700">
                  Distance ({estimatedDistance} miles)
                </Text>
                <Text className="text-green-700">
                  $
                  {(
                    selectedVehicleData.pricePerMile * estimatedDistance
                  ).toFixed(2)}
                </Text>
              </View>
              <View className="border-t border-green-200 pt-2">
                <View className="flex flex-row justify-between">
                  <Text className="font-JakartaSemiBold text-green-800">
                    Total
                  </Text>
                  <Text className="font-JakartaBold text-green-800">
                    ${calculatePrice(selectedVehicleData).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Continue Button */}
          <View className="mt-6 mb-10">
            <CustomButton
              title="Continue to Confirmation"
              onPress={handleContinue}
              className={canContinue ? "bg-green-500" : "bg-gray-300"}
              disabled={!canContinue}
            />

            {!canContinue && (
              <Text className="text-gray-500 text-center mt-2 text-sm">
                Please select package size, vehicle, and add description
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Package Details Modal */}
      <Modal
        visible={showPackageModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPackageModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowPackageModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: screenHeight * 0.8,
            }}
          >
            <View className="p-5 border-b border-gray-100">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-JakartaSemiBold">
                  Package Sizes
                </Text>
                <TouchableOpacity onPress={() => setShowPackageModal(false)}>
                  <Image source={icons.close} className="w-6 h-6" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="flex-1 p-5">
              {packageSizes.map((size) => (
                <View
                  key={size.id}
                  className="p-4 border border-gray-200 rounded-xl mb-3"
                >
                  <View className="flex flex-row items-center mb-2">
                    <Text className="text-2xl mr-3">{size.icon}</Text>
                    <Text className="text-lg font-JakartaSemiBold">
                      {size.name}
                    </Text>
                  </View>
                  <Text className="text-gray-600 mb-2">{size.description}</Text>
                  <View className="flex flex-row space-x-4">
                    <Text className="text-sm text-blue-600">
                      Max: {size.maxWeight}
                    </Text>
                    <Text className="text-sm text-blue-600">
                      Size: {size.dimensions}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Vehicle Details Modal */}
      <Modal
        visible={showVehicleModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowVehicleModal(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowVehicleModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: screenHeight * 0.7,
            }}
          >
            {selectedModalVehicle && (
              <React.Fragment>
                <View className="p-5 border-b border-gray-100">
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-xl font-JakartaSemiBold">
                      {selectedModalVehicle.name} Details
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowVehicleModal(false)}
                    >
                      <Image source={icons.close} className="w-6 h-6" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="p-5">
                  <View className="items-center mb-6">
                    <Text className="text-6xl mb-3">
                      {selectedModalVehicle.icon}
                    </Text>
                    <Text className="text-2xl font-JakartaBold">
                      {selectedModalVehicle.name}
                    </Text>
                    <Text className="text-gray-600 text-center mt-2">
                      {selectedModalVehicle.description}
                    </Text>
                  </View>

                  <View className="space-y-4">
                    <View className="flex flex-row justify-between p-3 bg-gray-50 rounded-lg">
                      <Text className="font-JakartaSemiBold">Capacity</Text>
                      <Text className="text-gray-700">
                        {selectedModalVehicle.capacity}
                      </Text>
                    </View>

                    <View className="flex flex-row justify-between p-3 bg-gray-50 rounded-lg">
                      <Text className="font-JakartaSemiBold">
                        Estimated Time
                      </Text>
                      <Text className="text-gray-700">
                        {selectedModalVehicle.estimatedTime}
                      </Text>
                    </View>

                    <View className="flex flex-row justify-between p-3 bg-gray-50 rounded-lg">
                      <Text className="font-JakartaSemiBold">Base Price</Text>
                      <Text className="text-gray-700">
                        ${selectedModalVehicle.basePrice}
                      </Text>
                    </View>

                    <View className="flex flex-row justify-between p-3 bg-gray-50 rounded-lg">
                      <Text className="font-JakartaSemiBold">Per Mile</Text>
                      <Text className="text-gray-700">
                        ${selectedModalVehicle.pricePerMile}
                      </Text>
                    </View>

                    <View className="flex flex-row justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <Text className="font-JakartaSemiBold text-green-800">
                        Total for this trip
                      </Text>
                      <Text className="font-JakartaBold text-green-800">
                        ${calculatePrice(selectedModalVehicle).toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      setSelectedVehicle(selectedModalVehicle.id);
                      setShowVehicleModal(false);
                    }}
                    className="bg-blue-500 py-4 rounded-lg mt-6"
                  >
                    <Text className="text-white font-JakartaSemiBold text-center">
                      Select This Vehicle
                    </Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default DeliveryPackageVehicle;
