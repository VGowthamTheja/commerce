import { cookies } from "next/headers";

import Link from "next/link";
import { Button } from "./ui/button";
import Logout from "./logout";

export default function Navbar() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <nav className="flex items-center justify-between space-x-4 mt-4">
      <div>
        <h1 className="text-4xl font-bold">Commerce</h1>
      </div>
      <div className="flex items-center gap-4">
        {!token?.value ? (
          <>
            <Link href="/login">
              <Button variant={"ghost"}>Login</Button>
            </Link>
            <Link href="/register">
              <Button variant={"default"}>Get started for free</Button>
            </Link>
          </>
        ) : (
          <Logout cookieStore={cookieStore} />
        )}
      </div>
    </nav>
  );
}
