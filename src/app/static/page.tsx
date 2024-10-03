import { client } from '@/libs/client';
import Link from "next/link";
import Image from 'next/image';

// アイキャッチ画像の型を定義
interface Eyecatch {
  url: string;        // 画像のURL
  width?: number;     // 画像の幅（オプショナル）
  height?: number;    // 画像の高さ（オプショナル）
}

// データの型を定義
interface Column {
  id: string;        // ID
  title: string;     // タイトル
  content: string;   // 内容
  eyecatch?: Eyecatch; // アイキャッチ（オプショナル）
  category: string;  // カテゴリ
}

export default async function Page() {
  // データをフェッチ
  const data = await client.get<{ contents: Column[] }>({ endpoint: "column" });

  return (
    <main className='p-4 bg-zinc-400'>
      <h1 className='text-center font-bold text-2xl'>簡易ブログ</h1>

      <ul className='max-w-[1024px] w-full flex flex-row justify-between align-top mt-20 ml-auto mr-auto'>
        {data.contents.map((item: Column) => (
          <li key={item.id} className='w-1/2 md:w-1/4 p-2 bg-slate-50'>
            <Link href={`/static/${item.id}`} className='w-full h-96'>
              {item.eyecatch && (
                <Image
                src={item.eyecatch.url} 
                alt={item.title} 
                width={item.eyecatch.width || 500} // デフォルトの幅
                height={item.eyecatch.height || 500} // デフォルトの高さ
                className='w-full h-full aspect-square object-cover' 
                />
              )}
              <h2 className='mt-2 font-bold'>{item.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
