import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { COLORS } = useTheme();

  return (
    <LinearGradient colors={['#2B2746', '#221D40', '#05040C']} style={{ flex: 1, paddingTop: 80 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            borderTopColor: COLORS.tint
          },
        }}
      >
        <Tabs.Screen
          name="browse"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? 'list' : 'list-outline'}
                color={focused ? COLORS.tabIconSelected : COLORS.tabIconDefault}
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
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? 'heart' : 'heart-outline'}
                color={focused ? COLORS.tabIconSelected : COLORS.tabIconDefault}
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