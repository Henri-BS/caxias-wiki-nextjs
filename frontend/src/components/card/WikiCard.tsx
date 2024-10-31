'use client'

import Link from "next/link";


interface WikiCardProps {
    id?: string;
    name?: string;
    uploadDate?: string;
    image?: string;
    description?: string;
}

export const WikiCard: React.FC<WikiCardProps> = ({
    id, name, uploadDate,  image, description
}: WikiCardProps) => {


    return (
        <Link href={`/wiki/${id}`}>
            <div className="card relative bg-gray-800 rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
                <img className="h-56 w-full object-cover rounded-t-md" src={image} alt="image" />
                <div className="card-body p-6">
                    <h5 className="text-xl font-semibold mb-2 text-gray-100">{name}</h5>
                    <p className="text-gray-100">{uploadDate}</p>
                    <p className="text-gray-100">{description}</p>
                </div>
            </div>
        </Link>
    );
}