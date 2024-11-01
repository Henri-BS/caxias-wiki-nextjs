'use client'

import LoginPage from "./login/page";
import { useAuth } from "@/resources/auth";
import Wikis from "./wiki/page";

export default function Home() {

  return (
    <Wikis/>
  );
}
