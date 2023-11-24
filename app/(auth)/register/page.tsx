"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const regEmail = searchParams.get("regEmail");
  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 201) {
        toast.success("Account created! Please login to continue.");
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Register</h1>
      <form action={handleSubmit} className="max-w-[320px]">
        <div>
          <Label htmlFor="email" className="text-md font-semibold float-left">
            Email
          </Label>
          <Input
            defaultValue={regEmail ?? ""}
            type="email"
            name="email"
            autoComplete="email"
            id="email"
          />
        </div>
        <div>
          <Label
            htmlFor="password"
            className="text-md font-semibold float-left"
          >
            Password
          </Label>
          <Input
            type="password"
            autoComplete="current-password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <Label
            htmlFor="password_confirmation"
            className="text-md font-semibold float-left"
          >
            Confirm Password
          </Label>
          <Input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />
        </div>
        <div>
          <Button disabled={isLoading} className="w-full mt-4" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
