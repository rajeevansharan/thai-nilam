import React from "react";
import { Lock, Heart, BookOpen } from "lucide-react";
import type { Issue, IssueCardProps } from "../types";

const IssueCard: React.FC<IssueCardProps> = ({
  id,
  image,
  month,
  title,
  description,
  isUnlocked = false,
  price = 500,
  isPurchased = false,
  isFavorite = false,
  onUnlock,
  onRead,
  onToggleFavorite,
  contentImages,
}) => {
  const handleAction = () => {
    const issueData = {
      id: id!,
      title: title!,
      month: month!,
      imageUrl: image!,
      image: image!,
      description: description!,
      price: typeof price === 'number' ? price : parseFloat(price as string),
      contentImages: contentImages,
      pdfUrl: '', // Will be resolved by parent finding the full issue
      year: '', // Will be resolved by parent finding the full issue
    } as Issue;

    if (isPurchased || isUnlocked) {
      onRead?.(issueData);
    } else {
      onUnlock?.(issueData);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group h-full">
      {/* Magazine Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={image}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={title}
        />
        
        {/* Favorite Button */}
        {id && onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(id, isFavorite);
            }}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
          >
            <Heart
              size={16}
              fill={isFavorite ? "#ef4444" : "none"}
              className={isFavorite ? "text-red-500" : "text-gray-400"}
            />
          </button>
        )}

        {/* Access Badge */}
        {(isPurchased || isUnlocked) ? (
          <div className="absolute top-3 left-3 px-2 py-1 bg-[#d4a017] text-white text-[8px] font-bold uppercase tracking-widest rounded shadow-sm z-10">
            Unlocked
          </div>
        ):(
          <div className="absolute top-3 left-3 px-2 py-1 bg-[#d4a017] text-white text-[8px] font-bold uppercase tracking-widest rounded shadow-sm z-10">
            Locked
          </div>
        )
        }
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <p className="text-[9px] font-bold text-[#d4a017] uppercase tracking-[0.2em] mb-1">
            {month}
          </p>
          <h3 className="text-lg font-serif font-bold text-[#0F172A] line-clamp-1 group-hover:text-[#d4a017] transition-colors">
            {title}
          </h3>
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-2 mb-5 italic flex-grow">
          {description}
        </p>

        <button
          onClick={handleAction}
          className={`w-full py-3 px-4 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all shadow-sm
            ${isPurchased || isUnlocked 
              ? "bg-[#0F172A] text-white hover:bg-black" 
              : "bg-[#d4a017] text-white hover:bg-[#b88a14]"}
          `}
        >
          {isPurchased || isUnlocked ? (
            <>
              <BookOpen className="w-3.5 h-3.5" />
              Read Now
            </>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              Unlock for LKR {price}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
