import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rnwApi = createApi({
  reducerPath: "rnw",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["workouts"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (payload) => ({
        url: "signup",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "login",
        method: "POST",
        body: payload,
      }),
    }),
    getUserInfo: builder.query<any, void>({
      query: () => "user",
      providesTags: ["workouts"],
    }),
    getWorkout: builder.query<any, string>({
      query: (workoutId) => `workout/${workoutId}`,
    }),
    addWorkout: builder.mutation({
      query: (payload) => ({
        url: "workout",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["workouts"],
    }),
    updateWorkout: builder.mutation({
      query: (payload) => {
        return {
          url: `workout/${payload.id}`,
          method: "PUT",
          body: payload.payload,
        };
      },
      invalidatesTags: ["workouts"],
    }),
    deleteWorkout: builder.mutation({
      query: (id) => ({
        url: `workout/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["workouts"],
    }),
  }),
});

export const {
  useLoginMutation,
  useAddWorkoutMutation,
  useDeleteWorkoutMutation,
  useUpdateWorkoutMutation,
  useSignupMutation,
  useGetUserInfoQuery,
  useLazyGetWorkoutQuery,
} = rnwApi;
