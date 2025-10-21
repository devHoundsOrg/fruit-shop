import Link from "next/link";
import { categories } from "../../lib/data";

export default function CategoriesPage() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* breadcrumbs */}
      <div style={{ fontSize: 13, color: "#666" }}>
        <Link href="/" style={{ color: "inherit" }}>
          홈
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
          카테고리
        </span>
      </div>

      {/* header */}
      <div style={{ display: "grid", gap: 8 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>카테고리</h1>
        <div style={{ color: "#666" }}>원하는 식재료 유형을 선택하세요.</div>
      </div>

      {/* categories grid */}
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/categories/${c.slug}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 16,
              display: "grid",
              gap: 8,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 18 }}>{c.name}</div>
            <div style={{ color: "#666", fontSize: 13 }}>#{c.slug}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
