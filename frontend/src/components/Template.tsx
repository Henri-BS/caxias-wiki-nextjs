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
        <header className="border-b border-gray-300 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-900/50 text-white py-6">
            <div className="container mx-auto flex justify-between items-center px-4">
                <h1 className="text-2x1 font-bold">Destino Caxias</h1>
            </div>
        </header>
    );
}

const Footer: React.FC = () => {
    return (
        <footer className="border-b border-gray-300 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-900/50 text-white py-5 mt8">
            <div className="container mx-auto flex justify-between items-center px-4">
                Contato com Desenvolvedor:
                <a className="text-blue-600 dark:text-blue-500 hover:underline" href="https://github.com/Henri-BS">GitHub</a>
                <a className="text-blue-600 dark:text-blue-500 hover:underline" href="mailto:hbsantos@gmail.com">Email</a>
            </div>
        </footer>
    );
}