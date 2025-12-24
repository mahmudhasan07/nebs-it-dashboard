"use client"
import TableLoader from '@/components/Loader/TableLoader';
import NoticeDetailsModal from '@/components/Notice/NoticeDetails';
import { useGetNoticeQuery } from '@/Redux/Api/noticeAPI';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar2Date } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";
import { CiMenuKebab } from "react-icons/ci";


const NoticeBoard = () => {
    const [startDate, setStartDate] = useState(null);
    const [selectedNotice, setSelectedNotice] = useState<any>(null);
    const [openModal, setOpenModal] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [employeeSearch, setEmployeeSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const limit = 20;

    const route = useRouter();

    const { data, loading, error, pages, total, totalPage, activeNotices, draftNotices } = useGetNoticeQuery({ page, limit, departmentFilter, employeeSearch, statusFilter, startDate }, {
        selectFromResult: ({ data, isLoading, isError }) => ({
            data: data?.data.result,
            loading: isLoading,
            error: isError,
            pages: data?.meta?.page,
            total: data?.meta?.total,
            totalPage: data?.meta?.totalPage,
            activeNotices: data?.data.activeNotices,
            draftNotices: data?.data.draftNotices
        })
    });
    const handleStatusChange = (id: string, status: "PUBLISH" | "UNPUBLISH" | "DRAFT") => {
        console.log("Update notice:", id, status); // 🔹 Call your API here // await updateNoticeStatus({ id, status }) setOpenMenuId(null); };
    }
    const handleDateChange = (date: any) => {
        setStartDate(date.toISOString().split("T")[0]);
    };

    const handleResetFilters = () => {
        setDepartmentFilter('');
        setEmployeeSearch('');
        setStatusFilter('');
        setStartDate(null);
        console.log("Filters Reset");
    };

    const button = data && [...Array(totalPage).keys()];
    return (
        <div className="p-5 flex flex-col min-h-screen">
            <div className='flex-grow'>
                {/* Header */}
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">Notice Management</h1>
                        <div className="flex space-x-4">
                            <span className="text-gray-600">Active Notices: {loading ? "loading" : activeNotices}</span>
                            <span className="text-gray-600">Draft Notices: {loading ? "loading" : draftNotices}</span>
                        </div>
                    </div>
                    <div className="mb-4 space-x-3 grid grid-cols-2">
                        <button onClick={() => route.push("/notice-board/add-new")} className="bg-[#F95524] text-white px-5 py-2 rounded-md hover:bg-[#F95524]/90">
                            + Create Notice
                        </button>
                        <button className="border border-[#F59E0B] hover:text-white flex gap-2 relative px-5 py-2 rounded-md hover:bg-[#F59E0B] text-[#F59E0B]">
                            <span className='my-auto'><RiDraftLine /></span>
                            <span>All Draft Notice</span>
                        </button>
                    </div>
                </div>

                {/* Filter Section */}
                <div className="flex justify-between items-center mb-4 text-gray-500">
                    <div className="flex space-x-4">
                        <div className="relative">
                            <select className="bg-white border border-gray-300 rounded-md p-2 pl-4 pr-8 relative appearance-none" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                                <option value={""}>Departments or Individuals</option>
                                <option>All Department</option>
                                <option>Individual</option>
                            </select>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <svg width="18" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                    <path d="M3 4l3 3 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                        </div>

                        <input placeholder="Search by Employee Name" className="bg-white border border-gray-300 rounded-md p-2 w-60" value={employeeSearch} onChange={(e) => setEmployeeSearch(e.target.value)} />

                        <div className="relative">
                            <select className="bg-white border border-gray-300 rounded-md p-2 pl-4 pr-2 relative appearance-none" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value={""}>Status</option>
                                <option value={"PUBLISH"}>Published</option>
                                <option value={"UNPUBLISH"}>Unpublished</option>
                            </select>
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <svg width="18" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                    <path d="M3 4l3 3 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                        </div>
                        <div className="relative">
                            <DatePicker
                                selected={startDate}
                                onChange={handleDateChange}
                                placeholderText="Enter Date"
                                className="bg-white border border-gray-300 rounded-md p-2 w-full"
                                dateFormat="MM/dd/yyyy"
                            />
                            <span className='absolute top-1/4 text-lg font-semibold text-gray-500 right-5'>
                                <BsCalendar2Date />
                            </span>
                        </div>
                    </div>

                    {/* Reset Filters Button */}
                    <button onClick={handleResetFilters} className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300">Reset Filters</button>
                </div>

                {/* Notice Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    {
                        loading ? <TableLoader columns={6} /> :
                            <table className="w-full table-auto text-left">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2 font-semibold text-gray-700">Title</th>
                                        <th className="px-4 py-2 font-semibold text-gray-700">Notice Type</th>
                                        <th className="px-4 py-2 font-semibold text-gray-700">Departments/Individual</th>
                                        <th className="px-4 py-2 font-semibold text-gray-700">Published On</th>
                                        <th className="px-4 py-2 font-semibold text-gray-700">Status</th>
                                        <th className="px-4 py-2 font-semibold text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((item: any, index: number) => (
                                        <tr key={index} className="border-b">
                                            {/* Title */}
                                            <td className="px-4 py-3">{item?.noticeTitle}</td>

                                            {/* Notice Type */}
                                            <td className="px-4 py-3">{item?.noticeType.join(", ")}</td>

                                            {/* Departments / Individual */}
                                            <td className="px-4 py-3">
                                                {item?.target === "Individual"
                                                    ? `${item?.employeeName} (${item?.position})`
                                                    : item?.target}
                                            </td>

                                            {/* Published On */}
                                            <td className="px-4 py-3">
                                                {new Date(item?.publishDate).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    timeZone: "UTC" // Use "UTC" or your desired time zone
                                                })}
                                            </td>

                                            {/* Status */}
                                            <td className={`px-4 py-3 font-medium ${item?.status === "PUBLISH"
                                                ? "text-green-600"
                                                : item?.status === "DRAFT"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"}`}>
                                                {item?.status === "PUBLISH" ? "Published" : item?.status === "DRAFT" ? "Draft" : "Unpublished"}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3 flex gap-2">
                                                <button className="text-blue-600 hover:text-blue-700">Edit</button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedNotice(item);
                                                        setOpenModal(true);
                                                    }}
                                                    className="text-gray-600 hover:text-gray-700"
                                                >
                                                    View
                                                </button>
                                                <div className="">
                                                    <button
                                                        className="text-lg p-1 hover:bg-gray-100 rounded"
                                                        onClick={() =>
                                                            setOpenMenuId(openMenuId === item.id ? null : item.id)
                                                        }
                                                    >
                                                        <CiMenuKebab />
                                                    </button>

                                                    {openMenuId === item.id && (
                                                        <div className="absolute right-5 mt-2 w-32 bg-white border rounded-md shadow-lg z-50">
                                                            <button
                                                                onClick={() => handleStatusChange(item.id, "PUBLISH")}
                                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-green-600"
                                                            >
                                                                Publish
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(item.id, "UNPUBLISH")}
                                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-600"
                                                            >
                                                                Unpublish
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusChange(item.id, "DRAFT")}
                                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-yellow-600"
                                                            >
                                                                Draft
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    }
                </div>
            </div>

            <div className="flex justify-center gap-5 mt-5">
                {button &&
                    button.map((item: string, index: number) => (
                        <button
                            onClick={() => setPage(index + 1)}
                            className={`border-2 px-3 py-1 rounded-lg font-bold ${page === index + 1 ? "bg-primary text-white" : ""}`}
                            key={index}
                        >
                            {item + 1}
                        </button>
                    ))}
            </div>
            <NoticeDetailsModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                notice={selectedNotice}
            />
        </div>
    );
};

export default NoticeBoard;
