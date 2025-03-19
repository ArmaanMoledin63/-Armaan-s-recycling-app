// app/camera.js
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'https://recycling-server.onrender.com/predict';

export default function Camera() {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        await predict(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const handleUserFeedback = (category, confidence) => {
    Alert.alert(
      'Was this classification correct?',
      `Category: ${category}\nConfidence: ${(confidence * 100).toFixed(1)}%`,
      [
        {
          text: 'Yes, correct',
          onPress: () => console.log('Prediction was correct')
        },
        {
          text: 'No, incorrect',
          style: 'destructive',
          onPress: () => showTipsAlert()
        }
      ]
    );
  };

  const showTipsAlert = () => {
    Alert.alert(
      'Tips for Better Classification',
      '• Ensure good lighting\n' +
      '• Center the item in frame\n' +
      '• Remove any background clutter\n' +
      '• Try different angles\n' +
      '• Get closer to the item\n' +
      '• Make sure the item is clean\n\n' +
      'Would you like to try another photo?',
      [
        {
          text: 'Try Again',
          onPress: takePhoto
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

  const predict = async (uri) => {
    try {
      setIsProcessing(true);

      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();

      if (data.success) {
        if (data.category === 'Uncertain') {
          // Show special alert for uncertain predictions
          Alert.alert(
            'Multiple Possibilities Detected',
            data.instructions.join('\n'),
            [
              {
                text: 'Try Again',
                onPress: takePhoto
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ]
          );
        } else {
          // Show normal prediction result with feedback option
          Alert.alert(
            'Recycling Analysis',
            `Category: ${data.category}\n\n` +
            `Confidence: ${(data.confidence * 100).toFixed(1)}%\n\n` +
            `Examples: ${data.examples}\n\n` +
            'Recycling Instructions:\n' +
            data.instructions.map(instruction => `• ${instruction}`).join('\n'),
            [
              {
                text: 'OK',
                onPress: () => handleUserFeedback(data.category, data.confidence)
              }
            ]
          );
        }
      } else {
        throw new Error(data.error || 'Failed to analyze image');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      Alert.alert(
        'Error',
        'Failed to analyze image. Would you like to try again?',
        [
          {
            text: 'Try Again',
            onPress: takePhoto
          },
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.cameraButton} 
        onPress={takePhoto}
        disabled={isProcessing}
      >
        <Text style={styles.cameraButtonText}>
          {isProcessing ? 'Processing...' : 'Take Photo'}
        </Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          {isProcessing && (
            <View style={styles.processingContainer}>
              <Text style={styles.processingText}>Analyzing image...</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  processingContainer: {
    position: 'absolute',
    top: '50%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 15,
    borderRadius: 10,
  },
  processingText: {
    color: 'white',
    fontSize: 16,
  }
});
