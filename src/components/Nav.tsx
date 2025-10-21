"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useShop } from "../lib/store";

export default function Nav() {
  const { state } = useShop();
  const cartCount = useMemo(
    () => Object.values(state.cart).reduce((sum, qty) => sum + qty, 0),
    [state.cart]
  );

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        background: "#fff",
        borderBottom: "1px solid var(--border)",
        zIndex: 100,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px 24px",
        }}
      >
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <Link
            href="/"
            style={{ fontSize: 20, fontWeight: 700, color: "var(--primary)" }}
          >
            🥬 FreshMart
          </Link>
          <div style={{ display: "flex", gap: 24, fontSize: 15 }}>
            <Link href="/products">상품</Link>
            <Link href="/categories">카테고리</Link>
            <Link href="/recipes">레시피</Link>
            <Link href="/vendor/onboarding">농가 입점</Link>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            fontSize: 15,
          }}
        >
          <Link href="/cart" style={{ fontWeight: 500 }}>
            🛒 장바구니 {cartCount > 0 && `(${cartCount})`}
          </Link>
          {state.user ? (
            <Link href="/my" style={{ fontWeight: 500 }}>
              👤 {state.user.name}
            </Link>
          ) : (
            <>
              <Link href="/auth/login">로그인</Link>
              <Link
                href="/auth/signup"
                style={{
                  padding: "8px 16px",
                  background: "var(--primary)",
                  color: "#fff",
                  borderRadius: 6,
                  fontWeight: 500,
                }}
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
