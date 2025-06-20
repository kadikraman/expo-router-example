import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

interface PackageSize {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxWeight: string;
  dimensions: string;
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

const DeliveryType = () => {
  const { type, pickup, delivery } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [packageDetails, setPackageDetails] = useState({
    description: "",
    specialInstructions: "",
    recipientName: "",
    recipientPhone: "",
    senderName: "",
    senderPhone: "",
  });

  const handleContinue = () => {
    if (selectedSize) {
      const params = new URLSearchParams({
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
      });

      router.push(`/(root)/delivery-vehicle?${params.toString()}`);
    }
  };

  const updatePackageDetails = (
    field: keyof typeof packageDetails,
    value: string,
  ) => {
    setPackageDetails((prev) => ({ ...prev, [field]: value }));
  };

  const canContinue = selectedSize && packageDetails.description;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Package Details</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
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
            <Text className="text-lg font-JakartaSemiBold mb-4">
              Package Size
            </Text>
            {packageSizes.map((size) => (
              <TouchableOpacity
                key={size.id}
                onPress={() => setSelectedSize(size.id)}
                className={`p-4 rounded-xl mb-3 border-2 ${
                  selectedSize === size.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <View className="flex flex-row items-center">
                  <Text className="text-2xl mr-3">{size.icon}</Text>
                  <View className="flex-1">
                    <Text className="text-lg font-JakartaSemiBold">
                      {size.name}
                    </Text>
                    <Text className="text-gray-600 text-sm mb-1">
                      {size.description}
                    </Text>
                    <View className="flex flex-row space-x-4">
                      <Text className="text-xs text-gray-500">
                        {size.maxWeight}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {size.dimensions}
                      </Text>
                    </View>
                  </View>
                  {selectedSize === size.id && (
                    <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                      <Text className="text-white text-xs">✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
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

          {/* Special Instructions */}
          <View className="mb-6">
            <InputField
              label="Special Instructions (Optional)"
              placeholder="Any special handling instructions, access codes, etc."
              value={packageDetails.specialInstructions}
              onChangeText={(value) =>
                updatePackageDetails("specialInstructions", value)
              }
              inputStyle="h-20"
              multiline={true}
              textAlignVertical="top"
            />
          </View>

          {/* Contact Information */}
          <View className="mb-6">
            <Text className="text-lg font-JakartaSemiBold mb-4">
              Contact Information
            </Text>

            {type === "send" ? (
              <>
                <InputField
                  label="Recipient Name"
                  placeholder="Who will receive the package?"
                  value={packageDetails.recipientName}
                  onChangeText={(value) =>
                    updatePackageDetails("recipientName", value)
                  }
                />
                <InputField
                  label="Recipient Phone"
                  placeholder="Recipient's phone number"
                  value={packageDetails.recipientPhone}
                  onChangeText={(value) =>
                    updatePackageDetails("recipientPhone", value)
                  }
                  keyboardType="phone-pad"
                />
              </>
            ) : (
              <>
                <InputField
                  label="Sender Name"
                  placeholder="Who is sending the package?"
                  value={packageDetails.senderName}
                  onChangeText={(value) =>
                    updatePackageDetails("senderName", value)
                  }
                />
                <InputField
                  label="Sender Phone"
                  placeholder="Sender's phone number"
                  value={packageDetails.senderPhone}
                  onChangeText={(value) =>
                    updatePackageDetails("senderPhone", value)
                  }
                  keyboardType="phone-pad"
                />
              </>
            )}
          </View>

          {/* Delivery Type Info */}
          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <View className="flex flex-row items-center">
              <Text className="text-2xl mr-3">
                {type === "send" ? "📤" : "📥"}
              </Text>
              <View className="flex-1">
                <Text className="font-JakartaSemiBold text-blue-800">
                  {type === "send" ? "Sending Package" : "Receiving Package"}
                </Text>
                <Text className="text-blue-600 text-sm">
                  {type === "send"
                    ? "A driver will pick up your package and deliver it"
                    : "A driver will collect and deliver the package to you"}
                </Text>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <View className="mt-6 mb-10">
            <CustomButton
              title="Continue to Vehicle Selection"
              onPress={handleContinue}
              className={canContinue ? "bg-blue-500" : "bg-gray-300"}
              disabled={!canContinue}
            />

            {!canContinue && (
              <Text className="text-gray-500 text-center mt-2 text-sm">
                Please select package size and add description
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryType;
