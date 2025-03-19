// app/components/EducationalVideos.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { PlayCircle } from 'lucide-react-native';
import { Link } from 'expo-router';

// Sample video data - replace with your actual data or fetch from an API
const videoData = [
  {
    id: '1',
    title: 'How to Recycle Plastic Properly',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '4:25',
    category: 'Plastic'
  },
  {
    id: '2',
    title: 'Composting 101: Getting Started',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '5:38',
    category: 'Organic'
  },
  {
    id: '3',
    title: 'E-Waste Recycling Guide',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '3:12',
    category: 'Electronic'
  },
  {
    id: '4',
    title: 'Understanding Mixed Recycling',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '6:45',
    category: 'General'
  },
  {
    id: '5',
    title: 'Metal Recycling Tips and Tricks',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '4:02',
    category: 'Metal'
  }
];

export default function EducationalVideos() {
  // Function to handle video play (you'll want to expand this)
  const handlePlayVideo = (videoId) => {
    console.log(`Playing video with ID: ${videoId}`);
    // Implement video playback functionality here
    // You might want to navigate to a video player screen or use a library to play the video
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Educational Videos</Text>
      <Text style={styles.sectionDescription}>Learn more about recycling with our educational videos</Text>
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {videoData.map((video) => (
          <TouchableOpacity 
            key={video.id}
            style={styles.videoCard}
            onPress={() => handlePlayVideo(video.id)}
          >
            <View style={styles.thumbnailContainer}>
              <Image 
                source={{ uri: video.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <View style={styles.playIconContainer}>
                <PlayCircle color="#75b867" size={40} />
              </View>
              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{video.duration}</Text>
              </View>
            </View>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.categoryTag}>{video.category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity style={styles.seeAllButton}>
        <Text style={styles.seeAllText}>See All Videos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#e8f5e3',
    borderRadius: 20,
    margin: 15,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#75b867',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  videoCard: {
    width: 250,
    marginRight: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    height: 140,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
    marginHorizontal: 10,
  },
  categoryTag: {
    fontSize: 12,
    color: '#75b867',
    marginTop: 4,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  seeAllButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#75b867',
    borderWidth: 1,
    borderRadius: 20,
  },
  seeAllText: {
    color: '#75b867',
    fontWeight: '500',
  }
});