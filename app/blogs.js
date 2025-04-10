// app/blogs.js
import React, { useState } from 'react;
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput 
} from 'react-native';
import { Search, Clock, PlayCircle } from 'lucide-react-native';
import { Link } from 'expo-router';

// Sample blog data
const blogPosts = [
  {
    id: '1',
    title: 'The Impact of Single-Use Plastics on Marine Life',
    excerpt: 'Discover how plastic waste affects our oceans and what you can do to help reduce it...',
    image: 'https://via.placeholder.com/300x180',
    category: 'Environment',
    readTime: '5 min read',
    date: 'Mar 15, 2025'
  },
  {
    id: '2',
    title: 'Composting at Home: A Beginner\'s Guide',
    excerpt: 'Learn how to start your own compost pile and reduce household waste while creating nutrient-rich soil...',
    image: 'https://via.placeholder.com/300x180',
    category: 'Lifestyle',
    readTime: '7 min read',
    date: 'Mar 10, 2025'
  },
  {
    id: '3',
    title: 'Zero Waste Shopping: Tips and Tricks',
    excerpt: 'Practical advice for reducing packaging waste when grocery shopping and running errands...',
    image: 'https://via.placeholder.com/300x180',
    category: 'Lifestyle',
    readTime: '6 min read',
    date: 'Mar 5, 2025'
  }
];

// Sample featured videos related to the blogs
const featuredVideos = [
  {
    id: '1',
    title: 'The Truth About Plastic Pollution',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '8:24',
    category: 'Environment',
    related: 'Related to "The Impact of Single-Use Plastics"'
  },
  {
    id: '2',
    title: 'How to Set Up Your First Compost Bin',
    thumbnail: 'https://via.placeholder.com/300x180',
    duration: '5:15',
    category: 'DIY',
    related: 'Related to "Composting at Home"'
  }
];

export default function BlogsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recycling Blog</Text>
        <Text style={styles.headerSubtitle}>Learn about sustainability and waste management</Text>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search articles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      {/* Featured Videos Section */}
      <View style={styles.videoSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Educational Videos</Text>
          <Link href="/videos" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        
        <ScrollView 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.videoScroll}
        >
          {featuredVideos.map(video => (
            <Link 
              key={video.id} 
              href={`/videoPlayer?id=${video.id}`}
              asChild
            >
              <TouchableOpacity style={styles.videoCard}>
                <View style={styles.thumbnailContainer}>
                  <Image 
                    source={{ uri: video.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <View style={styles.playIconContainer}>
                    <PlayCircle color="#fff" size={40} />
                  </View>
                  <View style={styles.durationBadge}>
                    <Text style={styles.durationText}>{video.duration}</Text>
                  </View>
                </View>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoCategory}>{video.category}</Text>
                  <Text style={styles.videoRelated}>{video.related}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </ScrollView>
      </View>
      
      {/* Blog Posts */}
      <View style={styles.blogPostsSection}>
        <Text style={styles.sectionTitle}>Latest Articles</Text>
        
        {blogPosts.map(post => (
          <TouchableOpacity key={post.id} style={styles.blogPost}>
            <Image 
              source={{ uri: post.image }}
              style={styles.blogImage}
              resizeMode="cover"
            />
            <View style={styles.blogCategory}>
              <Text style={styles.blogCategoryText}>{post.category}</Text>
            </View>
            <View style={styles.blogContent}>
              <Text style={styles.blogTitle}>{post.title}</Text>
              <Text style={styles.blogExcerpt}>{post.excerpt}</Text>
              <View style={styles.blogMeta}>
                <Text style={styles.blogDate}>{post.date}</Text>
                <View style={styles.readTimeContainer}>
                  <Clock size={14} color="#999" />
                  <Text style={styles.readTime}>{post.readTime}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More Articles</Text>
        </TouchableOpacity>
      </View>
      
      {/* Related Resources Section */}
      <View style={styles.resourcesSection}>
        <Text style={styles.sectionTitle}>Related Resources</Text>
        <View style={styles.resourceButtons}>
          <TouchableOpacity style={styles.resourceButton}>
            <Text style={styles.resourceButtonText}>Recycling Centers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton}>
            <Text style={styles.resourceButtonText}>Waste Guidelines</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceButton}>
            <Text style={styles.resourceButtonText}>Community Events</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Newsletter Signup */}
      <View style={styles.newsletterSection}>
        <Text style={styles.newsletterTitle}>Subscribe to Our Newsletter</Text>
        <Text style={styles.newsletterText}>
          Get the latest articles, videos, and resources straight to your inbox.
        </Text>
        <TextInput
          style={styles.emailInput}
          placeholder="Your email address"
        />
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
      
      {/* Footer space */}
      <View style={styles.footerSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3faf1',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#75b867',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  searchContainer: {
    padding: 15,
  },
  searchBar: {
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
  videoSection: {
    padding: 15,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#75b867',
    fontWeight: '500',
  },
  videoScroll: {
    marginBottom: 10,
  },
  videoCard: {
    width: 280,
    marginRight: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    position: 'relative',
    height: 160,
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
  videoInfo: {
    padding: 12,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  videoCategory: {
    fontSize: 14,
    color: '#75b867',
    marginBottom: 4,
  },
  videoRelated: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  blogPostsSection: {
    padding: 15,
  },
  blogPost: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  blogImage: {
    width: '100%',
    height: 180,
  },
  blogCategory: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(117, 184, 103, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  blogCategoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  blogContent: {
    padding: 15,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  blogExcerpt: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  blogMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blogDate: {
    fontSize: 12,
    color: '#999',
  },
  readTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  loadMoreButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#75b867',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loadMoreText: {
    color: '#75b867',
    fontWeight: '500',
  },
  resourcesSection: {
    padding: 15,
    marginTop: 10,
  },
  resourceButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  resourceButton: {
    backgroundColor: '#e8f5e3',
    width: '31%',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  resourceButtonText: {
    color: '#75b867',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
  },
  newsletterSection: {
    backgroundColor: '#75b867',
    padding: 20,
    margin: 15,
    borderRadius: 10,
  },
  newsletterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  newsletterText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 15,
  },
  emailInput: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#75b867',
    fontWeight: 'bold',
  },
  footerSpace: {
    height: 80,
  },
});
