import { colors } from '@/styles/colors';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function VideoPlayer({ uri }: { uri: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getFileIdFromUrl = useCallback((url: string): string | null => {
    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /id=([a-zA-Z0-9_-]+)/,
      /files\/([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }, []);

  const fileId = getFileIdFromUrl(uri);
  const videoUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
    player.muted = false;
    player.allowsExternalPlayback = true;
    player.showNowPlayingNotification = true;

    player.addListener('statusChange', (status) => {
      switch (status.status) {
        case 'loading':
          setIsLoading(true);
          setHasError(false);
          break;
        case 'readyToPlay':
          setIsLoading(false);
          setHasError(false);
          break;
        case 'error':
          setIsLoading(false);
          setHasError(true);
          break;
      }
    });
  });

  const resetState = () => {
    setIsLoading(true);
    setHasError(false);
    player.replace(videoUrl);
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary[900]} />
          <Text style={styles.loadingText}>Carregando vídeo...</Text>
        </View>
      )}

      {hasError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            ❌ Não foi possível carregar o vídeo
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={resetState}>
            <Text style={styles.retryButtonText}>🔄 Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        showsTimecodes
        requiresLinearPlayback={false}
        contentFit="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 500,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: colors.primary[900],
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
