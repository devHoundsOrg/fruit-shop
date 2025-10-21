"use client";

import React from "react";
import { ShopProvider } from "../lib/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ShopProvider>{children}</ShopProvider>;
}




