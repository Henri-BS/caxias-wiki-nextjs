'use client'

import Link from "next/link";


interface StoryCardProps {
    id?: string;
    nome?: string;
    dataUpload?: string;
    imagem?:  string;
    descricao?: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({
    id, nome, dataUpload, imagem, descricao
}: StoryCardProps) => {

function download(){
    window.open(imagem, '_blank')
}

    return (
        <div className="card relative bg-gray-800 rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img onClick={download} className="h-56 w-full object-cover rounded-t-md" src={imagem} alt="image" />
            <div className="card-body p-6">
                <h5 className="text-xl font-semibold mb-2 text-gray-100">{nome}</h5>
                <p className="text-gray-100">{dataUpload}</p>
                <p className="text-gray-100">{descricao}</p>
            </div>
        </div>

    );
}



