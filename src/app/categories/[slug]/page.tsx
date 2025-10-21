"use client";

import Link from "next/link";
import { use, useMemo } from "react";
import { findCategoryBySlug, products } from "../../../lib/data";
import ProductCard from "../../../components/ProductCard";

export default function CategoryDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const category = findCategoryBySlug(slug);
  if (!category) return <div>카테고리를 찾을 수 없습니다.</div>;
  const list = useMemo(
    () => products.filter((p) => p.categoryId === category.id),
    [category.id]
  );
  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* breadcrumbs */}
      <div style={{ fontSize: 13, color: "#666" }}>
        <Link href="/" style={{ color: "inherit" }}>
          홈
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <Link href="/categories" style={{ color: "inherit" }}>
          카테고리
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
          {category.name}
        </span>
      </div>

      {/* header / hero */}
      <div
        style={{
          display: "grid",
          gap: 12,
          padding: 20,
          border: "1px solid var(--border)",
          borderRadius: 12,
          background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>{category.name}</h1>
        <div style={{ color: "#666" }}>
          신선한 {category.name} 상품을 만나보세요. 총 {list.length}개 상품.
        </div>

        {/* sort/filter bar (static UI) */}
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}
        >
          <button
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            인기순
          </button>
          <button
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            낮은 가격순
          </button>
          <button
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            높은 가격순
          </button>
          <button
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            할인 상품
          </button>
        </div>
      </div>

      {/* product grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
        }}
      >
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
