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

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images } from "@/constants";
import { useLocationStore } from "@/store";
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

const Home = () => {
  // const { user } = useUser();
  const user = dummyUser;
  // const { signOut } = useAuth();
  const signOut = () => {
    console.log("signOut");
  };

  const { setUserLocation, setDestinationLocation } = useLocationStore();

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

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
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
                Welcome {user?.firstName}👋
              </Text>
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your current location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
