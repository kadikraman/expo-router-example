import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { icons } from "@/constants";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

const PersonalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState<PersonalInfo>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "01/15/1990",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    emergencyContactName: "Jane Doe",
    emergencyContactPhone: "+1 (555) 987-6543",
  });

  const updateInfo = (field: keyof PersonalInfo, value: string) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would make an API call to update the user's information
    Alert.alert(
      "Success",
      "Your personal information has been updated successfully.",
      [{ text: "OK", onPress: () => setIsEditing(false) }],
    );
  };

  const handleCancel = () => {
    // Reset to original values (in a real app, fetch from server)
    setIsEditing(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">
          Personal Information
        </Text>
        <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
          <Text className="text-blue-500 font-JakartaSemiBold">
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-5 py-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Photo Section */}
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{
                uri: "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/400x400/",
              }}
              className="w-24 h-24 rounded-full"
            />
            {isEditing && (
              <TouchableOpacity className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white text-lg">📷</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-lg font-JakartaSemiBold mt-3">
            {info.firstName} {info.lastName}
          </Text>
        </View>

        {/* Basic Information */}
        <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Basic Information
          </Text>

          <View className="flex flex-row space-x-3">
            <View className="flex-1">
              <InputField
                label="First Name"
                placeholder="First Name"
                value={info.firstName}
                onChangeText={(value) => updateInfo("firstName", value)}
                editable={isEditing}
              />
            </View>
            <View className="flex-1">
              <InputField
                label="Last Name"
                placeholder="Last Name"
                value={info.lastName}
                onChangeText={(value) => updateInfo("lastName", value)}
                editable={isEditing}
              />
            </View>
          </View>

          <InputField
            label="Email Address"
            placeholder="Email"
            value={info.email}
            onChangeText={(value) => updateInfo("email", value)}
            editable={isEditing}
            keyboardType="email-address"
          />

          <InputField
            label="Phone Number"
            placeholder="Phone"
            value={info.phone}
            onChangeText={(value) => updateInfo("phone", value)}
            editable={isEditing}
            keyboardType="phone-pad"
          />

          <InputField
            label="Date of Birth"
            placeholder="MM/DD/YYYY"
            value={info.dateOfBirth}
            onChangeText={(value) => updateInfo("dateOfBirth", value)}
            editable={isEditing}
          />
        </View>

        {/* Address Information */}
        <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">Address</Text>

          <InputField
            label="Street Address"
            placeholder="Street Address"
            value={info.address}
            onChangeText={(value) => updateInfo("address", value)}
            editable={isEditing}
          />

          <InputField
            label="City"
            placeholder="City"
            value={info.city}
            onChangeText={(value) => updateInfo("city", value)}
            editable={isEditing}
          />

          <View className="flex flex-row space-x-3">
            <View className="flex-1">
              <InputField
                label="State"
                placeholder="State"
                value={info.state}
                onChangeText={(value) => updateInfo("state", value)}
                editable={isEditing}
              />
            </View>
            <View className="flex-1">
              <InputField
                label="ZIP Code"
                placeholder="ZIP"
                value={info.zipCode}
                onChangeText={(value) => updateInfo("zipCode", value)}
                editable={isEditing}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Emergency Contact */}
        <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Emergency Contact
          </Text>

          <InputField
            label="Contact Name"
            placeholder="Emergency Contact Name"
            value={info.emergencyContactName}
            onChangeText={(value) => updateInfo("emergencyContactName", value)}
            editable={isEditing}
          />

          <InputField
            label="Contact Phone"
            placeholder="Emergency Contact Phone"
            value={info.emergencyContactPhone}
            onChangeText={(value) => updateInfo("emergencyContactPhone", value)}
            editable={isEditing}
            keyboardType="phone-pad"
          />
        </View>

        {/* Account Actions */}
        <View className="bg-white rounded-xl shadow-sm shadow-neutral-300 p-5 mb-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Account Actions
          </Text>

          <TouchableOpacity className="flex flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex flex-row items-center">
              <Text className="text-xl mr-3">🔄</Text>
              <Text className="text-lg font-JakartaMedium">
                Change Password
              </Text>
            </View>
            <Text className="text-gray-400 text-lg">›</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center justify-between py-3 border-b border-gray-100">
            <View className="flex flex-row items-center">
              <Text className="text-xl mr-3">📧</Text>
              <Text className="text-lg font-JakartaMedium">Verify Email</Text>
            </View>
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-green-800 text-xs font-bold">VERIFIED</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center justify-between py-3">
            <View className="flex flex-row items-center">
              <Text className="text-xl mr-3">📱</Text>
              <Text className="text-lg font-JakartaMedium">Verify Phone</Text>
            </View>
            <View className="bg-green-100 px-2 py-1 rounded-full">
              <Text className="text-green-800 text-xs font-bold">VERIFIED</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Data Export */}
        <View className="bg-blue-50 p-4 rounded-xl mb-5">
          <Text className="text-blue-800 font-JakartaSemiBold mb-2">
            Data Export
          </Text>
          <Text className="text-blue-700 text-sm mb-3">
            You can request a copy of all your personal data we have on file.
          </Text>
          <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg">
            <Text className="text-white font-JakartaSemiBold text-center">
              Request Data Export
            </Text>
          </TouchableOpacity>
        </View>

        {isEditing && (
          <View className="flex flex-row space-x-3 mb-10">
            <TouchableOpacity
              className="flex-1 bg-gray-200 py-3 rounded-lg items-center"
              onPress={handleCancel}
            >
              <Text className="text-gray-700 font-JakartaSemiBold">Cancel</Text>
            </TouchableOpacity>

            <CustomButton
              title="Save Changes"
              onPress={handleSave}
              className="flex-1"
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
