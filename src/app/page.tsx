import Link from "next/link";
import { products, categories, recipes } from "../lib/data";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div style={{ display: "grid", gap: 48 }}>
      {/* Hero Section */}
      <section
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          borderRadius: 16,
          padding: "64px 48px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 42, fontWeight: 800, marginBottom: 16 }}>
          신선한 농산물을 직접 만나보세요
        </h1>
        <p style={{ fontSize: 18, opacity: 0.95, marginBottom: 32 }}>
          농가에서 직송되는 신선하고 건강한 먹거리
        </p>
        <Link
          href="/products"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "#fff",
            color: "var(--primary)",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          상품 둘러보기 →
        </Link>
      </section>

      {/* Categories */}
      <section>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
          카테고리
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categories/${c.slug}`}
              style={{
                padding: 24,
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 12,
                textAlign: "center",
                fontWeight: 600,
                fontSize: 16,
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>추천 상품</h2>
          <Link
            href="/products"
            style={{ color: "var(--primary)", fontWeight: 600 }}
          >
            전체보기 →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 24,
          }}
        >
          {featuredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Recipes */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>추천 레시피</h2>
          <Link
            href="/recipes"
            style={{ color: "var(--primary)", fontWeight: 600 }}
          >
            전체보기 →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {recipes.map((r) => (
            <Link
              key={r.id}
              href={`/recipes/${r.id}`}
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16/9",
                  background: "#f9f9f9",
                }}
              >
                <img
                  src={r.imageUrl}
                  alt={r.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 14, color: "#666" }}>
                  {r.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
