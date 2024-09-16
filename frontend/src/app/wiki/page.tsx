'use client'

import { useEffect, useState } from "react";
import { Template, StoryCard, Button, InputText, useNotification, AuthenticatedPage } from "@/components";
import { useStoryService, Story } from "@/resources";
import Link from "next/link";

export default function WikiPage() {

    const useService = useStoryService();
    const notification = useNotification();
    const [stories, setStories] = useState<Story[]>([]);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    async function searchImages() {



        setLoading(true);


        const result = await useService.findStory(query);
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
            />
        );
    }

    function renderStoryCards() {
        return stories.map(renderStoryCard);
    }

    return (
        <AuthenticatedPage>
            <Template loading={loading}>
                <section className="flex flex-col items-center justify-center my-5">
                    <div className="flex space-x-4">
                        <InputText onChange={event => setQuery(event.target.value)} placeholder="Buscar storys..." />
                        <Button type="submit" style="bg-blue-600 hover:bg-blue-400" label="Buscar" onClick={searchImages} />
                        <Link href="/formulario/story">
                            <Button type="button" style="bg-green-600 hover:bg-green-400 border-5 border-color-hover:text-gray" label="Adicionar Story" />
                        </Link>
                    </div>
                </section>
                <section className="grid grid-cols-3 gap-8">
                    {renderStoryCards()}
                </section>
            </Template>
        </AuthenticatedPage>
    );
}