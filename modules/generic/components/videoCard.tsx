import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../styles/colors';

interface VideoItem {
  id: string;
  name: string;
  downloadUrl: string;
  mimeType?: string;
}

interface VideoCardProps {
  video: VideoItem;
}

export default function VideoCard({ video }: VideoCardProps) {
  const handlePress = () => {
    router.push({
      pathname: '/video-details' as any,
      params: {
        id: video.id,
        name: video.name,
        downloadUrl: video.downloadUrl,
      },
    });
  };

  const getFileExtension = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return ext || 'video';
  };

  const getVideoIcon = (filename: string) => {
    const ext = getFileExtension(filename);
    switch (ext) {
      case 'mp4':
        return 'videocam';
      case 'mov':
        return 'film';
      case 'avi':
        return 'play-circle';
      default:
        return 'play';
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getVideoIcon(video.name)}
          size={32}
          color={colors.primary.DEFAULT}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.videoTitle} numberOfLines={2}>
          {video.name}
        </Text>
        <Text style={styles.videoType}>
          {getFileExtension(video.name).toUpperCase()} • Toque para reproduzir
        </Text>
      </View>

      <View style={styles.arrowContainer}>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={colors.secondary.DEFAULT}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: colors.secondary.DEFAULT,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: colors.primary.DEFAULT,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.neutral[0],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.primary.DEFAULT,
  },
  contentContainer: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral.DEFAULT,
    marginBottom: 4,
    lineHeight: 20,
  },
  videoType: {
    fontSize: 14,
    color: colors.neutral.DEFAULT,
    fontWeight: '400',
  },
  arrowContainer: {
    marginLeft: 8,
  },
});
