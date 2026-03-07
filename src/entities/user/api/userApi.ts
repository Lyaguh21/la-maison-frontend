import { baseApi } from "@/shared/api";
import { IUpdateProfileData, IUserState } from "../model/type";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<IUserState, void>({
      query: () => "/users/profile",
      providesTags: [{ type: "User", id: "PROFILE" }],
    }),

    updateProfile: build.mutation<IUserState, IUpdateProfileData>({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "PROFILE" }],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = userApi;
