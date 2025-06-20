import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Share, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

// Dummy referral data
const referralData = {
    referralCode: "JOHN2024",
    totalReferrals: 5,
    pendingRewards: 25.00,
    totalEarned: 125.00,
    rewardPerReferral: 5.00,
    recentReferrals: [
        { name: "Sarah Smith", status: "completed", reward: 5.00, date: "Jan 15" },
        { name: "Mike Johnson", status: "pending", reward: 5.00, date: "Jan 12" },
        { name: "Emily Davis", status: "completed", reward: 5.00, date: "Jan 10" },
    ]
};

const ReferFriends = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            const message = `Hey! I've been using this amazing delivery app and thought you'd love it too! Use my referral code ${referralData.referralCode} when you sign up and we'll both get $${referralData.rewardPerReferral}! Download it here: [App Store Link]`;

            await Share.share({
                message,
                title: "Join me on this awesome delivery app!",
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const copyToClipboard = () => {
        // In a real app, you'd use Clipboard.setString(referralData.referralCode)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={icons.backArrow} className="w-6 h-6" />
                </TouchableOpacity>
                <Text className="text-xl font-JakartaSemiBold">Refer Friends</Text>
                <View className="w-6" />
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View className="items-center px-5 py-8 bg-gradient-to-b from-blue-50 to-white">
                    <Text className="text-6xl mb-4">🎁</Text>
                    <Text className="text-2xl font-JakartaBold text-center mb-2">
                        Earn ${referralData.rewardPerReferral} for every friend!
                    </Text>
                    <Text className="text-gray-600 text-center">
                        Invite your friends and family to join our delivery platform
                    </Text>
                </View>

                {/* Referral Code Section */}
                <View className="mx-5 mt-5 p-5 bg-white rounded-xl shadow-sm shadow-neutral-300">
                    <Text className="text-lg font-JakartaSemiBold mb-3">Your Referral Code</Text>

                    <View className="flex flex-row items-center justify-between bg-gray-50 rounded-lg p-4 mb-4">
                        <Text className="text-2xl font-JakartaBold text-blue-600">
                            {referralData.referralCode}
                        </Text>
                        <TouchableOpacity
                            onPress={copyToClipboard}
                            className="bg-blue-500 px-4 py-2 rounded-lg"
                        >
                            <Text className="text-white font-JakartaSemiBold">
                                {copied ? "Copied!" : "Copy"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <CustomButton
                        title="Share with Friends"
                        onPress={handleShare}
                        className="mb-3"
                    />
                </View>

                {/* Stats Section */}
                <View className="mx-5 mt-5 p-5 bg-white rounded-xl shadow-sm shadow-neutral-300">
                    <Text className="text-lg font-JakartaSemiBold mb-4">Your Rewards</Text>

                    <View className="flex flex-row justify-between mb-4">
                        <View className="flex-1 items-center">
                            <Text className="text-2xl font-JakartaBold text-green-600">
                                {referralData.totalReferrals}
                            </Text>
                            <Text className="text-sm text-gray-500">Total Referrals</Text>
                        </View>

                        <View className="flex-1 items-center">
                            <Text className="text-2xl font-JakartaBold text-orange-600">
                                ${referralData.pendingRewards.toFixed(2)}
                            </Text>
                            <Text className="text-sm text-gray-500">Pending</Text>
                        </View>

                        <View className="flex-1 items-center">
                            <Text className="text-2xl font-JakartaBold text-blue-600">
                                ${referralData.totalEarned.toFixed(2)}
                            </Text>
                            <Text className="text-sm text-gray-500">Total Earned</Text>
                        </View>
                    </View>
                </View>

                {/* How it Works */}
                <View className="mx-5 mt-5 p-5 bg-white rounded-xl shadow-sm shadow-neutral-300">
                    <Text className="text-lg font-JakartaSemiBold mb-4">How it Works</Text>

                    <View className="flex flex-row items-start mb-4">
                        <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                            <Text className="text-blue-600 font-bold">1</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-JakartaSemiBold">Share your code</Text>
                            <Text className="text-gray-600 text-sm">
                                Send your referral code to friends and family
                            </Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-start mb-4">
                        <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                            <Text className="text-blue-600 font-bold">2</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-JakartaSemiBold">They sign up</Text>
                            <Text className="text-gray-600 text-sm">
                                Your friend downloads the app and uses your code
                            </Text>
                        </View>
                    </View>

                    <View className="flex flex-row items-start">
                        <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3 mt-1">
                            <Text className="text-blue-600 font-bold">3</Text>
                        </View>
                        <View className="flex-1">
                            <Text className="font-JakartaSemiBold">You both earn!</Text>
                            <Text className="text-gray-600 text-sm">
                                Both of you get ${referralData.rewardPerReferral} after their first ride
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Recent Referrals */}
                <View className="mx-5 mt-5 mb-5 p-5 bg-white rounded-xl shadow-sm shadow-neutral-300">
                    <Text className="text-lg font-JakartaSemiBold mb-4">Recent Referrals</Text>

                    {referralData.recentReferrals.map((referral, index) => (
                        <View key={index} className="flex flex-row items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                            <View>
                                <Text className="font-JakartaSemiBold">{referral.name}</Text>
                                <Text className="text-sm text-gray-500">{referral.date}</Text>
                            </View>
                            <View className="items-end">
                                <Text className={`font-JakartaSemiBold ${referral.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                                    }`}>
                                    ${referral.reward.toFixed(2)}
                                </Text>
                                <Text className={`text-xs ${referral.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                                    }`}>
                                    {referral.status}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReferFriends; 