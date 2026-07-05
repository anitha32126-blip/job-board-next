import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">
        Job Board
      </h1>

      <p className="text-gray-500">
        Find your dream job.
      </p>

      <div className="flex gap-4">
        <Link
          href="/jobs"
          className="border px-6 py-3 rounded"
        >
          View Jobs
        </Link>

        <Link
          href="/login"
          className="border px-6 py-3 rounded"
        >
          Login
        </Link>
      </div>
    </main>
  );
}