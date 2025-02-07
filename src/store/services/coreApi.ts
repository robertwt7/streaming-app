// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Prisma } from "@prisma/client";
import { env } from "@/src/config/env";

export type Song = Prisma.SongGetPayload<{
  include: { hlsPlaylists: true; artist: true };
}>;
// Define a service using a base URL and expected endpoints
export const coreApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${env.API_URL}/` }),
  endpoints: (builder) => ({
    getSongById: builder.query<Song, string>({
      query: (id) => `song/${id}`,
    }),
    getAllSong: builder.query<Song[], void>({
      query: () => ({
        url: "song", // default url to get all songs are the base query
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSongByIdQuery, useGetAllSongQuery } = coreApi;
