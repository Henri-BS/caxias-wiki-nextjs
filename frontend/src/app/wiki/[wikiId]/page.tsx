'use client'

import { Template } from "@/components/Template";
import { useWikiService } from "@/resources/wiki";
import { Wiki } from "@/resources/wiki";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WikiDetails({ params }: any) {
    const baseUrl = "http://localhost:8080/v1/stories";

    const wikiId = params.wikiId;

    const [wiki, setWiki] = useState<Wiki>();

    useEffect(() => {
        axios.get(`${baseUrl}/${wikiId}`)
            .then((response) => {
                setWiki(response.data)
            })
    }, [wikiId])

    return (
        <Template>
            <>
                <div className="relative flex flex-col sm:flex-row xl:flex-col items-start">
                    <div className="flex flex-col items-center w-full">
                       <h3 className="mb-8 text-slate-900 font-semibold">
                            <span className="mb-1 block text-3xl leading-6 ">{wiki?.name}</span>
                        </h3> <img src={wiki?.imageUrl} className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[40rem] sm:mb-0 xl:mb-6 xl:w-full" />
                        <p className="flex gap-2 mt-2 items-center text-center text-sm font-medium text-gray-700">
                            enviado em: {wiki?.createdDate}
                        </p>
                        

                    </div>
                </div>
                <div className="mt-5 text-2xl text-slate-800 text-justify">
                    <p>{wiki?.description} </p>
                </div>
            </>
        </Template>
    );
}