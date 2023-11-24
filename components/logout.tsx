"use client";

import React from "react";
import { Button } from "./ui/button";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { redirect } from "next/navigation";

interface Props {
  cookieStore: ReadonlyRequestCookies;
}

const Logout = ({ cookieStore }: Props) => {
  async function handleLogout() {
    const res = await fetch("/api/auth/logout", {
      method: "DELETE",
    });
    if (res.ok) {
      redirect("/login");
    }
  }

  return (
    <div>
      <form action={handleLogout}>
        <Button type="submit" variant={"destructive"} size={"sm"}>
          Logout
        </Button>
      </form>
    </div>
  );
};

export default Logout;
