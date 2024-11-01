import { Image } from "@/resources/image";
import { Wiki } from "@/resources/wiki";
import { RenderIf } from "./Template";


type Page = {
    content: Wiki[] | Image[];
    size?: number;
    number: number;
    totalElements: number;
    totalPages?: number;
    pageable: {
        pageNumber: number,
        pageSize: number,
    }
}

type PageProps = {
    pagination: Page;
    onPageChange: Function;
}

export const Pagination = ({ pagination, onPageChange }: PageProps) => {

    const next = (pageNumber: number) => {
        if (pageNumber != pagination?.totalPages) {
            onPageChange(pagination?.number + 1)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <span className="text-md text-gray-800">
                <span className="font-semibold text-gray-900">{pagination.pageable.pageNumber + 1} </span>
                a <span className="font-semibold text-gray-900">{pagination.pageable.pageSize} </span>
                de <span className="font-semibold text-gray-900">{pagination.totalPages}</span> Resultados
            </span>
            <div className="inline-flex mt-2 xs:mt-0">

                <button onClick={() => onPageChange(pagination?.number - 1)}
                    className="flex items-center justify-center px-4 h-10 text-base font-semibold text-gray-800 bg-gray-100 border border-gray-400 rounded-s hover:bg-gray-200 hover:border-gray-600">
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    Anterior
                </button>
                <button onClick={() => onPageChange(next(pagination?.number + 1))}
                    className="flex items-center justify-center px-4 h-10 text-base font-semibold text-gray-800 bg-gray-100 border border-gray-400 rounded-e hover:bg-gray-200 hover:border-gray-600 ">
                    Próximo
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </button>
            </div>
        </div>

    );
}