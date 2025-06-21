import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

const DeliveryOptions = () => {
  const handleSendPackage = () => {
    router.push("/(root)/delivery-locations?type=send");
  };

  const handleReceivePackage = () => {
    router.push("/(root)/delivery-locations?type=receive");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={icons.backArrow}
            className="w-6 h-6"
            tintColor="white"
          />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold text-white">Courier</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="mb-8">
          <Text className="text-white text-2xl font-JakartaBold mb-2">
            Courier
          </Text>
          <Text className="text-gray-400 text-base">
            Get someone to deliver items for you.
          </Text>
        </View>

        {/* Types of deliveries */}
        <View className="mb-8">
          <Text className="text-white text-xl font-JakartaSemiBold mb-6">
            Types of deliveries
          </Text>

          <View className="flex flex-row space-x-4">
            {/* Send Items */}
            <TouchableOpacity
              onPress={handleSendPackage}
              className="flex-1 bg-orange-600 rounded-2xl p-6 relative overflow-hidden"
              style={{ minHeight: 180 }}
            >
              {/* Background illustration */}
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-6xl opacity-30">📦</Text>
              </View>

              <View className="flex-1 justify-end">
                <Text className="text-white text-lg font-JakartaSemiBold">
                  Send items →
                </Text>
              </View>
            </TouchableOpacity>

            {/* Receive Items */}
            <TouchableOpacity
              onPress={handleReceivePackage}
              className="flex-1 bg-blue-600 rounded-2xl p-6 relative overflow-hidden"
              style={{ minHeight: 180 }}
            >
              {/* Background illustration */}
              <View className="absolute inset-0 items-center justify-center">
                <Text className="text-6xl opacity-30">📥</Text>
              </View>

              <View className="flex-1 justify-end">
                <Text className="text-white text-lg font-JakartaSemiBold">
                  Receive items →
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular ways to use Courier */}
        <View className="mb-8">
          <Text className="text-white text-xl font-JakartaSemiBold mb-2">
            Popular ways to use Courier
          </Text>
          <Text className="text-gray-400 text-sm mb-6">
            Explore some of the many items you can send or receive with Courier.
          </Text>

          <View className="bg-gray-900 rounded-2xl p-6">
            <Text className="text-white text-lg font-JakartaSemiBold mb-4">
              Save yourself a trip across town
            </Text>

            <View className="space-y-4">
              {/* Row 1 */}
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">🔑</Text>
                  <Text className="text-gray-300">Forgotten items</Text>
                </View>
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">🎁</Text>
                  <Text className="text-gray-300">Gifts</Text>
                </View>
              </View>

              {/* Row 2 */}
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">📦</Text>
                  <Text className="text-gray-300">Packages</Text>
                </View>
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">👔</Text>
                  <Text className="text-gray-300">Dry cleaning</Text>
                </View>
              </View>

              {/* Row 3 */}
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">🛍️</Text>
                  <Text className="text-gray-300">Marketplace items</Text>
                </View>
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">🤝</Text>
                  <Text className="text-gray-300">Donations</Text>
                </View>
              </View>

              {/* Row 4 */}
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">🌸</Text>
                  <Text className="text-gray-300">Flowers</Text>
                </View>
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">🏠</Text>
                  <Text className="text-gray-300">Homemade gifts</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Deliver items for your business */}
        <View className="mb-8">
          <View className="bg-gray-900 rounded-2xl p-6">
            <Text className="text-white text-lg font-JakartaSemiBold mb-4">
              Deliver items for your business
            </Text>

            <View className="space-y-4">
              {/* Row 1 */}
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">👥</Text>
                  <Text className="text-gray-300">Customer orders</Text>
                </View>
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">📋</Text>
                  <Text className="text-gray-300">Documents</Text>
                </View>
              </View>

              {/* Row 2 */}
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">🏪</Text>
                  <Text className="text-gray-300">Vendor samples</Text>
                </View>
                <View className="flex flex-row items-center flex-1">
                  <Text className="text-2xl mr-3">📊</Text>
                  <Text className="text-gray-300">Inventory</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveryOptions;
