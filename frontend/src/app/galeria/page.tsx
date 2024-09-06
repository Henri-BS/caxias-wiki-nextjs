'use client'

import { useState } from "react";
import { Template, ImageCard } from "@/components";
import { Image } from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";


export default function GaleriaPage() {

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>('');
    const [extension, setExtension] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function searchImages() {
        setLoading(true);
        const result = await useService.buscar(query, extension);
        setImages(result);
        setLoading(false);
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
                fonte={image.font}
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
                    <input
                        type="text"
                        onChange={event => setQuery(event.target.value)}
                        className="border border-gray-800 px-4 py-2 rounded-md text-gray-900" />
                    <select onChange={event => setExtension(event.target.value)}
                    className="border px-4 py-2 rounded-md text-gray-900">
                        <option value="">Todos Formatos</option>
                        <option value="PNG">PNG</option>
                        <option value="JPEG">JPEG</option>
                        <option value="GIF">GIF</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300" onClick={searchImages}>Buscar</button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-300">Adcionar Imagem</button>
                </div>
            </section>
            <section className="grid grid-cols-3 gap-8">
                {renderimageCards()}
            </section>
        </Template>
    );
}