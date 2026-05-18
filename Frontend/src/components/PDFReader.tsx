import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Maximize,
  Minus,
  Plus,
  Loader2,
  Lock,
  AlertCircle,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../config/api";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setLoadError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Body scroll lock
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Responsive scale initialization
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(0.5);
      else if (width < 768) setScale(0.7);
      else if (width < 1024) setScale(0.9);
      else setScale(1.1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // IntersectionObserver to track which page is currently visible
  useEffect(() => {
    if (!numPages || !scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let visiblePage = currentPage;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const pageNum = Number(entry.target.getAttribute('data-page'));
            if (pageNum) visiblePage = pageNum;
          }
        });
        if (maxRatio > 0) {
          setCurrentPage(visiblePage);
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    pageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [numPages, currentPage]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    pageRefs.current = new Array(numPages).fill(null);
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
    const cleanPath = path.replace(/\\/g, "/").replace(/^\//, "");
    return `${API_BASE_URL}/${cleanPath}`;
  };

  const zoomIn = () => setScale((prev) => Math.min(3, prev + 0.2));
  const zoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.2));

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const setPageRef = useCallback((el: HTMLDivElement | null, index: number) => {
    pageRefs.current[index] = el;
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-[#0F172A] w-screen h-[100dvh] overflow-hidden select-none"
      >
        {/* Layer 1: PDF Document (Continuous Scroll) */}
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 overflow-auto pt-[100px] pb-[120px] z-10 custom-scrollbar"
        >
          <div className="flex flex-col items-center gap-4 p-4">
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
              <Document
                file={getFullPdfUrl(pdfUrl)}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={<Loader2 className="w-8 h-8 animate-spin text-[#d4a017]" />}
              >
                {numPages && Array.from({ length: numPages }, (_, i) => (
                  <div
                    key={`page-${i + 1}`}
                    ref={(el) => setPageRef(el, i)}
                    data-page={i + 1}
                    className="shadow-2xl shadow-black/50 border border-white/5 bg-white mb-4"
                  >
                    <Page
                      pageNumber={i + 1}
                      scale={scale}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      className="pdf-page-container"
                    />
                  </div>
                ))}
              </Document>
            )}
          </div>
        </div>

        {/* Layer 2: Fixed UI Overlays */}
        {/* Top Navigation */}
        <div className="fixed top-0 inset-x-0 z-[100] p-4 md:p-6  pointer-events-none">
          <div className="flex items-center justify-between w-full pointer-events-auto max-w-7xl mx-auto">
            <div className="flex flex-col">
              <h2 className="text-white font-serif font-bold text-base md:text-xl tracking-wide drop-shadow-md">
                {issueTitle}
              </h2>
              <p className="text-[10px] md:text-xs text-[#d4a017] font-bold uppercase tracking-[0.2em] mt-1 flex items-center gap-2 drop-shadow-md">
                <Lock className="w-3 h-3" /> Secure Digital Reader
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 md:p-4 bg-white/10 hover:bg-rose-500/20 active:bg-rose-500/40 backdrop-blur-xl border border-white/10 rounded-full text-white transition-all shadow-xl active:scale-95 touch-manipulation group"
            >
              <X className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Loading Overlay (if needed) */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#0F172A] z-[5] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#d4a017]" />
            <p className="text-sm font-bold uppercase tracking-widest text-white/40">Preparing Document...</p>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="fixed bottom-0 inset-x-0 z-[100] pb-6 md:pb-10 pt-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
          <div className="flex flex-col items-center gap-4 pointer-events-auto">
            {/* Page Indicator */}
            <div className="bg-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
              <p className="text-white font-bold text-[11px] md:text-xs uppercase tracking-[0.2em]">
                Page {currentPage} <span className="text-white/40 mx-1.5">/</span> {numPages || "..."}
              </p>
            </div>

            {/* Toolbar Buttons */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 w-full">
              <button
                onClick={zoomOut}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/10 transition-all active:scale-95 touch-manipulation shadow-lg"
              >
                <Minus className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={zoomIn}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/10 transition-all active:scale-95 touch-manipulation shadow-lg"
              >
                <Plus className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={toggleFullScreen}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl border border-white/10 transition-all active:scale-95 touch-manipulation shadow-lg"
              >
                <Maximize className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PDFReader;
