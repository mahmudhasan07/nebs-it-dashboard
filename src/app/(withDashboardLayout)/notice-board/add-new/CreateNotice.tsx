'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { BsCalendar2Date } from 'react-icons/bs';
import { FaArrowLeft } from "react-icons/fa";
import Select from "react-select";
import { components } from 'react-select';

const CreateNotice = () => {
  const route = useRouter();
  const [target, setTarget] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [position, setPosition] = useState('');
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeType, setNoticeType] = useState<string[]>([]);  // Array for multiple selections
  const [publishDate, setPublishDate] = useState(null);
  const [noticeBody, setNoticeBody] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Options for the select dropdown
  const noticeOptions = [
    { value: 'Warning / Disciplinary', label: 'Warning / Disciplinary' },
    { value: 'Performance Improvement', label: 'Performance Improvement' },
    { value: 'Appreciation / Recognition', label: 'Appreciation / Recognition' },
    { value: 'Attendance / Leave Issue', label: 'Attendance / Leave Issue' },
    { value: 'Payroll / Compensation', label: 'Payroll / Compensation' },
    { value: 'Contract / Role Update', label: 'Contract / Role Update' },
    { value: 'Advisory / Personal Reminder', label: 'Advisory / Personal Reminder' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Log the form data to the console
    console.log("Form Submitted with the following data:");
    console.log({
      target,
      employeeId,
      employeeName,
      position,
      noticeTitle,
      noticeType,
      publishDate,
      noticeBody,
      file,
    });
  };

  const customSingleValue = ({ data }: any) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={noticeType.includes(data.value)}
        onChange={() => { }}
        className="mr-2"
      />
      <span>{data.label}</span>
    </div>
  );

  return (
    <section className='container'>
      <div className='mt-7 flex gap-3'>
        <button onClick={() => route.push("/notice-board")} className='border-[2px] border-gray-300 rounded-lg p-2 '><FaArrowLeft /></button>
        <h1 className="text-2xl font-semibold text-gray-800">Create Notice</h1>
      </div>

      <div className=" mx-auto mt-5 p-5 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Please fill in the details below</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="target" className="block text-sm font-medium text-gray-700">Target Department(s) or Individual</label>
            <div className="relative mt-1">
              <select
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="bg-white border border-gray-300 rounded-md p-2 pl-4 pr-8 w-full text-sm relative appearance-none">
                <option value="Individual">Individual</option>
                <option value="Department">Department</option>
              </select>
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg width="18" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                  <path d="M3 4l3 3 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </span>
            </div>
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
              <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter employee ID"
              />
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
              <div className="relative mt-1">
                <select
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md p-2 pl-4 pr-8 w-full text-sm relative appearance-none">
                  <option>Select employee department</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Engineering</option>
                </select>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg width="18" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                    <path d="M3 4l3 3 3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="noticeType" className="block text-sm font-medium text-gray-700">Notice Type</label>
            <Select
              isMulti
              name="noticeType"
              options={noticeOptions}
              value={noticeType.map((value) => noticeOptions.find((option) => option.value === value))}
              onChange={(selectedOptions: any) => {
                setNoticeType(selectedOptions.map((option: any) => option.value));
              }}
              components={{ SingleValue: customSingleValue }}
              className="text-sm"
              classNamePrefix="select"
              placeholder="Select Notice Type"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700">Publish Date</label>
            <div className="relative mt-1">
              <DatePicker
                selected={publishDate}
                onChange={(date: any) => setPublishDate(date)}
                placeholderText="Enter Date"
                className="bg-white border border-gray-300 rounded-md p-2 w-full text-sm"
                dateFormat="MM/dd/yyyy"
              />
              <span className='absolute top-1/4 text-base font-semibold text-gray-500 right-5'>
                <BsCalendar2Date />
              </span>
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
    </section>
  );
};

export default CreateNotice;
