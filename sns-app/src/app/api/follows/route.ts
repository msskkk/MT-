import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "ログインが必要です" }, { status: 401 });
  }

  const { targetUserId } = await request.json();

  if (targetUserId === user.id) {
    return NextResponse.json(
      { error: "自分自身をフォローすることはできません" },
      { status: 400 }
    );
  }

  const db = getDb();
  const existing = db
    .prepare(
      "SELECT id FROM follows WHERE follower_id = ? AND following_id = ?"
    )
    .get(user.id, targetUserId);

  if (existing) {
    db.prepare(
      "DELETE FROM follows WHERE follower_id = ? AND following_id = ?"
    ).run(user.id, targetUserId);
    return NextResponse.json({ following: false });
  }

  const id = uuidv4();
  db.prepare(
    "INSERT INTO follows (id, follower_id, following_id) VALUES (?, ?, ?)"
  ).run(id, user.id, targetUserId);

  return NextResponse.json({ following: true });
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { error: "userId is required" },
      { status: 400 }
    );
  }

  const db = getDb();
  const currentUser = await getSessionUser();

  const followers = db
    .prepare(
      "SELECT COUNT(*) as count FROM follows WHERE following_id = ?"
    )
    .get(userId) as { count: number };

  const following = db
    .prepare(
      "SELECT COUNT(*) as count FROM follows WHERE follower_id = ?"
    )
    .get(userId) as { count: number };

  let isFollowing = false;
  if (currentUser) {
    const follow = db
      .prepare(
        "SELECT id FROM follows WHERE follower_id = ? AND following_id = ?"
      )
      .get(currentUser.id, userId);
    isFollowing = !!follow;
  }

  return NextResponse.json({
    followers: followers.count,
    following: following.count,
    isFollowing,
  });
}
