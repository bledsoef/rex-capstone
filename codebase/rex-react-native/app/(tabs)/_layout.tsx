import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PlayBar } from "@/components/PlayBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: { height: "9%" },

        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "search" : "search-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "library" : "library-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="rex"
          options={{
            title: "Rex",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "megaphone" : "megaphone-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="album/[album]"
          options={{
            tabBarButton: () => null,
            title: "Rex",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "megaphone" : "megaphone-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <PlayBar/>
    </>
  );
}
