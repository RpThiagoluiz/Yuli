import { api, serviceError } from '@/libs/axios.config';

const folderId = process.env.EXPO_PUBLIC_FOLDER_ID;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
}

interface GoogleDriveApiResponse {
  files: GoogleDriveFile[];
  nextPageToken?: string;
  incompleteSearch?: boolean;
}

export interface VideoItem {
  id: string;
  name: string;
  downloadUrl: string;
  mimeType?: string;
}

const getAllFiles = async (): Promise<GoogleDriveFile[]> => {
  let allFiles: GoogleDriveFile[] = [];
  let nextPageToken: string | undefined;

  do {
    const baseUrl = `https://www.googleapis.com/drive/v3/files`;
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed=false`,
      key: apiKey!,
      pageSize: '1000',
      fields: 'files(id,name,mimeType),nextPageToken,incompleteSearch',
      orderBy: 'name',
    });

    if (nextPageToken) {
      params.append('pageToken', nextPageToken);
    }

    const url = `${baseUrl}?${params.toString()}`;

    const response = await api.get(url);
    const responseData = response.data as GoogleDriveApiResponse;

    allFiles = allFiles.concat(responseData.files);
    nextPageToken = responseData.nextPageToken;

    if (responseData.incompleteSearch) {
      console.warn('⚠️ Busca incompleta detectada pelo Google Drive API');
    }
  } while (nextPageToken);

  console.log(`📊 Total de arquivos encontrados: ${allFiles.length}`);
  return allFiles;
};

const isVideoFile = (mimeType: string, fileName: string): boolean => {
  const videoMimeTypes = [
    'video/mp4',
    'video/avi',
    'video/mov',
    'video/wmv',
    'video/flv',
    'video/webm',
    'video/mkv',
    'video/m4v',
    'video/3gp',
    'video/quicktime',
  ];

  const videoExtensions = [
    '.mp4',
    '.avi',
    '.mov',
    '.wmv',
    '.flv',
    '.webm',
    '.mkv',
    '.m4v',
    '.3gp',
    '.qt',
  ];

  if (videoMimeTypes.includes(mimeType.toLowerCase())) {
    return true;
  }

  const lowerFileName = fileName.toLowerCase();
  return videoExtensions.some((ext) => lowerFileName.endsWith(ext));
};

const getDirectVideoUrl = (fileId: string): string => {
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
};

export const getDriveChavesFiles = async (): Promise<VideoItem[]> => {
  try {
    const allFiles = await getAllFiles();

    const videoFiles = allFiles.filter((file) =>
      isVideoFile(file.mimeType, file.name)
    );

    if (videoFiles.length > 0) {
      console.log('📋 Primeiros vídeos encontrados:');
      videoFiles.slice(0, 5).forEach((file, index) => {
        console.log(`  ${index + 1}. ${file.name} (${file.mimeType})`);
      });
    }

    const videoItems: VideoItem[] = videoFiles.map((file: GoogleDriveFile) => ({
      id: file.id,
      name: file.name,

      downloadUrl: getDirectVideoUrl(file.id),
      mimeType: file.mimeType,
    }));

    return videoItems;
  } catch (error: unknown) {
    throw serviceError(error);
  }
};
