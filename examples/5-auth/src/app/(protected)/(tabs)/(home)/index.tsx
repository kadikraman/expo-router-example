import { Alert, View, Modal } from "react-native";
import { AppText } from "@/components/AppText";
import { Link, useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { useState } from "react";

export default function IndexScreen() {
  const router = useRouter();
  const canGoBack = router.canGoBack();
  const [modalVisible, setModalVisible] = useState(false);

  // https://reactnative.dev/docs/alert
  const handleOpenAlert = () => {
    Alert.alert("Warning!", "Are you sure you want to proceed?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        style: "destructive",
        onPress: () => {
          console.log("Let's go!");
        },
      },
    ]);
  };

  return (
    <View className="justify-center flex-1 p-4">
      <AppText center>Index Screen</AppText>
      <Link href="/home-nested" push asChild>
        <Button title="Push to /home-nested" />
      </Link>
      {canGoBack ? (
        <Button
          title="Back"
          theme="secondary"
          onPress={() => {
            router.back();
          }}
        />
      ) : null}
      <Button
        title="Open Alert"
        theme="secondary"
        onPress={() => handleOpenAlert()}
      />
      <Button
        title="Open RN Modal"
        theme="secondary"
        onPress={() => setModalVisible(true)}
      />
      <Link href="/modal" push asChild>
        <Button title="Open Router Modal" theme="secondary" />
      </Link>
      <Link href="/modal-with-stack" push asChild>
        <Button title="Open Router Modal (Stack)" theme="secondary" />
      </Link>
      {/* https://reactnative.dev/docs/modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        // presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View className="flex-1 items-center justify-center">
          <View className="p-12 rounded-lg bg-white">
            <AppText center size="heading">
              A custom styled modal!
            </AppText>
            <Button
              title="Close"
              theme="secondary"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
