type NewsItem = {
  id: number;
  title: string;
  date: string;
  category: string;
  image: string;
};

export default function NewsList({ items }: { items: NewsItem[] }) {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <div key={item.id} className="flex space-x-4">
          <img src={item.image} alt={item.title} className="w-32 h-20 object-cover rounded" />
          <div>
            <h3 className="font-bold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.date} · {item.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
