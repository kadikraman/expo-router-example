import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

interface NotificationSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;

  // Ride notifications
  rideRequests: boolean;
  rideConfirmations: boolean;
  driverUpdates: boolean;
  rideCompletions: boolean;

  // Marketing notifications
  promotions: boolean;
  newFeatures: boolean;
  tips: boolean;

  // Account notifications
  securityAlerts: boolean;
  paymentUpdates: boolean;
  accountChanges: boolean;

  // Driver notifications (if applicable)
  deliveryRequests: boolean;
  earningsUpdates: boolean;

  // Timing preferences
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

const NotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,

    rideRequests: true,
    rideConfirmations: true,
    driverUpdates: true,
    rideCompletions: true,

    promotions: false,
    newFeatures: true,
    tips: true,

    securityAlerts: true,
    paymentUpdates: true,
    accountChanges: true,

    deliveryRequests: false,
    earningsUpdates: false,

    quietHoursEnabled: true,
    quietHoursStart: "10:00 PM",
    quietHoursEnd: "7:00 AM",
  });

  const updateSetting = (
    key: keyof NotificationSettings,
    value: boolean | string,
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    Alert.alert("Success", "Your notification preferences have been saved.");
  };

  const renderToggleItem = (
    key: keyof NotificationSettings,
    title: string,
    description: string,
    icon: string,
    disabled: boolean = false,
  ) => (
    <View
      className={`flex flex-row items-center justify-between py-4 ${disabled ? "opacity-50" : ""}`}
    >
      <View className="flex flex-row items-start flex-1 mr-4">
        <Text className="text-xl mr-3">{icon}</Text>
        <View className="flex-1">
          <Text className="text-lg font-JakartaSemiBold">{title}</Text>
          <Text className="text-gray-600 text-sm">{description}</Text>
        </View>
      </View>
      <Switch
        value={settings[key] as boolean}
        onValueChange={(value) => updateSetting(key, value)}
        disabled={disabled}
        trackColor={{ false: "#767577", true: "#3B82F6" }}
        thumbColor={settings[key] ? "#ffffff" : "#f4f3f4"}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Notifications</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text className="text-blue-500 font-JakartaSemiBold">Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* General Settings */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            General Settings
          </Text>

          {renderToggleItem(
            "pushNotifications",
            "Push Notifications",
            "Receive notifications on your device",
            "📱",
          )}

          {renderToggleItem(
            "emailNotifications",
            "Email Notifications",
            "Receive notifications via email",
            "📧",
          )}

          {renderToggleItem(
            "smsNotifications",
            "SMS Notifications",
            "Receive notifications via text messages",
            "💬",
          )}
        </View>

        {/* Ride Notifications */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Ride Notifications
          </Text>

          {renderToggleItem(
            "rideRequests",
            "Ride Requests",
            "When a driver accepts your ride",
            "🚗",
            !settings.pushNotifications,
          )}

          {renderToggleItem(
            "rideConfirmations",
            "Ride Confirmations",
            "Booking confirmations and details",
            "✅",
            !settings.pushNotifications,
          )}

          {renderToggleItem(
            "driverUpdates",
            "Driver Updates",
            "Driver location and arrival updates",
            "📍",
            !settings.pushNotifications,
          )}

          {renderToggleItem(
            "rideCompletions",
            "Ride Completions",
            "Trip completed notifications",
            "🏁",
            !settings.pushNotifications,
          )}
        </View>

        {/* Account & Security */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Account & Security
          </Text>

          {renderToggleItem(
            "securityAlerts",
            "Security Alerts",
            "Login attempts and security changes",
            "🔒",
          )}

          {renderToggleItem(
            "paymentUpdates",
            "Payment Updates",
            "Payment confirmations and receipts",
            "💳",
          )}

          {renderToggleItem(
            "accountChanges",
            "Account Changes",
            "Profile and settings modifications",
            "👤",
          )}
        </View>

        {/* Marketing & Updates */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">
            Marketing & Updates
          </Text>

          {renderToggleItem(
            "promotions",
            "Promotions & Offers",
            "Special deals and discount codes",
            "🎁",
          )}

          {renderToggleItem(
            "newFeatures",
            "New Features",
            "Updates about new app features",
            "✨",
          )}

          {renderToggleItem(
            "tips",
            "Tips & Tricks",
            "Helpful tips for using the app",
            "💡",
          )}
        </View>

        {/* Driver Notifications */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-2">
            Driver Notifications
          </Text>
          <Text className="text-gray-600 text-sm mb-4">
            Only applicable if you're registered as a driver
          </Text>

          {renderToggleItem(
            "deliveryRequests",
            "Delivery Requests",
            "New delivery opportunities in your area",
            "📦",
          )}

          {renderToggleItem(
            "earningsUpdates",
            "Earnings Updates",
            "Weekly earnings summaries and payouts",
            "💰",
          )}
        </View>

        {/* Quiet Hours */}
        <View className="mx-5 mt-5 bg-white rounded-xl shadow-sm shadow-neutral-300 p-5">
          <Text className="text-lg font-JakartaSemiBold mb-4">Quiet Hours</Text>

          <View className="flex flex-row items-center justify-between py-4 border-b border-gray-100">
            <View className="flex flex-row items-start flex-1 mr-4">
              <Text className="text-xl mr-3">🌙</Text>
              <View className="flex-1">
                <Text className="text-lg font-JakartaSemiBold">
                  Enable Quiet Hours
                </Text>
                <Text className="text-gray-600 text-sm">
                  Reduce notifications during specified hours
                </Text>
              </View>
            </View>
            <Switch
              value={settings.quietHoursEnabled}
              onValueChange={(value) =>
                updateSetting("quietHoursEnabled", value)
              }
              trackColor={{ false: "#767577", true: "#3B82F6" }}
              thumbColor={settings.quietHoursEnabled ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          {settings.quietHoursEnabled && (
            <View className="mt-4">
              <View className="flex flex-row items-center justify-between py-3">
                <Text className="text-lg font-JakartaSemiBold">Start Time</Text>
                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                  <Text className="text-gray-700 font-JakartaSemiBold">
                    {settings.quietHoursStart}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex flex-row items-center justify-between py-3">
                <Text className="text-lg font-JakartaSemiBold">End Time</Text>
                <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg">
                  <Text className="text-gray-700 font-JakartaSemiBold">
                    {settings.quietHoursEnd}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Notification Channels */}
        <View className="mx-5 mt-5 mb-10 bg-blue-50 p-4 rounded-xl">
          <Text className="text-blue-800 font-JakartaSemiBold mb-2">
            💡 Pro Tip
          </Text>
          <Text className="text-blue-700 text-sm mb-3">
            You can also manage notification permissions directly in your device
            settings.
          </Text>
          <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg">
            <Text className="text-white font-JakartaSemiBold text-center">
              Open Device Settings
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationSettings;
