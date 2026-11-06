import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ZenithTech | Money tools for ambitious businesses</title>
        <meta
          name="description"
          content="ZenithTech helps businesses take payments, manage billing and move money."
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-6 text-center">
        <p className="text-sm font-medium tracking-widest text-indigo-600 uppercase">
          Step 1 · Initialization
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900">ZenithTech</h1>
        <p className="max-w-xl text-lg text-slate-600">
          Payments, billing and money movement for businesses that mean to grow. Coming soon.
        </p>
      </main>
    </>
  );
}
