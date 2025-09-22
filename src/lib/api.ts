import axios from "axios";
// Ưu tiên dùng biến môi trường khi deploy K8s (NEXT_PUBLIC_API_URL),
// fallback về domain bạn đang dùng ở on-prem
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://cms.secnews.local";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});