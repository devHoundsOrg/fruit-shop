"use client";

import { useMemo, useState } from "react";
import { categories, products } from "../../lib/data";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const filtered = useMemo(() => {
    const bySearch = products.filter((p) =>
      [p.name, p.description].join(" ").toLowerCase().includes(q.toLowerCase())
    );
    const byCat =
      cat === "all" ? bySearch : bySearch.filter((p) => p.categoryId === cat);
    return byCat;
  }, [q, cat]);

  return (
    <div style={{ display: "grid", gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          전체 상품
        </h1>
        <p style={{ color: "#666", fontSize: 15 }}>
          신선한 농산물을 만나보세요
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          background: "#fff",
          padding: 16,
          borderRadius: 12,
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <input
          placeholder="🔍 상품 검색..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            fontSize: 15,
          }}
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            fontSize: 15,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          <option value="all">전체 카테고리</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 24,
        }}
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
