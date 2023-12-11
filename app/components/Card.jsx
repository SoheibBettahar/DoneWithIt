import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "./Text";
import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function Card({ title, subtitle, imageUrl, onPress, thumbnailUrl }) {
  return (
    <TouchableWithoutFeedback style={styles.container} onPress={onPress}>
      <Image
        style={styles.image}
        uri={imageUrl}
        tint="light"
        preview={{ uri: thumbnailUrl }}
      />

      <View style={styles.detailsContainer}>
        <AppText style={styles.title} numberOfLines={1}>
          {title}
        </AppText>
        <AppText style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    height: 200,
    width: "100%",
  },
  subtitle: {
    fontWeight: "bold",
    color: colors.secondary,
  },
  title: { marginBottom: 7 },
});

export default Card;
