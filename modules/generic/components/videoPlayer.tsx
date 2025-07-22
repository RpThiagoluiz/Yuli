import { colors } from '@/styles/colors';
import * as ScreenOrientation from 'expo-screen-orientation';
import { VideoView, useVideoPlayer } from 'expo-video';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function VideoPlayer({ uri }: { uri: string }) {
  console.log('🎥 Video URI:', uri);

  const [isLoading, setIsLoading] = useState(true);
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const setupOrientation = async () => {
      try {
        await ScreenOrientation.unlockAsync();
        console.log('🔄 Orientações desbloqueadas - usuário pode escolher');
      } catch (error) {
        console.log('❌ Erro ao desbloquear orientações:', error);
      }
    };

    setupOrientation();
  }, []);

  const getFileIdFromUrl = (url: string): string | null => {
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
  };

  const fileId = getFileIdFromUrl(uri);

  const getOptimalUrl = () => {
    if (fileId) {
      const urlOptions = [
        `https://drive.google.com/file/d/${fileId}/preview`,
        `https://drive.google.com/uc?export=download&id=${fileId}`,
        `https://drive.google.com/uc?export=view&id=${fileId}`,
        `https://docs.google.com/uc?export=download&id=${fileId}`,
        uri,
      ];

      return urlOptions[currentUrlIndex] || urlOptions[0];
    }
    return uri;
  };

  const videoUrl = getOptimalUrl();

  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = false;
    player.muted = false;
    player.allowsExternalPlayback = true;
    player.showNowPlayingNotification = true;
  });

  useEffect(() => {
    setCurrentUrlIndex(0);
    setIsLoading(true);
    setHasError(false);
  }, [uri]);

  useEffect(() => {
    if (isLoading && fileId && !hasError) {
      const timeout = setTimeout(() => {
        if (currentUrlIndex < 4) {
          setCurrentUrlIndex((prev) => prev + 1);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading, currentUrlIndex, fileId, hasError]);

  useEffect(() => {
    const statusSubscription = player.addListener('statusChange', (status) => {
      console.log('🎮 Player status:', status);

      switch (status.status) {
        case 'idle':
          console.log('⏸️ Player idle');
          break;
        case 'loading':
          console.log('🔄 Vídeo carregando...');
          setIsLoading(true);
          setHasError(false);
          break;
        case 'readyToPlay':
          console.log('✅ Vídeo pronto para reproduzir');
          setIsLoading(false);
          setHasError(false);
          break;
        case 'error':
          console.error('❌ Erro no player:', status.error);
          if (fileId && currentUrlIndex < 4) {
            console.log('🔄 Tentando próxima URL devido a erro...');
            setCurrentUrlIndex((prev) => prev + 1);
            setIsLoading(true);
          } else {
            setHasError(true);
            setIsLoading(false);
          }
          break;
      }
    });

    return () => {
      statusSubscription?.remove();
    };
  }, [player, fileId, currentUrlIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>
          ExpoVideo {isLoading ? 'Carregando...' : hasError ? 'Erro' : 'Pronto'}
          {fileId && ` (${currentUrlIndex + 1}/5)`}
        </Text>
      </View>

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
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setCurrentUrlIndex(0);
              setHasError(false);
              setIsLoading(true);
            }}
          >
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
  debugContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 4,
  },
  debugText: {
    color: 'white',
    fontSize: 11,
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
