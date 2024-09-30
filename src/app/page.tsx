import { client } from '@/libs/client';
import Link from "next/link";
import Image from "next/image";

// データの型を定義する
interface Eyecatch {
  url: string;
  width: number;
  height: number;
}

interface Column {
  id: string;
  title: string;
  eyecatch?: Eyecatch;
  content: string;
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
              {/* eyecatch配列の最初の画像を表示 */}
              {item.eyecatch.length > 0 && (
                <Image
                  src={item.eyecatch[url]} // 配列の最初の画像のURLを取得
                  alt={item.title}
                  width={item.eyecatch[0].width} // 幅
                  height={item.eyecatch[0].height} // 高さ
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
