'use client'

import LoginPage from "./login/page";
import { useAuth } from "@/resources";
import WikiPage from "./wiki/page";

export default function Home() {

  const auth = useAuth();
  const user = auth.getUserSession();

if(!user) {
  return <LoginPage/>
}

  return (
    <WikiPage/>
  );
}
