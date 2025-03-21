// app/videoPlayer.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Video } from 'expo-av';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize,
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark
} from 'lucide-react-native';

// Sample video data - this would normally be fetched based on videoId
const videoDetails = {
  id: '1',
  title: 'How to Recycle Plastic Properly',
  description: 'Learn how to identify different types of plastics and the proper way to recycle them in your local area. This comprehensive guide covers everything from plastic identification codes to preparing items for recycling.',
  videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', // Example video URL from Expo docs
  thumbnail: 'https://via.placeholder.com/300x180',
  duration: '4:25',
  category: 'Plastic',
  views: '24K',
  uploadDate: '2 weeks ago',
  likes: '1.2K',
  dislikes: '45'
};

// Recommended videos based on the current video
const recommendedVideos = [
  {
    id: '2',
    title: 'Plastic-Free Living: Simple Swaps',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '5:38',
    category: 'Lifestyle',
    views: '18K',
    uploadDate: '1 month ago'
  },
  {
    id: '3',
    title: 'What Happens to Recycled Plastic?',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '7:12',
    category: 'Education',
    views: '32K',
    uploadDate: '3 weeks ago'
  },
  {
    id: '5',
    title: 'Microplastics: The Invisible Threat',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '9:45',
    category: 'Environment',
    views: '45K',
    uploadDate: '1 week ago'
  }
];

export default function VideoPlayerScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { width } = Dimensions.get('window');
  const videoRef = useRef(null);
  
  // State variables for video player
  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // In a real app, you would fetch the video details based on videoId
  const videoId = params.id || '1'; // Default to video ID 1 if none provided
  
  // Handle play/pause
  const handlePlayPause = async () => {
    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
  };
  
  // Handle mute/unmute
  const handleMuteUnmute = async () => {
    await videoRef.current.setIsMutedAsync(!isMuted);
    setIsMuted(!isMuted);
  };
  
  // Handle navigation back
  const handleGoBack = () => {
    router.back();
  };
  
  // Handle video loading
  const onPlaybackStatusUpdate = (status) => {
    setStatus(status);
    setIsPlaying(status.isPlaying);
    setIsLoading(!status.isLoaded);
  };
  
  // Handle like/dislike
  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
      setIsDisliked(false);
    }
  };
  
  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
    } else {
      setIsDisliked(true);
      setIsLiked(false);
    }
  };
  
  // Handle bookmark
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  // Handle share
  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing video:', videoId);
  };
  
  // Handle recommended video click
  const handleRecommendedVideoClick = (videoId) => {
    // In a real app, you would navigate to the video player with the selected video
    console.log('Playing recommended video:', videoId);
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Video Player */}
      <View style={styles.videoContainer}>
        <View style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            style={[styles.video, { width }]}
            source={{ uri: videoDetails.videoUrl }}
            useNativeControls={false}
            resizeMode="contain"
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            isLooping
          />
          
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#75b867" />
            </View>
          )}
          
          {/* Custom controls overlay */}
          <View style={styles.controlsOverlay}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <ChevronLeft color="#fff" size={24} />
            </TouchableOpacity>
            
            <View style={styles.centerControls}>
              <TouchableOpacity onPress={handlePlayPause}>
                {isPlaying ? (
                  <Pause color="#fff" size={40} />
                ) : (
                  <Play color="#fff" size={40} />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.rightControls}>
              <TouchableOpacity style={styles.controlButton} onPress={handleMuteUnmute}>
                {isMuted ? (
                  <VolumeX color="#fff" size={24} />
                ) : (
                  <Volume2 color="#fff" size={24} />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <Maximize color="#fff" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      
      {/* Video Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.videoTitle}>{videoDetails.title}</Text>
        <View style={styles.videoStats}>
          <Text style={styles.viewsText}>{videoDetails.views} views • {videoDetails.uploadDate}</Text>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{videoDetails.category}</Text>
          </View>
        </View>
        
        {/* Action buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <ThumbsUp color={isLiked ? "#75b867" : "#666"} size={20} />
            <Text style={styles.actionText}>{videoDetails.likes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleDislike}>
            <ThumbsDown color={isDisliked ? "#ff0000" : "#666"} size={20} />
            <Text style={styles.actionText}>{videoDetails.dislikes}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share2 color="#666" size={20} />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
            <Bookmark color={isBookmarked ? "#75b867" : "#666"} size={20} />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
        </View>
        
        {/* Video description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{videoDetails.description}</Text>
        </View>
        
        {/* Key takeaways */}
        <View style={styles.takeawaysContainer}>
          <Text style={styles.sectionTitle}>Key Takeaways</Text>
          <View style={styles.takeawayItem}>
            <View style={styles.takeawayBullet} />
            <Text style={styles.takeawayText}>Always rinse containers before recycling</Text>
          </View>
          <View style={styles.takeawayItem}>
            <View style={styles.takeawayBullet} />
            <Text style={styles.takeawayText}>Check the recycling number on plastics (1-7)</Text>
          </View>
          <View style={styles.takeawayItem}>
            <View style={styles.takeawayBullet} />
            <Text style={styles.takeawayText}>Remove caps and lids before recycling</Text>
          </View>
          <View style={styles.takeawayItem}>
            <View style={styles.takeawayBullet} />
            <Text style={styles.takeawayText}>Plastic bags usually need special recycling</Text>
          </View>
        </View>
        
        {/* Recommended videos */}
        <View style={styles.recommendedContainer}>
          <Text style={styles.sectionTitle}>Recommended Videos</Text>
          {recommendedVideos.map(video => (
            <TouchableOpacity 
              key={video.id}
              style={styles.recommendedItem}
              onPress={() => handleRecommendedVideoClick(video.id)}
            >
              <View style={styles.recommendedThumbnail}>
                {/* This would be an Image component in a real app */}
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{video.duration}</Text>
                </View>
              </View>
              <View style={styles.recommendedDetails}>
                <Text style={styles.recommendedTitle}>{video.title}</Text>
                <Text style={styles.recommendedStats}>
                  {video.views} views • {video.uploadDate}
                </Text>
                <Text style={styles.recommendedCategory}>{video.category}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3faf1',
  },
  videoContainer: {
    backgroundColor: '#000',
    width: '100%',
  },
  videoWrapper: {
    position: 'relative',
    aspectRatio: 16 / 9,
  },
  video: {
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backButton: {
    padding: 8,
  },
  centerControls: {
    alignItems: 'center',
  },
  rightControls: {
    flexDirection: 'row',
  },
  controlButton: {
    marginLeft: 15,
  },
  detailsContainer: {
    padding: 15,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  videoStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewsText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTag: {
    backgroundColor: '#e8f5e3',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  categoryText: {
    color: '#75b867',
    fontWeight: '500',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 15,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  takeawaysContainer: {
    marginBottom: 20,
    backgroundColor: '#e8f5e3',
    padding: 15,
    borderRadius: 10,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  takeawayBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#75b867',
    marginRight: 10,
  },
  takeawayText: {
    fontSize: 14,
    color: '#333',
  },
  recommendedContainer: {
    marginBottom: 30,
  },
  recommendedItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  recommendedThumbnail: {
    width: 120,
    height: 70,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginRight: 12,
    position: 'relative',
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
  recommendedDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  recommendedTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  recommendedStats: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  recommendedCategory: {
    fontSize: 12,
    color: '#75b867',
  },

  recommendedCategory: {
    fontSize: 12,
    color: '#75b867',
  },
});
