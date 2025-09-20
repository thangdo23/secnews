export interface News {
  id: number;
  tieude: string;
  noidung: string;
  author: string;
  published_at: string;
  image?: { url: string };
}
