"use client";

import { createAdminSession } from "@/actions/create-admin-session";
import { createLoginSession } from "@/actions/create-login-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAction } from "@/hooks/use-action";
import React from "react";

const Login = (props: any) => {
  const context = props.searchParams.context;

  const { execute: executeAdminLogin } = useAction(createAdminSession, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const { execute: executeUserLogin } = useAction(createLoginSession, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  function handleAdminLogin(formData: FormData) {
    const adminKey = formData.get("adminKey") as string;
    executeAdminLogin({ adminKey, userId: "1" });
  }

  function handleLogin(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    executeUserLogin({ email, password });
  }

  if (context === "admin") {
    return (
      <div>
        <h1>Admin Login</h1>
        <form action={handleAdminLogin}>
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
