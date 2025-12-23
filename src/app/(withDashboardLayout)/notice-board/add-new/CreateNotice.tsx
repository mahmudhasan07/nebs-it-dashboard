"use client"
import React, { useState } from 'react';

const CreateNotice = () => {
    const [target, setTarget] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [position, setPosition] = useState('');
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeType, setNoticeType] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [noticeBody, setNoticeBody] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            target,
            employeeId,
            employeeName,
            position,
            noticeTitle,
            noticeType,
            publishDate,
            noticeBody,
            file
        });
    };

    return (
        <div className="container mx-auto p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-5">Create a Notice</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="target" className="block text-sm font-medium text-gray-700">Target Department(s) or Individual</label>
                    <select
                        id="target"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="Individual">Individual</option>
                        <option value="Department">Department</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="noticeTitle" className="block text-sm font-medium text-gray-700">Notice Title</label>
                    <input
                        type="text"
                        id="noticeTitle"
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Write the Title of Notice"
                    />
                </div>

                <div className="mb-4 grid grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700">Select Employee ID</label>
                        <select
                            id="employeeId"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option>Select employee designation</option>
                            <option>Manager</option>
                            <option>Developer</option>
                            {/* Add more options as necessary */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">Employee Name</label>
                        <input
                            type="text"
                            id="employeeName"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter employee full name"
                        />
                    </div>

                    <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position</label>
                        <select
                            id="position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option>Select employee department</option>
                            <option>HR</option>
                            <option>Finance</option>
                            <option>Engineering</option>
                        </select>
                    </div>
                </div>

                <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="noticeType" className="block text-sm font-medium text-gray-700">Notice Type</label>
                        <select
                            id="noticeType"
                            value={noticeType}
                            onChange={(e) => setNoticeType(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option>Select Notice Type</option>
                            <option>Holiday</option>
                            <option>Meeting</option>
                            <option>Policy Update</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700">Publish Date</label>
                        <input
                            type="date"
                            id="publishDate"
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="noticeBody" className="block text-sm font-medium text-gray-700">Notice Body</label>
                    <textarea
                        id="noticeBody"
                        value={noticeBody}
                        onChange={(e) => setNoticeBody(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Write the details about notice"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Attachments (optional)</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md p-2"
                    />
                    {file && <p className="text-gray-600 mt-2">Uploaded: {file.name}</p>}
                </div>

                <div className="flex justify-between items-center">
                    <button type="button" className="text-gray-500 hover:text-gray-700">Cancel</button>
                    <div className="space-x-3">
                        <button type="submit" className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md">Save as Draft</button>
                        <button type="submit" className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600">Publish Notice</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateNotice;
