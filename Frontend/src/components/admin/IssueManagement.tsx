import React, { useState, useRef } from "react";
import {
  Plus,
  ChevronRight,
  Upload,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { createIssue } from "../../services/issueService";

const IssueManagement: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState("2026");

  // States for file uploads
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState({ text: "", type: "" });

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = ["2026", "2025", "2024"];

  const handlePublish = async () => {
    if (!pdfFile || !imageFile) {
      setPublishMessage({
        text: "Please select both a PDF and a Cover Image.",
        type: "error",
      });
      return;
    }

    setIsPublishing(true);
    setPublishMessage({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("title", `${selectedMonth} Issue ${selectedYear}`);
      formData.append(
        "description",
        `The digital magazine issue for ${selectedMonth} ${selectedYear}`,
      );
      formData.append("month", selectedMonth);
      formData.append("year", selectedYear);
      formData.append("pdf", pdfFile);
      formData.append("image", imageFile);

      await createIssue(formData);

      setPublishMessage({
        text: "Issue published successfully!",
        type: "success",
      });
      setPdfFile(null);
      setImageFile(null);
    } catch (err) {
      setPublishMessage({
        text: "Failed to publish the issue. Please try again.",
        type: "error",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDiscard = () => {
    setPdfFile(null);
    setImageFile(null);
    setSelectedMonth("April");
    setSelectedYear("2026");
    setPublishMessage({ text: "", type: "" });
  };

  return (
    <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="text-left">
          <h1 className="text-3xl font-serif font-semibold text-gray-900">
            Upload Thai Nilam Issue
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Add monthly Thai Nilam issues and covers to the digital library.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Target Month
              </label>
              <div className="relative group">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Target Year
              </label>
              <div className="relative group">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full appearance-none bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transform rotate-90 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* File Upload Sections */}
          {publishMessage.text && (
            <div
              className={`p-4 rounded-xl text-sm font-medium ${publishMessage.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}
            >
              {publishMessage.text}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Magazine Issue (PDF)
              </label>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={pdfInputRef}
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              />
              <div
                onClick={() => pdfInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white hover:border-gray-200 transition-all cursor-pointer group ${pdfFile ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100"}`}
              >
                {pdfFile ? (
                  <CheckCircle2
                    className="w-8 h-8 text-emerald-500 mb-4"
                    strokeWidth={1.5}
                  />
                ) : (
                  <Upload
                    className="w-8 h-8 text-gray-300 group-hover:text-amber-500 transition-colors mb-4"
                    strokeWidth={1.5}
                  />
                )}
                <p className="text-sm font-semibold text-gray-900">
                  {pdfFile ? pdfFile.name : "Choose PDF file"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {pdfFile ? "Ready to upload" : "Max file size: 50MB"}
                </p>
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Cover Image (JPG/PNG)
              </label>
              <input
                type="file"
                accept="image/jpeg, image/png"
                className="hidden"
                ref={imageInputRef}
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <div
                onClick={() => imageInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white hover:border-gray-200 transition-all cursor-pointer group ${imageFile ? "border-emerald-200 bg-emerald-50/30" : "border-gray-100"}`}
              >
                {imageFile ? (
                  <CheckCircle2
                    className="w-8 h-8 text-emerald-500 mb-4"
                    strokeWidth={1.5}
                  />
                ) : (
                  <Plus
                    className="w-8 h-8 text-gray-300 group-hover:text-amber-500 transition-colors mb-4"
                    strokeWidth={1.5}
                  />
                )}
                <p className="text-sm font-semibold text-gray-900">
                  {imageFile ? imageFile.name : "Scan or Upload Cover"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {imageFile ? "Ready to upload" : "Recommended: 1200x1600px"}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-end gap-4 border-t border-gray-50">
            <button
              onClick={handleDiscard}
              className="px-8 py-3.5 bg-gray-50 text-gray-500 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-10 py-3.5 bg-[#d4a017] text-white rounded-xl font-semibold text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-75 disabled:hover:translate-y-0"
            >
              {isPublishing ? "Publishing..." : "Publish Issue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueManagement;
