// import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";

// Dummy user profile data
const dummyUser = {
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
  joinDate: "January 2024",
  totalRides: 23,
  rating: 4.8,
};

const Profile = () => {
  // const { user } = useUser();
  const user = dummyUser;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          <Image
            source={{
              uri: user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>

        {/* Stats Section */}
        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3 mt-5">
          <Text className="text-xl font-JakartaBold mb-5">Statistics</Text>

          <View className="flex flex-row justify-between w-full py-2">
            <Text className="text-lg font-JakartaRegular text-gray-500">
              Total Rides
            </Text>
            <Text className="text-lg font-JakartaSemiBold">
              {user?.totalRides}
            </Text>
          </View>

          <View className="flex flex-row justify-between w-full py-2">
            <Text className="text-lg font-JakartaRegular text-gray-500">
              Rating
            </Text>
            <Text className="text-lg font-JakartaSemiBold">
              {user?.rating} ⭐
            </Text>
          </View>

          <View className="flex flex-row justify-between w-full py-2">
            <Text className="text-lg font-JakartaRegular text-gray-500">
              Member Since
            </Text>
            <Text className="text-lg font-JakartaSemiBold">
              {user?.joinDate}
            </Text>
          </View>
        </View>

        {/* Action Buttons Section */}
        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3 mt-5">
          <Text className="text-xl font-JakartaBold mb-5">Quick Actions</Text>

          {/* Refer Friends Button */}
          <TouchableOpacity
            className="flex flex-row items-center justify-between w-full py-4 border-b border-gray-100"
            onPress={() => router.push("/(root)/refer-friends")}
          >
            <View className="flex flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                <Text className="text-blue-600 text-lg">👥</Text>
              </View>
              <View>
                <Text className="text-lg font-JakartaSemiBold">
                  Refer Friends
                </Text>
                <Text className="text-sm text-gray-500">
                  Earn rewards for every referral
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>

          {/* Earn by Delivering Button */}
          <TouchableOpacity
            className="flex flex-row items-center justify-between w-full py-4 border-b border-gray-100"
            onPress={() => router.push("/(root)/driver-onboarding")}
          >
            <View className="flex flex-row items-center">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                <Text className="text-green-600 text-lg">🚗</Text>
              </View>
              <View>
                <Text className="text-lg font-JakartaSemiBold">
                  Earn by Delivering
                </Text>
                <Text className="text-sm text-gray-500">
                  Become a driver and start earning
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>

          {/* Settings Button */}
          <TouchableOpacity
            className="flex flex-row items-center justify-between w-full py-4"
            onPress={() => router.push("/(root)/settings")}
          >
            <View className="flex flex-row items-center">
              <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-3">
                <Text className="text-gray-600 text-lg">⚙️</Text>
              </View>
              <View>
                <Text className="text-lg font-JakartaSemiBold">Settings</Text>
                <Text className="text-sm text-gray-500">
                  Manage your account preferences
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
