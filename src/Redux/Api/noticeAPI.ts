import baseApi from "./baseApi";

const noticeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotice: builder.query({
            query: ({ page, limit }) => {
                return {
                    url: `/notice/get?page=${page}&limit=${limit}`,
                    method: "GET",
                };
            },
        }),
        addNotice: builder.mutation({
            query: (data) => {
                return {
                    url: `/notice/create`,
                    method: "POST",
                    body: data,
                };
            },
        }),
    }),
})

export const { useGetNoticeQuery, useAddNoticeMutation } = noticeApi