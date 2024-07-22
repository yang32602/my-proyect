import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { leccionesData } from '../pages/data/leccion.js';

export default function Leccion({ route, navigation }) {
  const { theme, leccion } = route.params || {};
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const leccionData = leccionesData[theme] ? leccionesData[theme][leccion] : [];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Lección {leccion}</Text>
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={{uri:"https://res.cloudinary.com/dpizfkmea/video/upload/v1721611686/0721_nys5ya.mp4"}}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
      </View>
      <View style={styles.row}>
        {leccionData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image
              source={item.image}
              style={styles.image}
            />
            <Text style={styles.text}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Nivel', { theme, leccion })}
      >
        <Text style={styles.buttonText}>Ir a Nivel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
    paddingBottom: 10,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  video: {
    flex: 1,
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: Dimensions.get('window').width / 2 - 20,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
