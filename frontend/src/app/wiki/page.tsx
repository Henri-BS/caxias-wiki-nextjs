'use client'

import { useState } from "react";
import { Template, StoryCard, Button, InputText, useNotification, AuthenticatedPage } from "@/components";
import { useStoryService, Story } from "@/resources";
import Link from "next/link";
import { FaBook, FaImages } from "react-icons/fa";

export default function WikiPage() {

    const useService = useStoryService();
    const notification = useNotification();
    const [stories, setStories] = useState<Story[]>([]);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function searchWikis() {

        setLoading(true);

        const result = await useService.findStories(query);
        setStories(result);
        setLoading(false);
        if (!result.length) {
            notification.notify("Nenhum resultado encontrado!", "warning");
        }
    }

    function renderStoryCard(story: Story) {
        return (
            <StoryCard
                key={story.id}
                nome={story.name}
                imagem={story.imageUrl}
                dataUpload={story.createdDate}
                descricao={story.description}
            />
        );
    }

    function renderStoryCards() {
        return stories.map(renderStoryCard);
    }

    return (
        <>
            <AuthenticatedPage>
                <Template loading={loading}>
                    <div className="flex items-center justify-between my-5">
                        <div className="flex gap-2">
                            <Link href="/wiki">
                                <Button type="button"
                                    style="gap-1 items-center bg-gradient-to-r from-sky-600 to-emerald-500 hover:from-sky-500 hover:to-emerald-400"
                                    label="Wiki" icon={<FaBook/>}/>
                                    
                            </Link>
                            <Link href="/galeria">
                                <Button type="submit"
                                    style="gap-1 items-center bg-gradient-to-r from-purple-600 to-cyan-500  hover:from-purple-500 hover:to-cyan-400"
                                    label="Galeria" 
                                    icon={<FaImages/>}
                                    onClick={searchWikis} />
                            </Link>
                        </div>
                        <div className="flex space-x-4">

                            <InputText onChange={event => setQuery(event.target.value)} placeholder="Buscar por nomes ou tags" />
                            <Button type="submit" style="bg-blue-600 hover:bg-blue-500" label="Buscar" onClick={searchWikis} />
                            <Link href="/formulario/story">
                                <Button type="button" style="bg-green-600 hover:bg-green-500" label="Adicionar Story" />
                            </Link>

                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {renderStoryCards()}
                    </div>
                </Template>
            </AuthenticatedPage>
        </>
    );
}