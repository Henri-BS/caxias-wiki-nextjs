    

import Login from "@/app/login/page";
import { useAuth } from "@/resources/auth";
import Link from "next/link";
import { IoLogInOutline } from "react-icons/io5";
import { Button } from "./button";

interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({
    children
}) => {
    const auth = useAuth();

    if (!auth.isSessionValid()) {
        return <Login />
    }
    return (
        <>
            {children}
        </>
    )
}

export const RequiredLogin: React.FC<AuthenticatedPageProps> = ({
    children
}) => {
    const auth = useAuth();

    if (!auth.isSessionValid()) {
        return (
            <div className="flex flex-row items-center gap-x-2 p-16 justify-center">
                <span className="text-xl">Você precisa fazer login para poder publicar</span>
                <Link href={"/login"}>
                    <Button style="border  border-sky-800 hover:border-sky-500  text-gray-800"
                        label={"Login"}
                        icon={<IoLogInOutline />}
                    />
                </Link>
            </div>
        )
    }
    return (
        <>
            {children}
        </>
    )
}