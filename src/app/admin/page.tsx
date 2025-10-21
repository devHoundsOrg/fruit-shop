import Link from "next/link";

export default function AdminIndex() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ fontSize: 22 }}>관리자 대시보드 (프로토타입)</h1>
      <ul style={{ display: "grid", gap: 8 }}>
        <li>
          <Link href="/admin/inquiries">입점 문의 관리</Link>
        </li>
      </ul>
    </div>
  );
}




