import Image from "next/image";
import Link from "next/link";

type HeroProps = {
  title: string;
  description: string;
  image: string | null;
  link: string;
};

export default function Hero({ title, description, image, link }: HeroProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 mt-6 grid md:grid-cols-2 gap-8">
      <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <Link href={link} aria-label="Read more about the hero article" className="text-blue-600 font-semibold hover:underline">
          Read More \u2192
        </Link>
      </div>
    </section>
  );
}
