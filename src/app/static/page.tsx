import { client } from '@/libs/client';
import Link from "next/link";
import { getList } from "@/libs/microcms";

// データの型を定義する
interface Column {
  id: string;
  title: string;
  body: string;
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
          {item.eyecatch && <img src={item.eyecatch.url} alt={item.title} width={item.eyecatch.width} height={item.eyecatch.height} className='w-full h-full aspect-square object-cover' />}
          <h2 className='mt-2 font-bold'>{item.title}</h2>
          </Link>
        </li>
      ))}
      </ul>
    </main>
  );
}