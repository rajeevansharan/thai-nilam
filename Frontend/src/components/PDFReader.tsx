import React, { useState, useEffect } from "react";
import { X, Lock, ShieldCheck, ChevronLeft, ChevronRight, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";

// Use a stable CDN for the worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFReaderProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

const PDFReader: React.FC<PDFReaderProps> = ({ isOpen, onClose, pdfUrl, title }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleContextMenu = (e: MouseEvent) => e.preventDefault();
      const handleKeyDown = (e: KeyboardEvent) => {
        // Block Ctrl+S, Ctrl+P, Ctrl+U (view source)
        if (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u')) {
          e.preventDefault();
        }
      };
      
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("keydown", handleKeyDown);
      
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("contextmenu", handleContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const getFullPdfUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `http://localhost:5000/${url.replace(/\\/g, "/")}`;
  };

  const nextPage = () => setPageNumber(prev => Math.min(numPages, prev + 1));
  const prevPage = () => setPageNumber(prev => Math.max(1, prev - 1));
  const zoomIn = () => setScale(prev => Math.min(3, prev + 0.2));
  const zoomOut = () => setScale(prev => Math.max(0.5, prev - 0.2));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0b] select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-md border-b border-white/5 z-20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#d4a017] flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-white tracking-widest uppercase">{title}</h2>
                <div className="flex items-center gap-2">
                   <ShieldCheck className="w-3 h-3 text-amber-500" />
                   <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">Thai Nilam Protected Viewer</span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 bg-white/5 px-6 py-2 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                    <button onClick={zoomOut} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors"><ZoomOut size={16} /></button>
                    <span className="text-[10px] font-bold text-white min-w-[3rem] text-center">{Math.round(scale * 100)}%</span>
                    <button onClick={zoomIn} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors"><ZoomIn size={16} /></button>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-3">
                    <button 
                        onClick={prevPage} 
                        disabled={pageNumber === 1}
                        className="p-1.5 hover:bg-white/10 disabled:opacity-20 rounded-lg text-gray-400 font-bold transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-[10px] font-bold text-white tracking-[0.2em]">PAGE {pageNumber} OF {numPages}</span>
                    <button 
                        onClick={nextPage} 
                        disabled={pageNumber === numPages}
                        className="p-1.5 hover:bg-white/10 disabled:opacity-20 rounded-lg text-gray-400 font-bold transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-all group hover:rotate-90 active:scale-90"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Viewer Area */}
          <div className="flex-grow overflow-auto bg-[#0a0a0b] custom-scrollbar">
            <div className="min-h-full min-w-full flex items-start justify-center p-8 md:p-12">
              <Document
                file={getFullPdfUrl(pdfUrl)}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex flex-col items-center justify-center p-20 gap-4">
                      <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                      <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-gray-500">Decryption in progress...</p>
                  </div>
                }
                className="shadow-2xl shadow-black ring-1 ring-white/10 rounded-sm overflow-hidden bg-white mx-auto"
                onContextMenu={(e) => e.preventDefault()}
              >
                <Page 
                  pageNumber={pageNumber} 
                  scale={scale} 
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  className="transition-all duration-300"
                />
              </Document>
            </div>

            {/* Mobile Navigation controls */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/10 shadow-2xl z-30 md:hidden">
                 <button onClick={prevPage} disabled={pageNumber === 1} className="text-white disabled:opacity-20"><ChevronLeft /></button>
                 <span className="text-xs font-bold text-white tracking-widest">{pageNumber} / {numPages}</span>
                 <button onClick={nextPage} disabled={pageNumber === numPages} className="text-white disabled:opacity-20"><ChevronRight /></button>
            </div>

            {/* Watermark - Fixed position relative to viewer container */}
            <div className="fixed inset-0 pointer-events-none z-[1] flex flex-wrap opacity-[0.03] select-none items-center justify-center overflow-hidden rotate-[-30deg]">
                {Array.from({ length: 50 }).map((_, i) => (
                    <span key={i} className="text-4xl font-bold p-20 whitespace-nowrap">THAI NILAM PROPERTY</span>
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PDFReader;
