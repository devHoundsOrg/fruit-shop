import { Category, Product, Recipe, Order } from "./types";

export const categories: Category[] = [
  { id: "fruit", name: "과일", slug: "fruit" },
  { id: "vegetable", name: "채소", slug: "vegetable" },
  { id: "grain", name: "곡물", slug: "grain" },
  { id: "dairy", name: "유제품", slug: "dairy" },
];

export const products: Product[] = [
  {
    id: "apple-1",
    name: "사과",
    description: "아삭하고 달콤한 제철 사과",
    price: 2900,
    imageUrl:
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop",
    categoryId: "fruit",
    discountPercent: 10,
  },
  {
    id: "banana-1",
    name: "바나나",
    description: "달콤한 바나나 한 송이",
    price: 3500,
    imageUrl:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    categoryId: "fruit",
  },
  {
    id: "spinach-1",
    name: "시금치",
    description: "신선한 녹색 채소",
    price: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    categoryId: "vegetable",
  },
  {
    id: "milk-1",
    name: "우유 1L",
    description: "산지 직송 신선 우유",
    price: 2100,
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    categoryId: "dairy",
    discountPercent: 15,
  },
  {
    id: "rice-1",
    name: "쌀 1kg",
    description: "고슬고슬 맛있는 쌀",
    price: 5500,
    imageUrl:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    categoryId: "grain",
  },
];

export const recipes: Recipe[] = [
  {
    id: "salad-1",
    title: "상큼 샐러드",
    description: "과일과 채소로 만드는 상큼한 샐러드",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    ingredientCategoryIds: ["fruit", "vegetable"],
  },
  {
    id: "banana-milk-1",
    title: "바나나 밀크",
    description: "바나나와 우유로 만드는 간단 음료",
    imageUrl:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=600&h=400&fit=crop",
    ingredientCategoryIds: ["fruit", "dairy"],
  },
];

export const initialOrders: Order[] = [
  {
    id: "order-1001",
    items: [
      { productId: "apple-1", quantity: 2, unitPrice: 2900 },
      { productId: "rice-1", quantity: 1, unitPrice: 5500 },
    ],
    totalCents: 2900 * 2 + 5500,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    status: "delivered",
  },
];

export function findCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug) || null;
}

export function formatPriceKRW(cents: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(cents);
}
