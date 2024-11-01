'use client'

import { WikiProps } from "@/resources/wiki";
import Link from "next/link";



export const WikiCard: React.FC<WikiProps> = ({wiki}: WikiProps) => {

    return (
        <Link href={`/wiki/${wiki.id}`}>
            <div className="card relative bg-gray-800 rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
                <img className="h-56 w-full object-cover rounded-t-md" src={wiki.imageUrl} alt="image" />
                <div className="card-body p-6">
                    <h5 className="text-xl font-semibold mb-2 text-gray-100">{wiki.name}</h5>
                    <p className="text-gray-100">{wiki.createdDate}</p>
                    <p className="text-gray-100">{wiki.description}</p>
                    <p className="text-gray-100">{wiki.tags}</p>
                </div>
            </div>
        </Link>
    );
}