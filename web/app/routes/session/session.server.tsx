
import { createCookieSessionStorage } from "@remix-run/node";
import { PrismaClient, User } from '@prisma/client'






const { commitSession, destroySession, getSession } = createCookieSessionStorage({
  cookie: {
    name: "authentication",
    maxAge: 60 * 60 * 24 * 30, // 30 days session
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    secrets: ["array", "of", "secrets"],
  },
});

export const storeUserInSession = async (user: Pick<User, "id">) => {
  const session = await getSession();
  session.set("userId", user.id);
  const header = await commitSession(session);
  return header;
};

export const GetUserIdFromSession = async (request: Request) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  return userId ?? null;
}
