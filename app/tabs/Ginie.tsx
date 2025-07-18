import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Ginie = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ginie</Text>
    </View>
  );
};

export default Ginie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
