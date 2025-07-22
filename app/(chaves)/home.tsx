import { useDriveVideos } from '@/modules/driveChaves/hooks/useGetDriveChaves';
import VideoCard from '@/modules/generic/components/videoCard';
import { colors } from '@/styles/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ChavesHome() {
  const { data: videos, isLoading, isError, refetch } = useDriveVideos();

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const extractNumber = (filename: string): number => {
    const nameWithoutExtension = filename.replace(/\.[^/.]+$/, '');

    const match = nameWithoutExtension.match(/^(\d+)/);

    if (match) {
      return parseInt(match[1], 10);
    }

    return 999999;
  };

  const sortedVideos = videos
    ? [...videos].sort((a, b) => {
        const numA = extractNumber(a.name);
        const numB = extractNumber(b.name);

        if (numA === numB) {
          return a.name.localeCompare(b.name);
        }

        return numA - numB;
      })
    : [];

  if (isLoading) {
    return (
      <LinearGradient
        colors={[colors.neutral[900], colors.neutral[800]]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" />
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={colors.miami.cyan} />
            <Text style={styles.loadingText}>Carregando vídeos...</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (isError) {
    return (
      <LinearGradient
        colors={[colors.neutral[900], colors.neutral[800]]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" />
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Erro ao carregar vídeos</Text>
            <Text style={styles.subtitle}>
              Verifique sua conexão e tente novamente.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <LinearGradient
        colors={[colors.neutral[900], colors.neutral[800]]}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          <StatusBar style="light" />
          <View style={styles.centerContainer}>
            <Text style={styles.title}>Nenhum vídeo encontrado</Text>
            <Text style={styles.subtitle}>
              Verifique se há vídeos na pasta do Google Drive.
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[colors.neutral[900], colors.neutral[800]]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meus Vídeos</Text>
          <View style={styles.headerSubtitleContainer}>
            <Text style={styles.headerSubtitle}>
              {sortedVideos.length} vídeo{sortedVideos.length !== 1 ? 's' : ''}
            </Text>
            {isRefreshing && (
              <View style={styles.refreshIndicator}>
                <ActivityIndicator size="small" color={colors.miami.cyan} />
                <Text style={styles.refreshText}>Atualizando...</Text>
              </View>
            )}
          </View>
        </View>

        <FlatList
          data={sortedVideos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VideoCard video={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[colors.miami.cyan]}
              tintColor={colors.miami.cyan}
              title="Atualizando vídeos..."
              titleColor={colors.miami.gray}
            />
          }
        />
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: colors.neutral[800],
    borderBottomWidth: 2,
    borderBottomColor: colors.miami.cyan,
    shadowColor: colors.miami.pink,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.miami.white,
    marginBottom: 4,
    textShadowColor: colors.miami.pink,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.miami.gray,
    fontWeight: '400',
  },
  headerSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  refreshIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  refreshText: {
    fontSize: 14,
    color: colors.miami.cyan,
    marginLeft: 6,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.miami.white,
  },
  subtitle: {
    fontSize: 16,
    color: colors.miami.gray,
    textAlign: 'center',
    marginBottom: 10,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.miami.gray,
  },
  errorText: {
    fontSize: 18,
    color: colors.miami.pink,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
});
