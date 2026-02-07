import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const { postId } = await request.json();
  const db = getDb();

  const existing = db
    .prepare("SELECT id FROM likes WHERE user_id = ? AND post_id = ?")
    .get(user.id, postId);

  if (existing) {
    db.prepare("DELETE FROM likes WHERE user_id = ? AND post_id = ?").run(
      user.id,
      postId
    );
    return NextResponse.json({ liked: false });
  }

  const id = uuidv4();
  db.prepare(
    "INSERT INTO likes (id, user_id, post_id) VALUES (?, ?, ?)"
  ).run(id, user.id, postId);

  return NextResponse.json({ liked: true });
}

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("postId");
  if (!postId) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
  }

  const db = getDb();
  const count = db
    .prepare("SELECT COUNT(*) as count FROM likes WHERE post_id = ?")
    .get(postId) as { count: number };

  return NextResponse.json({ count: count.count });
}
