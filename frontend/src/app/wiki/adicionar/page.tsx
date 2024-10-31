'use client'

import Link from "next/link";
import { useFormik } from "formik";
import { useState } from "react";
import { useWikiService } from "@/resources/wiki";
import { FormProps, formSchema, formValidationSchema } from "./wikiFormSchema";
import { FaBook } from "react-icons/fa";
import { Button } from "@/components/button";
import { InputText, FieldError, TextArea } from "@/components/input";
import { useNotification } from "@/components/notification";
import { Template } from "@/components/Template";


export default function AddWikiForm() {

    const [loading, setLoading] = useState<boolean>(false);
    const notification = useNotification();
    const service = useWikiService();

    const formik = useFormik<FormProps>({
        initialValues: formSchema,
        onSubmit: handleSubmit,
        validationSchema: formValidationSchema

    });

    async function handleSubmit(dados: FormProps) {
        setLoading(true);

        const formData = new FormData();
        formData.append("name", dados.name);
        formData.append("imageUrl", dados.imageUrl);
        formData.append("tags", dados.tags);
        formData.append("description", dados.description);

        await service.saveWiki(formData);

        formik.resetForm();
        setLoading(false);
        notification.notify("Salvo com sucesso !", "success");
    }

    return (
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <span className="flex gap-2 mt-3 mb-10 text-4xl font-extrabold tracking-tight text-gray-900">
                        Criar Nova Wiki <FaBook />
                    </span>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Nome: *</label>
                            <InputText
                                id="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                placeholder="Nome da publicação" />
                            <FieldError error={formik.errors.name} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Imagem de Capa: </label>
                            <InputText
                                id="imageUrl"
                                onChange={formik.handleChange}
                                value={formik.values.imageUrl}
                                placeholder="Link da imagem de capa" />
                            <FieldError error={formik.errors.imageUrl} />
                        </div>
                        <div className='mt-5 grid grid-cols-1'>
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Tags: *</label>
                            <InputText id="tags"
                                onChange={formik.handleChange}
                                value={formik.values.tags}
                                placeholder="Tag1, Tag2, Tag3..." />
                            <FieldError error={formik.errors.tags} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Descrição: </label>
                            <TextArea
                                id="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                placeholder="Uma descrição detalhada sobre o item" />
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button style="bg-green-600 hover:bg-green-400" label="Salvar" />
                            <Link href="/wiki">
                                <Button style="bg-red-600 hover:bg-red-400" label="Cancelar" />
                            </Link>
                        </div>
                    </form>
                </section>
            </Template>
    );
}