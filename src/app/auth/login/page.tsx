"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShop } from "../../../lib/store";

export default function LoginPage() {
  const { login } = useShop();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ id: "user-1", email, name });
    router.push("/my");
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 12, maxWidth: 360 }}
    >
      <h1 style={{ fontSize: 22 }}>로그인 (Mock)</h1>
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
        로그인
      </button>
      <button
        type="button"
        style={{
          padding: "10px 14px",
          borderRadius: 6,
          cursor: "pointer",
          background: "#f0f0f0",
          border: "1px solid #ccc",
        }}
        onClick={() => router.push("/auth/signup")}
      >
        회원가입 이동
      </button>
    </form>
  );
}
