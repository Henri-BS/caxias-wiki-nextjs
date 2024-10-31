'use client'

import { useState } from "react";
import { Template } from "@/components/Template";
import { Button } from "@/components/button";
import { useNotification } from "@/components/notification";
import { useWikiService, Wiki } from "@/resources/wiki";
import Link from "next/link";
import { FaBook, FaImages } from "react-icons/fa";
import { WikiCard } from "@/components/card/WikiCard";
import { InputText } from "@/components/input/Input";

export default function WikiPage() {

    const useService = useWikiService();
    const notification = useNotification();
    const [wikis, setWikis] = useState<Wiki[]>([]);
    const [query, setQuery] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function searchWikis() {
        setLoading(true);
        const result = await useService.findWikis(query);
        setWikis(result);
        setLoading(false);
        if (!result.length) {
            notification.notify("Nenhum resultado encontrado!", "warning");
        }
    }

    function renderWikiCard(wiki: Wiki) {
        return (
            <WikiCard
                key={wiki.id}
                id={wiki.id}
                name={wiki.name}
                image={wiki.imageUrl}
                uploadDate={wiki.createdDate}
                description={wiki.description}
            />
        );
    }

    function renderWikiCards() {
        return wikis.map(renderWikiCard);
    }

    return (
        <>
            <Template loading={loading}>
                <div className="flex items-center justify-between my-5" >
                    <div className="flex gap-2">
                        <Link href="/wiki">
                            <Button type="submit"
                                style="gap-1 items-center bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500"
                                label="Wiki" icon={<FaBook />}
                                onClick={searchWikis} />
                        </Link>
                        <Link href="/galeria">
                            <Button type="submit"
                                style="gap-1 items-center bg-gradient-to-r from-purple-600 to-cyan-600  hover:from-purple-500 hover:to-cyan-500"
                                label="Galeria"
                                icon={<FaImages />} />
                        </Link>
                    </div>
                    <div className="flex space-x-4">

                        <InputText onChange={event => setQuery(event.target.value)} placeholder="Buscar por nomes ou tags" />
                        <Button type="submit"
                            style="bg-blue-600 hover:bg-blue-500"
                            label="Buscar"
                            onClick={searchWikis} />
                        <Link href="/wiki/adicionar">
                            <Button type="button"
                                style="bg-green-600 hover:bg-green-500"
                                label="Adicionar Wiki" />
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {renderWikiCards()}
                </div>
            </Template>
        </>
    );
}