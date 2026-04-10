export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  isPremium: boolean;
}

export interface ContentImage {
  id: number;
  url: string;
}

export interface Issue {
  id: string | number;
  title: string;
  description: string;
  month: string;
  year: string;
  imageUrl: string;
  pdfUrl: string;
  price: number;
  isPurchased?: boolean;
  isFavorite?: boolean;
  contentImages?: ContentImage[];
}

export interface IssueCardProps {
  id?: string | number;
  image?: string;
  month?: string;
  title?: string;
  description?: string;
  isUnlocked?: boolean;
  price?: string | number;
  isPurchased?: boolean;
  isFavorite?: boolean;
  onUnlock?: (issue: Issue) => void;
  onRead?: (issue: Issue) => void;
  onToggleFavorite?: (id: string | number, currentStatus: boolean) => void;
  contentImages?: ContentImage[];
}
