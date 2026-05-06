import { useDocumentTitle } from "@/shared/lib"
import { TrackSuggestion } from "@/widgets/track-suggesion"

export const TrackSuggestionPage = () => {

    useDocumentTitle('Предложить трек')

    return (
        <TrackSuggestion />
    )
}
