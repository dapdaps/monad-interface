"use client";
import Home from "@/sections/home";
import { redirect } from "next/navigation";

export default function Index() {
  return redirect("/terminal");
  return <Home />;
}
