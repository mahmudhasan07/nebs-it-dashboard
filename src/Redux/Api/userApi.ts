import build from "next/dist/build";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["logIn"],
    }),

    getDashboardInfo: build.query({
      query: () => {
        return {
          url: "/booking/dashboard",
          method: "GET",
        };
      },
      providesTags: ["dashboardInfo"],
    }),
    
  }),
});

export const {
  useLoginUserMutation,
  useGetDashboardInfoQuery
} = userApi
