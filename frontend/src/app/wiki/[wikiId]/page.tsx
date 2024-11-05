'use client'

import { ImageFormProps, imageFormSchema, imageValidationSchema } from "@/app/formSchema";
import { RequiredLogin } from "@/components/AuthenticatedPage";
import { Button } from "@/components/button/Button";
import { ImageCard } from "@/components/card/ImageCard";
import { FieldError } from "@/components/input/FieldError";
import { InputText, TextArea } from "@/components/input/Input";

import { useNotification } from "@/components/notification";
import { Pagination } from "@/components/Pagination";
import { RenderIf, Template } from "@/components/Template";
import { ImagePage, useImageService } from "@/resources/image";
import { useWikiService, Wiki } from "@/resources/wiki";
import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaImage } from "react-icons/fa";

export default function WikiDetails({ params }: any) {
    const wikiId = params.wikiId;
    const [wiki, setWiki] = useState<Wiki>();
    const wikiService = useWikiService();

    useEffect(() => {
        wikiService.findWikiById(wikiId).then((response) => {
            setWiki(response)
        });
    }, [wikiId])

    const [newImageState, setNewImageState] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string>();
    const notification = useNotification();
    const imageService = useImageService();

    const formik = useFormik<ImageFormProps>({
        initialValues: imageFormSchema,
        onSubmit: handleSubmit,
        validationSchema: imageValidationSchema
    });

    async function handleSubmit(dados: ImageFormProps) {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", dados.file);
        formData.append("name", dados.name);
        formData.append("notes", dados.notes);
        formData.append("wiki", wikiId)

        await imageService.saveImage(formData);

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

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [imagePage, setImagePage] = useState<ImagePage>({ content: [], number: 0, totalElements: 0, pageable: { pageSize: 0, pageNumber: 0 } });
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        imageService.findImagesByWiki(wikiId, pageNumber, query)
            .then((response) => {
                setImagePage(response);
                setLoading(false);
            });
    }, [wikiId, pageNumber, query]);


    return (
        <Template>
            <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                <div className="flex flex-col items-center w-full">
                    <h3 className="mb-8 text-slate-900 font-semibold">
                        <span className="mb-1 block text-3xl leading-6 ">{wiki?.name}</span>
                    </h3> <img src={wiki?.imageUrl} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[40rem] sm:mb-0 xl:mb-6 xl:w-full" />
                    <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                        enviado em: {wiki?.createdDate}
                    </p>
                </div>
            </div>
            <RenderIf condition={!newImageState}>
                <Button type="button"
                    style="bg-green-600 hover:bg-green-500"
                    label="Adicionar Imagem"
                    icon={<FaImage />}
                    onClick={() => setNewImageState(true)} />
                <div className="mt-5 text-2xl text-slate-800 text-justify">
                    <p>{wiki?.description} </p>
                </div>
                <div>
                    <hr />

                    <div className="flex items-center justify-between my-5" >
                        <span className="text-2xl">Galeria de Imagens</span>
                        <div className="flex space-x-4">
                            <InputText
                                id="query"
                                value={query}
                                onChange={event => setQuery(event.target.value)}
                                placeholder="Buscar imagens por nome ou data" />
                        </div>
                    </div>
                    <div className="flex items-start w-full justify-center mb-12">
                        <Pagination pagination={imagePage} onPageChange={handlePageChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {imagePage.content?.filter((x) =>
                            x.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(query.toLocaleUpperCase()) ||
                            x.uploadDate?.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(query.toLocaleUpperCase()) ||
                            x.name?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                            x.uploadDate?.toUpperCase().includes(query.toLocaleUpperCase())

                        ).map(x => (
                            <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                {<ImageCard image={x} />}
                            </div>
                        ))}
                    </div>

                </div>
            </RenderIf>

            <RenderIf condition={newImageState}>
                <Button type="button"
                    style="bg-red-600 hover:bg-red-500 mx-2"
                    label="Cancelar"
                    onClick={() => setNewImageState(false)} />
                <RequiredLogin>
                    <section className="flex flex-col items-center justify-center my-5">
                        <span className="flex items-center gap-x-2 mt-3 mb-10 text-3xl font-extrabold tracking-tight text-gray-900">
                            Adicionar Nova Imagem <FaImage />
                        </span>
                        <form onSubmit={formik.handleSubmit} className="w-1/2">
                            <div className="grid grid-cols-1">
                                <InputText type="hidden"
                                    id="wikiId"
                                    onChange={formik.handleChange}
                                    value={wikiId} />
                            </div>
                            <div className="grid grid-cols-1">
                                <label className="block text-sm font-medium leading-6 text-gray-700">Nome: *</label>
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
                                <Button type="submit" style="bg-green-600 hover:bg-green-400" label="Salvar" />
                            </div>
                        </form>
                    </section>
                </RequiredLogin>
            </RenderIf>
        </Template>
    );
}

function AddImage({ params }: any) {

    const wikiId = params.wikiId;

    return (
        <>
        </>
    );
}