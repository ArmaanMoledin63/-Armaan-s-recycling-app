// app/components/ProtectedRoute.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/auth';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  
  // If auth state is still loading, show a loading spinner
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#75b867" />
      </View>
    );
  }

  // If user is not signed in, redirect to login
  if (!user) {
    return <Redirect href="/login" />;
  }

  // If user is signed in, render the protected content
  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3faf1',
  },
});