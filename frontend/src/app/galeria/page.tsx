'use client'

import { useState } from "react";
import { Template, ImageCard } from "@/components";
import { Image } from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";


export default function GaleriaPage() {

    const useService = useImageService();
    const [images, setImages] = useState<Image[]>([]);

    async function searchImages() {
        const result = await useService.buscar();
        setImages(result);
        console.table(result)
    }

function renderImageCard(image: Image){
    return(
<ImageCard 
nome={image.name} 
src={image.url} 
tamanho={image.size} 
dataUpload={image.uploadDate} />
    );
}

function renderimageCards(){
    return images.map(renderImageCard)
}

    return (
        <Template>
            <button className="bg-gray-500" onClick={searchImages}>Clique para mudar</button>
            <section className="grid grid-cols-4 gap-8">
                {renderimageCards()}
            </section>
        </Template>
    );
}