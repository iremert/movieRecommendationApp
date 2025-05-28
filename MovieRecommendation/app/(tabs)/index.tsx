import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard
} from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/colors';
import MovieList from '@/components/MovieList';
import useMovieRecommendations from '@/hooks/useMovieRecommendations';
import { Search } from 'lucide-react-native';

export default function MovieRecScreen() {
  const [genre, setGenre] = useState('');
  const { movies, loading, error, getRecommendations } = useMovieRecommendations();

  const handleSubmit = () => {
    Keyboard.dismiss();
    getRecommendations(genre);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardAvoid} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Stack.Screen 
        options={{
          title: 'MovieRec',
          headerStyle: {
            backgroundColor: Colors.light.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Film Önerileri</Text>
            <Text style={styles.subtitle}>
              Sevdiğiniz film türünü yazın, size öneriler sunalım
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Search size={20} color={Colors.light.placeholder} style={styles.searchIcon} />
              <TextInput
                style={styles.input}
                placeholder="Film türü yazın..."
                placeholderTextColor={Colors.light.placeholder}
                value={genre}
                onChangeText={setGenre}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                onSubmitEditing={handleSubmit}
              />
            </View>
            
            <TouchableOpacity
              style={[
                styles.button,
                loading && styles.buttonDisabled
              ]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Öneri Al</Text>
              )}
            </TouchableOpacity>
            
            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}
          </View>
          
          <MovieList movies={movies} genre={genre} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.placeholder,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.card,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 16,
  },
  searchIcon: {
    marginLeft: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: Colors.light.text,
    paddingRight: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.light.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#FFEEEE',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.error,
    width: '100%',
  },
  errorText: {
    color: Colors.light.error,
    textAlign: 'left',
  },
});