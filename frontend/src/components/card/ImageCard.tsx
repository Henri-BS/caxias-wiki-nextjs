'use client'

import { ImageProps } from "@/resources/image";


export const ImageCard: React.FC<ImageProps> = ({image}: ImageProps) => {

function download(){
    window.open(image.url, '_blank')
}
    return (
        <div className="card cursor-pointer relative w-full bg-gray-800 rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img onClick={download} className="h-96 w-full object-cover rounded-t-md" src={image.url} alt="image" />
            <div className="card-body p-6 overflow-hidden h-36">
                <h5 className="text-xl font-semibold mb-2 text-gray-100">{image.name}</h5>
                <p className="text-gray-100">{image.uploadDate}</p>
            </div>
        </div>
    );
}

function formatBytes(bytes: number = 0, decimals = 2) {
if(!+bytes) return '0 Bytes';

const k = 1024;
const dm = decimals < 0 ? 0 : decimals;
const sizes = ['Bytes', 'KB', 'MB', 'GB']

const i = Math.floor(Math.log(bytes) /Math.log(k))

return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
