import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const nextCookies = cookies();
  const payload = nextCookies.get("token");
  const adminKey = nextCookies.get("adminKey")?.value;

  if (payload?.value && adminKey === "false") {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        {children}
      </main>
    </div>
  );
}
