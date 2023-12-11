import React, { useEffect } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import defaultStyles from "../config/styles";

function ImageInput({ imageUri, onImageChanged }) {
  const requestImagePermission = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!result.granted) {
      alert(
        "Please provide Image Library Permission to be able to select an image."
      );
    }
  };

  useEffect(() => {
    requestImagePermission();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });

      if (!result.canceled) {
        const selectedImageUri = result.assets[0].uri;
        onImageChanged(selectedImageUri);
      }
    } catch (error) {
      console.log("Error selecting image!", error);
    }
  };

  const showDeleteImageAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => onImageChanged(null),
      },
    ]);
  };

  const handleImagePress = () => {
    if (!imageUri) selectImage();
    else showDeleteImageAlert();
  };

  return (
    <TouchableWithoutFeedback onPress={handleImagePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            size={40}
            color={defaultStyles.colors.medium}
          />
        )}

        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 15,
    overflow: "hidden",
    width: 100,
    height: 100,
  },
});

export default ImageInput;
