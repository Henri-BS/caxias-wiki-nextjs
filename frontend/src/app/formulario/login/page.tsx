'use client'

import { useState } from "react";
import { Template, Button, InputText, RenderIf } from "@/components";

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);


    return (
        <Template loading={loading}>
            <div className="flex flex-1 flex-col min-h-full justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
                        {newUserState ? "Cadastrar usuário": "Faça Login na sua conta"}
                        </h1>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-2">
                            <RenderIf condition={newUserState}>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Nome de Usuário:
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <InputText
                                        style="w-full"
                                        id="name" />
                                </div>
                            </RenderIf>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Email:
                                </label>
                            </div>
                            <div className="mt-2">
                                <InputText
                                    style="w-full"
                                    id="email" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Senha:
                                </label>
                            </div>
                            <div className="mt-2">
                                <InputText
                                    style="w-full"
                                    id="password"
                                    type="password"
                                />
                            </div>
                            <RenderIf condition={newUserState}>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                        Confirmar Senha:
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <InputText
                                        style="w-full"
                                        id="passwordMatch"
                                        type="password"
                                    />
                                </div>
                            </RenderIf>
                            <RenderIf condition={newUserState}>
                                <Button
                                    type="submit"
                                    style="bg-green-600 hover:bg-green-400"
                                    label="Salvar" />
                                <Button
                                    type="button"
                                    style="bg-red-600 hover:bg-red-400 mx-2"
                                    label="Cancelar"
                                    onClick={event => setNewUserState(false)} />
                            </RenderIf>
                            <RenderIf condition={!newUserState}>
                                <Button
                                    type="submit"
                                    style="bg-blue-600 hover:bg-blue-400"
                                    label="Login" />
                                <Button
                                    type="button"
                                    style="bg-red-600 hover:bg-red-400 mx-2"
                                    label="Cadastrar" 
                                    onClick={event => setNewUserState(true)} />
                            </RenderIf>
                        </form>
                    </div>
                </div>
            </div>
        </Template>
    );
}