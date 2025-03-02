import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";

const storage = createJSONStorage(() => AsyncStorage) as any;

const content = {
  isLoggedIn: false,
  hasCompletedOnboarding: false,
};

const appStateAtom = atomWithStorage<typeof content>(
  "app-state",
  content,
  storage,
);

export const useAppState = () => useAtom(appStateAtom);
