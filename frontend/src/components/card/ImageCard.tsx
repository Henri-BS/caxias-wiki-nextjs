'use client'

import { ImageProps } from "@/resources/image";
import { FaDownload, FaInfo } from "react-icons/fa";
import { Button } from "../button/Button";
import { useState } from "react";
import { RenderIf } from "../Template";


export const ImageCard: React.FC<ImageProps> = ({ image }: ImageProps) => {

    function download() {
        window.open(image.url, '_blank')
    }

    const [descriptionState, setDescriptionState] = useState<boolean>(false);

    return (
        <div className="card relative w-full bg-gray-800 rounded-md shadow-md hover:shadow-lg ">
            <img className="h-96 w-full object-cover rounded-t-md" src={image.url} alt="image" />
            <div className="card-body p-6 overflow-hidden ">
                <h5 className="text-xl font-semibold mb-2 text-gray-100 h-14 overflow-hidden">{image.name}</h5>
                <RenderIf condition={!descriptionState}>
                    <div className="flex justify-between items-center text-gray-100">
                        Data de envio: {image.uploadDate}

                        <p className="flex flex-row items-center gap-x-2 ">
                            <abbr title="baixar imagem">
                                <Button style="bg-green-600" icon={<FaDownload />} onClick={download} />
                            </abbr>
                            <abbr title="informações da imagem">
                                <Button style="bg-blue-600" icon={<FaInfo />} onClick={() => setDescriptionState(true)} />
                            </abbr>
                        </p>
                    </div>
                </RenderIf>
                <RenderIf condition={!!descriptionState}>
                    <div className="flex justify-between items-center text-gray-100">
                        Data de envio: {image.uploadDate}
                        <p className="flex flex-row items-center gap-x-2 ">
                            <abbr title="baixar imagem">
                                <Button style="bg-green-600" icon={<FaDownload />} onClick={download} />
                            </abbr>
                            <abbr title="informações da imagem">
                                <Button style="bg-blue-600" icon={<FaInfo />} onClick={() => setDescriptionState(false)} />
                            </abbr>
                        </p>
                    </div>
                    <p className="text-gray-100 h-full text-lg mt-2">{image.notes}</p>
                </RenderIf>
            </div>
        </div>
    );
}