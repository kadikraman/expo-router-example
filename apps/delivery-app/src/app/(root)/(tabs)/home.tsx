// import { useUser } from "@clerk/clerk-expo";
// import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useDriverModeStore, useLocationStore } from "@/store";
import { Ride } from "@/types/type";

// Dummy rides data - with ride_id for navigation
const dummyRides: (Ride & { ride_id: string })[] = [
  {
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
    driver_id: 1,
    user_id: "123",
    created_at: "2024-01-15T10:30:00Z",
    driver: {
      first_name: "James",
      last_name: "Wilson",
      car_seats: 4,
    },
  },
  {
    ride_id: "2",
    origin_address: "789 Oak Ave, New York, NY",
    destination_address: "321 Pine St, New York, NY",
    origin_latitude: 40.7614,
    origin_longitude: -73.9776,
    destination_latitude: 40.7505,
    destination_longitude: -73.9934,
    ride_time: 18,
    fare_price: 12.75,
    payment_status: "paid",
    driver_id: 2,
    user_id: "123",
    created_at: "2024-01-14T14:20:00Z",
    driver: {
      first_name: "David",
      last_name: "Brown",
      car_seats: 5,
    },
  },
  {
    ride_id: "3",
    origin_address: "111 Wall St, New York, NY",
    destination_address: "555 Madison Ave, New York, NY",
    origin_latitude: 40.7074,
    origin_longitude: -74.0113,
    destination_latitude: 40.7614,
    destination_longitude: -73.9776,
    ride_time: 30,
    fare_price: 22.0,
    payment_status: "paid",
    driver_id: 3,
    user_id: "123",
    created_at: "2024-01-13T16:45:00Z",
    driver: {
      first_name: "Michael",
      last_name: "Johnson",
      car_seats: 4,
    },
  },
];

// Dummy user data - consistent with profile
const dummyUser = {
  id: "123",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  primaryEmailAddress: {
    emailAddress: "john.doe@example.com",
  },
  primaryPhoneNumber: {
    phoneNumber: "+1 (555) 123-4567",
  },
  imageUrl:
    "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/400x400/",
};

// Dummy delivery requests for driver mode
const dummyDeliveryRequests = [
  {
    id: "req_1",
    pickupAddress: "McDonald's, 789 Main St",
    deliveryAddress: "456 Oak Ave, Apt 2B",
    pickupLatitude: 40.7128,
    pickupLongitude: -74.006,
    deliveryLatitude: 40.7589,
    deliveryLongitude: -73.9851,
    distance: "2.5 miles",
    estimatedTime: "12 mins",
    fare: 8.5,
    customerName: "Sarah Johnson",
    customerPhone: "+1 (555) 123-4567",
    orderDetails: "Big Mac meal, Fries, Coke",
    requestTime: "2 mins ago",
    expiresAt: Date.now() + 30000, // 30 seconds from now
  },
  {
    id: "req_2",
    pickupAddress: "Pizza Palace, 123 Broadway",
    deliveryAddress: "789 Elm Street",
    pickupLatitude: 40.7614,
    pickupLongitude: -73.9776,
    deliveryLatitude: 40.7505,
    deliveryLongitude: -73.9934,
    distance: "1.8 miles",
    estimatedTime: "8 mins",
    fare: 12.25,
    customerName: "Mike Chen",
    customerPhone: "+1 (555) 987-6543",
    orderDetails: "Large Pepperoni Pizza, Garlic Bread",
    requestTime: "Just now",
    expiresAt: Date.now() + 45000, // 45 seconds from now
  },
];

// Driver Mode UI Components
interface DriverRequestModalProps {
  currentRequest: any;
  declineRequest: () => void;
  acceptRequest: () => void;
}

