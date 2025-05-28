import { useState } from "react";
import { Alert, Platform } from "react-native";
import Constants from "expo-constants";

const HOST = Platform.select({
  android: "10.0.2.2:4111",          // Android emulator localhost redirect
  ios: "localhost:4111",             // iOS simulator
  default: "localhost:4111",         // web or other
});

export default function useMovieRecommendations() {
  const [movies, setMovies] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async (genre: string) => {
    if (!genre.trim()) {
      Alert.alert("Hata", "Lütfen bir tür girin.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://${HOST}/api/agents/movieAgent/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tool: "smithery-movie-recommender",
            input: { prompt: genre },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const movieList = data.result
        .split("\n")
        .map((m: string) => m.trim())
        .filter((m: string) => m.length > 0);

      setMovies(movieList);
    } catch (err) {
      console.error(err);
      setError("Film önerileri alınırken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return {
    movies,
    loading,
    error,
    getRecommendations,
  };
}
