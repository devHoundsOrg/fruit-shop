"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "../../../lib/store";

export default function SignupPage() {
  const { login } = useShop();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: "user-1", email, name, address, phone });
    router.push("/my");
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 420 }}
    >
      <h1 style={{ fontSize: 22 }}>회원가입 (Mock)</h1>
      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />
      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />
      <input
        placeholder="주소"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        style={{ padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />
      <input
        placeholder="연락처"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
        가입하기
      </button>
    </form>
  );
}
