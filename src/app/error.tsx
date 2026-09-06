"use client";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-shell shop-shell">
      <section className="panel status-panel">
        <div className="panel-head">
          <h2>Something went wrong</h2>
          <p>{error.message}</p>
        </div>
        <button type="button" className="primary-btn" onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
