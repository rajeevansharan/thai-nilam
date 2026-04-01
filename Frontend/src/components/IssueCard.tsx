import { Bell, Lock } from 'lucide-react';

interface IssueCardProps {
  id?: string;
  image: string;
  month: string;
  title: string;
  description: string;
  isUnlocked?: boolean;
  price?: string | number;
  isPurchased?: boolean;
  onUnlock?: (issue: any) => void;
  contentImages?: { url: string }[];
}

const IssueCard: React.FC<IssueCardProps> = ({ id, image, month, title, description, isUnlocked = false, price = 500, isPurchased = false, onUnlock, contentImages }) => {
  return (
    <div className="flex flex-col group transition-all duration-300 transform hover:-translate-y-2 h-full bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      {/* Magazine cover visual */}
      <div className={`relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg border border-gray-50 ${isUnlocked ? 'ring-2 ring-[#d4a017]/20' : 'ring-1 ring-gray-100'}`}>
        <img src={image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={title} />
        
        {/* Status badges */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {isPurchased && (
            <span className="px-3 py-1 bg-[#d4a017] text-white text-[10px] uppercase font-bold tracking-wider rounded-full shadow-md flex items-center">
              <Bell className="w-3 h-3 mr-1 fill-current" />
              Purchased
            </span>
          )}
          {!isUnlocked && !isPurchased && (
            <span className="px-3 py-1 bg-[#0F172A]/80 text-white text-[10px] uppercase font-bold tracking-wider rounded-full backdrop-blur-md flex items-center">
              <Lock className="w-3 h-3 mr-1" />
              Locked
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 text-left">
        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#d4a017] mb-2">{month}</p>
        <h3 className="text-2xl font-serif font-semibold text-[#0F172A] leading-tight mb-2 group-hover:text-[#d4a017] transition-colors uppercase">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6 italic">{description}</p>
        
        <button 
          onClick={() => {
            if (!(isUnlocked || isPurchased) && onUnlock) {
              onUnlock({ id, image, month, title, description, price, contentImages });
            }
          }}
          className={`w-full py-3.5 px-6 rounded font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 
          ${isUnlocked || isPurchased 
            ? 'bg-[#0F172A] text-white hover:bg-[#1E293B]' 
            : 'bg-[#d4a017] text-white hover:bg-[#b8860b] hover:shadow-lg hover:shadow-[#d4a017]/20'
          }`}>
          {isUnlocked || isPurchased ? 'Read Now' : `Unlock for LKR ${typeof price === 'number' ? price.toFixed(2) : price}`}
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
