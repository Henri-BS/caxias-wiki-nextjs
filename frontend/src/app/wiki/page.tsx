'use client'

import { useEffect, useState } from "react";
import { Template } from "@/components/Template";
import { Button } from "@/components/button/Button";
import { useNotification } from "@/components/notification";
import { useWikiService, WikiPage } from "@/resources/wiki";
import Link from "next/link";
import { WikiCard } from "@/components/card/WikiCard";
import { InputText } from "@/components/input/Input";
import { Pagination } from "@/components/Pagination";

export default function Wikis() {

    const notification = useNotification();
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const wikiService = useWikiService();

    const [pageNumber, setPageNumber] = useState(0);
    const handlePageChange = (newPageNumber: number) => {
        setPageNumber(newPageNumber);
    }
    const [wikiPage, setWikiPage] = useState<WikiPage>({ content: [], number: 0, totalElements: 0, pageable:{pageSize:0, pageNumber:0} } );

    useEffect(() => {
        wikiService.findWikis(pageNumber, query)
            .then((response) => {
                setWikiPage(response);
                setLoading(false);
                if(response.content.length == 0){
                    notification.notify("Nenhum resultado encontrado", "warning")
                }
            });
    }, [pageNumber, query]);

    return (
        <>
            <Template loading={loading}>
                <div className="flex items-center justify-between my-5" >
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
                        x.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(query.toLocaleUpperCase()) ||
                        x.tags?.normalize("NFD").replace(/[\u0300-\u036f]/g, '').toUpperCase().includes(query.toLocaleUpperCase())
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