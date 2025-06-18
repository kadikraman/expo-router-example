import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NotFoundScreen() {
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text>{`This screen doesn't exist.`}</Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
