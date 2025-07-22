import VideoPlayer from '@/modules/generic/components/videoPlayer';
import { colors } from '@/styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function VideoDetailsScreen() {
  const { name, downloadUrl } = useLocalSearchParams<{
    name: string;
    downloadUrl: string;
  }>();

  return (
    <LinearGradient
      colors={[colors.neutral[0], colors.neutral[100]]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header com botão de voltar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.primary.DEFAULT}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {name || 'Detalhes do Vídeo'}
          </Text>
        </View>

        {/* Video Player - usuário escolhe como ver */}
        {downloadUrl ? (
          <VideoPlayer uri={downloadUrl} />
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>URL do vídeo não encontrada</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.neutral[100],
    borderBottomWidth: 2,
    borderBottomColor: colors.primary.DEFAULT,
    shadowColor: colors.secondary.DEFAULT,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary.DEFAULT,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
  },
  errorText: {
    color: colors.neutral.DEFAULT,
    fontSize: 16,
  },
});
