// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // file này có thể rỗng; nếu chưa có thì tạo ở bước 2

export const metadata: Metadata = {
  title: "SecNews",
  description: "Tin tức & kiến thức bảo mật",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-white antialiased">
        {children}
      </body>
    </html>
  );
}

