import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export default function App() {
  const [image, setImage] = useState(null);

  // Button #1 Pick an image
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) setImage(result.assets[0]);
      else setImage(null) 
    }
  }


  // Button #2 Take a photo
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();

    if(permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();

      if(!result.canceled) {
        let MediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();

        if (MediaLibraryPermissions?.granted) await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);

        setImage(result.assets[0]);
      } else setImage(null)
    }
  }

  return (
    <View style={styles.container}>
      {image &&
      <Image source={{ uri: image.uri}} style={{ width: 200, height: 200}} />
      }
      <Button
      title="Pick an image from the library"
      onPress={pickImage}
      />
      <Button
      title="Take a photo"
      onPress={takePhoto}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
