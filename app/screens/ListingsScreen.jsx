import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Text from "../components/Text";
import useApi from "../hooks/useApi";

function ListingsScreen({ navigation }) {
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        {error && (
          <>
            <Text>Couldn't retreive the listings.</Text>
            <Button title="Retry" onPress={loadListings} />
          </>
        )}

        <FlatList
          data={listings}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <Card
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              subtitle={"$" + item.price}
              title={item.title}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },

  screen: {
    alignItems: "center",
    backgroundColor: colors.light,
    justifyContent: "center",
    padding: 10,
  },
});

export default ListingsScreen;
