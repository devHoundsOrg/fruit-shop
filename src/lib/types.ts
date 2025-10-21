export type ProductId = string;
export type CategoryId = string;
export type RecipeId = string;
export type InquiryId = string;
export type OrderId = string;

export type Category = {
  id: CategoryId;
  name: string;
  slug: string;
};

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  price: number; // cents
  imageUrl: string;
  categoryId: CategoryId;
  discountPercent?: number; // 0-100
};

export type Recipe = {
  id: RecipeId;
  title: string;
  description: string;
  imageUrl: string;
  ingredientCategoryIds: CategoryId[];
};

export type CartItem = {
  productId: ProductId;
  quantity: number;
};

export type User = {
  id: string;
  email: string;
  name: string;
  address?: string;
  phone?: string;
} | null;

export type InquiryStatus = "new" | "in_review" | "approved" | "rejected";

export type VendorInquiry = {
  id: InquiryId;
  farmName: string;
  representative: string;
  contact: string;
  mainProducts: string;
  farmAddress: string;
  status: InquiryStatus;
  notes: string[];
  createdAt: number;
};

export type OrderItem = {
  productId: ProductId;
  quantity: number;
  unitPrice: number; // snapshot at purchase
};

export type Order = {
  id: OrderId;
  items: OrderItem[];
  totalCents: number;
  createdAt: number;
  status: "preparing" | "shipped" | "delivered";
};




