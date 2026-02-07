import { cookies } from "next/headers";
import { getDb } from "./db";

const SESSION_COOKIE = "sns_session";

interface SessionUser {
  id: string;
  username: string;
  display_name: string;
  bio: string;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionValue) return null;

  const db = getDb();
  const user = db
    .prepare("SELECT id, username, display_name, bio FROM users WHERE id = ?")
    .get(sessionValue) as SessionUser | undefined;

  return user ?? null;
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}
