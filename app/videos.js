// app/videos.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  TextInput 
} from 'react-native';
import { PlayCircle, Search, Filter } from 'lucide-react-native';

// Sample video data - replace with your actual data or fetch from an API
const allVideos = [
  {
    id: '1',
    title: 'How to Recycle Plastic Properly',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '4:25',
    category: 'Plastic',
    views: '24K',
    uploadDate: '2 weeks ago'
  },
  {
    id: '2',
    title: 'Composting 101: Getting Started',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '5:38',
    category: 'Organic',
    views: '18K',
    uploadDate: '1 month ago'
  },
  {
    id: '3',
    title: 'E-Waste Recycling Guide',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '3:12',
    category: 'Electronic',
    views: '32K',
    uploadDate: '3 weeks ago'
  },
  {
    id: '4',
    title: 'Understanding Mixed Recycling',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '6:45',
    category: 'General',
    views: '15K',
    uploadDate: '2 months ago'
  },
  {
    id: '5',
    title: 'Metal Recycling Tips and Tricks',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '4:02',
    category: 'Metal',
    views: '12K',
    uploadDate: '1 month ago'
  },
  {
    id: '6',
    title: 'Reduce, Reuse, Recycle: The Basics',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '8:15',
    category: 'General',
    views: '45K',
    uploadDate: '3 months ago'
  },
  {
    id: '7',
    title: 'Glass Recycling: What You Need to Know',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '5:30',
    category: 'Glass',
    views: '22K',
    uploadDate: '2 weeks ago'
  },
  {
    id: '8',
    title: 'Hazardous Waste Disposal',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '7:45',
    category: 'Hazardous',
    views: '30K',
    uploadDate: '1 week ago'
  }
];

// Available categories for filtering
const categories = [
  'All',
  'Plastic',
  'Organic',
  'Electronic',
  'Metal',
  'Glass',
  'General',
  'Hazardous',
];

export default function VideosScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredVideos, setFilteredVideos] = useState(allVideos);

  // Filter videos based on search query and selected category
  const filterVideos = () => {
    let filtered = allVideos;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }
    
    setFilteredVideos(filtered);
  };

  // Update filtered videos when search query or category changes
  React.useEffect(() => {
    filterVideos();
  }, [searchQuery, selectedCategory]);

  // Render a video item
  const renderVideoItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem}>
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playIconContainer}>
          <PlayCircle color="#fff" size={40} />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.videoDetails}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <View style={styles.videoMeta}>
          <Text style={styles.categoryTag}>{item.category}</Text>
          <Text style={styles.videoStats}>{item.views} views • {item.uploadDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render category filter item
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryButton, 
        selectedCategory === item && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text 
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.categoryButtonTextActive
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Educational Videos</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#666" />
        </TouchableOpacity>
      </View>
      
      {/* Category filters */}
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        contentContainerStyle={styles.categoriesContainer}
      />
      
      {/* Videos list */}
      <FlatList
        data={filteredVideos}
        renderItem={renderVideoItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.videosList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No videos found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3faf1',
  },
  header: {
    padding: 15,
    paddingTop: 20,
    backgroundColor: '#75b867',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#fff',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoriesList: {
    maxHeight: 50,
  },
  categoriesContainer: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryButtonActive: {
    backgroundColor: '#75b867',
    borderColor: '#75b867',
  },
  categoryButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  videosList: {
    padding: 15,
  },
  videoItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 180,
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
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  videoDetails: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    fontSize: 14,
    color: '#75b867',
    fontWeight: '500',
  },
  videoStats: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
  },
});
