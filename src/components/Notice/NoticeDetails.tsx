"use client";

import React from "react";
import { X } from "lucide-react";

const NoticeDetailsModal = ({ isOpen, onClose, notice }: any) => {
  if (!isOpen || !notice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative overflow-y-auto max-h-[90vh]">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* Image */}
        {notice.image && (
          <img
            src={notice.image}
            alt="Notice"
            className="w-full h-60 object-cover rounded-md mb-4"
          />
        )}

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-1">
          {notice.noticeTitle}
        </h2>

        {/* Dates */}
        <p className="text-sm text-gray-500 mb-4">
          Published on{" "}
          {new Date(notice.publishDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>

        {/* Body */}
        <div className="mb-5">
          <h3 className="font-semibold mb-1">Notice Details</h3>
          <p className="text-gray-700 leading-relaxed">
            {notice.noticeBody}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-medium ${
                notice.status === "PUBLISH"
                  ? "text-green-600"
                  : notice.status === "DRAFT"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {notice.status}
            </span>
          </p>

          <p>
            <strong>Target:</strong> {notice.target}
          </p>

          <p>
            <strong>Notice Type:</strong>{" "}
            {notice.noticeType?.join(", ")}
          </p>

          {notice.target === "Individual" && (
            <p>
              <strong>Employee:</strong>{" "}
              {notice.employeeName} ({notice.position}) – ID:{" "}
              {notice.employeeId}
            </p>
          )}

          <p>
            <strong>Created At:</strong>{" "}
            {new Date(notice.createdAt).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailsModal;
