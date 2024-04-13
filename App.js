import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

export default function App() {
  const [quote, setQuote] = useState(""); 
  // Implementing useState because we need to store the data we fetch
  // and also be able to change it with the setQuote

  useEffect(() => { // implementing useEffect so that we can fetch data
                    // as there is a LOT of data/quotes in the API, 
                    // the useEffect will render one at every refresh of the page
    const fetchQuote = async () => {
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
      }
    };

    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thinking out loud.</Text>
      <Text style={styles.quoteText}>{quote}</Text>
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
});
