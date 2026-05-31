import { Banner } from "@/widgets/banner"
import { LatestReleases } from "@/widgets/latest-releases"
import { LatestTracks } from "@/widgets/latest-tracks"
import { NewReviews } from "@/widgets/new-reviews"

export const HomePage = () => {
    return (
        <>
            <Banner />
            <LatestReleases />
            <LatestTracks />
            <NewReviews />
        </>
    )
}
