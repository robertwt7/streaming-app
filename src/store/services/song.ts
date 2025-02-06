// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Song } from "./types";
import { env } from "@/src/config/env";

// Define a service using a base URL and expected endpoints
export const songApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${env.API_URL}/song/` }),
  endpoints: (builder) => ({
    getSongById: builder.query<Song, string>({
      query: (id) => `${id}`,
    }),
    getAllSong: builder.query<Song[], void>({
      query: () => "",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSongByIdQuery, useGetAllSongQuery } = songApi;
