"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useMemo, useState, useCallback } from "react";
import { products, formatPriceKRW, categories } from "../../../lib/data";
import { useShop } from "../../../lib/store";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { state, addToCart, viewProduct } = useShop();
  const { id } = use(params);
  const product = useMemo(
    () => products.find((p) => p.id === id) || null,
    [id]
  );

  // track view to recently viewed list
  useEffect(() => {
    if (product) {
      viewProduct(product.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const discounted = product.discountPercent
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : null;
  const category = categories.find((c) => c.id === product.categoryId);

  const related = useMemo(
    () =>
      products
        .filter(
          (p) => p.categoryId === product.categoryId && p.id !== product.id
        )
        .slice(0, 8),
    [product.categoryId, product.id]
  );

  const recentlyViewed = useMemo(
    () =>
      state.recentlyViewedProductIds
        .filter((pid) => pid !== product.id)
        .map((pid) => products.find((p) => p.id === pid))
        .filter(Boolean)
        .slice(0, 8) as typeof products,
    [state.recentlyViewedProductIds, product.id]
  );

  const [quantity, setQuantity] = useState<number>(1);

  const increment = useCallback(
    () => setQuantity((q) => Math.min(99, q + 1)),
    []
  );
  const decrement = useCallback(
    () => setQuantity((q) => Math.max(1, q - 1)),
    []
  );
  const onQtyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseInt(e.target.value || "1", 10);
    if (Number.isNaN(next)) return;
    setQuantity(Math.max(1, Math.min(99, next)));
  }, []);

  const handleAddToCart = useCallback(() => {
    addToCart(product.id, quantity);
  }, [addToCart, product.id, quantity]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // best-effort affordance
      alert("상품 링크가 복사되었습니다.");
    } catch (_) {
      // ignore
    }
  }, []);

  return (
    <div style={{ display: "grid", gap: 32 }}>
      {/* breadcrumbs */}
      <div style={{ fontSize: 13, color: "#666" }}>
        <Link href="/" style={{ color: "inherit" }}>
          홈
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        {category ? (
          <Link
            href={`/categories/${category.slug}`}
            style={{ color: "inherit" }}
          >
            {category.name}
          </Link>
        ) : (
          <span>카테고리</span>
        )}
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
          {product.name}
        </span>
      </div>

      {/* main product area */}
      <div
        style={{
          display: "grid",
          gap: 32,
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "start",
        }}
      >
        {/* image gallery (single image styled like gallery) */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1/1",
              background: "#f7f7f7",
              border: "1px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            {product.discountPercent && (
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  background: "#ef4444",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 13,
                  zIndex: 2,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {product.discountPercent}% 할인
              </div>
            )}
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* thumbnails placeholder for future multi-image support */}
          <div
            style={{
              display: "grid",
              gap: 8,
              gridTemplateColumns: "repeat(6, 1fr)",
              marginTop: 12,
            }}
          >
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1/1",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  background: "#fafafa",
                }}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover", opacity: 0.7 }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* right column: title, price, actions */}
        <div style={{ display: "grid", gap: 16 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.3 }}>
            {product.name}
          </h1>
          <div style={{ color: "#666" }}>{category?.name}</div>

          {/* price block */}
          <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
            {discounted !== null ? (
              <>
                <span
                  style={{ color: "#ef4444", fontWeight: 800, fontSize: 20 }}
                >
                  {product.discountPercent}%
                </span>
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#999",
                    fontSize: 14,
                  }}
                >
                  {formatPriceKRW(product.price)}
                </span>
                <span style={{ fontWeight: 800, fontSize: 24 }}>
                  {formatPriceKRW(discounted)}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: 800, fontSize: 24 }}>
                {formatPriceKRW(product.price)}
              </span>
            )}
          </div>

          {/* short description */}
          <p
            style={{
              lineHeight: 1.7,
              color: "#444",
              background: "var(--card-bg)",
              padding: 16,
              border: "1px solid var(--border)",
              borderRadius: 12,
            }}
          >
            {product.description}
          </p>

          {/* quantity + actions */}
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  overflow: "hidden",
                  height: 44,
                }}
              >
                <button
                  onClick={decrement}
                  aria-label="decrease"
                  style={{
                    width: 44,
                    height: 44,
                    background: "#f3f4f6",
                    border: "none",
                    fontSize: 18,
                  }}
                >
                  -
                </button>
                <input
                  value={quantity}
                  onChange={onQtyChange}
                  inputMode="numeric"
                  style={{
                    width: 64,
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    fontSize: 16,
                  }}
                />
                <button
                  onClick={increment}
                  aria-label="increase"
                  style={{
                    width: 44,
                    height: 44,
                    background: "#f3f4f6",
                    border: "none",
                    fontSize: 18,
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                style={{
                  padding: "12px 18px",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                장바구니 담기
              </button>
              <button
                onClick={handleCopyLink}
                style={{
                  padding: "12px 14px",
                  background: "#f3f4f6",
                  color: "#111",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                공유
              </button>
            </div>
          </div>

          {/* accordions */}
          <div style={{ display: "grid", gap: 8, marginTop: 8 }}>
            <details
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 12,
                background: "var(--card-bg)",
              }}
              open
            >
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>
                상세 설명
              </summary>
              <div style={{ marginTop: 8, color: "#444", lineHeight: 1.8 }}>
                산지 직송으로 신선도를 유지한 상품입니다. 최적의 온도에서
                보관/배송되며, 실제 색상과 모양은 자연물 특성상 차이가 있을 수
                있습니다.
              </div>
            </details>
            <details
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 12,
                background: "var(--card-bg)",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>
                배송/교환/환불 안내
              </summary>
              <div style={{ marginTop: 8, color: "#444", lineHeight: 1.8 }}>
                냉장/상온 상품에 따라 분리 배송될 수 있습니다. 상품 불량/파손 시
                사진과 함께 문의해 주세요. 단순 변심은 수령 후 7일 이내 미개봉
                상품에 한해 가능하며 왕복 배송비가 발생할 수 있습니다.
              </div>
            </details>
            <details
              style={{
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 12,
                background: "var(--card-bg)",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 700 }}>
                원재료 / 영양정보
              </summary>
              <div style={{ marginTop: 8, color: "#444", lineHeight: 1.8 }}>
                1회 제공량 100g 기준 에너지 52kcal (예시). 실제 수치는 상품에
                따라 상이할 수 있습니다.
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* related products */}
      {related.length > 0 && (
        <section style={{ display: "grid", gap: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>함께 보면 좋은 상품</h2>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                style={{
                  display: "grid",
                  gap: 8,
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "var(--card-bg)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1/1",
                    background: "#fafafa",
                  }}
                >
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    {p.name}
                  </div>
                  <div style={{ color: "#444" }}>
                    {formatPriceKRW(
                      p.discountPercent
                        ? Math.round(p.price * (1 - p.discountPercent / 100))
                        : p.price
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* recently viewed */}
      {recentlyViewed.length > 0 && (
        <section style={{ display: "grid", gap: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800 }}>최근 본 상품</h2>
          <div
            style={{
              display: "grid",
              gap: 16,
              gridTemplateColumns: "repeat(6, 1fr)",
            }}
          >
            {recentlyViewed.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                style={{
                  display: "grid",
                  gap: 8,
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "var(--card-bg)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1/1",
                    background: "#fafafa",
                  }}
                >
                  <Image
                    src={p.imageUrl}
                    alt={p.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    {p.name}
                  </div>
                  <div style={{ color: "#444" }}>
                    {formatPriceKRW(
                      p.discountPercent
                        ? Math.round(p.price * (1 - p.discountPercent / 100))
                        : p.price
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
