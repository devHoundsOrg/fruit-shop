import Link from "next/link";

export default function VendorOnboardingSuccess() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ fontSize: 22 }}>입점 문의가 접수되었습니다.</h1>
      <p>담당자가 확인 후 연락드리겠습니다. 감사합니다.</p>
      <div style={{ display: "flex", gap: 8 }}>
        <Link href="/">홈으로</Link>
        <Link href="/admin/inquiries">관리자 문의 목록 보기</Link>
      </div>
    </div>
  );
}




