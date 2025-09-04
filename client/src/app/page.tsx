import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <main>
        <h1>AccountHub</h1>
        <Link href='5555555555' className='hover:underline'>
          555-555-5555
        </Link>
      </main>
    </div>
  );
}
