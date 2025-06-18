import { AppleMaps, GoogleMaps } from "expo-maps";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";

import { useFetch } from "@/lib/fetch";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();

  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    }
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (loading || (!userLatitude && !userLongitude))
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );

  // Platform-specific map rendering
  if (Platform.OS === "ios") {
    return (
      <AppleMaps.View
        style={{ width: "100%", height: "100%", borderRadius: 16 }}
        cameraPosition={{
          coordinates: {
            latitude: region.latitude,
            longitude: region.longitude,
          },
          zoom: 10,
        }}
        markers={[
          ...markers.map((marker) => ({
            id: String(marker.id),
            coordinates: {
              latitude: marker.latitude,
              longitude: marker.longitude,
            },
            title: marker.title,
          })),
          ...(destinationLatitude && destinationLongitude
            ? [
                {
                  id: "destination",
                  coordinates: {
                    latitude: destinationLatitude,
                    longitude: destinationLongitude,
                  },
                  title: "Destination",
                },
              ]
            : []),
        ]}
      />
    );
  } else if (Platform.OS === "android") {
    return (
      <GoogleMaps.View
        style={{ width: "100%", height: "100%", borderRadius: 16 }}
        cameraPosition={{
          coordinates: {
            latitude: region.latitude,
            longitude: region.longitude,
          },
          zoom: 10,
        }}
        markers={[
          ...markers.map((marker) => ({
            id: String(marker.id),
            coordinates: {
              latitude: marker.latitude,
              longitude: marker.longitude,
            },
            title: marker.title,
          })),
          ...(destinationLatitude && destinationLongitude
            ? [
                {
                  id: "destination",
                  coordinates: {
                    latitude: destinationLatitude,
                    longitude: destinationLongitude,
                  },
                  title: "Destination",
                },
              ]
            : []),
        ]}
      />
    );
  } else {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Text style={{ textAlign: "center", color: "#666" }}>
          Maps are only available on Android and iOS
        </Text>
      </View>
    );
  }
};

export default Map;
