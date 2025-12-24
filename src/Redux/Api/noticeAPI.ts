import baseApi from "./baseApi";

const noticeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotice: builder.query({
            query: ({ page, limit, departmentFilter, employeeSearch, statusFilter, startDate }) => {
                return {
                    url: `/notice/get?page=${page}&limit=${limit}&departmentFilter=${departmentFilter}&employeeSearch=${employeeSearch}&statusFilter=${statusFilter}&startDate=${startDate}`,
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
        changeStatus: builder.mutation({
            query: ({id,data}) => {
                return {
                    url: `/notice/change-status/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
        })
    }),
})

export const { useGetNoticeQuery, useAddNoticeMutation } = noticeApi