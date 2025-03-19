// app/layout.js
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#75b867',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="home" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="camera" 
        options={{ 
          title: 'Scan Item' 
        }} 
      />
      <Stack.Screen 
        name="videos" 
        options={{ 
          title: 'Educational Videos',
          headerShown: true
        }} 
      />
      <Stack.Screen 
        name="videoPlayer" 
        options={{ 
          title: 'Video',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="blogs" 
        options={{ 
          title: 'Recycling Blog',
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerShown: true
        }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          title: 'Sign Up',
          headerShown: true
        }} 
      />
    </Stack>
  );
}