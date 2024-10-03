// src/app/static/[[postId]]/page.tsx
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { client } from "@/libs/client";
import Image from 'next/image';

// 静的パスを生成する
export async function generateStaticParams() {
  const { contents } = await client.get<{ contents: { id: string }[] }>({ endpoint: "column" });

  // 各投稿のIDを静的パスとして指定
  const paths = contents.map((column) => {
    return {
      postId: column.id,
    };
  });

  return [...paths];
}

export default async function StaticDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  // 投稿の詳細データを取得
  const post = await client.get({ endpoint: `column/${postId}` });

  // 投稿が見つからない場合、404を表示
  if (!post) {
    notFound();
  }

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {post.eyecatch && (
      <Image
      src={post.eyecatch.url} 
      alt={post.title} 
      width={post.eyecatch.width || 500} // デフォルトの幅
      height={post.eyecatch.height || 500} // デフォルトの高さ
      className='w-full h-full aspect-square object-cover' 
      />
      )}
      <h2 className="text-gray-500">{time}</h2>
      <div className="mt-4">{parse(post.content)}</div>
    </div>
  );
}
