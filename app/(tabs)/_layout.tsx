import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import useThemeColors from '@/hooks/useThemeColors';

export default function TabLayout() {
  const COLORS = useThemeColors();
  
  return (
    <LinearGradient colors={['#2B2746', '#221D40', '#05040C']} style={{ flex: 1 }}>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: "#2E2746",
          headerShown: false,
          tabBarStyle: {
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="browse"
          options={{
            title: 'Browse',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? 'list' : 'list-outline'}
                color={focused ? COLORS.tabIconSelected: COLORS.tabIconDefault}
              />
            ),
            tabBarActiveTintColor: COLORS.tabIconSelected,
            tabBarInactiveTintColor: COLORS.tabIconDefault,
            tabBarItemStyle: {
              marginBottom: 10,
            },
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? 'heart' : 'heart-outline'}
                color={focused ? COLORS.tabIconSelected: COLORS.tabIconDefault}
              />
            ),
            tabBarActiveTintColor: COLORS.tabIconSelected,
            tabBarInactiveTintColor: COLORS.tabIconDefault,
            tabBarItemStyle: {
              marginBottom: 10,
            },
          }}
        />
      </Tabs>
    </LinearGradient>
  );
}