'use client'

import { useState } from "react";
import { useImageService, Image } from "@/resources/image";
import Link from "next/link";
import { FaBook, FaImages } from "react-icons/fa";
import { AuthenticatedPage } from "@/components/AuthenticatedPage";
import { Button } from "@/components/button";
import { ImageCard } from "@/components/card/ImageCard";
import { useNotification } from "@/components/notification";
import { Template } from "@/components/Template";
import { InputText } from "@/components/input/Input";

export default function GaleriaPage() {

    const useService = useImageService();
    const notification = useNotification();
    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<Image[]>([]);
    const [query, setQuery] = useState<string>("");
    const [extension, setExtension] = useState<string>("");

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
                                <Button 
                                    style="bg-gradient-to-r from-sky-700 to-emerald-700 hover:from-sky-600 hover:to-emerald-600"
                                    label="Wiki" 
                                    icon={<FaBook/>}
                                    />
                                    
                            </Link>
                            <Link href="/galeria">
                                <Button type="submit"
                                    style="bg-gradient-to-r from-purple-700 to-cyan-700  hover:from-purple-600 hover:to-cyan-600"
                                    label="Galeria" 
                                    icon={<FaImages/>}
                                    onClick={searchImages} />
                            </Link>
                        </div>
                        <div className="flex space-x-4">
                            <InputText onChange={event => setQuery(event.target.value)} placeholder="Buscar por nome" />
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