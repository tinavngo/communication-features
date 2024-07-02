import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

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
        let mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();

        if (mediaLibraryPermissions?.granted) await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);

        setImage(result.assets[0]);
      } else setImage(null)
    }
  }

  // Button #3 Get location
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();

    if(permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } else {
      Alert.alert("Permissions to read location aren't granted");
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
      {location &&
      <MapView 
      style={{width: 300, height: 200}}
      region={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      />
      }
      <Button
      title="Get my location"
      onPress={getLocation}
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
