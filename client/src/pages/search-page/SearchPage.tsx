import { useDocumentTitle } from "@/shared/lib"
import { SearchWidget } from "@/widgets/search-widget"

export const SearchPage = () => {

    useDocumentTitle('Поиск')

    return (
        <SearchWidget />
    )
}