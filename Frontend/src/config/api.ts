export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const API_URL = `${API_BASE_URL}/api`;

export const getImageUrl = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  // Ensure forward slashes for URLs and remove any leading slash from path if present
  const cleanPath = path.replace(/\\/g, "/").replace(/^\//, "");
  return `${API_BASE_URL}/${cleanPath}`;
};
