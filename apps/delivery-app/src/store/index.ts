import { create } from "zustand";

import { DriverStore, LocationStore, MarkerData } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
}));

// New driver mode store
interface DeliveryRequest {
  id: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  deliveryLatitude: number;
  deliveryLongitude: number;
  distance: string;
  estimatedTime: string;
  fare: number;
  customerName: string;
  customerPhone: string;
  orderDetails: string;
  requestTime: string;
  expiresAt: number; // timestamp for auto-decline
  status?: "active" | "completed" | "cancelled";
  cancellationReason?: string;
}

interface DriverModeStore {
  isDriverMode: boolean;
  isOnline: boolean;
  isRegisteredDriver: boolean;
  currentRequest: DeliveryRequest | null;
  activeDelivery: DeliveryRequest | null;
  deliveryHistory: DeliveryRequest[];
  cancelledDeliveries: DeliveryRequest[];
  todayEarnings: number;
  weeklyEarnings: number;
  totalDeliveries: number;
  rating: number;

  // Actions
  toggleDriverMode: () => void;
  toggleOnlineStatus: () => void;
  setDriverRegistration: (registered: boolean) => void;
  setCurrentRequest: (request: DeliveryRequest | null) => void;
  acceptRequest: () => void;
  declineRequest: () => void;
  completeDelivery: () => void;
  cancelDelivery: (reason: string) => void;
  updateEarnings: (amount: number) => void;
}

export const useDriverModeStore = create<DriverModeStore>((set, get) => ({
  isDriverMode: false,
  isOnline: false,
  isRegisteredDriver: false,
  currentRequest: null,
  activeDelivery: null,
  deliveryHistory: [],
  cancelledDeliveries: [],
  todayEarnings: 0,
  weeklyEarnings: 0,
  totalDeliveries: 0,
  rating: 4.9,

  toggleDriverMode: () => {
    set((state) => ({
      isDriverMode: !state.isDriverMode,
      isOnline: state.isDriverMode ? false : state.isOnline, // Turn offline when exiting driver mode
    }));
  },

  toggleOnlineStatus: () => {
    set((state) => ({ isOnline: !state.isOnline }));
  },

  setDriverRegistration: (registered: boolean) => {
    set(() => ({ isRegisteredDriver: registered }));
  },

  setCurrentRequest: (request: DeliveryRequest | null) => {
    set(() => ({ currentRequest: request }));
  },

  acceptRequest: () => {
    const { currentRequest } = get();
    if (currentRequest) {
      set(() => ({
        activeDelivery: { ...currentRequest, status: "active" },
        currentRequest: null,
      }));
    }
  },

  declineRequest: () => {
    set(() => ({ currentRequest: null }));
  },

  completeDelivery: () => {
    const { activeDelivery, deliveryHistory, totalDeliveries } = get();
    if (activeDelivery) {
      const completedDelivery = {
        ...activeDelivery,
        status: "completed" as const,
      };
      set(() => ({
        activeDelivery: null,
        deliveryHistory: [completedDelivery, ...deliveryHistory],
        totalDeliveries: totalDeliveries + 1,
      }));
      get().updateEarnings(activeDelivery.fare);
    }
  },

  cancelDelivery: (reason: string) => {
    const { activeDelivery, cancelledDeliveries } = get();
    if (activeDelivery) {
      const cancelledDelivery = {
        ...activeDelivery,
        status: "cancelled" as const,
        cancellationReason: reason,
      };

      // Calculate partial compensation based on progress
      let partialCompensation = 0;
      if (reason === "customer_cancelled") {
        partialCompensation = activeDelivery.fare * 0.5; // 50% if customer cancels
      } else {
        partialCompensation = activeDelivery.fare * 0.3; // 30% for other reasons
      }

      set(() => ({
        activeDelivery: null,
        cancelledDeliveries: [cancelledDelivery, ...cancelledDeliveries],
      }));

      if (partialCompensation > 0) {
        get().updateEarnings(partialCompensation);
      }
    }
  },

  updateEarnings: (amount: number) => {
    set((state) => ({
      todayEarnings: state.todayEarnings + amount,
      weeklyEarnings: state.weeklyEarnings + amount,
    }));
  },
}));
