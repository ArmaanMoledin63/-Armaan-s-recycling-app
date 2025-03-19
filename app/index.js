// app/index.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#e3fbe5', '#4fabaa']} // Gradient background colors
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('./image.png')} // PNG file in app directory
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Welcome to our App</Text>
      <Text style={styles.subtitle}>
        Snap, classify, and recycle waste effortlessly for a greener planet!
      </Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.replace('home')}
      >
        <Text style={styles.buttonText}>Get Started →</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});