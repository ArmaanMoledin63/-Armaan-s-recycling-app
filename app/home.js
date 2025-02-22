import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Camera, Home, Plus, User, Award, MessageSquare, PlayCircle, Trash2 } from 'lucide-react-native';

export default function HomeScreen() {
 return (
   <View style={styles.container}>
     {/* Yeh Welcome section hai*/}
     <View style={styles.welcomeSection}>
       <Text style={styles.subtitle}>Ready To Recycle?</Text>
       <Text style={styles.description}>Scan any items to see how to dispose it properly</Text>
       
       {/* Scan Button GOes here!!!! */}
       <Link href="camera" asChild>
         <TouchableOpacity style={styles.scanButton}>
           <Camera style={styles.cameraIcon} color="white" size={24} />
           <Text style={styles.scanButtonText}>Scan Now</Text>
         </TouchableOpacity>
       </Link>
     </View>

     {/* Features section-rewards, blogs, and etc */}
     <View style={styles.featuresGrid}>
       <View style={styles.row}>
         <TouchableOpacity style={styles.gridItem}>
           <Award size={40} color="#444" />
           <Text style={styles.gridText}>Rewards</Text>
         </TouchableOpacity>
         
         <TouchableOpacity style={styles.gridItem}>
           <MessageSquare size={40} color="#444" />
           <Text style={styles.gridText}>Blogs</Text>
         </TouchableOpacity>
       </View>
       
       <View style={styles.row}>
         <TouchableOpacity style={styles.gridItem}>
           <PlayCircle size={40} color="#444" />
           <Text style={styles.gridText}>Videos</Text>
         </TouchableOpacity>
         
         <TouchableOpacity style={styles.gridItem}>
           <Trash2 size={40} color="#444" />
           <Text style={styles.gridText}>Report waste</Text>
         </TouchableOpacity>
       </View>
     </View>

     {/* Bottom Navigation */}
     <View style={styles.bottomNav}>
       <TouchableOpacity style={styles.navItem}>
         <Home size={24} color="white" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.navItem}>
         <Plus size={24} color="white" />
       </TouchableOpacity>
       <TouchableOpacity style={styles.navItem}>
         <User size={24} color="white" />
       </TouchableOpacity>
     </View>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f3faf1',
 },
 welcomeSection: {
   padding: 20,
   paddingTop: 40,
 },
 title: {
   fontSize: 28,
   fontWeight: 'bold',
   color: '#75b867',
   marginBottom: 10,
 },
 subtitle: {
   fontSize: 24,
   color: '#75b867',
   marginBottom: 5,
 },
 description: {
   fontSize: 16,
   color: '#666',
   marginBottom: 20,
 },
 scanButton: {
   backgroundColor: '#75b867',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   padding: 15,
   borderRadius: 25,
   marginTop: 10,
 },
 cameraIcon: {
   marginRight: 10,
 },
 scanButtonText: {
   color: 'white',
   fontSize: 18,
   fontWeight: '500',
 },
 featuresGrid: {
   padding: 20,
   backgroundColor: '#e8f5e3',
   borderRadius: 20,
   margin: 20,
 },
 row: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginBottom: 20,
 },
 gridItem: {
   alignItems: 'center',
   width: '45%',
 },
 gridText: {
   fontSize: 16,
   color: '#444',
   marginTop: 8,
 },
 bottomNav: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'center',
   backgroundColor: '#75b867',
   padding: 15,
   position: 'absolute',
   bottom: 0,
   width: '100%',
 },
 navItem: {
   padding: 5,
 }
});
