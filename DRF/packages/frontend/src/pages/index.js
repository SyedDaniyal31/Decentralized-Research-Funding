import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>Decentralized Research Funding</title>
      </Head>
      <main className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold mb-4 text-primary">Decentralized Research Funding Platform</h1>
        <p className="mb-8 text-lg text-dark">
          Empowering researchers and investors through transparent, milestone-based funding. Submit proposals, vote, and track progress on-chain.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard/researcher" className="btn btn-primary">Researcher Dashboard</Link>
          <Link href="/dashboard/investor" className="btn btn-accent">Investor Dashboard</Link>
          <Link href="/dashboard/admin" className="btn btn-secondary">Admin Dashboard</Link>
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-2">Featured Proposals</h2>
          {/* Proposal showcase here */}
        </section>
      </main>
    </div>
  );
}
