// import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import RideCard from "@/components/RideCard";
import { images } from "@/constants";
import { Ride } from "@/types/type";

// Dummy rides data
const dummyRides: Ride[] = [
  {
    origin_address: "123 Main St, New York, NY",
    destination_address: "456 Broadway, New York, NY",
    origin_latitude: 40.7128,
    origin_longitude: -74.006,
    destination_latitude: 40.7589,
    destination_longitude: -73.9851,
    ride_time: 25,
    fare_price: 18.5,
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
    origin_address: "789 Park Ave, New York, NY",
    destination_address: "321 5th Ave, New York, NY",
    origin_latitude: 40.7614,
    origin_longitude: -73.9776,
    destination_latitude: 40.7505,
    destination_longitude: -73.9934,
    ride_time: 15,
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

const Rides = () => {
  // const { user } = useUser();
  const user = {
    fullName: "John Doe",
    emailAddresses: [{ emailAddress: "john.doe@example.com" }],
  };

  // Replace useFetch with dummy data
  const recentRides = dummyRides;
  const loading = false;
  const error = null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
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
            <Text className="text-2xl font-JakartaBold my-5">All Rides</Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Rides;
