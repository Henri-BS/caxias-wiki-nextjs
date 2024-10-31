'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { AccessToken, Credentials, User } from '@/resources/user'
import { useAuth } from '@/resources/auth';
import { Button } from '@/components/button'
import { useNotification } from '@/components/notification'
import { RenderIf, Template } from '@/components/Template'
import { LoginFormProps, loginFormSchema, loginValidationSchema } from '../formSchema'
import { FieldError } from '@/components/input/FieldError'
import { InputText } from '@/components/input/Input'
import Link from 'next/link'
import { IoHomeOutline } from 'react-icons/io5'

export default function Login() {

    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);

    const auth = useAuth();
    const notification = useNotification();
    const router = useRouter();

    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginFormProps>({
        initialValues: loginFormSchema,
        validationSchema: loginValidationSchema,
        onSubmit: onSubmit
    });

    async function onSubmit(values: LoginFormProps) {
        if (!newUserState) {
            const credentials: Credentials = { email: values.email, password: values.password }
            try {
                const accessToken: AccessToken = await auth.authenticate(credentials);
                auth.initSession(accessToken);
                router.back();
            } catch (error: any) {
                const message = error?.message;
                notification.notify(message, "error")
            }
        } else {

            const user: User = { email: values.email, name: values.name, password: values.password }

            try {
                await auth.save(user);
                notification.notify("Usuário cadastrado!", "success");
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
            <div className="m-6 flex flex-1 flex-col justify-center p-4">
                <div className="sm:mx-auto text-center w-full ">
                    <h2 className="mt-10 text-center text-4xl font-bold leading-9 whitespace-nowrap tracking-tight text-gray-900">
                        {newUserState ? "Cadastre-se" : "Faça login na sua conta"}
                    </h2>
                    <span>Você precisa está logado para publicar conteúdo na plataforma!</span>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-2 borber border-gray-400">
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Nome: </label>
                            </div>
                            <div className="mt-2">
                                <InputText style="w-full"
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange} />
                                <FieldError error={errors.name} />
                            </div>
                        </RenderIf>
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Email: </label>
                        </div>
                        <div className="mt-2">
                            <InputText style="w-full"
                                id="email"
                                value={values.email}
                                onChange={handleChange} />
                            <FieldError error={errors.email} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">Senha: </label>
                        </div>
                        <div className="mt-2">
                            <InputText style="w-full"
                                type="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange} />
                            <FieldError error={errors.password} />
                        </div>

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Confirmar Senha: </label>
                            </div>
                            <div className="mt-2">
                                <InputText style="w-full"
                                    type="password"
                                    id="passwordMatch"
                                    value={values.passwordMatch}
                                    onChange={handleChange} />
                                <FieldError error={errors.passwordMatch} />
                            </div>
                        </RenderIf>

                        <div className="flex">
                            <RenderIf condition={newUserState}>
                                <Button type="submit"
                                    style="bg-green-600 hover:bg-green-500"
                                    label="Salvar" />
                                <Button type="button"
                                    style="bg-red-600 hover:bg-red-500 mx-2"
                                    label="Cancelar"
                                    onClick={() => setNewUserState(false)} />
                            </RenderIf>

                            <RenderIf condition={!newUserState}>

                                <div className="flex flex-row justify-between w-full items-center gap-x-2">
                                    <Button type="submit"
                                        style="bg-blue-600 hover:bg-blue-500"
                                        label="Login" />
                                    <a className="cursor-pointer text-sky-700 hover:text-sky-500 hover:underline text-lg font-semibold"
                                        onClick={() => setNewUserState(true)}>
                                        Cadastrar
                                    </a>
                                </div>

                            </RenderIf>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    )
}
