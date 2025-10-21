"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import { CartItem, Order, User, VendorInquiry, InquiryStatus } from "./types";
import { initialOrders } from "./data";

type State = {
  user: User;
  cart: Record<string, number>; // productId -> qty
  likedRecipeIds: string[];
  recentlyViewedProductIds: string[];
  orders: Order[];
  inquiries: VendorInquiry[];
};

type Action =
  | { type: "LOGIN"; user: NonNullable<User> }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; partial: Partial<NonNullable<User>> }
  | { type: "ADD_TO_CART"; productId: string; quantity?: number }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "SET_QTY"; productId: string; quantity: number }
  | { type: "VIEW_PRODUCT"; productId: string }
  | { type: "TOGGLE_LIKE_RECIPE"; recipeId: string }
  | { type: "ADD_INQUIRY"; inquiry: VendorInquiry }
  | { type: "SET_INQUIRY_STATUS"; inquiryId: string; status: InquiryStatus }
  | { type: "ADD_INQUIRY_NOTE"; inquiryId: string; note: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user };
    case "LOGOUT":
      return { ...state, user: null };
    case "UPDATE_PROFILE":
      return state.user
        ? { ...state, user: { ...state.user, ...action.partial } }
        : state;
    case "ADD_TO_CART": {
      const prev = state.cart[action.productId] || 0;
      const qty = prev + (action.quantity ?? 1);
      return { ...state, cart: { ...state.cart, [action.productId]: qty } };
    }
    case "REMOVE_FROM_CART": {
      const next = { ...state.cart };
      delete next[action.productId];
      return { ...state, cart: next };
    }
    case "SET_QTY": {
      const qty = Math.max(0, action.quantity);
      const next = { ...state.cart };
      if (qty === 0) delete next[action.productId];
      else next[action.productId] = qty;
      return { ...state, cart: next };
    }
    case "VIEW_PRODUCT": {
      const list = state.recentlyViewedProductIds.filter(
        (id) => id !== action.productId
      );
      list.unshift(action.productId);
      return { ...state, recentlyViewedProductIds: list.slice(0, 12) };
    }
    case "TOGGLE_LIKE_RECIPE": {
      const liked = state.likedRecipeIds.includes(action.recipeId)
        ? state.likedRecipeIds.filter((id) => id !== action.recipeId)
        : [action.recipeId, ...state.likedRecipeIds];
      return { ...state, likedRecipeIds: liked };
    }
    case "ADD_INQUIRY":
      return { ...state, inquiries: [action.inquiry, ...state.inquiries] };
    case "SET_INQUIRY_STATUS":
      return {
        ...state,
        inquiries: state.inquiries.map((q) =>
          q.id === action.inquiryId ? { ...q, status: action.status } : q
        ),
      };
    case "ADD_INQUIRY_NOTE":
      return {
        ...state,
        inquiries: state.inquiries.map((q) =>
          q.id === action.inquiryId
            ? { ...q, notes: [action.note, ...q.notes] }
            : q
        ),
      };
    default:
      return state;
  }
}

const initialState: State = {
  user: null,
  cart: {},
  likedRecipeIds: [],
  recentlyViewedProductIds: [],
  orders: initialOrders,
  inquiries: [],
};

type ShopContextValue = {
  state: State;
  login: (user: NonNullable<User>) => void;
  logout: () => void;
  updateProfile: (partial: Partial<NonNullable<User>>) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  setCartQty: (productId: string, quantity: number) => void;
  viewProduct: (productId: string) => void;
  toggleLikeRecipe: (recipeId: string) => void;
  addInquiry: (inquiry: VendorInquiry) => void;
  setInquiryStatus: (inquiryId: string, status: InquiryStatus) => void;
  addInquiryNote: (inquiryId: string, note: string) => void;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<ShopContextValue>(
    () => ({
      state,
      login: (user) => dispatch({ type: "LOGIN", user }),
      logout: () => dispatch({ type: "LOGOUT" }),
      updateProfile: (partial) => dispatch({ type: "UPDATE_PROFILE", partial }),
      addToCart: (productId, quantity) =>
        dispatch({ type: "ADD_TO_CART", productId, quantity }),
      removeFromCart: (productId) =>
        dispatch({ type: "REMOVE_FROM_CART", productId }),
      setCartQty: (productId, quantity) =>
        dispatch({ type: "SET_QTY", productId, quantity }),
      viewProduct: (productId) => dispatch({ type: "VIEW_PRODUCT", productId }),
      toggleLikeRecipe: (recipeId) =>
        dispatch({ type: "TOGGLE_LIKE_RECIPE", recipeId }),
      addInquiry: (inquiry) => dispatch({ type: "ADD_INQUIRY", inquiry }),
      setInquiryStatus: (inquiryId, status) =>
        dispatch({ type: "SET_INQUIRY_STATUS", inquiryId, status }),
      addInquiryNote: (inquiryId, note) =>
        dispatch({ type: "ADD_INQUIRY_NOTE", inquiryId, note }),
    }),
    [state]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}




