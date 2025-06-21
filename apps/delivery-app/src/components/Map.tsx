import { AppleMaps, GoogleMaps } from "expo-maps";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, View } from "react-native";

import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
  getRouteCoordinates,
} from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";
import { Driver, MarkerData } from "@/types/type";

// Dummy driver data - moved outside component to prevent re-creation
const drivers: Driver[] = [
  {
    id: 1,
    first_name: "James",
    last_name: "Wilson",
    profile_image_url:
      "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
    car_seats: 4,
    rating: 4.8,
  },
  {
    id: 2,
    first_name: "David",
    last_name: "Brown",
    profile_image_url:
      "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
    car_image_url:
      "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
    car_seats: 5,
    rating: 4.6,
  },
  {
    id: 3,
    first_name: "Michael",
    last_name: "Johnson",
    profile_image_url:
      "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
    car_image_url:
      "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
    car_seats: 4,
    rating: 4.9,
  },
  {
    id: 4,
    first_name: "Robert",
    last_name: "Green",
    profile_image_url:
      "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
    car_image_url:
      "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
    car_seats: 4,
    rating: 4.7,
  },
];

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { selectedDriver, setDrivers } = useDriverStore();

  // const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [lastCalculation, setLastCalculation] = useState<number>(0);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const CALCULATION_THROTTLE = 5000; // 5 seconds between calculations

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
  }, [userLatitude, userLongitude]);

  // Fetch route coordinates when origin and destination are available
  useEffect(() => {
    if (
      userLatitude &&
      userLongitude &&
      destinationLatitude &&
      destinationLongitude
    ) {
      getRouteCoordinates({
        originLatitude: userLatitude,
        originLongitude: userLongitude,
        destinationLatitude,
        destinationLongitude,
      })
        .then((coordinates) => {
          setRouteCoordinates(coordinates);
        })
        .catch((error) => {
          console.warn("Failed to get route coordinates:", error);
          // Fallback to straight line
          setRouteCoordinates([
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: destinationLatitude, longitude: destinationLongitude },
          ]);
        });
    } else {
      setRouteCoordinates([]);
    }
  }, [userLatitude, userLongitude, destinationLatitude, destinationLongitude]);

  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      const now = Date.now();

      // Throttle API calls to prevent excessive requests
      if (now - lastCalculation < CALCULATION_THROTTLE) {
        console.log("Throttling driver time calculation");
        return;
      }

      setLastCalculation(now);

      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      })
        .then((drivers) => {
          if (drivers) {
            setDrivers(drivers as MarkerData[]);
          }
        })
        .catch((error) => {
          console.warn("Failed to calculate driver times:", error);
        });
    }
  }, [
    markers,
    destinationLatitude,
    destinationLongitude,
    userLatitude,
    userLongitude,
    setDrivers,
  ]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  if (!userLatitude && !userLongitude)
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
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
          ...(userLatitude && userLongitude
            ? [
                {
                  id: "origin",
                  coordinates: {
                    latitude: userLatitude,
                    longitude: userLongitude,
                  },
                  title: "Origin",
                },
              ]
            : []),
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
        polylines={
          routeCoordinates.length > 0
            ? [
                {
                  id: "route",
                  coordinates: routeCoordinates,
                  strokeColor: "#0286FF",
                  strokeWidth: 4,
                },
              ]
            : []
        }
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
          ...(userLatitude && userLongitude
            ? [
                {
                  id: "origin",
                  coordinates: {
                    latitude: userLatitude,
                    longitude: userLongitude,
                  },
                  title: "Origin",
                },
              ]
            : []),
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
        polylines={
          routeCoordinates.length > 0
            ? [
                {
                  id: "route",
                  coordinates: routeCoordinates,
                  strokeColor: "#0286FF",
                  strokeWidth: 4,
                },
              ]
            : []
        }
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
