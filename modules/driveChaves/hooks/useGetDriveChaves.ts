import { useQuery } from '@tanstack/react-query';
import { getDriveChavesFiles } from '../services/googleDriveChaves';

export function useDriveVideos() {
  return useQuery({
    queryKey: ['drive-videos'],
    queryFn: getDriveChavesFiles,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
