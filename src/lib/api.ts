const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const apiUrl = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (API_BASE_URL) {
    return `${API_BASE_URL.replace(/\/$/, "")}${normalizedPath}`;
  }

  return normalizedPath;
};
