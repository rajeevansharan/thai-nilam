import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  ChevronRight,
  Upload,
  Calendar,
  CheckCircle2,
  Edit2,
  Trash2,
  FileText
} from "lucide-react";
import { createIssue, getAllIssues, deleteIssue, updateIssue } from "../../services/issueService";

interface Issue {
  id: number;
  title: string;
  description: string;
  month: string;
  year: string;
  pdfUrl: string;
  imageUrl: string;
  price: number;
  contentImages?: { id: number; url: string }[];
  createdAt: string;
}

const IssueManagement: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("April");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [price, setPrice] = useState("500.00");

  // States for file uploads
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [contentImageFiles, setContentImageFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState({ text: "", type: "" });
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const contentImagesInputRef = useRef<HTMLInputElement>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const years = ["2026", "2025", "2024"];

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const data = await getAllIssues();
      setIssues(data);
    } catch (err) {
      console.error("Failed to fetch issues", err);
    }
  };

  const handlePublish = async () => {
    if (!editingIssue && (!pdfFile || !imageFile)) {
      setFeedbackMessage({
        text: "Please select both a PDF and a Cover Image for new issues.",
        type: "error",
      });
      return;
    }

    setIsProcessing(true);
    setFeedbackMessage({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("title", `${selectedMonth} Issue ${selectedYear}`);
      formData.append(
        "description",
        `The digital magazine issue for ${selectedMonth} ${selectedYear}`,
      );
      formData.append("month", selectedMonth);
      formData.append("year", selectedYear);
      formData.append("price", price);
      if (pdfFile) formData.append("pdf", pdfFile);
      if (imageFile) formData.append("image", imageFile);
      contentImageFiles.forEach(file => {
        formData.append("contentImages", file);
      });

      if (editingIssue) {
        await updateIssue(editingIssue.id, formData);
        setFeedbackMessage({
          text: "Issue updated successfully!",
          type: "success",
        });
      } else {
        await createIssue(formData);
        setFeedbackMessage({
          text: "Issue published successfully!",
          type: "success",
        });
      }

      handleDiscard();
      fetchIssues();
    } catch (err) {
      console.error(err);
      setFeedbackMessage({
        text: `Failed to ${editingIssue ? 'update' : 'publish'} the issue. Please try again.`,
        type: "error",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEdit = (issue: Issue) => {
    setEditingIssue(issue);
    setSelectedMonth(issue.month);
    setSelectedYear(issue.year);
    setPrice(issue.price.toString());
    setFeedbackMessage({ text: "", type: "" });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this issue? This action cannot be undone.")) return;

    try {
      await deleteIssue(id);
      setIssues(issues.filter(i => i.id !== id));
      setFeedbackMessage({ text: "Issue deleted successfully", type: "success" });
    } catch (err) {
      console.error("Failed to delete issue", err);
      setFeedbackMessage({ text: "Failed to delete issue", type: "error" });
    }
  };

  const handleDiscard = () => {
    setPdfFile(null);
    setImageFile(null);
    setContentImageFiles([]);
    setSelectedMonth("April");
    setSelectedYear("2026");
    setPrice("500.00");
    setEditingIssue(null);
    setFeedbackMessage({ text: "", type: "" });
  };

  const getFileUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000/${path.replace(/\\/g, "/")}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Upload/Edit Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="text-left">
            <h1 className="text-3xl font-serif font-semibold text-gray-900">
              {editingIssue ? "Edit Thai Nilam Issue" : "Upload Thai Nilam Issue"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {editingIssue 
                ? `Update details for the ${editingIssue.month} ${editingIssue.year} issue.`
                : "Add monthly Thai Nilam issues and covers to the digital library."}
            </p>
          </div>
          {editingIssue && (
            <button 
              onClick={handleDiscard}
              className="px-4 py-2 text-sm font-medium text-[#d4a017] hover:bg-amber-50 rounded-lg transition-colors"
            >
              Cancel Editing
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Price (LKR)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-200 focus:bg-white rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none transition-all"
                  placeholder="500.00"
                />
              </div>
            </div>

            {/* File Upload Sections */}
            {feedbackMessage.text && (
              <div
                className={`p-4 rounded-xl text-sm font-medium ${feedbackMessage.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-red-50 text-red-600 border border-red-200"}`}
              >
                {feedbackMessage.text}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Magazine Issue (PDF) {editingIssue && <span className="text-amber-500 font-normal lowercase">(Optional: only if changing)</span>}
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
                    {pdfFile ? pdfFile.name : (editingIssue ? "Keep current PDF" : "Choose PDF file")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {pdfFile ? "Ready to upload" : "Max file size: 50MB"}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Cover Image (JPG/PNG) {editingIssue && <span className="text-amber-500 font-normal lowercase">(Optional: only if changing)</span>}
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
                    {imageFile ? imageFile.name : (editingIssue ? "Keep current cover" : "Scan or Upload Cover")}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {imageFile ? "Ready to upload" : "Recommended: 1200x1600px"}
                  </p>
                </div>
              </div>

              {/* Content Images Upload */}
              <div className="space-y-2 text-left md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Content Preview Images (Up to 5) {editingIssue && <span className="text-amber-500 font-normal lowercase">(Optional: will replace current)</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  ref={contentImagesInputRef}
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files || []);
                    setContentImageFiles((prev) => {
                      const combined = [...prev, ...newFiles];
                      return combined.slice(0, 5);
                    });
                    if (e.target) e.target.value = "";
                  }}
                />
                <div className="space-y-4">
                  <div
                    onClick={() => contentImagesInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white hover:border-gray-200 transition-all cursor-pointer group ${contentImageFiles.length >= 5 ? "opacity-50 pointer-events-none" : "border-gray-100"}`}
                  >
                    <div className="flex flex-col items-center">
                      <Plus
                        className="w-8 h-8 text-gray-300 group-hover:text-amber-500 transition-colors mb-4"
                        strokeWidth={1.5}
                      />
                      <p className="text-sm font-semibold text-gray-900">
                        {contentImageFiles.length >= 5 ? "Maximum images reached" : "Add Content Image"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {contentImageFiles.length >= 5 ? "Delete existing to add more" : "Select images one by one (Max 5)"}
                      </p>
                    </div>
                  </div>

                  {contentImageFiles.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {contentImageFiles.map((file, idx) => (
                        <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden group shadow-sm border border-gray-100">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setContentImageFiles(prev => prev.filter((_, i) => i !== idx));
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <div className="absolute bottom-0 inset-x-0 bg-black/40 py-1 px-2">
                             <p className="text-[8px] text-white truncate font-medium">{file.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                disabled={isProcessing}
                className="px-10 py-3.5 bg-[#d4a017] text-white rounded-xl font-semibold text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-75 disabled:hover:translate-y-0"
              >
                {isProcessing ? "Processing..." : (editingIssue ? "Update Issue" : "Publish Issue")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="space-y-6">
        <div className="text-left">
          <h2 className="text-2xl font-serif font-semibold text-gray-900">Managed Issues</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage all published magazine issues.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Magazine Issue</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Month/Year</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Price</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {issues.length > 0 ? (
                  issues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={getFileUrl(issue.imageUrl)} 
                            alt={issue.title}
                            className="w-12 h-16 object-cover rounded-lg shadow-sm"
                          />
                          <div>
                            <p className="text-sm font-bold text-gray-900">{issue.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <a 
                                href={getFileUrl(issue.pdfUrl)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[10px] flex items-center gap-1 text-[#d4a017] hover:underline"
                              >
                                <FileText className="w-3 h-3" /> View PDF
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-gray-700">{issue.month} {issue.year}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">LKR {issue.price.toFixed(2)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEdit(issue)}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                            title="Edit Issue"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(issue.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Issue"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <p className="text-gray-400 text-sm italic">No issues found. Upload your first issue above.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IssueManagement;
