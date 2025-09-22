import Image from "next/image";
import { buildImageUrl } from "@/lib/api";

type HeroProps = {
  title: string;
  description: string;
  image: string;
};

export default function Hero({ title, description, image }: HeroProps) {
  const src = buildImageUrl(image) || image;
  return (
    <section className="max-w-7xl mx-auto px-6 mt-6 grid md:grid-cols-2 gap-8">
      <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden">
        <Image src={src!} alt={title} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <a href="#" aria-label="Read more about the hero article" className="text-blue-600 font-semibold hover:underline">
          Read More \u2192
        </a>
      </div>
    </section>
  );
}
