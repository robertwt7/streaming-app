export const env: Env = {
  CDN_URL: process.env.EXPO_PUBLIC_CDN_URL ?? "http://10.0.2.2:3000",
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? "http://10.0.2.2:3001",
};

export type Env = {
  CDN_URL: string;
  API_URL: string;
};
