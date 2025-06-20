import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

// Driver onboarding requirements
const requirements = [
    {
        icon: "👤",
        title: "Age Requirement",
        description: "Must be 21 years or older",
        status: "required"
    },
    {
        icon: "🚗",
        title: "Valid Vehicle",
        description: "Car, truck, or motorcycle in good condition",
        status: "required"
    },
    {
        icon: "📄",
        title: "Driver's License",
        description: "Valid driver's license with clean record",
        status: "required"
    },
    {
        icon: "🛡️",
        title: "Insurance",
        description: "Current auto insurance policy",
        status: "required"
    },
    {
        icon: "📱",
        title: "Smartphone",
        description: "iPhone 6s or Android 5.0 or newer",
        status: "required"
    },
    {
        icon: "✅",
        title: "Background Check",
        description: "Pass our safety screening",
        status: "required"
    }
];

const benefits = [
    {
        icon: "💰",
        title: "Earn up to $25/hour",
        description: "Make money on your own schedule"
    },
    {
        icon: "🕐",
        title: "Flexible Hours",
        description: "Work when you want, where you want"
    },
    {
        icon: "📊",
        title: "Weekly Payments",
        description: "Get paid every week, guaranteed"
    },
    {
        icon: "🎯",
        title: "Bonus Opportunities",
        description: "Earn extra during peak hours"
    }
];

const DriverOnboarding = () => {
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.backArrow} className="w-6 h-6" />
                </TouchableOpacity>
                <Text className="text-xl font-JakartaSemiBold">Become a Driver</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View className="items-center px-5 py-8 bg-gradient-to-b from-green-50 to-white">
                    <Text className="text-6xl mb-4">🚗</Text>
                    <Text className="text-2xl font-JakartaBold text-center mb-2">
                        Start Earning Today!
                    </Text>
                    <Text className="text-gray-600 text-center">
                        Join thousands of drivers making money on their own schedule
                    </Text>
                </View>

                {/* Benefits Section */}
                <View className="mx-5 mt-5 p-5 bg-white rounded-xl shadow-sm shadow-neutral-300">
                    <Text className="text-lg font-JakartaSemiBold mb-4">Why Drive with Us?</Text>

                    {benefits.map((benefit, index) => (
                        <View key={index} className="flex flex-row items-start mb-4 last:mb-0">
                            <Text className="text-2xl mr-3">{benefit.icon}</Text>
                            <View className="flex-1">
                                <Text className="font-JakartaSemiBold text-lg">{benefit.title}</Text>
                                <Text className="text-gray-600">{benefit.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Requirements Section */}
                <View className="mx-5 mt-5 p-5 bg-white rounded-xl shadow-sm shadow-neutral-300">
                    <Text className="text-lg font-JakartaSemiBold mb-4">Requirements</Text>
                    <Text className="text-gray-600 mb-4">
                        Make sure you meet all requirements before starting your application:
                    </Text>

                    {requirements.map((requirement, index) => (
                        <View key={index} className="flex flex-row items-start mb-4 last:mb-0">
                            <Text className="text-xl mr-3">{requirement.icon}</Text>
                            <View className="flex-1">
                                <Text className="font-JakartaSemiBold">{requirement.title}</Text>
                                <Text className="text-gray-600 text-sm">{requirement.description}</Text>
                            </View>
                            <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center">
                                <Text className="text-white text-xs font-bold">✓</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Process Section */}
                <View className="mx-5 mt-5 p-5 bg-white rounded-xl shadow-sm shadow-neutral-300">
                    <Text className="text-lg font-JakartaSemiBold mb-4">Application Process</Text>

                    <View className="flex flex-row items-start mb-4">
                        <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                            <Text className="text-blue-600 font-bold">1</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-JakartaSemiBold">Submit Application</Text>
                            <Text className="text-gray-600 text-sm">
                                Provide your personal information and documents
                            </Text>
                            <Text className="text-blue-600 text-xs">~5 minutes</Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-start mb-4">
                        <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                            <Text className="text-blue-600 font-bold">2</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-JakartaSemiBold">Background Check</Text>
                            <Text className="text-gray-600 text-sm">
                                We'll verify your documents and run safety checks
                            </Text>
                            <Text className="text-blue-600 text-xs">1-3 business days</Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-start mb-4">
                        <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                            <Text className="text-blue-600 font-bold">3</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-JakartaSemiBold">Vehicle Inspection</Text>
                            <Text className="text-gray-600 text-sm">
                                Schedule a quick vehicle safety inspection
                            </Text>
                            <Text className="text-blue-600 text-xs">30 minutes</Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-start">
                        <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3 mt-1">
                            <Text className="text-green-600 font-bold">4</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-JakartaSemiBold">Start Earning!</Text>
                            <Text className="text-gray-600 text-sm">
                                Complete onboarding and start accepting deliveries
                            </Text>
                            <Text className="text-green-600 text-xs">Ready to go!</Text>
                        </View>
                    </View>
                </View>

                {/* Earnings Calculator */}
                <View className="mx-5 mt-5 p-5 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
                    <Text className="text-lg font-JakartaSemiBold mb-3">Potential Earnings</Text>

                    <View className="flex flex-row justify-between mb-3">
                        <View className="items-center">
                            <Text className="text-2xl font-JakartaBold text-green-600">$15-25</Text>
                            <Text className="text-sm text-gray-700">Per Hour</Text>
                        </View>

                        <View className="items-center">
                            <Text className="text-2xl font-JakartaBold text-green-600">$500+</Text>
                            <Text className="text-sm text-gray-700">Per Week</Text>
                        </View>

                        <View className="items-center">
                            <Text className="text-2xl font-JakartaBold text-green-600">$2000+</Text>
                            <Text className="text-sm text-gray-700">Per Month</Text>
                        </View>
                    </View>

                    <Text className="text-xs text-gray-600 text-center">
                        *Earnings vary by location, time, and demand. These are potential earnings.
                    </Text>
                </View>

                {/* Action Buttons */}
                <View className="mx-5 mt-5 mb-10">
                    <CustomButton
                        title="Start Application"
                        onPress={() => router.push("/(root)/driver-application")}
                        className="mb-3"
                    />

                    <TouchableOpacity
                        className="items-center py-3"
                        onPress={() => router.push("/(root)/driver-faq")}
                    >
                        <Text className="text-blue-600 font-JakartaSemiBold">
                            Have questions? View FAQ
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DriverOnboarding; 