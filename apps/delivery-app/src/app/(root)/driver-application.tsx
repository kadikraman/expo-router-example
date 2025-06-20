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

interface ApplicationForm {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;

  // Driver Information
  licenseNumber: string;
  licenseState: string;
  licenseExpiry: string;

  // Vehicle Information
  vehicleType: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  licensePlate: string;

  // Insurance Information
  insuranceCompany: string;
  policyNumber: string;
  insuranceExpiry: string;

  // Banking Information
  bankName: string;
  accountType: string;
  routingNumber: string;
  accountNumber: string;
}

const DriverApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<ApplicationForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    licenseNumber: "",
    licenseState: "",
    licenseExpiry: "",
    vehicleType: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    licensePlate: "",
    insuranceCompany: "",
    policyNumber: "",
    insuranceExpiry: "",
    bankName: "",
    accountType: "",
    routingNumber: "",
    accountNumber: "",
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    profilePhoto: false,
    driverLicense: false,
    vehicleRegistration: false,
    insuranceCard: false,
    vehiclePhoto: false,
  });

  const totalSteps = 5;

  const updateForm = (field: keyof ApplicationForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleDocumentUpload = (docType: keyof typeof uploadedDocs) => {
    // Simulate document upload
    setUploadedDocs((prev) => ({ ...prev, [docType]: true }));
    Alert.alert("Success", "Document uploaded successfully!");
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = () => {
    Alert.alert(
      "Application Submitted!",
      "Thank you for your application. We'll review it and get back to you within 1-3 business days.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  const renderProgressBar = () => (
    <View className="flex flex-row items-center justify-between px-5 py-4 bg-gray-50">
      {Array.from({ length: totalSteps }, (_, i) => (
        <View key={i} className="flex-1 flex flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              i + 1 <= currentStep ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <Text
              className={`font-bold ${i + 1 <= currentStep ? "text-white" : "text-gray-600"}`}
            >
              {i + 1}
            </Text>
          </View>
          {i < totalSteps - 1 && (
            <View
              className={`flex-1 h-1 mx-2 ${
                i + 1 < currentStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View>
      <Text className="text-xl font-JakartaBold mb-4">
        Personal Information
      </Text>

      <InputField
        label="First Name"
        placeholder="Enter your first name"
        value={form.firstName}
        onChangeText={(value) => updateForm("firstName", value)}
      />

      <InputField
        label="Last Name"
        placeholder="Enter your last name"
        value={form.lastName}
        onChangeText={(value) => updateForm("lastName", value)}
      />

      <InputField
        label="Email"
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(value) => updateForm("email", value)}
        keyboardType="email-address"
      />

      <InputField
        label="Phone Number"
        placeholder="Enter your phone number"
        value={form.phone}
        onChangeText={(value) => updateForm("phone", value)}
        keyboardType="phone-pad"
      />

      <InputField
        label="Date of Birth"
        placeholder="MM/DD/YYYY"
        value={form.dateOfBirth}
        onChangeText={(value) => updateForm("dateOfBirth", value)}
      />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text className="text-xl font-JakartaBold mb-4">Address Information</Text>

      <InputField
        label="Street Address"
        placeholder="Enter your address"
        value={form.address}
        onChangeText={(value) => updateForm("address", value)}
      />

      <InputField
        label="City"
        placeholder="Enter your city"
        value={form.city}
        onChangeText={(value) => updateForm("city", value)}
      />

      <View className="flex flex-row space-x-3">
        <View className="flex-1">
          <InputField
            label="State"
            placeholder="CA"
            value={form.state}
            onChangeText={(value) => updateForm("state", value)}
          />
        </View>
        <View className="flex-1">
          <InputField
            label="ZIP Code"
            placeholder="12345"
            value={form.zipCode}
            onChangeText={(value) => updateForm("zipCode", value)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text className="text-xl font-JakartaBold mb-4 mt-6">
        Driver's License
      </Text>

      <InputField
        label="License Number"
        placeholder="Enter license number"
        value={form.licenseNumber}
        onChangeText={(value) => updateForm("licenseNumber", value)}
      />

      <View className="flex flex-row space-x-3">
        <View className="flex-1">
          <InputField
            label="License State"
            placeholder="CA"
            value={form.licenseState}
            onChangeText={(value) => updateForm("licenseState", value)}
          />
        </View>
        <View className="flex-1">
          <InputField
            label="Expiry Date"
            placeholder="MM/DD/YYYY"
            value={form.licenseExpiry}
            onChangeText={(value) => updateForm("licenseExpiry", value)}
          />
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text className="text-xl font-JakartaBold mb-4">Vehicle Information</Text>

      <InputField
        label="Vehicle Type"
        placeholder="Car, SUV, Truck, Motorcycle"
        value={form.vehicleType}
        onChangeText={(value) => updateForm("vehicleType", value)}
      />

      <View className="flex flex-row space-x-3">
        <View className="flex-1">
          <InputField
            label="Make"
            placeholder="Toyota"
            value={form.vehicleMake}
            onChangeText={(value) => updateForm("vehicleMake", value)}
          />
        </View>
        <View className="flex-1">
          <InputField
            label="Model"
            placeholder="Camry"
            value={form.vehicleModel}
            onChangeText={(value) => updateForm("vehicleModel", value)}
          />
        </View>
      </View>

      <View className="flex flex-row space-x-3">
        <View className="flex-1">
          <InputField
            label="Year"
            placeholder="2020"
            value={form.vehicleYear}
            onChangeText={(value) => updateForm("vehicleYear", value)}
            keyboardType="numeric"
          />
        </View>
        <View className="flex-1">
          <InputField
            label="Color"
            placeholder="Blue"
            value={form.vehicleColor}
            onChangeText={(value) => updateForm("vehicleColor", value)}
          />
        </View>
      </View>

      <InputField
        label="License Plate"
        placeholder="ABC123"
        value={form.licensePlate}
        onChangeText={(value) => updateForm("licensePlate", value)}
      />

      <Text className="text-xl font-JakartaBold mb-4 mt-6">
        Insurance Information
      </Text>

      <InputField
        label="Insurance Company"
        placeholder="State Farm, Geico, etc."
        value={form.insuranceCompany}
        onChangeText={(value) => updateForm("insuranceCompany", value)}
      />

      <View className="flex flex-row space-x-3">
        <View className="flex-1">
          <InputField
            label="Policy Number"
            placeholder="Policy number"
            value={form.policyNumber}
            onChangeText={(value) => updateForm("policyNumber", value)}
          />
        </View>
        <View className="flex-1">
          <InputField
            label="Expiry Date"
            placeholder="MM/DD/YYYY"
            value={form.insuranceExpiry}
            onChangeText={(value) => updateForm("insuranceExpiry", value)}
          />
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View>
      <Text className="text-xl font-JakartaBold mb-4">Document Upload</Text>
      <Text className="text-gray-600 mb-6">
        Please upload the following required documents:
      </Text>

      {Object.entries({
        profilePhoto: "Profile Photo",
        driverLicense: "Driver's License",
        vehicleRegistration: "Vehicle Registration",
        insuranceCard: "Insurance Card",
        vehiclePhoto: "Vehicle Photo",
      }).map(([key, label]) => (
        <View
          key={key}
          className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-lg mb-3"
        >
          <View className="flex flex-row items-center">
            <View
              className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                uploadedDocs[key as keyof typeof uploadedDocs]
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              <Text className="text-white font-bold">
                {uploadedDocs[key as keyof typeof uploadedDocs] ? "✓" : "📄"}
              </Text>
            </View>
            <Text className="font-JakartaSemiBold">{label}</Text>
          </View>

          <TouchableOpacity
            className={`px-4 py-2 rounded-lg ${
              uploadedDocs[key as keyof typeof uploadedDocs]
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
            onPress={() =>
              handleDocumentUpload(key as keyof typeof uploadedDocs)
            }
          >
            <Text className="text-white font-JakartaSemiBold">
              {uploadedDocs[key as keyof typeof uploadedDocs]
                ? "Uploaded"
                : "Upload"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderStep5 = () => (
    <View>
      <Text className="text-xl font-JakartaBold mb-4">Banking Information</Text>
      <Text className="text-gray-600 mb-6">
        This information is needed for direct deposit payments.
      </Text>

      <InputField
        label="Bank Name"
        placeholder="Bank of America"
        value={form.bankName}
        onChangeText={(value) => updateForm("bankName", value)}
      />

      <InputField
        label="Account Type"
        placeholder="Checking or Savings"
        value={form.accountType}
        onChangeText={(value) => updateForm("accountType", value)}
      />

      <InputField
        label="Routing Number"
        placeholder="9-digit routing number"
        value={form.routingNumber}
        onChangeText={(value) => updateForm("routingNumber", value)}
        keyboardType="numeric"
      />

      <InputField
        label="Account Number"
        placeholder="Account number"
        value={form.accountNumber}
        onChangeText={(value) => updateForm("accountNumber", value)}
        keyboardType="numeric"
        secureTextEntry={true}
      />

      <View className="bg-blue-50 p-4 rounded-lg mt-6">
        <Text className="text-blue-800 font-JakartaSemiBold mb-2">
          🔒 Security Notice
        </Text>
        <Text className="text-blue-700 text-sm">
          Your banking information is encrypted and securely stored. We use
          bank-level security to protect your data.
        </Text>
      </View>
    </View>
  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return renderStep1();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-5 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Image source={icons.backArrow} className="w-6 h-6" />
        </TouchableOpacity>
        <Text className="text-xl font-JakartaSemiBold">Driver Application</Text>
        <View className="w-6" />
      </View>

      {/* Progress Bar */}
      {renderProgressBar()}

      <ScrollView
        className="flex-1 px-5 py-6"
        showsVerticalScrollIndicator={false}
      >
        {getCurrentStepContent()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="flex flex-row items-center justify-between px-5 py-4 border-t border-gray-100">
        <TouchableOpacity
          className={`px-6 py-3 rounded-lg ${currentStep === 1 ? "bg-gray-200" : "bg-gray-500"}`}
          onPress={prevStep}
          disabled={currentStep === 1}
        >
          <Text
            className={`font-JakartaSemiBold ${currentStep === 1 ? "text-gray-400" : "text-white"}`}
          >
            Previous
          </Text>
        </TouchableOpacity>

        {currentStep === totalSteps ? (
          <CustomButton
            title="Submit Application"
            onPress={submitApplication}
            className="flex-1 ml-3"
          />
        ) : (
          <TouchableOpacity
            className="px-6 py-3 bg-blue-500 rounded-lg flex-1 ml-3 items-center"
            onPress={nextStep}
          >
            <Text className="text-white font-JakartaSemiBold">Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DriverApplication;
