import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-[radial-gradient(130%_130%_at_76%_-22%,#164081,#0a1e42_56%,#060f22)] px-8 py-32 text-center">
      <div className="mx-auto max-w-[620px]">
        <div className="mb-5 text-[12.5px]/[1] font-bold uppercase tracking-[0.3em] text-blue-300">
          404
        </div>
        <h1 className="font-display m-0 mb-5 text-[clamp(30px,5vw,44px)]/[1.1] font-extrabold tracking-[-0.02em] text-white">
          We couldn&apos;t find that page.
        </h1>
        <p className="mx-auto mb-9 max-w-[460px] text-[16px]/[1.7] text-white/78">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-gold">
            Back to home
          </Link>
          <Link href="/publications" className="btn-outline">
            Browse publications
          </Link>
        </div>
      </div>
    </section>
  );
}
