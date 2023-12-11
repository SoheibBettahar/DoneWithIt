import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import colors from "../config/colors";

function AppActivityIndicator({ style, visible = false }) {
  if (!visible) return null;

  return (
    <View style={[styles.overlay, style]}>
      <ActivityIndicator animating={true} size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    height: "100%",
    justifyContent: "center",
    opacity: 0.8,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});

export default AppActivityIndicator;
