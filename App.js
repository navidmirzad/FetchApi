import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "cee3bd1e22msheedb98e87dec740p196316jsn6d22f5917037",
          "X-RapidAPI-Host": "quotes-by-api-ninjas.p.rapidapi.com",
        },
      };
      const response = await fetch(
        "https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes",
        options
      );
      const data = await response.json();
      setQuote(data[0].quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const refreshQuote = () => {
    fetchQuote();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 50) {
        refreshQuote();
      }
    },
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.header}>Thinking out loud.</Text>
      <ActivityIndicator
        animating={loading}
        size="large"
        color="#0000ff"
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.quoteText}>{quote}</Text>
      <Text style={styles.text}>Swipe up for next quote</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    marginBottom: 30,
  },
  quoteText: {
    fontSize: 24,
    fontStyle: "italic",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontStyle: "italic",
    marginTop: 100,
  },
});
