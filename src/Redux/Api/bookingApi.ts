import baseApi from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBookings: builder.query({
            query: ({ page, limit }) => {
                return {
                    url: `/booking?page=${page}&limit=${limit}`,
                    method: "GET",
                };
            },
        }),

        getSingleBooking: builder.query({
            query: (id) => {
                return {
                    url: `/booking/single/${id}`,
                    method: "GET",
                };
            },
        })

    }),
})


export const { useGetBookingsQuery, useGetSingleBookingQuery } = bookingApi