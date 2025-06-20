import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

// Extended dummy ride data with full details
const dummyRideDetails = {
  "1": {
    ride_id: "1",
    origin_address: "123 Main St, New York, NY",
    destination_address: "456 Broadway, New York, NY",
    origin_latitude: 40.7128,
    origin_longitude: -74.006,
    destination_latitude: 40.7589,
    destination_longitude: -73.9851,
    ride_time: 25,
    fare_price: 15.5,
    payment_status: "paid",
    created_at: "2024-01-15T14:30:00Z",
    date: "15 January 2024",
    time: "2:30 PM",
    driver: {
      driver_id: 1,
      first_name: "James",
      last_name: "Wilson",
      profile_image_url:
        "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/400x400/",
      car_image_url:
        "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      car_seats: 4,
      rating: 4.8,
      car_model: "Toyota Camry",
      license_plate: "ABC-123",
    },
    trip_details: {
      distance: "8.5 miles",
      duration: "25 minutes",
      route_type: "Fastest route",
    },
    payment_details: {
      base_fare: 12.0,
      distance_fee: 2.5,
      time_fee: 1.0,
      total: 15.5,
      payment_method: "Credit Card ****1234",
    },
  },
  "2": {
    ride_id: "2",
    origin_address: "789 Oak Ave, New York, NY",
    destination_address: "321 Pine St, New York, NY",
    ride_time: 18,
    fare_price: 12.75,
    payment_status: "paid",
    date: "12 January 2024",
    time: "9:15 AM",
    driver: {
      driver_id: 2,
      first_name: "David",
      last_name: "Brown",
      profile_image_url:
        "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/400x400/",
      car_image_url:
        "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      car_seats: 5,
      rating: 4.6,
      car_model: "Honda Accord",
      license_plate: "XYZ-789",
    },
    trip_details: {
      distance: "6.2 miles",
      duration: "18 minutes",
      route_type: "Scenic route",
    },
    payment_details: {
      base_fare: 10.0,
      distance_fee: 1.75,
      time_fee: 1.0,
      total: 12.75,
      payment_method: "Apple Pay",
    },
  },
};

const RideDetails = () => {
  const { id } = useLocalSearchParams();
  const rideData = dummyRideDetails[id as keyof typeof dummyRideDetails];

  if (!rideData) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl font-JakartaSemiBold">Ride not found</Text>
        </View>
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
        <Text className="text-xl font-JakartaSemiBold">Ride Details</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Driver Info */}
        <View className="bg-white mx-5 mt-5 p-4 rounded-xl shadow-sm shadow-neutral-300">
          <View className="flex flex-row items-center">
            <Image
              source={{ uri: rideData.driver.profile_image_url }}
              className="w-16 h-16 rounded-full"
            />
            <View className="flex-1 ml-4">
              <Text className="text-lg font-JakartaSemiBold">
                {rideData.driver.first_name} {rideData.driver.last_name}
              </Text>
              <Text className="text-gray-500">
                {rideData.driver.car_model} • {rideData.driver.license_plate}
              </Text>
              <View className="flex flex-row items-center mt-1">
                <Text className="text-yellow-500">★</Text>
                <Text className="text-sm text-gray-600 ml-1">
                  {rideData.driver.rating} ({rideData.driver.car_seats} seats)
                </Text>
              </View>
            </View>
            <Image
              source={{ uri: rideData.driver.car_image_url }}
              className="w-20 h-12 rounded-lg"
              resizeMode="cover"
            />
          </View>

          {/* Driver Actions */}
          <View className="flex flex-row space-x-3 mt-4 pt-4 border-t border-gray-100">
            <CustomButton
              title="Message Driver"
              onPress={() =>
                router.push(
                  `/(root)/message-thread?id=${rideData.driver.driver_id}&rideId=${rideData.ride_id}`,
                )
              }
              className="flex-1"
              IconLeft={() => (
                <Image
                  source={icons.chat}
                  className="w-5 h-5 mr-2"
                  tintColor="white"
                />
              )}
            />
            <TouchableOpacity className="bg-gray-100 px-4 py-3 rounded-lg flex-row items-center">
              <Image
                source={icons.star}
                className="w-5 h-5 mr-2"
                tintColor="#666"
              />
              <Text className="text-gray-700 font-JakartaSemiBold">Rate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trip Details */}
        <View className="bg-white mx-5 mt-5 p-4 rounded-xl shadow-sm shadow-neutral-300">
          <Text className="text-lg font-JakartaSemiBold mb-3">
            Trip Information
          </Text>

          <View className="flex flex-row items-start mb-4">
            <View className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3" />
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Pickup</Text>
              <Text className="text-base font-JakartaMedium">
                {rideData.origin_address}
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-start mb-4">
            <View className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-3" />
            <View className="flex-1">
              <Text className="text-sm text-gray-500">Destination</Text>
              <Text className="text-base font-JakartaMedium">
                {rideData.destination_address}
              </Text>
            </View>
          </View>

          <View className="flex flex-row justify-between border-t border-gray-100 pt-3">
            <View>
              <Text className="text-sm text-gray-500">Distance</Text>
              <Text className="text-base font-JakartaMedium">
                {rideData.trip_details.distance}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Duration</Text>
              <Text className="text-base font-JakartaMedium">
                {rideData.trip_details.duration}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Route</Text>
              <Text className="text-base font-JakartaMedium">
                {rideData.trip_details.route_type}
              </Text>
            </View>
          </View>
        </View>

        {/* Date & Time */}
        <View className="bg-white mx-5 mt-5 p-4 rounded-xl shadow-sm shadow-neutral-300">
          <Text className="text-lg font-JakartaSemiBold mb-3">Date & Time</Text>
          <View className="flex flex-row justify-between">
            <View>
              <Text className="text-sm text-gray-500">Date</Text>
              <Text className="text-base font-JakartaMedium">
                {rideData.date}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">Time</Text>
              <Text className="text-base font-JakartaMedium">
                {rideData.time}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Details */}
        <View className="bg-white mx-5 mt-5 mb-5 p-4 rounded-xl shadow-sm shadow-neutral-300">
          <Text className="text-lg font-JakartaSemiBold mb-3">
            Payment Details
          </Text>

          <View className="flex flex-row justify-between py-2">
            <Text className="text-gray-600">Base fare</Text>
            <Text className="font-JakartaMedium">
              ${rideData.payment_details.base_fare.toFixed(2)}
            </Text>
          </View>

          <View className="flex flex-row justify-between py-2">
            <Text className="text-gray-600">Distance fee</Text>
            <Text className="font-JakartaMedium">
              ${rideData.payment_details.distance_fee.toFixed(2)}
            </Text>
          </View>

          <View className="flex flex-row justify-between py-2 border-b border-gray-100 pb-3">
            <Text className="text-gray-600">Time fee</Text>
            <Text className="font-JakartaMedium">
              ${rideData.payment_details.time_fee.toFixed(2)}
            </Text>
          </View>

          <View className="flex flex-row justify-between py-3">
            <Text className="text-lg font-JakartaSemiBold">Total</Text>
            <Text className="text-lg font-JakartaBold">
              ${rideData.payment_details.total.toFixed(2)}
            </Text>
          </View>

          <Text className="text-sm text-gray-500 mt-2">
            Paid with {rideData.payment_details.payment_method}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideDetails;
