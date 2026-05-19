"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.error) {
        console.log(response.error);
      }
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="w-full max-[380px]:max-w-xs max-w-sm">
      <CardHeader>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Login to your admin account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Field>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="bg-transparent">
        <Button asChild variant="link" className="text-center w-full">
          <Link href="/">
            <Home />
            Back to Home
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
