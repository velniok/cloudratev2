import { LatestReleases } from "@/widgets/latest-releases"
import { LatestTracks } from "@/widgets/latest-tracks"
import { NewReviews } from "@/widgets/new-reviews"

export const HomePage = () => {
    return (
        <>
            <LatestReleases />
            <LatestTracks />
            <NewReviews />
        </>
    )
}
