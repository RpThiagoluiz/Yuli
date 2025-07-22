import axios, { isAxiosError } from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GOOGLE_DRIVE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const serviceError = (error: unknown) => {
  if (isAxiosError(error) && error.response?.data) {
    throw error.response.data;
  }
  throw error;
};

export { api, serviceError };
