import axios from "axios";
export const api = axios.create({
  // Strapi v3 (không có /api prefix)
  baseURL: "http://cms.secnews.local",
});
