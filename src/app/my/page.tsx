"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useShop } from "../../lib/store";
import { products, recipes, formatPriceKRW } from "../../lib/data";

export default function MyPage() {
  const { state, logout } = useShop();
  const user = state.user;

  const recentProducts = useMemo(
    () =>
      state.recentlyViewedProductIds
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean),
    [state.recentlyViewedProductIds]
  );
  const likedRecipes = useMemo(
    () =>
      state.likedRecipeIds
        .map((id) => recipes.find((r) => r.id === id))
        .filter(Boolean),
    [state.likedRecipeIds]
  );

  if (!user)
    return (
      <div>
        로그인 해주세요. <Link href="/auth/login">로그인</Link>
      </div>
    );

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: 22 }}>마이페이지</h1>
        <button
          onClick={logout}
          style={{
            padding: "8px 14px",
            border: "1px solid #ccc",
            borderRadius: 4,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>내 정보</h2>
        <div>이름: {user.name}</div>
        <div>이메일: {user.email}</div>
        {user.address && <div>주소: {user.address}</div>}
        {user.phone && <div>연락처: {user.phone}</div>}
      </section>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>주문내역</h2>
        <div style={{ display: "grid", gap: 8 }}>
          {state.orders.map((o) => (
            <div
              key={o.id}
              style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>주문번호: {o.id}</div>
                <div>상태: {o.status}</div>
              </div>
              <ul style={{ marginTop: 8 }}>
                {o.items.map((it) => {
                  const p = products.find((pp) => pp.id === it.productId)!;
                  return (
                    <li key={it.productId}>
                      {p.name} x {it.quantity} —{" "}
                      {formatPriceKRW(it.unitPrice * it.quantity)}
                    </li>
                  );
                })}
              </ul>
              <div style={{ textAlign: "right", fontWeight: 700 }}>
                총액: {formatPriceKRW(o.totalCents)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>최근 본 상품</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {recentProducts.length === 0 ? (
            <div>최근 본 상품이 없습니다.</div>
          ) : (
            recentProducts.map((p: any) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                {p.name}
              </Link>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>찜한 레시피</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {likedRecipes.length === 0 ? (
            <div>찜한 레시피가 없습니다.</div>
          ) : (
            likedRecipes.map((r: any) => (
              <Link
                key={r.id}
                href={`/recipes/${r.id}`}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                {r.title}
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
