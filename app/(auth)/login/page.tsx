"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { ElementRef, useRef } from "react";
import { toast } from "sonner";

const Login = (props: any) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const context = props.searchParams.context;
  const router = useRouter();

  function handleAdminLogin(formData: FormData) {
    const adminKey = formData.get("adminKey") as string;
    // executeAdminLogin({ adminKey, userId: "1" });
  }

  async function handleLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const result = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (result.ok) {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  }

  if (context === "admin") {
    return (
      <div>
        <h1>Admin Login</h1>
        <form ref={formRef} action={handleAdminLogin}>
          <Input
            type="text"
            placeholder="Please enter your admin key"
            name="adminKey"
          />
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <form action={handleLogin}>
        <Input type="text" placeholder="Please enter your email" name="email" />
        <Input
          type="password"
          placeholder="Please enter your password"
          name="password"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Login;
