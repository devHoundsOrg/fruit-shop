"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useCallback, useMemo } from "react";
import {
  recipes,
  categories,
  products,
  formatPriceKRW,
} from "../../../lib/data";
import { useShop } from "../../../lib/store";

export default function RecipeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addToCart, toggleLikeRecipe, state } = useShop();
  const { id } = use(params);
  const recipe = useMemo(() => recipes.find((r) => r.id === id) || null, [id]);
  if (!recipe) return <div>레시피를 찾을 수 없습니다.</div>;

  const ingredientCategories = categories.filter((c) =>
    recipe.ingredientCategoryIds.includes(c.id)
  );
  const suggestedProducts = ingredientCategories.map((c) => ({
    category: c,
    products: products.filter((p) => p.categoryId === c.id).slice(0, 4),
  }));

  const liked = state.likedRecipeIds.includes(recipe.id);

  const addAllToCart = useCallback(() => {
    suggestedProducts.forEach((group) => {
      const first = group.products[0];
      if (first) addToCart(first.id, 1);
    });
  }, [suggestedProducts, addToCart]);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("레시피 링크가 복사되었습니다.");
    } catch (_) {}
  }, []);

  return (
    <div style={{ display: "grid", gap: 32 }}>
      {/* breadcrumbs */}
      <div style={{ fontSize: 13, color: "#666" }}>
        <Link href="/" style={{ color: "inherit" }}>
          홈
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <Link href="/recipes" style={{ color: "inherit" }}>
          레시피
        </Link>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--foreground)", fontWeight: 600 }}>
          {recipe.title}
        </span>
      </div>

      {/* hero */}
      <div
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "1.1fr 0.9fr",
          alignItems: "start",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "3/2",
              background: "#f7f7f7",
              border: "1px solid var(--border)",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.3 }}>
            {recipe.title}
          </h1>
          <p style={{ lineHeight: 1.7, color: "#444" }}>{recipe.description}</p>
          {/* actions */}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => toggleLikeRecipe(recipe.id)}
              style={{
                padding: "10px 16px",
                background: liked ? "#fee2e2" : "#f3f4f6",
                color: liked ? "#b91c1c" : "#111",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {liked ? "찜 취소" : "찜하기"}
            </button>
            <button
              onClick={handleCopyLink}
              style={{
                padding: "10px 16px",
                background: "#f3f4f6",
                color: "#111",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              공유
            </button>
          </div>

          {/* ingredient categories as chips */}
          <div>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>
              필요 재료 카테고리
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ingredientCategories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius: 999,
                      background: "#f3f4f6",
                      border: "1px solid var(--border)",
                      fontSize: 13,
                    }}
                  >
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA add all */}
          <div>
            <button
              onClick={addAllToCart}
              style={{
                padding: "12px 18px",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: 10,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              추천 재료 모두 담기
            </button>
          </div>
        </div>
      </div>

      {/* suggested products by category */}
      <section style={{ display: "grid", gap: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>
          레시피에 어울리는 재료
        </h2>
        <div style={{ display: "grid", gap: 16 }}>
          {suggestedProducts.map((group) => (
            <div key={group.category.id} style={{ display: "grid", gap: 12 }}>
              <div style={{ fontWeight: 800 }}>{group.category.name}</div>
              <div
                style={{
                  display: "grid",
                  gap: 12,
                  gridTemplateColumns: "repeat(4, 1fr)",
                }}
              >
                {group.products.map((p) => {
                  const discounted = p.discountPercent
                    ? Math.round(p.price * (1 - p.discountPercent / 100))
                    : null;
                  return (
                    <div
                      key={p.id}
                      style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link
                        href={`/products/${p.id}`}
                        style={{ display: "block" }}
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
                      </Link>
                      <div style={{ padding: 12, display: "grid", gap: 6 }}>
                        <Link
                          href={`/products/${p.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div style={{ fontWeight: 700 }}>{p.name}</div>
                        </Link>
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "baseline",
                          }}
                        >
                          {discounted !== null ? (
                            <>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  color: "#999",
                                  fontSize: 13,
                                }}
                              >
                                {formatPriceKRW(p.price)}
                              </span>
                              <span style={{ fontWeight: 800 }}>
                                {formatPriceKRW(discounted)}
                              </span>
                            </>
                          ) : (
                            <span style={{ fontWeight: 800 }}>
                              {formatPriceKRW(p.price)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(p.id, 1)}
                          style={{
                            marginTop: 4,
                            padding: "10px 12px",
                            background: "#f3f4f6",
                            border: "1px solid var(--border)",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          담기
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
