import React from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import Colors from '@/constants/colors';

type MovieListProps = {
  movies: string[];
  genre: string;
};

export default function MovieList({ movies, genre }: MovieListProps) {
  if (!movies.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        "{genre}" türü için film önerileri:
      </Text>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => `movie-${index}`}
        renderItem={({ item, index }) => (
          <Animated.View 
            style={[
              styles.movieItem,
              { opacity: 1, transform: [{ translateY: 0 }] }
            ]}
          >
            <View style={styles.numberContainer}>
              <Text style={styles.movieNumber}>{index + 1}</Text>
            </View>
            <Text style={styles.movieTitle}>{item}</Text>
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  numberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  movieNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  movieTitle: {
    fontSize: 16,
    color: Colors.light.text,
    flex: 1,
    fontWeight: '500',
  },
  separator: {
    height: 10,
  },
});