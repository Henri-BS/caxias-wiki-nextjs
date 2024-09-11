'use client'

import Image from "next/image";
import LoginPage from "./formulario/login/page";
import GaleriaPage from "./galeria/page";
import { useAuth } from "@/resources";

export default function Home() {

  const auth = useAuth();
  const user = auth.getUserSession();

if(!user) {
  return <LoginPage/>
}

  return (
    <GaleriaPage/>
  );
}
