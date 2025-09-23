import { News } from "@/types/news";
import Link from "next/link";
import Image from "next/image";
import { buildImageUrl } from "@/lib/api";

type RelatedPostsProps = {
  posts: News[];
};

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 border-t pt-8">Bài viết liên quan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const imageUrl = post.image?.url ? buildImageUrl(post.image.url) : null;
          return (
            <Link key={post.id} href={`/tin-tuc/${post.id}`} className="group">
              <div className="relative w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
                {imageUrl ? (
                  <Image src={imageUrl} alt={post.tieude} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}
              </div>
              <h3 className="mt-3 font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                {post.tieude}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}