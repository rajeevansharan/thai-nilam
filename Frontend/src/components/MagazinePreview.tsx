import React from "react";
import { Lock, ShieldCheck } from "lucide-react";

interface MagazinePreviewProps {
  issue: any;
}

const MagazinePreview: React.FC<MagazinePreviewProps> = ({ issue }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 left-0 w-2 h-full bg-[#d4a017]"></div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/3">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 bg-[#d4a017]/10 rounded-full mb-4 w-fit">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#d4a017]">
                {issue.month}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0F172A] mb-4">
              {issue.title}
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed italic mb-8 max-w-lg">
              {issue.description}
            </p>
            <div className="flex items-center gap-6 text-xs text-[#d4a017] font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#d4a017]/10 flex items-center justify-center">
                  <Lock className="w-3 h-3" />
                </div>
                Digital Thai Nilam
              </span>
              <span className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#d4a017]/10 flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                Secure Access
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Preview Images */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-serif font-bold text-[#0F172A]">
            Inside this Thai Nilam
          </h2>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4a017] bg-[#d4a017]/5 px-3 py-1 rounded-md">
            Sneak Peek
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {issue.contentImages && issue.contentImages.length > 0
            ? issue.contentImages.map((img: any, idx: number) => (
                <div
                  key={idx}
                  className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 shadow-md transform transition-all hover:scale-[1.03] hover:shadow-xl border border-gray-100 group"
                >
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img
                    src={
                      img.url.startsWith("http")
                        ? img.url
                        : `http://localhost:5000/${img.url.replace(/\\/g, "/")}`
                    }
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            : // Fallback placeholders if no content images found
              [1, 2, 3, 4].map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/5] rounded-2xl bg-gray-50 flex items-center justify-center border-2 border-dashed border-gray-200"
                >
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                    Preview {idx + 1}
                  </span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MagazinePreview;
