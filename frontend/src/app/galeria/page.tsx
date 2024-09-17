'use client'

import { useState } from "react";
import { Template, ImageCard, Button, InputText, useNotification, AuthenticatedPage } from "@/components";
import { useImageService, Image } from "@/resources";
import Link from "next/link";
import { FaBook, FaImages } from "react-icons/fa";

export default function GaleriaPage() {

    const useService = useImageService();
    const notification = useNotification();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function searchImages() {
        setLoading(true);
        const result = await useService.findImage(query, extension);
        setImages(result);
        setLoading(false);

        if (!result.length) {
            notification.notify("Nenhum resultado encontrado!", "warning");
        }
    }

    function renderImageCard(image: Image) {
        return (
            <ImageCard
                key={image.url}
                nome={image.name}
                src={image.url}
                tamanho={image.size}
                extension={image.extension}
                dataUpload={image.uploadDate}
                notas={image.notes}
            />
        );
    }

    function renderimageCards() {
        return images.map(renderImageCard);
    }

    return (
        <>
            <AuthenticatedPage>
                <Template loading={loading}>
                    <div className="flex items-center justify-between my-5">
                    <div className="flex gap-2">
                            <Link href="/wiki">
                                <Button type="button"
                                    style="gap-1 items-center bg-gradient-to-r from-sky-600 to-emerald-500 hover:from-sky-500 hover:to-emerald-400"
                                    label="Wiki" icon={<FaBook/>}/>
                                    
                            </Link>
                            <Link href="/galeria">
                                <Button type="submit"
                                    style="gap-1 items-center bg-gradient-to-r from-purple-600 to-cyan-500  hover:from-purple-500 hover:to-cyan-400"
                                    label="Galeria" 
                                    icon={<FaImages/>}
                                    onClick={searchImages} />
                            </Link>
                        </div>
                        <div className="flex space-x-4">
                            <InputText onChange={event => setQuery(event.target.value)} placeholder="Buscar imagens..." />
                            <select onChange={event => setExtension(event.target.value)}
                                className="border px-4 py-2 rounded-md text-gray-900">
                                <option value="">Todos Formatos</option>
                                <option value="PNG">PNG</option>
                                <option value="JPEG">JPEG</option>
                                <option value="GIF">GIF</option>
                            </select>
                            <Button type="submit" style="bg-blue-600 hover:bg-blue-500" label="Buscar" onClick={searchImages} />
                            <Link href="/formulario/imagem">
                                <Button type="button" style="bg-green-600 hover:bg-green-500 border-5 border-color-hover:text-gray" label="Adicionar Imagem" />
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        {renderimageCards()}
                    </div>
                </Template>
            </AuthenticatedPage>
        </>
    );
}