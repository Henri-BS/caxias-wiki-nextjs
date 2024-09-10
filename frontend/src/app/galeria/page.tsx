'use client'

import { useState } from "react";
import { Template, ImageCard, Button, InputText, useNotification } from "@/components";
import { useImageService, Image } from "@/resources";
import Link from "next/link";

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

        if(!result.length){
            notification.notify("Nenhum resultado encontrado !", "warning");
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
        <Template loading={loading}>
            <section className="flex flex-col items-center justify-center my-5">
                <div className="flex space-x-4">
                    <InputText onChange={event => setQuery(event.target.value)} placeholder="Buscar imagens..."/>
                    <select onChange={event => setExtension(event.target.value)}
                        className="border px-4 py-2 rounded-md text-gray-900">
                        <option value="">Todos Formatos</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    <Button type="submit" style="bg-blue-600 hover:bg-blue-400" label="Buscar" onClick={searchImages}/>
                    <Link href="/formulario/imagem">
                    <Button type="button" style="bg-green-600 hover:bg-green-400 border-5 border-color-hover:text-gray" label="Adicionar Imagem" />
                    </Link>
                </div>
            </section>
            <section className="grid grid-cols-3 gap-8">
                {renderimageCards()}
            </section>
        </Template>
    );
}