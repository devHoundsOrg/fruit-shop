"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "../../../lib/store";

export default function VendorOnboardingPage() {
  const { addInquiry } = useShop();
  const router = useRouter();
  const [farmName, setFarmName] = useState("");
  const [representative, setRepresentative] = useState("");
  const [contact, setContact] = useState("");
  const [mainProducts, setMainProducts] = useState("");
  const [farmAddress, setFarmAddress] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      id: `inq-${Date.now()}`,
      farmName,
      representative,
      contact,
      mainProducts,
      farmAddress,
      status: "new",
      notes: [],
      createdAt: Date.now(),
    });
    router.push("/vendor/onboarding/success");
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 520 }}
    >
      <h1 style={{ fontSize: 22 }}>농가 입점 문의</h1>
      <input
        placeholder="농장명"
        value={farmName}
        onChange={(e) => setFarmName(e.target.value)}
        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />
      <input
        placeholder="대표자"
        value={representative}
        onChange={(e) => setRepresentative(e.target.value)}
        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />
      <input
        placeholder="연락처"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />
      <input
        placeholder="주요상품"
        value={mainProducts}
        onChange={(e) => setMainProducts(e.target.value)}
        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />
      <input
        placeholder="농장주소"
        value={farmAddress}
        onChange={(e) => setFarmAddress(e.target.value)}
        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 14px",
          borderRadius: 6,
          cursor: "pointer",
          background: "#1e90ff",
          color: "#fff",
          border: "none",
        }}
      >
        문의 접수
      </button>
    </form>
  );
}
