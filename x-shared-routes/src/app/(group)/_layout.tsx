import {
  Redirect,
  Tabs,
  useGlobalSearchParams,
  usePathname,
} from "expo-router";

/**
 * /details?tab=home -> (home)/details
 * /details?tab=second -> (second)/details
 */

export default function TabsLayout() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  if (pathname === "/details" && params.tab === "home") {
    return <Redirect href="/(group)/(home)/details" withAnchor />;
  }

  if (pathname === "/details" && params.tab === "second") {
    return <Redirect href="/(group)/(second)/details" withAnchor />;
  }

  return <Tabs screenOptions={{ headerShown: false }} />;
}
