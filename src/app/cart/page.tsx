"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useShop } from "../../lib/store";
import { products, formatPriceKRW } from "../../lib/data";

export default function CartPage() {
  const { state, setCartQty, removeFromCart } = useShop();

  const items = useMemo(() => {
    return Object.entries(state.cart).map(([productId, qty]) => {
      const product = products.find((p) => p.id === productId)!;
      const price = product.discountPercent
        ? Math.round(product.price * (1 - product.discountPercent / 100))
        : product.price;
      return { product, qty, price };
    });
  }, [state.cart]);

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 22 }}>장바구니</h1>
      {items.length === 0 ? (
        <div>
          장바구니가 비어있습니다. <Link href="/products">상품 보러가기</Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {items.map(({ product, qty, price }) => (
            <div
              key={product.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto auto auto",
                alignItems: "center",
                gap: 12,
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
              }}
            >
              <div style={{ fontWeight: 600 }}>{product.name}</div>
              <div>{formatPriceKRW(price)}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() =>
                    setCartQty(product.id, Math.max(0, Number(qty) - 1))
                  }
                  style={{
                    padding: "4px 12px",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  -
                </button>
                <input
                  value={qty}
                  onChange={(e) =>
                    setCartQty(
                      product.id,
                      Math.max(0, Number(e.target.value) || 0)
                    )
                  }
                  style={{
                    width: 48,
                    textAlign: "center",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: 4,
                  }}
                />
                <button
                  onClick={() => setCartQty(product.id, Number(qty) + 1)}
                  style={{
                    padding: "4px 12px",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                style={{
                  color: "#ff6b6b",
                  padding: "4px 12px",
                  border: "1px solid #ff6b6b",
                  borderRadius: 4,
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                삭제
              </button>
            </div>
          ))}
          <div style={{ textAlign: "right", fontSize: 18, fontWeight: 700 }}>
            합계: {formatPriceKRW(subtotal)}
          </div>
          <button
            disabled
            style={{
              padding: "10px 14px",
              borderRadius: 6,
              background: "#ddd",
              border: "1px solid #ccc",
              cursor: "not-allowed",
            }}
          >
            결제 연동은 스킵 (프로토타입)
          </button>
        </div>
      )}
    </div>
  );
}
