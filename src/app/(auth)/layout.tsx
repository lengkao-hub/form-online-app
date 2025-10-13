'use client'
import AuthGuard from "@/lib/ability/guard";
import React from "react";
import { queryClient } from "@/lib/interface";
import { QueryClientProvider } from "@tanstack/react-query";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard requireAuth={false}><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></AuthGuard>;
}
