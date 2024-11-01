'use client'

import { useEffect, useState } from "react";
import { Template } from "@/components/Template";
import { Button } from "@/components/button/Button";
import { useNotification } from "@/components/notification";
import { useWikiService, Wiki, WikiPage } from "@/resources/wiki";
import Link from "next/link";
import { FaBook, FaImages } from "react-icons/fa";
import { WikiCard } from "@/components/card/WikiCard";
import { InputText } from "@/components/input/Input";
import axios from "axios";
import { Pagination } from "@/components/Pagination";

export default function Wikis() {

    const notification = useNotification();
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


    const baseUrl = "http://localhost:8080/v1/wikis";
    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [wikiPage, setWikiPage] = useState<WikiPage>({ content: [], number: 0, totalElements: 0, pageable:{pageSize:0, pageNumber:0} } );

    useEffect(() => {
        axios.get(`${baseUrl}?page=${pageNumber}&query=${query}&size=10`)
            .then((response) => {
                setWikiPage(response.data);
                setLoading(false);
                
            });
    }, [pageNumber, query]);

    return (
        <>
            <Template loading={loading}>
                <div className="flex items-center justify-between my-5" >
                    <div className="flex gap-2">
                        <Link href="/wiki">
                            <Button type="submit"
                                style="gap-1 items-center bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500"
                                label="Wiki" icon={<FaBook />}/>
                        </Link>
                        <Link href="/galeria">
                            <Button type="submit"
                                style="gap-1 items-center bg-gradient-to-r from-purple-600 to-cyan-600  hover:from-purple-500 hover:to-cyan-500"
                                label="Galeria"
                                icon={<FaImages />} />
                        </Link>
                    </div>
                    <div className="flex space-x-4">

                        <InputText
                            id="query"
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                            placeholder="Buscar por nomes ou tags" />
                        <Link href="/wiki/adicionar">
                            <Button type="button"
                                style="bg-green-600 hover:bg-green-500"
                                label="Adicionar Wiki" />
                        </Link>
                    </div>
                </div>
                <div className="flex items-start w-full justify-center mb-12">
                            <Pagination pagination={wikiPage} onPageChange={handlePageChange} />
                        </div>
                <div className="grid grid-cols-2 gap-4">
                    {wikiPage.content?.filter((x) =>
                        x.name?.toUpperCase().includes(query.toLocaleUpperCase()) ||
                        x.tags?.toUpperCase().includes(query.toLocaleUpperCase())
                    )
                        .map(x => (
                            <div key={x.id} className="relative flex flex-col sm:flex-row xl:flex-col items-start ">
                                {<WikiCard wiki={x} />}
                            </div>
                        ))}
                </div>
            </Template>
        </>
    );
}