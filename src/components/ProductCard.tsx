"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../lib/types";
import { useShop } from "../lib/store";
import { formatPriceKRW } from "../lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();

  const discounted = product.discountPercent
    ? Math.round(product.price * (1 - product.discountPercent / 100))
    : null;

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "var(--shadow-sm)",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-sm)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <Link href={`/products/${product.id}`} style={{ display: "block" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1/1",
            background: "#f9f9f9",
          }}
        >
          {product.discountPercent && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "#ef4444",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 700,
                zIndex: 1,
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
      </Link>
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          flex: 1,
        }}
      >
        <Link href={`/products/${product.id}`}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--foreground)",
            }}
          >
            {product.name}
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#666",
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            {product.description}
          </div>
        </Link>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "baseline",
            marginTop: "auto",
            paddingTop: 8,
          }}
        >
          {discounted !== null ? (
            <>
              <span
                style={{
                  fontSize: 14,
                  textDecoration: "line-through",
                  color: "#999",
                }}
              >
                {formatPriceKRW(product.price)}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--foreground)",
                }}
              >
                {formatPriceKRW(discounted)}
              </span>
            </>
          ) : (
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--foreground)",
              }}
            >
              {formatPriceKRW(product.price)}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product.id, 1)}
          style={{
            marginTop: 8,
            padding: "12px",
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          장바구니 담기
        </button>
      </div>
    </div>
  );
}