const DriverRequestModal: React.FC<DriverRequestModalProps> = ({
  currentRequest,
  declineRequest,
  acceptRequest,
}) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!currentRequest) return;

    const timer = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((currentRequest.expiresAt - Date.now()) / 1000),
      );
      setTimeLeft(remaining);

      if (remaining === 0) {
        declineRequest();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentRequest, declineRequest]);

  if (!currentRequest) return null;

  return (
    <View className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <View className="bg-white mx-5 rounded-xl p-6 w-full max-w-sm">
        <View className="items-center mb-4">
          <Text className="text-2xl font-JakartaBold">
            New Delivery Request
          </Text>
          <Text className="text-lg text-red-500 font-JakartaSemiBold">
            {timeLeft}s
          </Text>
        </View>

        <View className="mb-4">
          <View className="flex flex-row items-center mb-2">
            <View className="w-3 h-3 bg-green-500 rounded-full mr-2" />
            <Text className="text-sm text-gray-500">Pickup</Text>
          </View>
          <Text className="font-JakartaSemiBold">
            {currentRequest.pickupAddress}
          </Text>
        </View>

        <View className="mb-4">
          <View className="flex flex-row items-center mb-2">
            <View className="w-3 h-3 bg-red-500 rounded-full mr-2" />
            <Text className="text-sm text-gray-500">Delivery</Text>
          </View>
          <Text className="font-JakartaSemiBold">
            {currentRequest.deliveryAddress}
          </Text>
        </View>

        <View className="flex flex-row justify-between mb-6">
          <View className="items-center">
            <Text className="text-sm text-gray-500">Distance</Text>
            <Text className="font-JakartaSemiBold">
              {currentRequest.distance}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm text-gray-500">Time</Text>
            <Text className="font-JakartaSemiBold">
              {currentRequest.estimatedTime}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-sm text-gray-500">Earn</Text>
            <Text className="font-JakartaSemiBold text-green-600">
              ${currentRequest.fare}
            </Text>
          </View>
        </View>

        <View className="flex flex-row space-x-3">
          <TouchableOpacity
            onPress={declineRequest}
            className="flex-1 bg-red-500 py-3 rounded-lg"
          >
            <Text className="text-white font-JakartaSemiBold text-center">
              Decline
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={acceptRequest}
            className="flex-1 bg-green-500 py-3 rounded-lg"
          >
            <Text className="text-white font-JakartaSemiBold text-center">
              Accept
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Home = () => {
  // const { user } = useUser();
  const user = dummyUser;
  // const { signOut } = useAuth();
  const signOut = () => {
    console.log("signOut");
  };

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const {
    isDriverMode,
    isOnline,
    isRegisteredDriver,
    currentRequest,
    activeDelivery,
    todayEarnings,
    totalDeliveries,
    rating,
    toggleDriverMode,
    toggleOnlineStatus,
    setCurrentRequest,
    acceptRequest,
    declineRequest,
  } = useDriverModeStore();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  // Replace useFetch with dummy data
  const recentRides = dummyRides;
  const loading = false;
  const error = null;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  // Simulate incoming delivery requests when driver is online
  useEffect(() => {
    if (isDriverMode && isOnline && !currentRequest && !activeDelivery) {
      const timer = setTimeout(
        () => {
          const randomRequest =
            dummyDeliveryRequests[
              Math.floor(Math.random() * dummyDeliveryRequests.length)
            ];
          setCurrentRequest({
            ...randomRequest,
            id: `req_${Date.now()}`,
            expiresAt: Date.now() + 30000, // 30 seconds to respond
          });
        },
        Math.random() * 10000 + 5000,
      ); // Random between 5-15 seconds

      return () => clearTimeout(timer);
    }
  }, [
    isDriverMode,
    isOnline,
    currentRequest,
    activeDelivery,
    setCurrentRequest,
  ]);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };

  const DriverHomeContent = () => (
    <SafeAreaView className="bg-general-500 flex-1">
      <View className="px-5 py-3">
        {/* Driver Header */}
        <View className="flex flex-row items-center justify-between mb-5">
          <View className="flex-1">
            <Text className="text-2xl font-JakartaExtraBold">
              Welcome {user?.firstName}👋
            </Text>
            <Text className="text-gray-600">
              {isOnline
                ? "You're online and ready for deliveries"
                : "You're offline"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleSignOut}
            className="justify-center items-center w-10 h-10 rounded-full bg-white"
          >
            <Image source={icons.out} className="w-4 h-4" />
          </TouchableOpacity>
        </View>

        {/* Online/Offline Control */}
        <View className="bg-white rounded-xl p-4 mb-5 shadow-sm">
          <View className="flex flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-lg font-JakartaSemiBold">
                {isOnline ? "You're Online" : "You're Offline"}
              </Text>
              <Text className="text-gray-600 text-sm">
                {isOnline
                  ? "You're receiving delivery requests"
                  : "Go online to start receiving delivery requests"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={toggleOnlineStatus}
              className={`px-6 py-3 rounded-lg ${
                isOnline ? "bg-red-500" : "bg-green-500"
              }`}
            >
              <Text className="text-white font-JakartaSemiBold">
                {isOnline ? "Go Offline" : "Go Online"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Driver Stats */}
        <View className="bg-white rounded-xl p-4 mb-5 shadow-sm">
          <Text className="text-lg font-JakartaSemiBold mb-3">
            Today&apos;s Stats
          </Text>
          <View className="flex flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-JakartaBold text-green-600">
                ${todayEarnings.toFixed(2)}
              </Text>
              <Text className="text-sm text-gray-500">Earned</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-JakartaBold text-blue-600">
                {totalDeliveries}
              </Text>
              <Text className="text-sm text-gray-500">Deliveries</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-JakartaBold text-orange-600">
                {rating}⭐
              </Text>
              <Text className="text-sm text-gray-500">Rating</Text>
            </View>
          </View>
        </View>

        {/* Active Delivery */}
        {activeDelivery && (
          <TouchableOpacity
            onPress={() =>
              router.push(`/(root)/active-delivery?id=${activeDelivery.id}`)
            }
            className="bg-blue-50 rounded-xl p-4 mb-5 border border-blue-200"
          >
            <View className="flex flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-JakartaSemiBold text-blue-800 mb-2">
                  Active Delivery
                </Text>
                <Text className="text-blue-700 mb-1">
                  To: {activeDelivery.deliveryAddress}
                </Text>
                <Text className="text-blue-600 text-sm">
                  Customer: {activeDelivery.customerName}
                </Text>
                <Text className="text-blue-500 text-xs mt-1">
                  Tap to view details and track delivery
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl">📦</Text>
                <Text className="text-blue-600 text-xs font-bold">ACTIVE</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Status Message */}
        {!isOnline && (
          <View className="bg-gray-100 rounded-xl p-4 mb-5">
            <Text className="text-gray-700 text-center">
              Go online to start receiving delivery requests
            </Text>
          </View>
        )}

        {isOnline && !currentRequest && !activeDelivery && (
          <View className="bg-green-50 rounded-xl p-4 mb-5">
            <Text className="text-green-700 text-center">
              You&apos;re online! Waiting for delivery requests...
            </Text>
          </View>
        )}
      </View>

      {/* Map for driver */}
      <View className="flex-1 px-5 mb-5">
        <View className="bg-transparent h-full rounded-xl overflow-hidden">
          <Map />
        </View>
      </View>

      {currentRequest && (
        <DriverRequestModal
          currentRequest={currentRequest}
          declineRequest={declineRequest}
          acceptRequest={acceptRequest}
        />
      )}
    </SafeAreaView>
  );

  // If in driver mode, show driver interface
  if (isDriverMode) {
    return <DriverHomeContent />;
  }

  // Regular passenger interface
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-2xl font-JakartaExtraBold">
                Welcome {user?.firstName ?? user?.fullName}👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            {/* Driver Mode Toggle */}
            {isRegisteredDriver && (
              <View className="bg-white rounded-xl p-4 mb-5 shadow-sm">
                <View className="flex flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-lg font-JakartaSemiBold">
                      Driver Mode
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Switch to driver mode to accept deliveries
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={toggleDriverMode}
                    className="px-4 py-2 bg-blue-500 rounded-lg"
                  >
                    <Text className="text-white font-JakartaSemiBold">
                      Go Online
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Main Delivery Service Section */}
            <View className="my-5">
              <Text className="text-xl font-JakartaSemiBold mb-3">
                Send or Receive Packages
              </Text>

              {/* Main Book Package Delivery Button */}
              <TouchableOpacity
                onPress={() => router.push("/(root)/delivery-options")}
                className="bg-white rounded-2xl p-6 shadow-sm shadow-neutral-300 mb-5"
              >
                <View className="flex flex-row items-center">
                  <View className="w-12 h-12 bg-blue-100 rounded-xl items-center justify-center mr-4">
                    <Text className="text-2xl">📦</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-JakartaSemiBold mb-1">
                      Book Package Delivery
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      Send or receive packages anywhere
                    </Text>
                  </View>
                  <Image
                    source={icons.to}
                    className="w-5 h-5"
                    tintColor="#666"
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Current Location */}
            <View className="my-5">
              <Text className="text-xl font-JakartaSemiBold mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </View>

            <Text className="text-xl font-JakartaSemiBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
