import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getSessionCookieName } from "@/lib/session";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "ユーザー名とパスワードを入力してください" },
      { status: 400 }
    );
  }

  const db = getDb();
  const user = db
    .prepare("SELECT id, password_hash FROM users WHERE username = ?")
    .get(username) as { id: string; password_hash: string } | undefined;

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return NextResponse.json(
      { error: "ユーザー名またはパスワードが正しくありません" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(getSessionCookieName(), user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
