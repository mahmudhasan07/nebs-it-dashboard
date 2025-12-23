"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar2Date } from "react-icons/bs";
import { RiDraftLine } from "react-icons/ri";


const NoticeBoard = () => {
    const [startDate, setStartDate] = useState(null);
    const route = useRouter();
    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Notice Management</h1>
                    <div className="flex space-x-4">
                        <span className="text-gray-600">Active Notices: 8</span>
                        <span className="text-gray-600">Draft Notices: 04</span>
                    </div>
                </div>
                <div className="mb-4 space-x-3 grid grid-cols-2">
                    <button className="bg-[#F95524] text-white px-5 py-2 rounded-md hover:bg-[#F95524]/90">
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
                        <select className="bg-white border border-gray-300 rounded-md p-2 pl-4 pr-8 relative appearance-none">
                            <option>Departments or Individuals</option>
                            <option>All Department</option>
                            <option>Sales Team</option>
                            {/* Add other options here */}
                        </select>
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg width="18" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                <path d="M3 4l3 3 3-3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                    </div>

                    <input placeholder="Search by Employee ID or Name" className="bg-white border border-gray-300 rounded-md p-2 w-60"></input>

                    <div className="relative">
                        <select className="bg-white border border-gray-300 rounded-md p-2 pl-4 pr-2 relative appearance-none">
                            <option>Status</option>
                            <option>Published</option>
                            <option>Unpublished</option>
                        </select>
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <svg width="18" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                                <path d="M3 4l3 3 3-3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                        </span>
                    </div>
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={(date: any) => setStartDate(date)}
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
                <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-300">Reset Filters</button>
            </div>

            {/* Create Notice Button */}


            {/* Notice Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
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
                        <tr className="border-b">
                            <td className="px-4 py-3">Office closed on Friday for maintenance.</td>
                            <td className="px-4 py-3">General / Company-Wide</td>
                            <td className="px-4 py-3">All Department</td>
                            <td className="px-4 py-3">15-Jun-2025</td>
                            <td className="px-4 py-3 text-green-600">Published</td>
                            <td className="px-4 py-3 space-x-2">
                                <button className="text-blue-600 hover:text-blue-700">Edit</button>
                                <button className="text-gray-600 hover:text-gray-700">View</button>
                                <button className="text-green-600 hover:text-green-700">Publish</button>
                            </td>
                        </tr>
                        {/* Add more rows as per the data */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NoticeBoard;
