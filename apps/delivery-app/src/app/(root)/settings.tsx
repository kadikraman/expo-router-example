import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants";

const settingsOptions = [
    {
        title: "Account",
        items: [
            { icon: "👤", name: "Personal Information", action: "personal-info" },
            { icon: "🔒", name: "Privacy & Security", action: "privacy" },
            { icon: "💳", name: "Payment Methods", action: "payment" },
            { icon: "📧", name: "Email Preferences", action: "email" },
        ]
    },
    {
        title: "App Preferences",
        items: [
            { icon: "🔔", name: "Notifications", action: "notifications" },
            { icon: "🌙", name: "Dark Mode", action: "dark-mode" },
            { icon: "🌍", name: "Language", action: "language" },
            { icon: "📍", name: "Location Services", action: "location" },
        ]
    },
    {
        title: "Support",
        items: [
            { icon: "❓", name: "Help Center", action: "help" },
            { icon: "📞", name: "Contact Support", action: "contact" },
            { icon: "⭐", name: "Rate the App", action: "rate" },
            { icon: "🐛", name: "Report a Bug", action: "bug" },
        ]
    },
    {
        title: "Legal",
        items: [
            { icon: "📄", name: "Terms of Service", action: "terms" },
            { icon: "🔒", name: "Privacy Policy", action: "privacy-policy" },
            { icon: "📋", name: "Licenses", action: "licenses" },
        ]
    }
];

const Settings = () => {
    const handleSettingPress = (action: string) => {
        // For now, just log the action - these will be implemented later
        console.log(`Settings action: ${action}`);
        // Future implementation: router.push(`/(root)/settings/${action}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.backArrow} className="w-6 h-6" />
                </TouchableOpacity>
                <Text className="text-xl font-JakartaSemiBold">Settings</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {settingsOptions.map((section, sectionIndex) => (
                    <View key={sectionIndex} className="mt-5">
                        <Text className="text-sm font-JakartaSemiBold text-gray-500 px-5 mb-2 uppercase tracking-wide">
                            {section.title}
                        </Text>

                        <View className="mx-5 bg-white rounded-xl shadow-sm shadow-neutral-300">
                            {section.items.map((item, itemIndex) => (
                                <TouchableOpacity
                                    key={itemIndex}
                                    className={`flex flex-row items-center justify-between p-4 ${itemIndex < section.items.length - 1 ? 'border-b border-gray-100' : ''
                                        }`}
                                    onPress={() => handleSettingPress(item.action)}
                                >
                                    <View className="flex flex-row items-center">
                                        <Text className="text-xl mr-3">{item.icon}</Text>
                                        <Text className="text-lg font-JakartaMedium">{item.name}</Text>
                                    </View>
                                    <Text className="text-gray-400 text-lg">›</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                {/* App Version */}
                <View className="mx-5 mt-8 mb-10 items-center">
                    <Text className="text-gray-500 text-sm">Version 1.0.0</Text>
                    <Text className="text-gray-400 text-xs mt-1">© 2024 Delivery App</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings; 