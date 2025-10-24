import { cookies } from "next/headers";

interface Options {
  prefix: string;
  value: string;
}

export async function generateAuthCookie(options: Options) {
  const nextCookies = await cookies();
  nextCookies.set({
    name: `${options.prefix}-token`,
    value: options.value,
    httpOnly: true,
    path: "/",
  });
}
