import React from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import { Image } from "react-native-expo-image-cache";

import AppText from "../components/Text";
import colors from "../config/colors";
import { ListItem } from "../components/lists";
import ContactSellerForm from "../components/ContactSellerForm";

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Image
        style={styles.image}
        uri={listing.images[0].url}
        tint="light"
        preview={{ uri: listing.images[0].thumbnailUrl }}
      />

      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            title="Mosh Hamadani"
            subtitle="5 Listings"
            image={require("../assets/mosh.jpg")}
          />
        </View>

        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  userContainer: {
    marginVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
});

export default ListingDetailsScreen;
