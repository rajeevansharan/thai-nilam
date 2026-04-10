import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minus,
  Plus,
  Loader2,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFReaderProps {
  pdfUrl: string;
  issueTitle: string;
  onClose: () => void;
}

const PDFReader: React.FC<PDFReaderProps> = ({
  pdfUrl,
  issueTitle,
  onClose,
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setLoadError] = useState<string | null>(null);

  // Auto-hide controls after inactivity
  useEffect(() => {
    let timeout: number;
    if (controlsVisible) {
      timeout = window.setTimeout(() => setControlsVisible(false), 4000);
    }
    return () => window.clearTimeout(timeout as unknown as number);
  }, [controlsVisible]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
    setLoadError(null);
  }

  function onDocumentLoadError(err: Error) {
    console.error("PDF Load Error:", err);
    setIsLoading(false);
    setLoadError(
      "Failed to load PDF. Please check your connection and try again.",
    );
  }

  const getFullPdfUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000/${path.replace(/\\/g, "/")}`;
  };

  const nextPage = () =>
    setPageNumber((prev) => Math.min(numPages || prev, prev + 1));
  const prevPage = () => setPageNumber((prev) => Math.max(1, prev - 1));
  const zoomIn = () => setScale((prev) => Math.min(3, prev + 0.2));
  const zoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.2));

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0F172A] flex flex-col items-center overflow-hidden touch-none"
        onMouseMove={() => setControlsVisible(true)}
        onClick={() => setControlsVisible(true)}
      >
        {/* Top bar */}
        <div
          className={`absolute top-0 inset-x-0 p-4 md:p-6 flex items-center justify-between z-50 transition-all duration-500 ${controlsVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
        >
          <div className="flex flex-col">
            <h2 className="text-white font-serif font-bold text-lg md:text-xl tracking-wide">
              {issueTitle}
            </h2>
            <p className="text-[10px] md:text-xs text-[#d4a017] font-bold uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
              <Lock className="w-3 h-3" /> Secure Digital Reader
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 rounded-full text-white transition-all shadow-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white z-40 bg-[#0F172A]">
            <Loader2 className="w-10 h-10 animate-spin text-[#d4a017]" />
            <p className="text-sm font-bold uppercase tracking-widest text-white/40">
              Preparing Document...
            </p>
          </div>
        )}

        {/* PDF Document */}
        <div className="flex-grow w-full flex items-center justify-center overflow-auto custom-scrollbar pt-20 pb-20 px-4 select-none">
          {error ? (
            <div className="max-w-md w-full bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3">
                Unable to Load Magazine
              </h3>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3.5 bg-[#d4a017] text-[#0F172A] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b88a14] transition-all shadow-xl shadow-[#d4a017]/10"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="shadow-2xl shadow-black/50 border border-white/5 bg-white">
              <Document
                file={getFullPdfUrl(pdfUrl)}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <Loader2 className="w-8 h-8 animate-spin text-[#d4a017]" />
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="pdf-page-container"
                />
              </Document>
            </div>
          )}
        </div>

        {/* Controls Overlay */}
        <AnimatePresence>
          {controlsVisible && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50 w-[94%] max-w-2xl px-2"
            >
              {/* Page Info Pill */}
              <div className="bg-[#0F172A]/80 backdrop-blur-xl px-4 md:px-6 py-2 rounded-full border border-white/10 shadow-2xl">
                <p className="text-white font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  Page {pageNumber}{" "}
                  <span className="text-white/40 mx-2">/</span>{" "}
                  {numPages || "..."}
                </p>
              </div>

              {/* Main Controls Bar */}
              <div className="bg-[#0F172A]/90 backdrop-blur-2xl px-4 md:px-8 py-3 md:py-4 rounded-[1.5rem] md:rounded-3xl border border-white/10 shadow-2xl flex items-center justify-between w-full">
                <div className="flex items-center gap-1 md:gap-4">
                  <button
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                    className="p-2 md:p-3 hover:bg-white/10 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </button>

                  <div className="h-4 w-[px] bg-white/10 mx-1 md:mx-2" />

                  <button
                    onClick={zoomOut}
                    className="p-2 md:p-3 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Minus className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </button>
                  <button
                    onClick={zoomIn}
                    className="p-2 md:p-3 hover:bg-white/10 rounded-xl transition-all"
                  >
                    <Plus className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </button>
                </div>

                <div className="hidden sm:block">
                  <span className="text-white font-serif font-bold text-sm tracking-wide opacity-80 truncate max-w-[150px]">
                    {issueTitle}
                  </span>
                </div>

                <div className="flex items-center gap-1 md:gap-4">
                  <button
                    onClick={toggleFullScreen}
                    className="p-2 md:p-3 hover:bg-white/10 rounded-xl transition-all hidden xs:block"
                  >
                    <Maximize className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </button>
                  <div className="h-4 w-[1px] bg-white/10 mx-1 md:mx-2 hidden xs:block" />
                  <button
                    onClick={nextPage}
                    disabled={pageNumber >= (numPages || 0)}
                    className="p-2 md:p-3 hover:bg-[#d4a017] bg-[#d4a017]/20 rounded-xl transition-all disabled:opacity-30"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#d4a017]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default PDFReader;
