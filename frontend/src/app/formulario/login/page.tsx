'use client'

import { useState } from "react";
import { Template, Button, InputText, RenderIf, FieldError, useNotification } from "@/components";
import { Credentials, useAuth, AccessToken, User } from "@/resources";
import { useFormik } from "formik";
import { formSchema, formValidationSchema, LoginForm } from "./formSchema";
import { useRouter } from "next/navigation";

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
        initialValues: formSchema,
        validationSchema: formValidationSchema,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginForm) {
        if (!newUserState) {
            const credentials: Credentials = { email: values.email, password: values.password }
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                console.log("Sessão está válida? ", auth.isSessionValid())
                router.push("/galeria")
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, "error")
            }
        } else {
            const user: User = { email: values.email, name: values.name, password: values.password }

            try {
                await auth.save(user);
                notification.notify("Usuário salvo com sucesso!", "success");
                resetForm();
                setNewUserState(false);
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, "error")
            }
        }
    }


    return (
        <Template loading={loading}>
            <div className="flex flex-1 flex-col min-h-full justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className="mt-10 text-center text-1x1 font-bold leading-9 tracking-tight text-gray-900">
                        {newUserState ? "Cadastrar usuário" : "Faça Login na sua conta"}
                    </h1>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-2" onSubmit={handleSubmit}>
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Nome de Usuário:
                                </label>
                            </div>
                            <div className="mt-2">
                                <InputText
                                    style="w-full"
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange} />
                                <FieldError error={errors.name} />
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
                                id="email"
                                value={values.email}
                                onChange={handleChange} />
                            <FieldError error={errors.email} />
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
                                value={values.password}
                                onChange={handleChange} />
                            <FieldError error={errors.password} />
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
                                    value={values.passwordMatch}
                                    onChange={handleChange} />
                                <FieldError error={errors.passwordMatch} />
                            </div>
                        </RenderIf>
                        <div>
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
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}

