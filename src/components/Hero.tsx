type HeroProps = {
  title: string;
  description: string;
  image: string;
};

export default function Hero({ title, description, image }: HeroProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 mt-6 grid md:grid-cols-2 gap-8">
      <img src={image} alt={title} className="rounded-lg w-full h-80 object-cover" />
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <a href="#" className="text-blue-600 font-semibold hover:underline">
          Read More →
        </a>
      </div>
    </section>
  );
}
