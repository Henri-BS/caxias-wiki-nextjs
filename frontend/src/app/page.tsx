'use client'

import LoginPage from "./login/page";
import { useAuth } from "@/resources/auth";
import WikiPage from "./wiki/page";

export default function Home() {

  return (
    <WikiPage/>
  );
}
