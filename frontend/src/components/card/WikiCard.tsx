'use client'

import { WikiProps } from "@/resources/wiki";
import Link from "next/link";



export const WikiCard: React.FC<WikiProps> = ({wiki}: WikiProps) => {

    return (
        <Link href={`/wiki/${wiki.id}`}>
            <div className="card w-full relative bg-gray-800 rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
                <img className="h-80 object-cover rounded-t-md" src={wiki.imageUrl} alt="image" />
                <div className="card-body h-40 max-h-40 p-6">
                    <h5 className="h-12 w-full text-xl font-semibold mb-2 text-gray-100 text-ellipsis overflow-hidden">{wiki.name}</h5>
                    <p className="text-gray-100">Data de envio: {wiki.createdDate}</p>
                    <p className="text-gray-100 h-12 text-ellipsis overflow-hidden">{wiki.tags}</p>
                </div>
            </div>
        </Link>
    );
}