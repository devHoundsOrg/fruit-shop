import Link from "next/link";
import { recipes } from "../../lib/data";

export default function RecipesPage() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h1 style={{ fontSize: 22 }}>레시피</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
          gap: 16,
        }}
      >
        {recipes.map((r) => (
          <Link
            key={r.id}
            href={`/recipes/${r.id}`}
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}
          >
            <div style={{ fontWeight: 700 }}>{r.title}</div>
            <div style={{ opacity: 0.8, marginTop: 6 }}>{r.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
