import { Driver, MarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  // Check if we have a valid API key
  if (
    !directionsAPI ||
    directionsAPI === process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY
  ) {
    console.warn("Google Maps API key not configured - using dummy data");
    // Return dummy data instead of making API calls
    return markers.map((marker) => ({
      ...marker,
      time: Math.floor(Math.random() * 30) + 10, // Random time between 10-40 mins
      price: (Math.random() * 20 + 10).toFixed(2), // Random price between $10-30
    }));
  }

  try {
    const timesPromises = markers.map(async (marker) => {
      try {
        const responseToUser = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`,
        );

        if (!responseToUser.ok) {
          throw new Error(`HTTP error! status: ${responseToUser.status}`);
        }

        const dataToUser = await responseToUser.json();

        if (dataToUser.status !== "OK" || !dataToUser.routes?.length) {
          throw new Error(
            `API error: ${dataToUser.status || "No routes found"}`,
          );
        }

        const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds

        const responseToDestination = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`,
        );

        if (!responseToDestination.ok) {
          throw new Error(
            `HTTP error! status: ${responseToDestination.status}`,
          );
        }

        const dataToDestination = await responseToDestination.json();

        if (
          dataToDestination.status !== "OK" ||
          !dataToDestination.routes?.length
        ) {
          throw new Error(
            `API error: ${dataToDestination.status || "No routes found"}`,
          );
        }

        const timeToDestination =
          dataToDestination.routes[0].legs[0].duration.value; // Time in seconds

        const totalTime = (timeToUser + timeToDestination) / 60; // Total time in minutes
        const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time

        return { ...marker, time: totalTime, price };
      } catch (markerError) {
        console.warn(
          `Error calculating time for marker ${marker.id}:`,
          markerError,
        );
        // Return dummy data for this marker
        return {
          ...marker,
          time: Math.floor(Math.random() * 30) + 10,
          price: (Math.random() * 20 + 10).toFixed(2),
        };
      }
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.warn("Error calculating driver times - using dummy data:", error);
    // Return dummy data for all markers
    return markers.map((marker) => ({
      ...marker,
      time: Math.floor(Math.random() * 30) + 10, // Random time between 10-40 mins
      price: (Math.random() * 20 + 10).toFixed(2), // Random price between $10-30
    }));
  }
};

// Function to get route coordinates for drawing polylines
export const getRouteCoordinates = async ({
  originLatitude,
  originLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  originLatitude: number;
  originLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
}) => {
  // Check if we have a valid API key
  if (!directionsAPI || directionsAPI === "your_api_key_here") {
    console.warn("Google Maps API key not configured - using dummy route");
    // Return a simple straight line between points as dummy data
    return [
      { latitude: originLatitude, longitude: originLongitude },
      { latitude: destinationLatitude, longitude: destinationLongitude },
    ];
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${originLatitude},${originLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== "OK" || !data.routes?.length) {
      throw new Error(`API error: ${data.status || "No routes found"}`);
    }

    // Decode the polyline points
    const points = decodePolyline(data.routes[0].overview_polyline.points);
    return points;
  } catch (error) {
    console.warn(
      "Error fetching route coordinates - using straight line:",
      error,
    );
    // Return a simple straight line between points as fallback
    return [
      { latitude: originLatitude, longitude: originLongitude },
      { latitude: destinationLatitude, longitude: destinationLongitude },
    ];
  }
};

// Function to decode Google's polyline algorithm
const decodePolyline = (encoded: string) => {
  const points: { latitude: number; longitude: number }[] = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;

    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const deltaLat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;

    do {
      b = encoded.charAt(index++).charCodeAt(0) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const deltaLng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    points.push({
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    });
  }

  return points;
};
