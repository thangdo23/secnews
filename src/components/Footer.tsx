export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} SecNews</div>
          <div>Privacy · Terms</div>
        </div>
      </div>
    </footer>
  );
}
