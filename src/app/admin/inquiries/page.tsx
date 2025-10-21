"use client";

import { useState } from "react";
import { useShop } from "../../../lib/store";
import { InquiryStatus } from "../../../lib/types";

export default function AdminInquiries() {
  const { state, setInquiryStatus, addInquiryNote } = useShop();
  const [noteText, setNoteText] = useState<Record<string, string>>({});

  const setStatus = (id: string, status: InquiryStatus) => {
    setInquiryStatus(id, status);
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ fontSize: 22 }}>입점 문의 관리</h1>
      {state.inquiries.length === 0 ? (
        <div>문의가 없습니다. (폼에서 문의를 남겨보세요)</div>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {state.inquiries.map((q) => (
            <div
              key={q.id}
              style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
            >
              <div style={{ display: "grid", gap: 6 }}>
                <div style={{ fontWeight: 700 }}>{q.farmName}</div>
                <div>대표자: {q.representative}</div>
                <div>연락처: {q.contact}</div>
                <div>주요상품: {q.mainProducts}</div>
                <div>농장주소: {q.farmAddress}</div>
                <div>상태: {q.status}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  onClick={() => setStatus(q.id, "in_review")}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  검토중
                </button>
                <button
                  onClick={() => setStatus(q.id, "approved")}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #4caf50",
                    borderRadius: 4,
                    background: "#fff",
                    color: "#4caf50",
                    cursor: "pointer",
                  }}
                >
                  승인
                </button>
                <button
                  onClick={() => setStatus(q.id, "rejected")}
                  style={{
                    padding: "6px 12px",
                    border: "1px solid #ff6b6b",
                    borderRadius: 4,
                    background: "#fff",
                    color: "#ff6b6b",
                    cursor: "pointer",
                  }}
                >
                  거절
                </button>
              </div>
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    placeholder="메모 추가"
                    value={noteText[q.id] || ""}
                    onChange={(e) =>
                      setNoteText({ ...noteText, [q.id]: e.target.value })
                    }
                    style={{
                      flex: 1,
                      padding: 8,
                      border: "1px solid #ccc",
                      borderRadius: 4,
                    }}
                  />
                  <button
                    onClick={() => {
                      const val = noteText[q.id];
                      if (!val) return;
                      addInquiryNote(q.id, val);
                      setNoteText({ ...noteText, [q.id]: "" });
                    }}
                    style={{
                      padding: "8px 14px",
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      background: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    추가
                  </button>
                </div>
                <ul style={{ marginTop: 8 }}>
                  {q.notes.map((n, i) => (
                    <li key={i}>- {n}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
