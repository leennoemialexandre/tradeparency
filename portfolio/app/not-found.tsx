import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-intro">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1 className="display-l">That page timed out.</h1>
        <p className="lede">Like a five-second turn in Concentration 64. Try one of these instead.</p>
        <p style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <Link className="btn" href="/">
            Home
          </Link>
          <Link className="btn btn--light" href="/work">
            All work
          </Link>
        </p>
      </div>
    </section>
  );
}
