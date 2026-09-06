export default function Loading() {
  return (
    <main className="page-shell shop-shell">
      <section className="home-hero shop-hero">
        <div className="skeleton eyebrow" />
        <div className="skeleton title" />
        <div className="skeleton line" />
        <div className="skeleton line short" />
      </section>

      <section className="shop-tabs">
        <div className="skeleton tab" />
        <div className="skeleton tab" />
        <div className="skeleton tab active" />
      </section>

      <section className="panel">
        <div className="panel-head">
          <div className="skeleton title small" />
          <div className="skeleton line" />
        </div>
        <div className="marketplace-skeleton-grid">
          <div className="skeleton card" />
          <div className="skeleton card" />
          <div className="skeleton card" />
        </div>
      </section>
    </main>
  );
}
