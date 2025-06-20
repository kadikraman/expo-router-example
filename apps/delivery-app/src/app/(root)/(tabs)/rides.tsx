// import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { Ride } from "@/types/type";
import React from "react";

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
  {
    ride_id: "4",
    origin_address: "777 Lexington Ave, New York, NY",
    destination_address: "999 3rd Ave, New York, NY",
    origin_latitude: 40.7649,
    origin_longitude: -73.968,
    destination_latitude: 40.7527,
    destination_longitude: -73.9707,
    ride_time: 18,
    fare_price: 14.25,
    payment_status: "paid",
    driver_id: 4,
    user_id: "123",
    created_at: "2024-01-12T09:15:00Z",
    driver: {
      first_name: "Robert",
      last_name: "Green",
      car_seats: 4,
    },
  },
];

// Dummy user data - consistent across app
const dummyUser = {
  id: "123",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  primaryEmailAddress: {
    emailAddress: "john.doe@example.com",
  },
  emailAddresses: [{ emailAddress: "john.doe@example.com" }],
  primaryPhoneNumber: {
    phoneNumber: "+1 (555) 123-4567",
  },
  imageUrl:
    "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/400x400/",
};

const Rides = () => {
  // const { user } = useUser();
  const user = dummyUser;

  // Replace useFetch with dummy data
  const recentRides = dummyRides;
  const loading = false;
  const error = null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/(root)/ride-details?id=${item.ride_id}`)
            }
          >
            <RideCard ride={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <React.Fragment>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </React.Fragment>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <Text className="text-2xl font-JakartaBold my-5">All Rides</Text>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
