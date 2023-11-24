"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

const Login = (props: any) => {
  const formRef = useRef<ElementRef<"form">>(null);
  const context = props.searchParams.context;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function handleAdminLogin(formData: FormData) {
    const adminKey = formData.get("adminKey") as string;
    try {
      const res = await fetch("/api/auth/admin-auth", {
        method: "POST",
        body: JSON.stringify({ adminKey }),
      });

      if (res.status === 401) {
        toast.error("Invalid admin key");
      }

      if (res.ok) {
        toast.success("Admin key is valid");
        router.push("/admin/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
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

      if (result.status === 401) {
        toast.error("Invalid credentials");
      }

      if (result.status === 500) {
        toast.error("Something went wrong!");
      }

      if (result.status === 404) {
        toast.error(
          <div>
            <p>
              User not found. Please register{" "}
              <Link
                href={`/register?regEmail=${email}`}
                className="text-sky-600 underline"
              >
                here
              </Link>{" "}
            </p>
          </div>,
          { duration: 3000 }
        );
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  if (context === "admin") {
    return (
      <div className="border rounded-md p-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-xs text-gray-500 mb-2">
          You need to enter your admin key to access this page
        </p>
        <form ref={formRef} action={handleAdminLogin}>
          <Input
            type="text"
            placeholder="Please enter your admin key"
            name="adminKey"
          />
          <Button
            size={"sm"}
            disabled={isLoading}
            className="w-full mt-4"
            type="submit"
          >
            {isLoading && <Loader2 className="animate-spin" />}
            <span className="ml-3">
              {isLoading ? "Requesting..." : "Request Access"}
            </span>
          </Button>
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
            className="text-md font-semibold float-left mt-2"
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
