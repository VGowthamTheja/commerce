"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

const Login = (props: any) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const context = props.searchParams.context;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  function handleAdminLogin(formData: FormData) {
    const adminKey = formData.get("adminKey") as string;
    // executeAdminLogin({ adminKey, userId: "1" });
  }

  async function handleLogin(formData: FormData) {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
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
      <h1 className="text-2xl font-bold mb-2">Login</h1>
      <form action={handleLogin}>
        <div>
          <Label htmlFor="email" className="text-md font-semibold float-left">
            Email
          </Label>
          <Input autoComplete="email" type="email" name="email" id="email" />
        </div>
        <div>
          <Label
            htmlFor="password"
            className="text-md font-semibold float-left"
          >
            Password
          </Label>
          <Input
            autoComplete="current-password"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <Button disabled={isLoading} className="w-full mt-4" type="submit">
            {isLoading && <Loader2 className="animate-spin" />}
            <span className="ml-3">
              {isLoading ? "Logging in..." : "Login"}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
