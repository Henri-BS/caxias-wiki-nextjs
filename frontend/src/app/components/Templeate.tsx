interface TemplateProps {
    children: React.ReactNode
}

export const Template: React.FC<TemplateProps> = (props: TemplateProps) => {
    return (
        <>
            <Header />
            <div className="container mx-auto mt-8 px-4">
                {props.children}
            </div>
            <Footer />
        </>
    );
}

const Header: React.FC = () => {
    return (
        <header className=" border-b border-gray-300 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 text-white py-6">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-3x1 font-bold">Destino Caxias</h1>
            </div>
        </header>
    );
}

const Footer: React.FC = () => {
    return (
        <footer className="border-b border-gray-300 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 text-white py-4 mt8">
            <div className="container mx-auto flex justify-between items-center px-4">
                <a href="https://github.com/Henri-BS">GitHub</a>
            </div>
        </footer>
    );
}

