'use client'

import Link from "next/link";
import { Button, InputText, TextArea, RenderIf, Template, useNotification, FieldError } from "@/components"
import { useFormik } from "formik";
import { useState } from "react";
import { useImageService } from "@/resources/image/image.service";
import { FormProps, formSchema, formValidationSchema } from "../formSchema";


export default function FormularioPage() {

    const [loading, setLoading] = useState<boolean>(false);
    const notification = useNotification();
    const [imagePreview, setImagePreview] = useState<string>();
    const service = useImageService();

    const formik = useFormik<FormProps>({
        initialValues: formSchema,
        onSubmit: handleSubmit,
        validationSchema: formValidationSchema

    });

    async function handleSubmit(dados: FormProps) {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", dados.file);
        formData.append("name", dados.name);
        formData.append("notes", dados.notes);

        await service.salvar(formData);

        formik.resetForm();
        setImagePreview('');
        setLoading(false);
        notification.notify("Salvo com sucesso !", "success");
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const file = event.target.files[0];
            formik.setFieldValue("file", file);
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }
    }

    return (
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <h5 className="mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">Nova Imagem</h5>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1">
                        <label className="block text-sm font-medium leading-6 text-gray-700">Name: *</label>
                        <InputText
                            id="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            placeholder="nome da imagem" />
                        <FieldError error={formik.errors.name} />
                    </div>
                    <div className="mt-5 grid grid-cols-1">
                        <label className='block text-sm font-medium leading-6 text-gray-700'>Notas: </label>
                        <TextArea
                            id="notes"
                            onChange={formik.handleChange}
                            value={formik.values.notes}
                            placeholder="Notas sobre a imagem (fonte, autor, local...)" />
                    </div>
                    <div className="mt-5 grid grid-cols-1">
                        <label className="block text-sm font-medium leading-6 text-gray-700">Imagem: *</label>
                        <FieldError error={formik.errors.file} />
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <RenderIf condition={!imagePreview}>
                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </RenderIf>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-700 hover:text-indigo-400">
                                        <RenderIf condition={!imagePreview}>
                                            <span>Faça o upload da imagem</span>
                                        </RenderIf>

                                        <RenderIf condition={!!imagePreview}>
                                            <img src={imagePreview} width={250} className="rounded-md" />
                                        </RenderIf>

                                        <input onChange={onFileUpload} type="file" className="sr-only" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center justify-end gap-x-4">
                        <Button style="bg-blue-600 hover:bg-blue-400" label="Salvar" />
                        <Link href="/galeria">
                            <Button style="bg-red-600 hover:bg-red-400" label="Cancelar" />
                        </Link>
                    </div>
                </form>
            </section>
        </Template>
    );
}