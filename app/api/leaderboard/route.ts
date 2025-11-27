import { NextResponse } from "next/server";
import { ensureTable } from "../../lib/leaderboard";

// helper to wrap sqlite3 callbacks into Promises
function runAsync(db: any, sql: string, params: any[] = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (this: any, err: any) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}
function allAsync(db: any, sql: string, params: any[] = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err: any, rows: any[]) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

// GET /api/leaderboard
export async function GET() {
  const db = ensureTable();

  const rows: any = await allAsync(
    db,
    "SELECT id, name, winner, created_at FROM leaderboard ORDER BY id DESC"
  );

  // keep original response shape
  return NextResponse.json({
    success: true,
    data: rows,
  });
}

// POST /api/leaderboard
export async function POST(request: Request) {
  const { name, winner } = await request.json();

  if (!name || !winner) {
    return NextResponse.json(
      { success: false, error: "Missing name or winner" },
      { status: 400 }
    );
  }

  const db = ensureTable();

  await runAsync(
    db,
    "INSERT INTO leaderboard (name, winner) VALUES (?, ?)",
    [name, winner]
  );

  return NextResponse.json({
    success: true,
    message: "Score added",
  });
}
