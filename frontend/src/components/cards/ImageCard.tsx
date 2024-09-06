'use client'

interface ImageCardProps {
    nome?: string;
    tamanho?: number;
    dataUpload?: string;
    src?:  string;
    extension?: string;
    fonte?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({
    nome, tamanho, dataUpload, src, extension, fonte
}: ImageCardProps) => {

function download(){
    window.open(src, '_blank')
}

    return (
        <div className="card relative bg-gray-800 rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img onClick={download} className="h-56 w-full object-cover rounded-t-md" src={src} alt="image" />
            <div className="card-body p-6">
                <h5 className="text-xl font-semibold mb-2 text-gray-100">{nome}</h5>
                <p className="text-gray-100">{extension}</p>
                <p className="text-gray-100">{formatBytes(tamanho)}</p>
                <p className="text-gray-100">{dataUpload}</p>
                <p className="text-gray-100">{fonte}</p>
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
